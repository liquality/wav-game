// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Helper {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    function getLevelIndex(uint256 levelID) internal pure returns (uint256) {
        unchecked {
            return levelID - 1;
        } // Artist Game levels are stored in a 0-based index array => island 1 = 0 index position
    }

    function getLevelID(uint256 index) internal pure returns (uint256) {
        unchecked {
            return index + 1;
        } // Artist Game levels are stored in a 0-based index array => island 1 = 0 index position
    }
}
