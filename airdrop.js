const { ethers } = require("ethers");
const fs = require("fs");

// Connect to the AirDAO chain using the provided RPC URL
const RPC_URL = "https://network.ambrosus.io";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Replace with the actual token contract address and ABI
const tokenAddress = "0x50c32756E5214443435FD391323f2923C1564153";
const tokenABI = [
  "function transfer(address recipient, uint256 amount) public returns (bool)",
];

// Token contract and signer setup (Replace with the correct wallet private key)
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY; // Ensure this environment variable is set with your wallet's private key
const signer = new ethers.Wallet(walletPrivateKey, provider);
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

// Path to JSON file
const jsonFilePath = "adop.json";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Airdrop function
async function performAirdrop() {
  const { airdroplist } = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  for (const entry of airdroplist) {
    const { recipient, amount } = entry;

    try {
      console.log(`Airdropping ${amount} tokens to ${recipient}...`);
      const tx = await tokenContract.transfer(recipient, amount);
      await tx.wait();
      console.log(
        `Successfully transferred to ${recipient} in transaction ${tx.hash}`,
      );
      console.log("Waiting for 2 seconds...");
      await wait(3000);
    } catch (error) {
      console.error(`Failed to airdrop to ${recipient}: ${error.message}`);
    }
  }

  console.log("Airdrop process completed.");
}

// Run the airdrop function
performAirdrop().catch((error) => {
  console.error("Airdrop error:", error);
});
