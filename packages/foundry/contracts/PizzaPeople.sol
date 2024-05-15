//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "forge-std/Test.sol";
import "../lib/ERC721A/contracts/ERC721A.sol";
import {ScaffoldERC721A} from "./ScaffoldERC721A.sol";

contract PizzaPeople is ScaffoldERC721A {
    error PizzaPeople__AddressNotZero();

    // address immutable s_mintRoyaltyRecipient;

    constructor(
        ScaffoldERC721AParameters memory params,
        // string memory name,
        // string memory symbol,
        // string memory baseURI,
        // uint256 mintStartTimestamp,
        // uint256 mintEndTimestamp,
        // uint256 mintPrice,
        // uint256 maxTokenCount,
        // uint256 maxMintCountPerUser,
        // uint256 startTokenId,
        // address newOwner,
        // address mintRoyaltyRecipient,
        address[] memory initialMintRecipients
    ) ScaffoldERC721A(params) 
    // name,
    // symbol,
    // baseURI,
    // mintStartTimestamp,
    // mintEndTimestamp,
    // mintPrice,
    // maxTokenCount,
    // maxMintCountPerUser,
    // startTokenId
    // Ownable(newOwner)
    {
        // if (mintRoyaltyRecipient == address(0)) {
        //     revert PizzaPeople__AddressNotZero();
        // }

        // s_mintRoyaltyRecipient = mintRoyaltyRecipient;

        for (uint256 i = 0; i < initialMintRecipients.length; i++) {
            if (initialMintRecipients[i] == address(0)) {
                revert PizzaPeople__AddressNotZero();
            }

            _mint(initialMintRecipients[i], 1);
        }
    }
}
