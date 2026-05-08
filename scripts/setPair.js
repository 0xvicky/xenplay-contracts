const hre = require("hardhat");

const createEvent = async () => {
  const CONTRACT = await hre.ethers.getContractFactory("Airdoge");
  const contract = CONTRACT.attach("0x29514B4D9544432E1619eF89c5259177f2963167");

  try {
    const tx = await contract.setDex("0x1D9cBE4714Ce0Db3B8f24aC4d7Ef9563C68AF152");

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("pair set succesfully:", tx.hash);
  } catch (error) {
    console.error("Error executing transaction:", error);
  }
};

createEvent().catch(error => {
  console.error("Error in script execution:", error);
  x;
  process.exit(1);
});

//airdao dex 0xf7237c595425b49eaeb3dc930644de6dca09c3c4
//airdao sc dex 0x8aF781265f2acAd51F4fd6B9BbD4FDBb0c8F61aA
