/** @type import('hardhat/config').HardhatUserConfig */
require("@typechain/hardhat");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "alchemy url",
      accounts: ["account secret key"],
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
