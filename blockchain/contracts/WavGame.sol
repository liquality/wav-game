//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@opengsn/contracts/src/interfaces/IERC2771Recipient.sol";
import "./interfaces/IWavGame.sol";
import "./interfaces/IWavNFT.sol";
import "./libraries/Helper.sol";
import "hardhat/console.sol";


contract WavGame is IWavGame, Ownable, ERC2771Recipient, ReentrancyGuard, ERC165 {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public feePerMint; // In wei
    uint256 constant internal ENTRY_LEVEL = 1; 
    IWavNFT public wavNFT; 
    // address payable public revenueContract; // Platform revenue spliting contract

    address[] gameIDs;
    mapping(address => uint256) availablePayments;
    mapping(address => Game) internal wavGames;
    mapping(address => mapping(uint256 => EnumerableSet.AddressSet)) collectors;// Collectors per islands per game
    mapping(address => mapping(uint256 => EnumerableSet.UintSet)) burnableSet;// Burnable NFT sets per islands per game
    mapping(address => mapping(uint256 => EnumerableSet.UintSet)) mintableSet;// Mintable NFT sets per islands per game

    
    event LeveledUp(address caller, address collector, uint256 nextIslandID, uint256 totalMinted);
    event Collected(address caller, address to, uint256 amountSent, uint256 totalMinted);
    event TreasurySet(address gameID, address payable treasury);
    event SpecialMint(address collector, uint256 id, uint256 amount);
    event IslandUpdated(address gameID, uint256 islandID);
    event PaymentForwarded(address to, uint256 amount);
    event GameSet(address gameID, uint256 islandID);
    event FeeSet(uint256 oldFee, uint256 newFee);

    error InsufficientPayment(uint256 requiredAmt, uint256 ammountSent);   
    error NFTNotInMintableSet(uint256 invalidNFT, uint256 islandID);
    error InvalidTreasury(address treasury);
    error RequiredBurnNotMet(uint8 requiredBurn);
    error InvalidGameID(address gameID);
    error RequestNotPermitted();
    error FundsReleaseFailed();
    error ParametersMisMatch();
    error PaymentRequired();
    error IslandNotFound();

    modifier onlyValidIsland(address _gameID, uint256 _islandID) {
        if(Helper.getIslandIndex(_islandID) >= wavGames[_gameID].islands.length){
            revert IslandNotFound();
        }
        _;
    }

    constructor(IWavNFT _wavNFT, address _trustedForwarder,uint256 _feePerMint) {
        wavNFT = _wavNFT;
        feePerMint = _feePerMint;
        _setTrustedForwarder(_trustedForwarder);
    }

    /// @notice This function mints level 1 (First game island) NFTs to the _recipient
    /// @param _recipient The recipient of the minted level 1 (First game island) NFT
    /// @param _nfts nft ids and their corresponding quantities to mint
    /// @dev This function 
    function collect(address _gameID, address _recipient, NFTParam[] calldata _nfts) external override payable nonReentrant onlyValidIsland(_gameID, ENTRY_LEVEL) {
        uint totalPayable = 0;
        uint totalMinted = 0;
        uint[] memory mintableNFTs = new uint[](_nfts.length); 
        uint[] memory mintableAmountPerNFTs = new uint[](_nfts.length);

        for (uint i; i < _nfts.length;) { 
            if (!mintableSet[_gameID][ENTRY_LEVEL].contains(_nfts[i].id)){
                revert NFTNotInMintableSet(_nfts[i].id, ENTRY_LEVEL);
            }
            mintableNFTs[i] = _nfts[i].id;
            mintableAmountPerNFTs[i] = _nfts[i].amount;
            totalMinted +=_nfts[i].amount;
            totalPayable += _nfts[i].amount * feePerMint;
            unchecked {++i;}
        }
        
        if (totalPayable > msg.value) { 
            revert InsufficientPayment(totalPayable,msg.value);
        }
        wavNFT.mintBatch(_recipient, mintableNFTs, mintableAmountPerNFTs, bytes(" "));
        availablePayments[_gameID] += msg.value;
        _syncMint(_gameID, ENTRY_LEVEL, _recipient, totalMinted);

        emit Collected(_msgSender(), _recipient, msg.value, totalMinted);
    }
    function levelUp(address _gameID, uint256 _islandID, NFTParam[] calldata _nfts) external override nonReentrant onlyValidIsland(_gameID, _islandID) {
        if(_islandID <= ENTRY_LEVEL) {
            revert RequestNotPermitted();
        }
        IWavGame.Island memory nextIsland = wavGames[_gameID].islands[Helper.getIslandIndex(_islandID)];

        uint[] memory burnableNFTs = new uint[](_nfts.length);
        uint[] memory burnableAmountPerNFTs = new uint[](_nfts.length);
        uint totalBurnAmount;

        for (uint256 i = 0; i < _nfts.length;) { 
            if (burnableSet[_gameID][_islandID].contains(_nfts[i].id)) {
                burnableNFTs[i] = _nfts[i].id;
                burnableAmountPerNFTs[i] = _nfts[i].amount;
                totalBurnAmount += _nfts[i].amount;
            }
            unchecked {++i;} 
        }

        if(totalBurnAmount != nextIsland.requiredBurn){
            revert RequiredBurnNotMet(nextIsland.requiredBurn);
        }
        wavNFT.burnBatch(_msgSender(), burnableNFTs, burnableAmountPerNFTs);
        wavNFT.mint(_msgSender(), mintableSet[_gameID][_islandID].values()[0], nextIsland.requiredMint, bytes(" "));
   
        wavGames[_gameID].islands[Helper.getIslandIndex(_islandID-1)].burnCount += totalBurnAmount; // Increase burnCount of old/prev island
        _syncMint(_gameID, _islandID, _msgSender(), nextIsland.requiredMint);

        emit LeveledUp(msg.sender, _msgSender(), _islandID, nextIsland.requiredMint);
    }
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IWavGame).interfaceId || interfaceId == type(IERC2771Recipient).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    //Returns true if msg.sender qualifies for special prize on artist collection
    function isPrizedCollector(address _gameID, uint256 _islandID) public view returns (bool) {
        return collectors[_gameID][_islandID].contains(msg.sender);
    } 
    function fetchPrizedCollectors(address _gameID, uint256 _islandID) public view returns (address[] memory) {
        return collectors[_gameID][_islandID].values();
    }
    // Get all islands of a given gameID
    function fetchGame(address _gameID) public view returns (IWavGame.Island[] memory, address) {
        return (wavGames[_gameID].islands, wavGames[_gameID].treasury);
   
    }
    function getBalance(address _gameID) public view returns (uint256){
        return availablePayments[_gameID];
    }
    // Get island info for given gameID, and islandID
    function getIsland(address _gameID, uint256 _islandID) public view returns (IWavGame.Island memory, uint[] memory, uint[] memory) {
        return (wavGames[_gameID].islands[Helper.getIslandIndex(_islandID)], burnableSet[_gameID][_islandID].values(), mintableSet[_gameID][_islandID].values());
   
    }
    // Get treasury contract for given game
    function getTreasury(address _gameID) public view returns (address) {
        return wavGames[_gameID].treasury;
    }
    function getFeePerMint() public view returns (uint256) {
        return feePerMint;
    }

    //============================= Game Administration ============================
    // No checks are done for mint and batchMints, these are admin functions for minting non-game related NFTs, minting 
    //a game-specific NFT through this functions may distrupt calculations on the game
    // Use special mint instead.
    function mint(address _recipient, uint _id, uint _amount) external onlyOwner {
        wavNFT.mint(_recipient, _id, _amount, " ");
    }
    function wavMint(address _recipient, address _gameID, uint256 _islandID, uint256 _id, uint256 _amount) external onlyOwner {
        if(Helper.getIslandIndex(_islandID) >= wavGames[_gameID].islands.length){
            revert IslandNotFound();
        }
        if (!mintableSet[_gameID][_islandID].contains(_id)){
            revert NFTNotInMintableSet(_id, _islandID);
        }

        wavNFT.mint(_recipient, _id, _amount, " ");
        _syncMint(_gameID, _islandID, _recipient, _amount);

        emit SpecialMint(_recipient, _id, _amount);
    }
    function batchMint(address _recipient, uint[] memory _ids, uint[] memory _amount) external onlyOwner {
        wavNFT.mintBatch(_recipient, _ids, _amount, " ");
    } 
    function forwardValue() external onlyOwner nonReentrant {
        uint256 gamesLength = gameIDs.length;
        for (uint256 i = 0; i < gamesLength;) {
            address gameId = gameIDs[i];
            uint256 pendingPayment = availablePayments[gameId];
            address payable treasury = wavGames[gameId].treasury;
            _assertValidTreasury(treasury);
            (bool success, ) = treasury.call{value: pendingPayment}("");
            if (!success) {
                revert FundsReleaseFailed();
            }
            availablePayments[gameId] = 0;
            emit PaymentForwarded(gameId, pendingPayment);
            unchecked {++i;}
        }
    }
    function setFeePerMint(uint256  _feePerMint) external onlyOwner {
        uint256 oldFee = feePerMint;
        feePerMint = _feePerMint;
        emit FeeSet(oldFee, _feePerMint);
    }
    function setTrustedForwarder(address _trustedForwarder) public onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }
    // This creates a game if not exist, then populates the islands, or updates the game by adding new islands.
    //This function always adds a new island to the specified game, only call this function when adding new islands to an given game
    function setGame(address _gameID, IWavGame.IslandParam[] calldata _islands) external onlyOwner {
        _assertValidGameID(_gameID);
        if (wavGames[_gameID].islands.length <= 0) {
            gameIDs.push(_gameID);
        }
        _setGame(_gameID, _islands);
    }
    function setTreasuries(address[] calldata _gameIDs, address payable[] calldata _treasuries) external onlyOwner {
        if (_gameIDs.length != _treasuries.length) {
            revert ParametersMisMatch();
        }
        for (uint256 i; i < _gameIDs.length;) {
            // _assertValidTreasury(_treasuries[i]);
            wavGames[_gameIDs[i]].treasury = _treasuries[i];
            emit TreasurySet(_gameIDs[i], _treasuries[i]);
            unchecked {++i;} 
        }
    }
    function updateIsland(address _gameID, uint256 _islandID, IWavGame.IslandParam calldata _islandParam) external onlyOwner onlyValidIsland(_gameID,_islandID) {
        uint256 islandIndex = Helper.getIslandIndex(_islandID); 
        if (_islandParam.requiredBurn > 0) {
            wavGames[_gameID].islands[islandIndex].requiredBurn = _islandParam.requiredBurn;
        }
        if (_islandParam.requiredMint > 0) {
            wavGames[_gameID].islands[islandIndex].requiredMint = _islandParam.requiredMint;
        }
        if (_islandParam.prizeCutOff > 0) {
            wavGames[_gameID].islands[islandIndex].prizeCutOff = _islandParam.prizeCutOff;
        }
        _setBurnable(_gameID, _islandID, burnableSet[_gameID][_islandID], _islandParam.burnableSet);
        _setMintable(mintableSet[_gameID][_islandID], _islandParam.mintableSet);
        emit IslandUpdated(_gameID, _islandID);
    }
    function _syncMint(address _gameID, uint256 _islandID, address _recipient, uint256 _mintCount) internal {
        uint256 islandIndex = Helper.getIslandIndex(_islandID);
        Island memory island = wavGames[_gameID].islands[islandIndex];
        wavGames[_gameID].islands[islandIndex].mintCount += _mintCount;
        if (collectors[_gameID][_islandID].length() < island.prizeCutOff && !collectors[_gameID][_islandID].contains(_recipient)){
            collectors[_gameID][_islandID].add(_recipient);
        }
    }
    function _setBurnable(address _gameID, uint256 _islandID, EnumerableSet.UintSet storage burnableSet, IWavGame.SetParam[] memory _burnableSet) internal  {
        for (uint256 i; i < _burnableSet.length;) {
            if (_burnableSet[i].status) {
                // NFT for burn must be mintable from prevLevel, to ensure levelup 
                //is only possible from a level lower to the next immediate level 
                if (_islandID != ENTRY_LEVEL && mintableSet[_gameID][_islandID - 1].contains(_burnableSet[i].id)) {
                    burnableSet.add(_burnableSet[i].id);
                }
            } else {
                burnableSet.remove(_burnableSet[i].id);
            }
            unchecked {++i;} 
        }
    }
    function _setMintable(EnumerableSet.UintSet storage mintableSet, IWavGame.SetParam[] memory _mintableSet) internal  {
        for (uint256 i; i < _mintableSet.length;) {
            if (_mintableSet[i].status) {
                mintableSet.add(_mintableSet[i].id);
            } else {
                mintableSet.remove(_mintableSet[i].id);
            }
            unchecked {++i;} 
        }
    }	
    function _msgSender() internal view virtual override(Context, ERC2771Recipient) returns (address sender) {
        return ERC2771Recipient._msgSender();
    }
    function _msgData() internal view virtual override(Context, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }
    function _setGame(address _gameID, IWavGame.IslandParam[] memory _islands) internal {
        for (uint256 i; i < _islands.length;) {
            wavGames[_gameID].islands.push(IWavGame.Island(
                _islands[i].requiredBurn,
                _islands[i].requiredMint,
                _islands[i].prizeCutOff,
                0,
                0
            ));
            uint256 islandID = Helper.getIslandID(wavGames[_gameID].islands.length - 1);
            _setBurnable(_gameID, islandID, burnableSet[_gameID][islandID], _islands[i].burnableSet);
            _setMintable(mintableSet[_gameID][islandID], _islands[i].mintableSet);

            emit GameSet(_gameID, islandID);
            unchecked {++i;} 
        }
    }
    function _assertValidTreasury(address _contract) internal {
        if (_contract == address(0)) {
            revert InvalidTreasury(_contract);
        }
    }
    function _assertValidGameID(address _gameID) internal {
        if (_gameID == address(0)) {
            revert InvalidGameID(_gameID);
        }
    }
}