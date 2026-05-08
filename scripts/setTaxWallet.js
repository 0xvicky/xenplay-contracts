const hre = require("hardhat");

const createEvent = async () => {
  const CONTRACT = await hre.ethers.getContractFactory("Airdoge");
  const contract = CONTRACT.attach("0x5eac7cf97F89758215b99025C3467f73c5f70C2C");

  try {
    const tx = await contract.setTaxWallet("0xCc370671C98AA251060954deBC7a45cd17300a19");

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("Tax wallet set succesfully:", tx.hash);
  } catch (error) {
    console.error("Error executing transaction:", error);
  }
};

createEvent().catch(error => {
  console.error("Error in script execution:", error);
  process.exit(1);
});

//airdao dex 0xf7237c595425b49eaeb3dc930644de6dca09c3c4
//airdao sc dex 0x8aF781265f2acAd51F4fd6B9BbD4FDBb0c8F61aA
