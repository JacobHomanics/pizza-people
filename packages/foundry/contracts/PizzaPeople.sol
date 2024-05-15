//SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {ScaffoldERC721A} from "./ScaffoldERC721A.sol";
import "forge-std/Test.sol";

contract PizzaPeople is ScaffoldERC721A {
    error PizzaPeople__AddressNotZero();

    constructor(
        ScaffoldERC721AParameters memory params,
        address[] memory initialMintRecipients
    ) ScaffoldERC721A(params) {
        for (uint256 i = 0; i < initialMintRecipients.length; i++) {
            if (initialMintRecipients[i] == address(0)) {
                revert ScaffoldERC721A__AddressNotZero();
            }

            _mint(initialMintRecipients[i], 1);
        }
    }
}
