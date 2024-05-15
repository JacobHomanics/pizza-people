// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "../BasePizzaPeople.t.sol";
import "../../contracts/PizzaPeople.sol";

contract PizzaPeopleOpenStartConstraintsTest is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(0, type(uint256).max - 1, 0) {}

    function testIsWithinConstraints(uint256 timestamp) public {
        vm.assume(timestamp <= MINT_END_TIMESTAMP);

        vm.warp(timestamp);
        assertEq(yourContract.isWithinConstraints(), true);
    }

    function testIsNotWithinConstraints(uint256 timestamp) public {
        vm.assume(timestamp > MINT_END_TIMESTAMP);

        vm.warp(timestamp);
        assertEq(yourContract.isWithinConstraints(), false);
    }
}
