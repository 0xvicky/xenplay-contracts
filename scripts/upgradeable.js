const {ethers, upgrades} = require("hardhat");

async function main() {
  const DemoV4 = await ethers.getContractFactory("Airdoge");
  // Upgrade the proxy to DemoV2 and call the initializer with arguments
  const demoV4 = await upgrades.upgradeProxy(
    "0x50c32756E5214443435FD391323f2923C1564153",
    DemoV4
  );
  console.log("Box upgraded");
  console.log(demoV4);
}

main();
