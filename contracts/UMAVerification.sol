// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.14;

// import "https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";

contract UMAVerify {
    OptimisticOracleV2Interface oo =
        OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);

    bytes32 identifier = bytes32("YES_OR_NO_QUERY");

    bytes ancillaryData =
        bytes(
            "I am the owner of this NFT collection, help me to get verified!"
        );

    uint256 requestTime = 0;

    function requestData() public {
        requestTime = block.timestamp;
        IERC20 bondCurrency = IERC20(
            0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6
        );
        uint256 reward = 0;
        oo.requestPrice(
            identifier,
            requestTime,
            ancillaryData,
            bondCurrency,
            reward
        );
        oo.setCustomLiveness(identifier, requestTime, ancillaryData, 30);
    }

    function settleRequest() public {
        oo.settle(address(this), identifier, requestTime, ancillaryData);
    }

    function getSettledData() public view returns (int256) {
        return
            oo
                .getRequest(
                    address(this),
                    identifier,
                    requestTime,
                    ancillaryData
                )
                .resolvedPrice;
    }
}
