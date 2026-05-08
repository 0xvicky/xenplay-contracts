require("dotenv").config();
const hre = require("hardhat");

async function main() {
  // The address of the pair contract (Uniswap/SushiSwap pair address)
  const pairAddress = "0x48437113D6d4808bD281F50eEe4b87D4c58D2557"; // Replace with the actual pair address

  // ABI of the pair contract (only the methods we need)
  const pairABI = [
    {
      constant: true,
      inputs: [],
      name: "getReserves",
      outputs: [
        {internalType: "uint112", name: "reserve0", type: "uint112"},
        {internalType: "uint112", name: "reserve1", type: "uint112"},
        {internalType: "uint32", name: "blockTimestampLast", type: "uint32"}
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "token0",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "token1",
      outputs: [{internalType: "address", name: "", type: "address"}],
      stateMutability: "view",
      type: "function"
    }
  ];

  // Create a contract instance using ethers and attach the pair contract
  const provider = hre.ethers.provider; // Use Hardhat's provider
  const pairContract = new hre.ethers.Contract(pairAddress, pairABI, provider);

  // Fetch the reserves and tokens from the pair contract
  const [reserve0, reserve1] = await pairContract.getReserves();
  const token0 = await pairContract.token0();
  const token1 = await pairContract.token1();

  // Fetch decimals for each token using ERC20's `decimals()` function
  const tokenABI = [
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{internalType: "uint8", name: "", type: "uint8"}],
      stateMutability: "view",
      type: "function"
    }
  ];

  // Create contract instances for both tokens
  const token0Contract = new hre.ethers.Contract(token0, tokenABI, provider);
  const token1Contract = new hre.ethers.Contract(token1, tokenABI, provider);

  // Get decimals for both tokens
  const decimals0 = await token0Contract.decimals();
  const decimals1 = await token1Contract.decimals();

  // Adjust the reserves based on the decimals
  const adjustedReserve0 = reserve0 / Math.pow(10, decimals0);
  const adjustedReserve1 = reserve1 / Math.pow(10, decimals1);

  // Calculate the price of token0 in terms of token1
  const priceOfToken0InToken1 = adjustedReserve1 / adjustedReserve0;
  const priceOfToken1InToken0 = adjustedReserve0 / adjustedReserve1;

  // Log the results
  console.log(`Token0 (address: ${token0}) price in Token1: ${priceOfToken0InToken1}`);
  console.log(`Token1 (address: ${token1}) price in Token0: ${priceOfToken1InToken0}`);
}

// Run the script
main().catch(error => {
  console.error("Error in script execution:", error);
  process.exit(1);
});
