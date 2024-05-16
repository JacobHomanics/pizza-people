// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "./BasePizzaPeople.t.sol";
import "../contracts/PizzaPeople.sol";
import "../contracts/ScaffoldERC721A.sol";

contract PizzaPeopleMintMintPriceTest is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(0, 100, 0.0006942 ether) {}

    function testRevertMintShortedTheDealer(uint256 amount) public {
        vm.assume(amount < s_mintPrice);

        vm.prank(USER);
        vm.expectRevert(
            ScaffoldERC721A.ScaffoldERC721A__DidNotProvideEnoughCapital.selector
        );

        yourContract.mint(USER, 1);
    }
}
