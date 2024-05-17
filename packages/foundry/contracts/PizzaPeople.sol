//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {ScaffoldERC721A} from "./ScaffoldERC721A.sol";
import "forge-std/Test.sol";

contract PizzaPeople is ScaffoldERC721A {
    error PizzaPeople__AddressNotZero();
    error PizzaPeople__NotOwnerOfToken();

    string s_baseURIHeadshot;

    mapping(uint256 tokenId => bool) isHeadshotActive;

    constructor(
        ScaffoldERC721AParameters memory params,
        address[] memory initialMintRecipients,
        string memory baseURIHeadshot
    ) ScaffoldERC721A(params) {
        for (uint256 i = 0; i < initialMintRecipients.length; i++) {
            if (initialMintRecipients[i] == address(0)) {
                revert ScaffoldERC721A__AddressNotZero();
            }

            _mint(initialMintRecipients[i], 1);
        }

        s_baseURIHeadshot = baseURIHeadshot;
    }

    function toggleHeadshot(uint256 tokenId) external {
        address owner = ownerOf(tokenId);
        if (owner != msg.sender) revert PizzaPeople__NotOwnerOfToken();

        isHeadshotActive[tokenId] = !isHeadshotActive[tokenId];
    }

    function getIsHeadshotActive(uint256 tokenId)
        external
        view
        returns (bool)
    {
        return isHeadshotActive[tokenId];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) _revert(URIQueryForNonexistentToken.selector);

        string memory baseURI;

        if (isHeadshotActive[tokenId]) {
            baseURI = s_baseURIHeadshot;
        } else {
            baseURI = s_baseURI;
        }

        return bytes(baseURI).length != 0
            ? string(abi.encodePacked(baseURI, _toString(tokenId)))
            : "";
    }
}
