// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IHashi721Bridge {
    function xCall(
        uint32 destination,
        uint256 relayerFee,
        uint256 slippage,
        address asset,
        address to,
        uint256 tokenId,
        bool isTokenURIIgnored
    ) external payable returns (bytes32);
}

contract SampleXApp {
    address nftHashiBridgeContract;

    constructor(address _nftHashiBridgeContract) {
        nftHashiBridgeContract = _nftHashiBridgeContract;
    }

    function sampleXCall(
        uint32 destination, // 1735353714
        uint256 relayerFee, // 0
        uint256 slippage, // 300
        address asset, // NFT contract address
        address to, // NFT receiver in destination chain
        uint256 tokenId, // NFT token ID
        bool isTokenURIIgnored // if token URI is not required, set true
    ) public {
        // specific logic for your dApp
        IHashi721Bridge(nftHashiBridgeContract).xCall(
            destination,
            relayerFee,
            slippage,
            asset,
            to,
            tokenId,
            isTokenURIIgnored
        );
    }
}

// polygon nfthashi bridge contract 0xd3F1A0782AFD768f8929343Fb44344A2a49fE343
// goerli nfthashi bridge contract 0x8F5969b8Fa3727392385C5E74CF1AA91a4aC4b40
