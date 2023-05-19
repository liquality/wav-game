// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Helper {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    function getIslandIndex(uint256 islandID) internal pure returns (uint256) {
        return islandID - 1; // Game islands are stored in a 0-based index array => island 1 = 0 index position
    }

    function getIslandID(uint256 index) internal pure returns (uint256) {
        return index + 1; // Game islands are stored in a 0-based index array => island 1 = 0 index position
    }
}