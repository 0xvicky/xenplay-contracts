// scripts/create-box.js
const {ethers, upgrades} = require("hardhat");

async function main() {
  const Box = await ethers.getContractFactory("Airdoge");
  const box = await upgrades.deployProxy(
    Box,
    [
      "0x6a528a18b46aA166C7801bE234DF943dE7bC6b19",
      "0x0F488C8e51a49D729971626987fFf2d4CB66690c"
    ],
    {
      initializer: "initialize"
    }
  );
  await box.waitForDeployment();
  console.log("ADG deployed to:", await box.getAddress());
}

main();
