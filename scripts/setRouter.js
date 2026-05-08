const hre = require("hardhat");

const createEvent = async () => {
  const CONTRACT = await hre.ethers.getContractFactory("Airdoge");
  const contract = CONTRACT.attach("0x50c32756E5214443435FD391323f2923C1564153");

  try {
    const tx = await contract.owner();

    // Wait for the transaction to be mined
    // await tx.wait();

    console.log(tx);

    console.log("Tax percentage set succesfully:", tx.hash);
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
