// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface IWavGame {

struct SetParam {
    bool status;
    uint id;
}

struct IslandParam {
    uint8 requiredBurn;
    uint8 requiredMint;
    uint32 earlyBirdCutOff;
    uint256 mintable;
    uint256 burnable;
}

/// @title A title that should describe the contract/interface
/// @author Liquality
/// @notice Data structure for individual islands
/// @param maxSupply Maximum supply of island mintable NFT set in circulation
/// @param requiredBurn Number of burnable NFT to burn to get current island mintable NFT 
/// @dev Explain to a developer any extra details
struct Island {
    uint8 requiredBurn;
    uint8 requiredMint;
    uint32 earlyBirdCutOff;
    uint256 mintable;
    uint256 burnable;
    uint256 burnCount;
    uint256 mintCount;
}

struct Game {
    Island[] islands;
    address payable treasury;
}

function collect(uint256 _gameID, address _recipient, uint _amount) external payable;

function levelUp(uint256 _gameID, uint256 _newIslandID) external;

function setGame(uint256 _gameID, IWavGame.IslandParam[] calldata _islands) external;

function setTreasuries(uint256[] calldata _gameIDs, address payable[] calldata _treasuries) external;

function updateIsland(uint256 _gameID, uint256 _islandID, IWavGame.IslandParam calldata _islandParam) external;

function transferWavNftOwnership(address newOwner) external;

function setFeePerMint(uint256  _feePerMint) external;

function forwardValue() external;

function wavMint(uint256 _gameID, uint256 _islandID, address _recipient, uint256  _amount) external;

}