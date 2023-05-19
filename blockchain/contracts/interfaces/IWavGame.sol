// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface IWavGame {

struct NFTParam {
    uint id;
    uint amount;
}
struct SetParam {
    bool status;
    uint id;
}

struct IslandParam {
    uint8 requiredBurn;
    uint8 requiredMint;
    uint32 prizeCutOff;
    SetParam[] burnableSet;
    SetParam[] mintableSet;
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
    uint32 prizeCutOff;
    uint256 burnCount;
    uint256 mintCount;
}

struct Game {
    Island[] islands;
    address payable treasury;
}

function collect(address _gameID, address _recipient, NFTParam[] calldata _nfts) external payable;

function levelUp(address _gameID, uint256 _islandID, NFTParam[] calldata _nfts) external;

}