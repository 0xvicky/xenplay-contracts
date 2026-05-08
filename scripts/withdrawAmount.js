const hre = require("hardhat");

const createEvent = async () => {
  const CONTRACT = await hre.ethers.getContractFactory("Airdoge");
  const contract = CONTRACT.attach("0xCee6cc81704a9448c550eeD4a96D8C5424692b1D");

  try {
    const tx = await contract.withdrawAmount();

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("Transaction successful for withdrawing:", tx.hash);
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
