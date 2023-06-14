// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract WavNFT is ERC2771Recipient, ERC1155, Pausable, Ownable, ERC1155Burnable  {
    using Strings for uint256;

    constructor(string memory _uri) ERC1155(_uri){

    }

    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    
    function setTrustedForwarder(address _trustedForwarder) public onlyOwner {
        _setTrustedForwarder(_trustedForwarder);
    }
    
    function _msgSender() internal view virtual override(Context, ERC2771Recipient) returns (address sender) {
        return ERC2771Recipient._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Recipient) returns (bytes calldata) {
        return ERC2771Recipient._msgData();
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(_id), _id.toString(), ".json"));
    }
}