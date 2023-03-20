require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      chainId: 80001,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
      url: "https://matic-mumbai.chainstacklabs.com",
    },
    zkEVM: {
      chainId: 1442,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
      url: "https://explorer.public.zkevm-test.net",
    },
    filecoin: {
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      chainId: 3141,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
    mantle: {
      url: "https://rpc.testnet.mantle.xyz",
      chainId: 5001,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
    scroll: {
      url: "https://alpha-rpc.scroll.io/l2",
      chainId: 534353,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
    // taiko: {
    //   url: "https://l2rpc.hackathon.taiko.xyz",
    //   chainId: "167002",
    //   accounts: [
    //     "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
    //   ],
    // },
    chiado: {
      url: "https://rpc.chiadochain.net",
      chainId: 10200,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ],
    },
    goerli: {
      url: "https://fragrant-side-liquid.ethereum-goerli.discover.quiknode.pro/85d60c255fb0a4d86910952d1838a5a227c9a690/",
      chainId: 5,
      accounts: [
        "edf38e734f43872ad5d9c6a42eab6c265200aa3486241be824601a7fc94575ba",
      ]
    },
  },
};
