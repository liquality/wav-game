// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Helper {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    function getLevelIndex(uint256 level) internal pure returns (uint256) {
        return level - 1; // Levels are stored in a 0-based index array => level 1 = 0 index position
    }

    function getIndexLevel(uint256 index) internal pure returns (uint256) {
        return index + 1; // Levels are stored in a 0-based index array => level 1 = 0 index position
    }
}