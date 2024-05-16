// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {BasePizzaPeopleTest} from "./BasePizzaPeople.t.sol";
import "../contracts/PizzaPeople.sol";
import "../contracts/ScaffoldERC721A.sol";

contract PizzaPeopleMintMintTimestampsTest is BasePizzaPeopleTest {
    constructor() BasePizzaPeopleTest(0, 100, 0.0006942 ether) {}

    function testMintTimestamps() public view {
        assertEq(yourContract.getMintStartTimestamp(), MINT_START_TIMESTAMP);
        assertEq(yourContract.getMintEndTimestamp(), MINT_END_TIMESTAMP);
    }
}
