// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface IWavGame {

struct IDParam {
    bool status;
    uint id;
    uint amount;
}

struct LevelParam {
    uint8 requiredBurn;
    uint8 requiredMint;
    uint32 prizeCutOff;
    IDParam[] burnableSet;
    IDParam[] mintableSet;
}

/// @title A title that should describe the contract/interface
/// @author Liquality
/// @notice Data structure for individual islands / levels
/// @param maxSupply Maximum supply of level/island mintable sets in circulation
/// @param requiredBurn Number of burnable NFT to burn to get current level mintable NFT 
/// @dev Explain to a developer any extra details
struct Level {
    uint8 requiredBurn;
    uint8 requiredMint;
    uint32 prizeCutOff;
    uint256 burnCount;
    uint256 mintCount;
}

function collect(address _gameOwner, address _recipient, IDParam[] calldata _input) external payable;

function levelUp(address _owner, uint256 _nextLevel, IDParam[] memory _input) external;

}