// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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

    /// @title Level
    /// @dev Represents a level with associated properties and counts.
    /// @notice Data structure for individual levels.
    /// @param requiredBurn The amount of tokens required to be burned to reach this level.
    /// @param requiredMint The amount of tokens required to be minted to reach this level
    /// @param earlyBirdCutOff The number of players to be considered as early birds for this level.
    /// @param mintID The ID of the token being minted for this level.
    /// @param burnID The ID of the token being burned for this level.
    /// @param burnCount The total count of tokens burned for this level
    /// @param mintCount The total count of tokens minted for this level.

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

