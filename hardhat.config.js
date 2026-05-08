require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      evmVersion: "istanbul"
    }
  },

  networks: {
    airdao: {
      url: process.env.TEST_URL,
      accounts: [`0x${process.env.ACCOUNT_2}`]
    },
    airdaoM: {
      url: process.env.MAIN_URL,
      accounts: [`0x${process.env.ACCOUNT}`]
    }
  }
};
