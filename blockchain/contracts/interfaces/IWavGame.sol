// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface IWavGame {
    struct SetParam {
        bool status;
        uint id;
    }

    struct LevelParam {
        uint8 requiredBurn;
        uint8 requiredMint;
        uint32 earlyBirdCutOff;
        uint256 mintID;
        uint256 burnID;
    }

    /// @title A title that should describe the contract/interface
    /// @author Liquality
    /// @notice Data structure for individual levels
    /// @param maxSupply Maximum supply of island mintable NFT set in circulation
    /// @param requiredBurn Number of burnable NFT to burn to get current island mintable NFT
    /// @dev Explain to a developer any extra details
    struct Level {
        uint8 requiredBurn;
        uint8 requiredMint;
        uint32 earlyBirdCutOff;
        uint256 mintID;
        uint256 burnID;
        uint256 burnCount;
        uint256 mintCount;
    }

    struct ArtistGame {
        Level[] levels;
        address payable treasury;
    }

    function collect(uint256 _artistID, address _recipient, uint256 _amount) external payable;

    function levelUp(uint256 _artistID, uint256 _newLevelID) external;

    function setArtistGame(uint256 _artistID, IWavGame.LevelParam[] calldata _levels) external;

    function setTreasuries(uint256[] calldata _artistIDs, address payable[] calldata _treasuries) external;

    function updateLevel(uint256 _artistID, uint256 _levelID, IWavGame.LevelParam calldata _levelParam) external;

    function transferWavNftOwnership(address newOwner) external;

    function setFeePerMint(uint256 _feePerMint) external;

    function forwardValue() external;

    function wavMint(uint256 _artistID, uint256 _levelID, address _recipient, uint256 _amount) external;
}
