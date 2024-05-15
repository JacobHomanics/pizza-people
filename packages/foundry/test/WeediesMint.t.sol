// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "./BasePizzaPeople.t.sol";
import "../contracts/PizzaPeople.sol";
import "../contracts/ScaffoldERC721A.sol";

contract WeediesMintTest is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(0, 100, 0) {}

    function testMint() public {
        yourContract.mint(USER, 1);

        assertEq(yourContract.getCurrentTokenCount(), 2);
        assertEq(
            yourContract.tokenURI(2),
            string.concat(BASE_URI, Strings.toString(2))
        );
    }

    function testRevertMintTheDealerIsNotAround(uint256 timestamp) public {
        vm.assume(
            timestamp < MINT_START_TIMESTAMP || timestamp > MINT_END_TIMESTAMP
        );

        vm.warp(timestamp);

        vm.expectRevert(
            ScaffoldERC721A.ScaffoldERC721A__IsNotWithinMintWindow.selector
        );

        yourContract.mint(USER, 1);
    }

    function testRevertTheDealerIsAllOuttaTheWeed() public {
        for (uint256 j = 0; j < s_maxMintCount - 1; j++) {
            vm.prank(vm.addr(j + 1));
            yourContract.mint(vm.addr(j + 1), 1);
        }

        vm.expectRevert(
            ScaffoldERC721A.ScaffoldERC721A__NoTokensLeftToMint.selector
        );
        yourContract.mint(USER, 1);
    }

    function testRevertTheDealerIsGonnaBeOutOfWeed() public {
        for (uint256 j = 0; j < s_maxMintCount - 5; j++) {
            vm.prank(vm.addr(j + 1));
            yourContract.mint(vm.addr(j + 1), 1);
        }

        vm.expectRevert(
            ScaffoldERC721A
                .ScaffoldERC721A__NotEnoughMintableTokensToFulfillRequest
                .selector
        );
        yourContract.mint(USER, 20);
    }

    function testRevertUserMaxedMintCount() public {
        vm.prank(USER);
        yourContract.mint(USER, 419);

        vm.expectRevert(
            ScaffoldERC721A.ScaffoldERC721A__CannotMintThatMany.selector
        );

        vm.prank(USER);
        yourContract.mint(USER, 1);
    }
}
