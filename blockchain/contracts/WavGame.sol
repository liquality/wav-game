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


contract WavGame is IWavGame, Ownable, ERC2771Recipient, ReentrancyGuard, ERC165 {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public entryFee; // In wei
    uint256 constant internal ENTRY_LEVEL = 1; 
    IWavNFT public wavNFT; 
    address payable public revenueContract; // Platform revenue spliting contract

    mapping(address => IWavGame.Level[]) internal wavGames; // Levels are 0-indexed. i.e level 1 = 0 in level
    mapping(address => mapping(uint256 => EnumerableSet.AddressSet)) collectors;// Collectors per level per owner game
    mapping(address => mapping(uint256 => EnumerableSet.UintSet)) burnableSet;// Burnable NFT sets per level per owner game
    mapping(address => mapping(uint256 => EnumerableSet.UintSet)) mintableSet;// Mintable NFT sets per level per owner game

    
    event Collected(address caller, address to, uint256 amountSent, uint256 totalMinted);
    event LeveledUp(address caller, address collector, uint256 nextLevel, uint256 totalMinted);
    event SpecialMint(address collector, uint256 id, uint256 amount);
    event PaymentForwarded(address to, uint256 amount);
    event GameSet(address owner, uint256 level);
    event LevelSet(address owner, uint256 level);

    error InsufficientPayment(uint256 requiredAmt, uint256 ammountSent);   
    error NFTNotInMintableSet(uint256 invalidNFT, uint256 level);
    error RequiredBurnNotMet(uint8 requiredBurn);
    error FundsReleaseFailed();
    error PaymentRequired();
    error LevelNotFound();

	// Create all initial artists
	// create and map the 6 artist level / island to each artist, and define the Levels specific details per artist
    constructor(IWavNFT _wavNFT, address _trustedForwarder,uint256 _entryFee, address payable _revenueContract) {
        wavNFT = _wavNFT;
        entryFee = _entryFee;
        revenueContract = _revenueContract;
        _setTrustedForwarder(_trustedForwarder);
    }

    /// @notice This function mints level 1 NFTs to the recipient
    /// @param _recipient The recipient of the minted NFT
    /// @param _input ids and their corresponding quantities to mint
    /// @dev This function does not support gasless, has to be called directly by user, since it requires payment in ETH and refund is possible
    function collect(address _gameOwner, address _recipient, NFTParam[] calldata _input) external override payable nonReentrant {
        if(msg.value <= 0){
            revert PaymentRequired();
        }
        if(Helper.getLevelIndex(ENTRY_LEVEL) >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }

        uint totalPayable = 0;
        uint totalMinted = 0;
        uint[] memory mintableNFTs = new uint[](_input.length); 
        uint[] memory mintableAmountPerNFTs = new uint[](_input.length);
        EnumerableSet.UintSet storage mintables = mintableSet[_gameOwner][ENTRY_LEVEL];

        // Create mintable IDs and valid quantity based on mintable set for base and msg.value
        for (uint i; i < _input.length;) { 
            if (!mintables.contains(_input[i].id)){
                revert NFTNotInMintableSet(_input[i].id, ENTRY_LEVEL);
            }
            mintableNFTs[i] = _input[i].id;
            mintableAmountPerNFTs[i] = _input[i].amount;
            totalMinted +=_input[i].amount;
            totalPayable += _input[i].amount * entryFee;
            unchecked {++i;}
        }
        
        if (totalPayable > msg.value) { 
            revert InsufficientPayment(totalPayable,msg.value);
        }
        wavNFT.mintBatch(_recipient, mintableNFTs, mintableAmountPerNFTs, bytes(" "));
        _syncMint(_gameOwner, ENTRY_LEVEL, _recipient, totalMinted);

        emit Collected(_msgSender(), _recipient, msg.value, totalMinted);
    }
    function levelUp(address _gameOwner, uint256 _nextLevel, NFTParam[] memory _input) external override nonReentrant {
        uint256 nextLevelIndex = Helper.getLevelIndex(_nextLevel);
        if(_nextLevel <= ENTRY_LEVEL || nextLevelIndex >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        IWavGame.Level memory nextLevel = wavGames[_gameOwner][nextLevelIndex]; // 0-indexed array / 1-indexed levels

        uint[] memory burnableNFTs = new uint[](_input.length);
        uint[] memory burnableAmountPerNFTs = new uint[](_input.length);
        EnumerableSet.UintSet storage burnables = burnableSet[_gameOwner][_nextLevel];
        uint totalBurnAmount;

        for (uint256 i = 0; i < _input.length;) { 
            if (burnables.contains(_input[i].id)) {
                burnableNFTs[i] = _input[i].id;
                burnableAmountPerNFTs[i] = _input[i].amount;
                totalBurnAmount += _input[i].amount;
            }
            unchecked {++i;} 
        }

        if(totalBurnAmount != nextLevel.requiredBurn){
            revert RequiredBurnNotMet(nextLevel.requiredBurn);
        }
        wavNFT.burnBatch(_msgSender(), burnableNFTs, burnableAmountPerNFTs);
        wavGames[_gameOwner][nextLevelIndex].burnCount += totalBurnAmount;

        wavNFT.mint(_msgSender(), mintableSet[_gameOwner][_nextLevel].values()[0], nextLevel.requiredMint, bytes(" "));
        _syncMint(_gameOwner, _nextLevel, _msgSender(), nextLevel.requiredMint);

        emit LeveledUp(msg.sender, _msgSender(), _nextLevel, nextLevel.requiredMint);
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IWavGame).interfaceId || interfaceId == type(IERC2771Recipient).interfaceId ||
        super.supportsInterface(interfaceId);
    }
    //Returns true if msg.sender qualifies for special prize on artist collection
    function isPrizedCollector(address _gameOwner, uint256 _level) public view returns (bool) {
        return collectors[_gameOwner][_level].contains(msg.sender);
    } 
    function fetchPrizedCollectors(address _gameOwner, uint256 _level) public view returns (address[] memory) {
        return collectors[_gameOwner][_level].values();
    }
    // Get level by artist by id
    function fetchGame(address _gameOwner) public view returns (IWavGame.Level[] memory) {
        return wavGames[_gameOwner];
   
    }
    // Get level by artist by id
    function getGameLevel(address _gameOwner, uint256 _level) public view returns (IWavGame.Level memory, uint[] memory, uint[] memory) {
        return (wavGames[_gameOwner][Helper.getLevelIndex(_level)], burnableSet[_gameOwner][_level].values(), mintableSet[_gameOwner][_level].values());
   
    }
    // Get level by artist by id
    function getPaymentAddress() public view returns (address) {
        return revenueContract;
    }
    // Get level by artist by id
    function getFeePerMint() public view returns (uint256) {
        return entryFee;
    }

    
    //============================= Game Administration ============================
    // No checks are done for mint and batchMints, these are admin functions for minting non-game related NFTs, minting 
    //a game-specific NFT through this functions may distrupt calculations on the game
    // Use special mint instead.
    function mint(address _recipient, uint _id, uint _amount) external onlyOwner {
        wavNFT.mint(_recipient, _id, _amount, " ");
    }
    function wavMint(address _recipient, address _gameOwner, uint256 _level, uint256 _id, uint256 _amount) external onlyOwner {
        if(Helper.getLevelIndex(_level) >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        if (!mintableSet[_gameOwner][_level].contains(_id)){
            revert NFTNotInMintableSet(_id, _level);
        }

        wavNFT.mint(_recipient, _id, _amount, " ");
        _syncMint(_gameOwner, _level, _recipient, _amount);

        emit SpecialMint(_recipient, _id, _amount);
    }
    function batchMint(address _recipient, uint[] memory _ids, uint[] memory _amount) external onlyOwner {
        wavNFT.mintBatch(_recipient, _ids, _amount, " ");
    } 
    function setFeePerMint(uint256  _entryFee) external onlyOwner {
        entryFee = _entryFee;
    }
    function setPaymentAddress(address payable _revenueContract) external onlyOwner {
        revenueContract = _revenueContract;
    }
    function forwardValue() external onlyOwner  {
        (bool success, ) = revenueContract.call{value: address(this).balance}("");
        if (!success) {
            revert FundsReleaseFailed();
        }
        emit PaymentForwarded(revenueContract, address(this).balance);
    }
    // This creates an owner game if not exist, then populates the levels, and updates the game by adding new levels if exist.
    //This function always adds a new level to the owner game, only call this function when adding new levels to an owner gmae
    function setGame(address _gameOwner, IWavGame.LevelParam[] memory _levels) external onlyOwner {
        for (uint256 i; i < _levels.length;) {
            wavGames[_gameOwner].push(IWavGame.Level(
                _levels[i].requiredBurn,
                _levels[i].requiredMint,
                _levels[i].prizeCutOff,
                0,
                0
            ));
            uint256 currentLevel = Helper.getIndexLevel(wavGames[_gameOwner].length - 1);

            _setBurnable(burnableSet[_gameOwner][currentLevel], _levels[i].burnableSet); // Get currentLevel from the index
            _setMintable(mintableSet[_gameOwner][currentLevel], _levels[i].mintableSet);
            emit GameSet(_gameOwner, currentLevel);
            unchecked {++i;} 
        }
    }
    function updateLevel(address _gameOwner, uint256 _level, IWavGame.LevelParam calldata _updateParam) external onlyOwner {
        // confirm level already exist
        uint256 levelIndex = Helper.getLevelIndex(_level); 
        if(Helper.getLevelIndex(_level) >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        wavGames[_gameOwner][levelIndex].requiredBurn = _updateParam.requiredBurn;
        wavGames[_gameOwner][levelIndex].requiredMint = _updateParam.requiredMint;
        wavGames[_gameOwner][levelIndex].prizeCutOff = _updateParam.prizeCutOff;
        _setBurnable(burnableSet[_gameOwner][_level], _updateParam.burnableSet);
        _setMintable(mintableSet[_gameOwner][_level], _updateParam.mintableSet);
        emit LevelSet(_gameOwner, _level);
    }
    function setRequiredBurn(address _gameOwner, uint256 _level, uint8 _requiredBurn) external onlyOwner {
        uint256 levelIndex = Helper.getLevelIndex(_level); 
        if(levelIndex >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        wavGames[_gameOwner][levelIndex].requiredBurn = _requiredBurn;
    }
    function setRequiredMint(address _gameOwner, uint256 _level, uint8 _requiredMint) external onlyOwner {
        uint256 levelIndex = Helper.getLevelIndex(_level); 
        if(levelIndex >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        wavGames[_gameOwner][levelIndex].requiredMint = _requiredMint;
    }
    function setPrizeCutOff(address _gameOwner, uint256 _level, uint8 _prizeCutOff) external onlyOwner {
        uint256 levelIndex = Helper.getLevelIndex(_level); 
        if(levelIndex >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        wavGames[_gameOwner][levelIndex].prizeCutOff = _prizeCutOff;
    }
    function setBurnableSet(address _gameOwner, uint256 _level, SetParam[] calldata _burnableSet) external onlyOwner {
        if(Helper.getLevelIndex(_level) >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        _setBurnable(burnableSet[_gameOwner][_level], _burnableSet);
    }	
    function setMintableSet(address _gameOwner, uint256 _level, SetParam[] calldata _mintableSet) external onlyOwner {
        if(Helper.getLevelIndex(_level) >= wavGames[_gameOwner].length){
            revert LevelNotFound();
        }
        _setMintable(mintableSet[_gameOwner][_level], _mintableSet);
    }	
    function setTrustedForwarder(address _trustedForwarder) public onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }

    function _syncMint(address _gameOwner, uint256 _level, address _recipient, uint256 _mintCount) internal {
        uint256 levelIndex = Helper.getLevelIndex(_level);
        Level memory level = wavGames[_gameOwner][levelIndex];
        wavGames[_gameOwner][levelIndex].mintCount += _mintCount;
        if (collectors[_gameOwner][_level].length() < level.prizeCutOff && !collectors[_gameOwner][_level].contains(_recipient)){
            collectors[_gameOwner][_level].add(_recipient);
        }
    }
    function _setBurnable(EnumerableSet.UintSet storage burnableSet, IWavGame.SetParam[] memory _burnableSet) internal  {
        // id for burn must be mintable from prevLevel
        for (uint256 i; i < _burnableSet.length;) {
            if (_burnableSet[i].status) {
                burnableSet.add(_burnableSet[i].id);
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
}