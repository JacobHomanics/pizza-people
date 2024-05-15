// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "../BasePizzaPeople.t.sol";
import "../../contracts/PizzaPeople.sol";

contract PizzaPeopleOpenEndedConstraintsTest is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(500, 0, 0) {}

    function testIsWithinConstraints(uint256 timestamp) public {
        vm.assume(timestamp >= MINT_START_TIMESTAMP);

        vm.warp(timestamp);
        assertEq(yourContract.isWithinConstraints(), true);
    }

    function testIsNotWithinConstraints(uint256 timestamp) public {
        vm.assume(timestamp < MINT_START_TIMESTAMP);

        vm.warp(timestamp);
        assertEq(yourContract.isWithinConstraints(), false);
    }
}
