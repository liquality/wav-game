//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IOwnable {
    function transferOwnership(address newOwner) external;
}

interface IWavNFT is IERC1155, IOwnable {
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;
    function burnBatch(address account, uint256[] memory ids, uint256[] memory values) external;
    function mint(address account, uint256 id, uint256 amount, bytes memory data) external;
    function burn(address account, uint256 id, uint256 value) external;
}