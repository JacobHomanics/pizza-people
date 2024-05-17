//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/PizzaPeople.sol";

import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function getSetup()
        public
        returns (
            uint256 maxMintCount,
            uint256 mintStartTimestamp,
            uint256 mintEndTimestamp,
            address newOwner,
            address mintRoyaltyRecipient,
            address[] memory initialMintRecipients,
            uint256 mintPrice
        )
    {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }

        if (chainId == 31337) {
            maxMintCount = 5678;

            mintStartTimestamp = (vm.unixTime() / 1000) + 20 seconds;
            mintEndTimestamp = 0; //(vm.unixTime() / 1000) + 1 days;

            newOwner = 0xc689c800a7121b186208ea3b182fAb2671B337E7;
            mintRoyaltyRecipient = 0xc689c800a7121b186208ea3b182fAb2671B337E7;

            initialMintRecipients = new address[](3);
            initialMintRecipients[0] =
                0xc689c800a7121b186208ea3b182fAb2671B337E7;
            initialMintRecipients[1] =
                0x136883B2841D7DE5C13EcEE65788FDE191Da5F20;
            initialMintRecipients[2] =
                0xC2aAa18BAD26C6E78b2Ae897911e179F00C79725;

            mintPrice = 0.001 ether;
        } else if (chainId == 11155111) {
            maxMintCount = 5678;
            mintPrice = 0.000001 ether;

            mintStartTimestamp = (vm.unixTime() / 1000) + 20 seconds;
            mintEndTimestamp = 0;

            newOwner = 0xc689c800a7121b186208ea3b182fAb2671B337E7;
            mintRoyaltyRecipient = 0xc689c800a7121b186208ea3b182fAb2671B337E7;

            initialMintRecipients = new address[](3);
            initialMintRecipients[0] =
                0xc689c800a7121b186208ea3b182fAb2671B337E7;
            initialMintRecipients[1] =
                0x136883B2841D7DE5C13EcEE65788FDE191Da5F20;
            initialMintRecipients[2] =
                0xC2aAa18BAD26C6E78b2Ae897911e179F00C79725;
        } else if (chainId == 84532) {
            maxMintCount = 5678;
            mintPrice = 0.000001 ether;
            mintStartTimestamp = 0;
            mintEndTimestamp = 0;

            newOwner = 0xc689c800a7121b186208ea3b182fAb2671B337E7;
            mintRoyaltyRecipient = 0xc689c800a7121b186208ea3b182fAb2671B337E7;

            initialMintRecipients = new address[](3);
            initialMintRecipients[0] =
                0xc689c800a7121b186208ea3b182fAb2671B337E7;
            initialMintRecipients[1] =
                0x136883B2841D7DE5C13EcEE65788FDE191Da5F20;
            initialMintRecipients[2] =
                0xC2aAa18BAD26C6E78b2Ae897911e179F00C79725;
        } else if (chainId == 8453) {
            maxMintCount = 5678;
            mintPrice = 0.0006942 ether;
            mintStartTimestamp = 1713589200;
            mintEndTimestamp = 0;

            newOwner = 0xc689c800a7121b186208ea3b182fAb2671B337E7;
            mintRoyaltyRecipient = 0xc689c800a7121b186208ea3b182fAb2671B337E7;

            initialMintRecipients = new address[](3);
            initialMintRecipients[0] =
                0xc689c800a7121b186208ea3b182fAb2671B337E7;
            initialMintRecipients[1] =
                0x136883B2841D7DE5C13EcEE65788FDE191Da5F20;
            initialMintRecipients[2] =
                0xC2aAa18BAD26C6E78b2Ae897911e179F00C79725;
        }
    }

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }

        (
            uint256 maxMintCount,
            uint256 mintStartTimestamp,
            uint256 mintEndTimestamp,
            address newOwner,
            address mintRoyaltyRecipient,
            address[] memory initialMintRecipients,
            uint256 mintPrice
        ) = getSetup();

        vm.startBroadcast(deployerPrivateKey);

        ScaffoldERC721A.ScaffoldERC721AParameters memory params =
        ScaffoldERC721A.ScaffoldERC721AParameters(
            newOwner,
            "Pizza People",
            "PP",
            "ipfs://bafybeih6w26bakuxg2y2kr63dl76k7hbjh3mkvsfnbzpuq2xpmpyvsny6i/",
            mintStartTimestamp,
            mintEndTimestamp,
            mintPrice,
            maxMintCount,
            420,
            mintRoyaltyRecipient
        );

        PizzaPeople yourContract =
            new PizzaPeople(params, initialMintRecipients, "");

        console.logString(
            string.concat(
                "YourContract deployed at: ", vm.toString(address(yourContract))
            )
        );

        yourContract.mint{value: 50 * mintPrice}(
            0x3bEc6a181d6Ef7239F699DAf2fAa5FE3A5f01Edf, 50
        );

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
