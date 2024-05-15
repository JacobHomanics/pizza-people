// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/PizzaPeople.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

abstract contract BasePizzaPeople is Test {
    PizzaPeople public yourContract;

    address mintRoyaltyRecipient = vm.addr(1);
    address USER = vm.addr(2);

    string BASE_URI =
        "https://nft.bueno.art/api/contract/0zJlzGVsEKj7cALqS-QMX/chain/1/metadata/";

    uint256 s_maxMintCount = 24420;
    uint256 MINT_START_TIMESTAMP;
    uint256 MINT_END_TIMESTAMP;
    uint256 s_mintPrice;

    constructor(
        uint256 mintStartTimestamp,
        uint256 mintEndTimestamp,
        uint256 mintPrice
    ) {
        MINT_START_TIMESTAMP = mintStartTimestamp;
        MINT_END_TIMESTAMP = mintEndTimestamp;
        s_mintPrice = mintPrice;
    }

    function setUp() public {
        address[] memory users = new address[](1);
        users[0] = USER;

        ScaffoldERC721A.ScaffoldERC721AParameters memory params =
        ScaffoldERC721A.ScaffoldERC721AParameters(
            mintRoyaltyRecipient,
            "Pizza People",
            "PP",
            "ipfs://bafybeicpvzgkhgyhwggrtctzvztuk2mftmt56xogv6pi7mx2v42go35ltu/",
            MINT_START_TIMESTAMP,
            MINT_END_TIMESTAMP,
            0.1 ether,
            s_maxMintCount,
            420,
            mintRoyaltyRecipient,
            1
        );

        yourContract = new PizzaPeople(params, users);
    }

    function testMintTimestamps() public view {
        assertEq(yourContract.getMintStartTimestamp(), MINT_START_TIMESTAMP);
        assertEq(yourContract.getMintEndTimestamp(), MINT_END_TIMESTAMP);
    }
}
