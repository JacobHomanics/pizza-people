// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "./BasePizzaPeople.t.sol";
import "../contracts/PizzaPeople.sol";
import "../contracts/ScaffoldERC721A.sol";

contract PizzaPeopleWithdraw is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(0, 100, 0) {}

    function testWithdrawRewards(uint256 mintAmount) public {
        vm.deal(address(this), mintAmount);

        yourContract.mint{value: mintAmount}(USER, 1);

        bool sent = yourContract.withdraw();
        assertEq(address(yourContract).balance, 0);
        assertEq(mintRoyaltyRecipient.balance, mintAmount);
        assertEq(sent, true);
    }
}
