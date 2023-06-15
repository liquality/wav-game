//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {ERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import {EnumerableSetUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import {ERC2771Recipient} from "@opengsn/contracts/src/ERC2771Recipient.sol";
import {IERC2771Recipient} from "@opengsn/contracts/src/interfaces/IERC2771Recipient.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "./interfaces/IWavGame.sol";
import "./interfaces/IWavNFT.sol";
import "./libraries/Helper.sol";

contract WavGame is Initializable, PausableUpgradeable, OwnableUpgradeable, IWavGame, ERC2771Recipient, ReentrancyGuardUpgradeable, ERC165Upgradeable {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    uint256 public feePerMint; // In wei
    uint256 constant internal ENTRY_LEVEL = 1; 
    IWavNFT public wavNFT; 

    uint256[] artistIDs;
    mapping(uint256 => uint256) availablePayments;
    mapping(uint256 => ArtistGame) internal wavGames;
    mapping(uint256 => mapping(uint256 => EnumerableSetUpgradeable.AddressSet)) collectors;// Collectors per levels per game

    
    event LeveledUp(uint256 indexed artistID, address indexed collector, uint256 indexed newLevelID, uint256 totalMinted);
    event Collected(uint256 indexed artistID, address indexed to, uint256 indexed amountSent, uint256 totalMinted);
    event TreasurySet(uint256 indexed artistID, address payable indexed  treasury);
    event SpecialMint(uint256 indexed artistID, address indexed collector, uint256 indexed id, uint256 amount);
    event LevelUpdated(uint256 indexed artistID, uint256 indexed levelID);
    event PaymentForwarded(uint256 indexed artistID, address indexed to, uint256 indexed amount);
    event ArtistGameSet(uint256 indexed artistID, uint256 indexed levelID);
    event FeeSet(uint256 indexed oldFee, uint256 indexed newFee);
    event WavNFTSet(address old, address wavNFT);

    error InsufficientPayment(uint256 requiredAmt, uint256 ammountSent); 
    error InvalidTreasury(address treasury);
    error InvalidArtistID(uint256 artistID);
    error InvalidNextLevel();
    error ParametersMisMatch();
    error PaymentRequired();
    error LevelNotFound();
    error WavNftNotSet();
    error AmountCannotBeZero();
    error RequiredBurnNotMet(uint8 requiredBurn);

    modifier onlyValidLevel(uint256 _artistID, uint256 _levelID) {
        if(Helper.getLevelIndex(_levelID) >= wavGames[_artistID].levels.length){
            revert LevelNotFound();
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

    /// @notice This function mints level 1 (First artist game level) NFTs to the _recipient
    /// @param _artistID Artist ID to collect in
    /// @param _recipient The recipient of the minted level 1 (First artist game level) NFT
    /// @param _amount nft quantity to mint
    /// @dev This function allows a 
    function collect(uint256 _artistID, address _recipient, uint256 _amount) external virtual payable  whenNotPaused nonReentrant onlyValidLevel(_artistID, ENTRY_LEVEL) {
        if (_amount == 0) {
            revert AmountCannotBeZero();
        }
        uint totalPayable = _amount * feePerMint;
        IWavGame.Level memory level = wavGames[_artistID].levels[Helper.getLevelIndex(ENTRY_LEVEL)];
        
        if (totalPayable > msg.value) { 
            revert InsufficientPayment(totalPayable,msg.value);
        }

        wavNFT.mint(_recipient, level.mintID, _amount, bytes(" "));

        availablePayments[_artistID] += msg.value;
        _syncMint(_artistID, ENTRY_LEVEL, _recipient, _amount);

        emit Collected(_artistID, _recipient, msg.value, _amount);
    }

    function levelUp(uint256 _artistID, uint256 _newLevelID) external override  whenNotPaused nonReentrant onlyValidLevel(_artistID, _newLevelID) {
        if(_newLevelID <= ENTRY_LEVEL) {
            revert InvalidNextLevel();
        }
        IWavGame.Level memory newLevel = wavGames[_artistID].levels[Helper.getLevelIndex(_newLevelID)];
        if (wavNFT.balanceOf(_msgSender(), newLevel.burnID) < newLevel.requiredBurn) {
            revert RequiredBurnNotMet(newLevel.requiredBurn);
        }
        wavNFT.burn(_msgSender(), newLevel.burnID, newLevel.requiredBurn);
        wavNFT.mint(_msgSender(), newLevel.mintID, newLevel.requiredMint, bytes(" "));
   
        wavGames[_artistID].levels[Helper.getLevelIndex(_newLevelID-1)].burnCount += newLevel.requiredBurn; // Increase burnCount of old/prev Level
        _syncMint(_artistID, _newLevelID, _msgSender(), newLevel.requiredMint);

        emit LeveledUp(_artistID, _msgSender(), _newLevelID, newLevel.requiredMint);
    }
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IERC2771Recipient).interfaceId || 
        super.supportsInterface(interfaceId);
    }

    //Returns true if msg.sender qualifies for special prize on artist collection
    function isEarlyBirdCollector(uint256 _artistID, uint256 _levelID) public view returns (bool) {
        return collectors[_artistID][_levelID].contains(msg.sender);
    } 
    function fetchEarlyBirdCollectors(uint256 _artistID, uint256 _levelID) public view returns (address[] memory) {
        return collectors[_artistID][_levelID].values();
    }
    // Get all levels and treasury of a given artistID
    function fetchGame(uint256 _artistID) public view returns (IWavGame.Level[] memory, address) {
        return (wavGames[_artistID].levels, wavGames[_artistID].treasury);
   
    }
    function getBalance(uint256 _artistID) public view returns (uint256){
        return availablePayments[_artistID];
    }
    // Get level info for given artistID, and levelID
    function getLevel(uint256 _artistID, uint256 _levelID) public view returns (IWavGame.Level memory) {
        return wavGames[_artistID].levels[Helper.getLevelIndex(_levelID)];
   
    }
    // Get treasury contract for given artist game
    function getTreasury(uint256 _artistID) public view returns (address) {
        return wavGames[_artistID].treasury;
    }
    function getFeePerMint() public view returns (uint256) {
        return feePerMint;
    }

    //============================= WavGames Administration ============================
    // No checks are done for mint and batchMints, these are admin functions for minting non-game related NFTs, minting 
    //a game-specific NFT through this functions may distrupt calculations on the game
    // Use special mint instead.
    function mint(address _recipient, uint _id, uint _amount) external  onlyOwner {
        wavNFT.mint(_recipient, _id, _amount, " ");
    }
    function wavMint(uint256 _artistID, uint256 _levelID, address _recipient, uint256  _amount) external  onlyOwner onlyValidLevel(_artistID, _levelID) {

        IWavGame.Level memory level = wavGames[_artistID].levels[Helper.getLevelIndex(_levelID)];

        wavNFT.mint(_recipient, level.mintID, _amount, " ");
        _syncMint(_artistID, _levelID, _recipient, _amount);

        emit SpecialMint(_artistID, _recipient, level.mintID, _amount);
    }
    function batchMint(address _recipient, uint[] memory _ids, uint[] memory _amount) external  onlyOwner {
        wavNFT.mintBatch(_recipient, _ids, _amount, " ");
    } 
    function forwardValue() external nonReentrant {
        uint256 artistLength = artistIDs.length;
        for (uint256 i = 0; i < artistLength;) {
            uint256 artistID = artistIDs[i];
            uint256 pendingPayment = availablePayments[artistID];
            address payable treasury = wavGames[artistID].treasury;
            _assertValidTreasury(treasury);
            availablePayments[artistID] = 0;
            ( bool success, ) = treasury.call{value: pendingPayment}("");

            if(success) {
                emit PaymentForwarded(artistID, treasury, pendingPayment);
            }
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
    // This creates an artist game if not exist, then populates the levels, or updates the artist game by adding new levels.
    //This function always adds a new level to the specified artist game, only call this function when adding new levels to a given artist game
    function setArtistGame(uint256 _artistID, IWavGame.LevelParam[] calldata _levels) external onlyOwner {
        _assertValidArtistID(_artistID);
        if (wavGames[_artistID].levels.length == 0) {
            artistIDs.push(_artistID);
        }
        _setArtistGame(_artistID, _levels);
    }

    function setTreasuries(uint256[] calldata _artistIDs, address payable[] calldata _treasuries) external onlyOwner {
        if (_artistIDs.length != _treasuries.length) {
            revert ParametersMisMatch();
        }
        for (uint256 i; i < _artistIDs.length;) {
            // _assertValidTreasury(_treasuries[i]);
            wavGames[_artistIDs[i]].treasury = _treasuries[i];
            emit TreasurySet(_artistIDs[i], _treasuries[i]);
            unchecked {++i;} 
        }
    }
    function updateLevel(uint256 _artistID, uint256 _levelID, IWavGame.LevelParam calldata _levelParam) external onlyOwner onlyValidLevel(_artistID,_levelID) {
        uint256 levelIndex = Helper.getLevelIndex(_levelID); 
        if (_levelParam.requiredBurn > 0) {
            wavGames[_artistID].levels[levelIndex].requiredBurn = _levelParam.requiredBurn;
        }
        if (_levelParam.requiredMint > 0) {
            wavGames[_artistID].levels[levelIndex].requiredMint = _levelParam.requiredMint;
        }
        if (_levelParam.mintID > 0) {
            wavGames[_artistID].levels[levelIndex].mintID = _levelParam.mintID;
        }
        if (_levelParam.burnID > 0) {
            wavGames[_artistID].levels[levelIndex].burnID = _levelParam.burnID;
        }
        if (_levelParam.earlyBirdCutOff > 0) {
            wavGames[_artistID].levels[levelIndex].earlyBirdCutOff = _levelParam.earlyBirdCutOff;
        }
        emit LevelUpdated(_artistID, _levelID);
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

    function _syncMint(uint256 _artistID, uint256 _levelID, address _recipient, uint256 _mintCount) internal {
        uint256 levelIndex = Helper.getLevelIndex(_levelID);
        Level memory level = wavGames[_artistID].levels[levelIndex];
        wavGames[_artistID].levels[levelIndex].mintCount += _mintCount;
        if (collectors[_artistID][_levelID].length() < level.earlyBirdCutOff && !collectors[_artistID][_levelID].contains(_recipient)){
            collectors[_artistID][_levelID].add(_recipient);
        }
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (address sender) {
        return ERC2771Recipient._msgSender();
    }
    function _msgData() internal view virtual override(ContextUpgradeable, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }
    function _setArtistGame(uint256 _artistID, IWavGame.LevelParam[] memory _levels) internal {
        for (uint256 i; i < _levels.length;) {
            wavGames[_artistID].levels.push(IWavGame.Level(
                _levels[i].requiredBurn,
                _levels[i].requiredMint,
                _levels[i].earlyBirdCutOff,
                _levels[i].mintID,
                _levels[i].burnID,
                0,
                0
            ));
            uint256 levelID = wavGames[_artistID].levels.length;

            emit ArtistGameSet(_artistID, levelID);
            unchecked {++i;} 
        }
    }
    function _assertValidTreasury(address _contract) pure internal {
        if (_contract == address(0)) {
            revert InvalidTreasury(_contract);
        }
    }
    function _assertValidArtistID(uint256 _artistID) pure internal {
        if (_artistID == 0) {
            revert InvalidArtistID(_artistID);
        }
    }
}