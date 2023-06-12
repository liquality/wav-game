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
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    uint256 public feePerMint; // In wei
    uint256 constant internal ENTRY_LEVEL = 1; 
    IWavNFT public wavNFT; 

    uint256[] gameIDs;
    mapping(uint256 => uint256) availablePayments;
    mapping(uint256 => Game) internal wavGames;
    mapping(uint256 => mapping(uint256 => EnumerableSetUpgradeable.AddressSet)) collectors;// Collectors per islands per game

    
    event LeveledUp(uint256 indexed gameID, address indexed collector, uint256 indexed newIslandID, uint256 totalMinted);
    event Collected(uint256 indexed gameID, address indexed to, uint256 indexed amountSent, uint256 totalMinted);
    event TreasurySet(uint256 indexed gameID, address payable indexed  treasury);
    event SpecialMint(uint256 indexed gameID, address indexed collector, uint256 indexed id, uint256 amount);
    event IslandUpdated(uint256 indexed gameID, uint256 indexed islandID);
    event PaymentForwarded(uint256 indexed gameID, address indexed to, uint256 indexed amount);
    event GameSet(uint256 indexed gameID, uint256 indexed islandID);
    event FeeSet(uint256 indexed oldFee, uint256 indexed newFee);
    event WavNFTSet(address old, address wavNFT);

    error InsufficientPayment(uint256 requiredAmt, uint256 ammountSent); 
    error InvalidTreasury(address treasury);
    error InvalidGameID(uint256 gameID);
    error InvalidNextLevel();
    error ParametersMisMatch();
    error PaymentRequired();
    error IslandNotFound();
    error WavNftNotSet();
    error AmountCannotBeZero();
    error RequiredBurnNotMet(uint8 requiredBurn);

    modifier onlyValidIsland(uint256 _gameID, uint256 _islandID) {
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
    /// @param _gameID Game ID to collect in
    /// @param _recipient The recipient of the minted level 1 (First game island) NFT
    /// @param _amount nft quantity to mint
    /// @dev This function allows a 
    function collect(uint256 _gameID, address _recipient, uint256 _amount) external virtual payable  whenNotPaused nonReentrant onlyValidIsland(_gameID, ENTRY_LEVEL) {
        if (_amount == 0) {
            revert AmountCannotBeZero();
        }
        uint totalPayable = _amount * feePerMint;
        IWavGame.Island memory island = wavGames[_gameID].islands[Helper.getIslandIndex(ENTRY_LEVEL)];
        
        if (totalPayable > msg.value) { 
            revert InsufficientPayment(totalPayable,msg.value);
        }

        wavNFT.mint(_recipient, island.mintable, _amount, bytes(" "));
        
        availablePayments[_gameID] += msg.value;
        _syncMint(_gameID, ENTRY_LEVEL, _recipient, _amount);

        emit Collected(_gameID, _recipient, msg.value, _amount);
    }

    function levelUp(uint256 _gameID, uint256 _newIslandID) external override  whenNotPaused nonReentrant onlyValidIsland(_gameID, _newIslandID) {
        IWavGame.Island memory newIsland = wavGames[_gameID].islands[Helper.getIslandIndex(_newIslandID)];
        if(_newIslandID <= ENTRY_LEVEL) {
            revert InvalidNextLevel();
        }
        if (wavNFT.balanceOf(_msgSender(), newIsland.burnable) < newIsland.requiredBurn) {
            revert RequiredBurnNotMet(newIsland.requiredBurn);
        }
        wavNFT.burn(_msgSender(), newIsland.burnable, newIsland.requiredBurn);
        wavNFT.mint(_msgSender(), newIsland.mintable, newIsland.requiredMint, bytes(" "));
   
        wavGames[_gameID].islands[Helper.getIslandIndex(_newIslandID-1)].burnCount += newIsland.requiredBurn; // Increase burnCount of old/prev island
        _syncMint(_gameID, _newIslandID, _msgSender(), newIsland.requiredMint);

        emit LeveledUp(_gameID, _msgSender(), _newIslandID, newIsland.requiredMint);
    }
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IWavGame).interfaceId || interfaceId == type(IERC2771Recipient).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    //Returns true if msg.sender qualifies for special prize on artist collection
    function isEarlyBirdCollector(uint256 _gameID, uint256 _islandID) public view returns (bool) {
        return collectors[_gameID][_islandID].contains(msg.sender);
    } 
    function fetchEarlyBirdCollectors(uint256 _gameID, uint256 _islandID) public view returns (address[] memory) {
        return collectors[_gameID][_islandID].values();
    }
    // Get all islands and treasury of a given gameID
    function fetchGame(uint256 _gameID) public view returns (IWavGame.Island[] memory, address) {
        return (wavGames[_gameID].islands, wavGames[_gameID].treasury);
   
    }
    function getBalance(uint256 _gameID) public view returns (uint256){
        return availablePayments[_gameID];
    }
    // Get island info for given gameID, and islandID
    function getIsland(uint256 _gameID, uint256 _islandID) public view returns (IWavGame.Island memory) {
        return wavGames[_gameID].islands[Helper.getIslandIndex(_islandID)];
   
    }
    // Get treasury contract for given game
    function getTreasury(uint256 _gameID) public view returns (address) {
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
    function wavMint(uint256 _gameID, uint256 _islandID, address _recipient, uint256  _amount) external  onlyOwner onlyValidIsland(_gameID, _islandID) {

        IWavGame.Island memory island = wavGames[_gameID].islands[Helper.getIslandIndex(_islandID)];

        wavNFT.mint(_recipient, island.mintable, _amount, " ");
        _syncMint(_gameID, _islandID, _recipient, _amount);

        emit SpecialMint(_gameID, _recipient, island.mintable, _amount);
    }
    function batchMint(address _recipient, uint[] memory _ids, uint[] memory _amount) external  onlyOwner {
        wavNFT.mintBatch(_recipient, _ids, _amount, " ");
    } 
    function forwardValue() external nonReentrant {
        uint256 gamesLength = gameIDs.length;
        for (uint256 i = 0; i < gamesLength;) {
            uint256 gameId = gameIDs[i];
            uint256 pendingPayment = availablePayments[gameId];
            address payable treasury = wavGames[gameId].treasury;
            _assertValidTreasury(treasury);
            ( bool success, ) = treasury.call{value: pendingPayment}("");

            if(success) availablePayments[gameId] = 0;

            emit PaymentForwarded(gameId, treasury, pendingPayment);
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
    function setWavNFT(IWavNFT _wavNft) public onlyOwner {
        IWavNFT old = wavNFT;
        wavNFT = _wavNft;
        emit WavNFTSet(address(old), address(wavNFT));
    }
    // This creates a game if not exist, then populates the islands, or updates the game by adding new islands.
    //This function always adds a new island to the specified game, only call this function when adding new islands to an given game
    function setGame(uint256 _gameID, IWavGame.IslandParam[] calldata _islands) external onlyOwner {
        _assertValidGameID(_gameID);
        if (wavGames[_gameID].islands.length == 0) {
            gameIDs.push(_gameID);
        }
        _setGame(_gameID, _islands);
    }
    function setTreasuries(uint256[] calldata _gameIDs, address payable[] calldata _treasuries) external onlyOwner {
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
    function updateIsland(uint256 _gameID, uint256 _islandID, IWavGame.IslandParam calldata _islandParam) external onlyOwner onlyValidIsland(_gameID,_islandID) {
        uint256 islandIndex = Helper.getIslandIndex(_islandID); 
        if (_islandParam.requiredBurn > 0) {
            wavGames[_gameID].islands[islandIndex].requiredBurn = _islandParam.requiredBurn;
        }
        if (_islandParam.requiredMint > 0) {
            wavGames[_gameID].islands[islandIndex].requiredMint = _islandParam.requiredMint;
        }
        if (_islandParam.mintable > 0) {
            wavGames[_gameID].islands[islandIndex].mintable = _islandParam.mintable;
        }
        if (_islandParam.burnable > 0) {
            wavGames[_gameID].islands[islandIndex].burnable = _islandParam.burnable;
        }
        if (_islandParam.earlyBirdCutOff > 0) {
            wavGames[_gameID].islands[islandIndex].earlyBirdCutOff = _islandParam.earlyBirdCutOff;
        }
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

    function _syncMint(uint256 _gameID, uint256 _islandID, address _recipient, uint256 _mintCount) internal {
        uint256 islandIndex = Helper.getIslandIndex(_islandID);
        Island memory island = wavGames[_gameID].islands[islandIndex];
        wavGames[_gameID].islands[islandIndex].mintCount += _mintCount;
        if (collectors[_gameID][_islandID].length() < island.earlyBirdCutOff && !collectors[_gameID][_islandID].contains(_recipient)){
            collectors[_gameID][_islandID].add(_recipient);
        }
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (address sender) {
        return ERC2771Recipient._msgSender();
    }
    function _msgData() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }
    function _setGame(uint256 _gameID, IWavGame.IslandParam[] memory _islands) internal {
        for (uint256 i; i < _islands.length;) {
            wavGames[_gameID].islands.push(IWavGame.Island(
                _islands[i].requiredBurn,
                _islands[i].requiredMint,
                _islands[i].earlyBirdCutOff,
                _islands[i].mintable,
                _islands[i].burnable,
                0,
                0
            ));
            uint256 islandID = wavGames[_gameID].islands.length;

            emit GameSet(_gameID, islandID);
            unchecked {++i;} 
        }
    }
    function _assertValidTreasury(address _contract) pure internal {
        if (_contract == address(0)) {
            revert InvalidTreasury(_contract);
        }
    }
    function _assertValidGameID(uint256 _gameID) pure internal {
        if (_gameID == 0) {
            revert InvalidGameID(_gameID);
        }
    }
}