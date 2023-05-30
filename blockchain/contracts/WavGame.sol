//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@opengsn/contracts/src/interfaces/IERC2771Recipient.sol";
import "./interfaces/IWavGame.sol";
import "./interfaces/IWavNFT.sol";
import "./libraries/Helper.sol";

contract WavGame is Initializable, PausableUpgradeable, OwnableUpgradeable, IWavGame, ERC2771Recipient, ReentrancyGuardUpgradeable, ERC165Upgradeable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    uint256 public feePerMint; // In wei
    uint256 constant internal ENTRY_LEVEL = 1; 
    IWavNFT public wavNFT; 
    // address payable public revenueContract; // Platform revenue spliting contract

    address[] gameIDs; // Refers to the artists
    mapping(address => uint256) availablePayments;
    mapping(address => Game) internal wavGames;
    mapping(address => mapping(uint256 => EnumerableSetUpgradeable.AddressSet)) collectors;// Collectors per islands per game
    mapping(address => mapping(uint256 => EnumerableSetUpgradeable.UintSet)) burnableSet;// Burnable NFT sets per islands per game
    mapping(address => mapping(uint256 => EnumerableSetUpgradeable.UintSet)) mintableSet;// Mintable NFT sets per islands per game

    
    event LeveledUp(address indexed caller, address indexed collector, uint256 indexed nextIslandID, uint256 totalMinted);
    event Collected(address indexed caller, address indexed to, uint256 indexed amountSent, uint256 totalMinted);
    event TreasurySet(address indexed gameID, address payable indexed  treasury);
    event SpecialMint(address indexed collector, uint256 indexed id, uint256 indexed amount);
    event IslandUpdated(address indexed gameID, uint256 indexed islandID);
    event PaymentForwarded(address indexed to, uint256 indexed amount);
    event GameSet(address indexed gameID, uint256 indexed islandID);
    event FeeSet(uint256 indexed oldFee, uint256 indexed newFee);

    error InsufficientPayment(uint256 requiredAmt, uint256 ammountSent);   
    error NFTNotInMintableSet(uint256 invalidNFT, uint256 islandID);
    error InvalidTreasury(address treasury);
    error RequiredBurnNotMet(uint8 requiredBurn);
    error InvalidGameID(address gameID);
    error InvalidNextLevel();
    error ParametersMisMatch();
    error PaymentRequired();
    error IslandNotFound();
    error WavNftNotSet();
    error BurnBatchFailed();

    modifier onlyValidIsland(address _gameID, uint256 _islandID) {
        if(Helper.getIslandIndex(_islandID) >= wavGames[_gameID].islands.length){
            revert IslandNotFound();
        }
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(IWavNFT _wavNFT, address _trustedForwarder,uint256 _feePerMint) initializer public {
        __Pausable_init();
        __Ownable_init();

        wavNFT = _wavNFT;
        feePerMint = _feePerMint;
        _setTrustedForwarder(_trustedForwarder);
    }

    /// @notice This function mints level 1 (First game island) NFTs to the _recipient
    /// @param _recipient The recipient of the minted level 1 (First game island) NFT
    /// @param _mintableNFTs nft ids to mint
    /// @param _mintableAmountPerNFTs nft quantities to mint
    /// @dev This function 
    function collect(address _gameID, address _recipient, uint[] calldata _mintableNFTs, uint[] calldata _mintableAmountPerNFTs) external override payable  whenNotPaused nonReentrant onlyValidIsland(_gameID, ENTRY_LEVEL) {
        if (_mintableNFTs.length != _mintableAmountPerNFTs.length) {
            revert ParametersMisMatch();
        }

        uint totalPayable = 0;
        uint totalMinted = 0;

        for (uint i; i < _mintableNFTs.length;) { 
            if (!mintableSet[_gameID][ENTRY_LEVEL].contains(_mintableNFTs[i])){
                revert NFTNotInMintableSet(_mintableNFTs[i], ENTRY_LEVEL);
            }
            totalMinted +=_mintableAmountPerNFTs[i];
            totalPayable += _mintableAmountPerNFTs[i] * feePerMint;
            unchecked {++i;}
        }
        
        if (totalPayable > msg.value) { 
            revert InsufficientPayment(totalPayable,msg.value);
        }

        wavNFT.mintBatch(_recipient, _mintableNFTs, _mintableAmountPerNFTs, bytes(" "));
        availablePayments[_gameID] += msg.value;
        _syncMint(_gameID, ENTRY_LEVEL, _recipient, totalMinted);

        emit Collected(_msgSender(), _recipient, msg.value, totalMinted);
    }

    function levelUp(address _gameID, uint256 _islandID, uint[] calldata _burnableNFTs, uint[] calldata _burnableAmountPerNFTs) external override  whenNotPaused nonReentrant onlyValidIsland(_gameID, _islandID) {
        if (_burnableNFTs.length != _burnableAmountPerNFTs.length) {
            revert ParametersMisMatch();
        }
        if(_islandID <= ENTRY_LEVEL) {
            revert InvalidNextLevel();
        }
        IWavGame.Island memory nextIsland = wavGames[_gameID].islands[Helper.getIslandIndex(_islandID)];

        uint totalBurnAmount;

        for (uint256 i = 0; i < _burnableNFTs.length;) { 
            if (burnableSet[_gameID][_islandID].contains(_burnableNFTs[i])) {
                totalBurnAmount += _burnableAmountPerNFTs[i];
            }
            unchecked {++i;} 
        }

        if(totalBurnAmount != nextIsland.requiredBurn){
            revert RequiredBurnNotMet(nextIsland.requiredBurn);
        }
        
        // Burn Collectors NFTs... create EIP2771 calldata by appending _msgSender()
        bytes memory burnBatchCallData = abi.encodePacked(abi.encodeWithSelector(IWavNFT.burnBatch.selector, _burnableNFTs, _burnableAmountPerNFTs),abi.encodePacked(_msgSender()));
        (bool success, ) = address(wavNFT).call(burnBatchCallData);

        if(!success) revert BurnBatchFailed();

        EnumerableSetUpgradeable.UintSet storage _mintableSet = mintableSet[_gameID][_islandID];
        wavNFT.mint(_msgSender(), _mintableSet.values()[0], nextIsland.requiredMint, bytes(" "));
   
        wavGames[_gameID].islands[Helper.getIslandIndex(_islandID-1)].burnCount += totalBurnAmount; // Increase burnCount of old/prev island
        _syncMint(_gameID, _islandID, _msgSender(), nextIsland.requiredMint);

        emit LeveledUp(msg.sender, _msgSender(), _islandID, nextIsland.requiredMint);
    }
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IWavGame).interfaceId || interfaceId == type(IERC2771Recipient).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    //Returns true if msg.sender qualifies for special prize on artist collection
    function isEarlyBirdCollector(address _gameID, uint256 _islandID) public view returns (bool) {
        return collectors[_gameID][_islandID].contains(msg.sender);
    } 
    function fetchEarlyBirdCollectors(address _gameID, uint256 _islandID) public view returns (address[] memory) {
        return collectors[_gameID][_islandID].values();
    }
    // Get all islands and treasury of a given gameID
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
    function mint(address _recipient, uint _id, uint _amount) external  onlyOwner {
        wavNFT.mint(_recipient, _id, _amount, " ");
    }
    function wavMint(address _recipient, address _gameID, uint256 _islandID, uint256 _id, uint256 _amount) external  onlyOwner onlyValidIsland(_gameID, _islandID) {

        if (!mintableSet[_gameID][_islandID].contains(_id)){
            revert NFTNotInMintableSet(_id, _islandID);
        }

        wavNFT.mint(_recipient, _id, _amount, " ");
        _syncMint(_gameID, _islandID, _recipient, _amount);

        emit SpecialMint(_recipient, _id, _amount);
    }
    function batchMint(address _recipient, uint[] memory _ids, uint[] memory _amount) external  onlyOwner {
        wavNFT.mintBatch(_recipient, _ids, _amount, " ");
    } 
    function forwardValue() external onlyOwner nonReentrant {
        uint256 gamesLength = gameIDs.length;
        for (uint256 i = 0; i < gamesLength;) {
            address gameId = gameIDs[i];
            uint256 pendingPayment = availablePayments[gameId];
            address payable treasury = wavGames[gameId].treasury;
            _assertValidTreasury(treasury);
            ( bool success, ) = treasury.call{value: pendingPayment}("");

            if(success) availablePayments[gameId] = 0;

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
        if (wavGames[_gameID].islands.length == 0) {
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
        if (_islandParam.earlyBirdCutOff > 0) {
            wavGames[_gameID].islands[islandIndex].earlyBirdCutOff = _islandParam.earlyBirdCutOff;
        }
        _setBurnable(_gameID, _islandID, burnableSet[_gameID][_islandID], _islandParam.burnableSet);
        _setMintable(mintableSet[_gameID][_islandID], _islandParam.mintableSet);
        emit IslandUpdated(_gameID, _islandID);
    }

    function transferWavNftOwnership(address newOwner) external  onlyOwner {
        wavNFT.transferOwnership(newOwner);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _syncMint(address _gameID, uint256 _islandID, address _recipient, uint256 _mintCount) internal {
        uint256 islandIndex = Helper.getIslandIndex(_islandID);
        Island memory island = wavGames[_gameID].islands[islandIndex];
        wavGames[_gameID].islands[islandIndex].mintCount += _mintCount;
        if (collectors[_gameID][_islandID].length() < island.earlyBirdCutOff && !collectors[_gameID][_islandID].contains(_recipient)){
            collectors[_gameID][_islandID].add(_recipient);
        }
    }

    function _setBurnable(address _gameID, uint256 _islandID, EnumerableSetUpgradeable.UintSet storage oldBurnableSet, IWavGame.SetParam[] memory newBurnableSet) internal  {
        for (uint256 i; i < newBurnableSet.length;) {
            if (newBurnableSet[i].status) {
                // NFT for burn must be mintable from prevLevel, to ensure levelup 
                //is only possible from a level lower to the next immediate level 
                if (_islandID != ENTRY_LEVEL && mintableSet[_gameID][_islandID - 1].contains(newBurnableSet[i].id)) {
                    oldBurnableSet.add(newBurnableSet[i].id);
                }
            } else {
                oldBurnableSet.remove(newBurnableSet[i].id);
            }
            unchecked {++i;} 
        }
    }
    function _setMintable(EnumerableSetUpgradeable.UintSet storage oldMintableSet, IWavGame.SetParam[] memory newMintableSet) internal  {
        for (uint256 i; i < newMintableSet.length;) {
            if (newMintableSet[i].status) {
                oldMintableSet.add(newMintableSet[i].id);
            } else {
                oldMintableSet.remove(newMintableSet[i].id);
            }
            unchecked {++i;} 
        }
    }	

    function _msgSender() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (address sender) {
        return ERC2771Recipient._msgSender();
    }
    function _msgData() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }
    function _setGame(address _gameID, IWavGame.IslandParam[] memory _islands) internal {
        for (uint256 i; i < _islands.length;) {
            wavGames[_gameID].islands.push(IWavGame.Island(
                _islands[i].requiredBurn,
                _islands[i].requiredMint,
                _islands[i].earlyBirdCutOff,
                0,
                0
            ));
            uint256 islandID = wavGames[_gameID].islands.length;
            _setBurnable(_gameID, islandID, burnableSet[_gameID][islandID], _islands[i].burnableSet);
            _setMintable(mintableSet[_gameID][islandID], _islands[i].mintableSet);

            emit GameSet(_gameID, islandID);
            unchecked {++i;} 
        }
    }
    function _assertValidTreasury(address _contract) pure internal {
        if (_contract == address(0)) {
            revert InvalidTreasury(_contract);
        }
    }
    function _assertValidGameID(address _gameID) pure internal {
        if (_gameID == address(0)) {
            revert InvalidGameID(_gameID);
        }
    }
}