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
      url: "https://matic-mumbai.chainstacklabs.com	",
    },
  },
};
