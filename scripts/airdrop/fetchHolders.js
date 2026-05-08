const ethers = require("ethers");
const XLSX = require("xlsx");

// Token and Provider Configurations
const tokenAddress = "0x48437113D6d4808bD281F50eEe4b87D4c58D2557";
const provider = new ethers.JsonRpcProvider("https://network.ambrosus.io");
const abi = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function balanceOf(address owner) view returns (uint256)"
];

// Initializing Contract
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

async function fetchHolders() {
  const holders = {}; // Object to store holder details

  // Fetch Transfer events
  const filter = tokenContract.filters.Transfer(null, null);
  const logs = await provider.getLogs({...filter, fromBlock: 0, toBlock: "latest"});
  const decodedLogs = logs.map(log => tokenContract.interface.parseLog(log));

  // Aggregate balances
  for (let log of decodedLogs) {
    const {
      args: {from, to, value}
    } = log;
    if (from !== "0x0000000000000000000000000000000000000000") {
      holders[from] = (holders[from] || 0) - value.toString();
    }
    holders[to] = (holders[to] || 0) + value.toString();
  }

  const holderData = Object.entries(holders).map(([address, balance]) => {
    const balanceFormatted = parseFloat(ethers.formatUnits(balance.toString(), 18));
    const newTokenAllocation = balanceFormatted * 0.266;
    const scheduleAllocations = newTokenAllocation / 3;

    return {
      address,
      oldBalance: balanceFormatted,
      newAllocation: newTokenAllocation,
      schedule1: scheduleAllocations,
      schedule2: scheduleAllocations,
      schedule3: scheduleAllocations
    };
  });

  createExcel(holderData);
}

function createExcel(data) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Holders");

  XLSX.writeFile(wb, "holders.xlsx");
}

fetchHolders()
  .then(() => console.log("Holders list created!"))
  .catch(err => console.error("Error fetching holders:", err));
