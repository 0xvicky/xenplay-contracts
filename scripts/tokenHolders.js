const {ethers} = require("ethers");
const ExcelJS = require("exceljs");

// Connect to the AirDAO chain using the provided RPC URL
const RPC_URL = "https://network.ambrosus.io";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Replace this with the actual token contract address and ABI
const tokenAddress = "0x48437113D6d4808bD281F50eEe4b87D4c58D2557"; // Replace with your token's contract address
const tokenABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

// Token contract object
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

// Function to convert balance to human-readable format
function formatBalance(balance) {
  const balanceInTokens = balance / 1e18;
  if (balanceInTokens >= 1e6) {
    return `${(balanceInTokens / 1e6).toFixed(2)}M`;
  } else if (balanceInTokens >= 1e3) {
    return `${(balanceInTokens / 1e3).toFixed(2)}K`;
  } else {
    return `${balanceInTokens.toFixed(2)}`;
  }
}

// Fetch token holders and their balances, sort them, and store in an Excel file
async function getTokenHolders() {
  const tokenHolders = new Set();

  // Fetch all Transfer events emitted by the token contract
  const transferFilter = tokenContract.filters.Transfer();
  const transferEvents = await tokenContract.queryFilter(transferFilter);

  // Add "from" and "to" addresses from Transfer events to tokenHolders Set
  transferEvents.forEach(event => {
    const from = event.args.from;
    const to = event.args.to;

    // Exclude the zero address (used for burns)
    if (from !== ethers.ZeroAddress) {
      tokenHolders.add(from);
    }
    if (to !== ethers.ZeroAddress) {
      tokenHolders.add(to);
    }
  });

  console.log(`Found ${tokenHolders.size} unique token holders.`);

  // Create an array to store token holders and their balances
  const holdersWithBalances = [];

  // Iterate over each holder and fetch their balance
  for (const holder of tokenHolders) {
    const balance = await tokenContract.balanceOf(holder);
    const formattedBalance = formatBalance(balance.toString());

    const balanceBigInt = BigInt(balance.toString());
    const newTokenAllocation = ((balanceBigInt * 266n) / 1000n).toString();
    const newAllocationFormatted = formatBalance(Number(newTokenAllocation));

    const scheduleAllocation = ((balanceBigInt * 266n) / 3000n).toString();

    holdersWithBalances.push({
      address: holder,
      balance: balance.toString(),
      formattedBalance,
      newAllocation: newTokenAllocation,
      newAllocationFormatted,
      schedule1: scheduleAllocation,
      schedule2: scheduleAllocation,
      schedule3: scheduleAllocation,
      formattedSchedule: formatBalance(Number(scheduleAllocation))
    });
  }

  // Sort holders by balance in descending order
  holdersWithBalances.sort((a, b) => b.balance - a.balance);

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Token Holders");

  // Add headers with columns for data
  worksheet.columns = [
    {header: "Address", key: "address", width: 30},
    {header: "Balance", key: "balance", width: 20},
    {header: "Formatted Balance", key: "formattedBalance", width: 20},
    {header: "New Token Allocation", key: "newAllocation", width: 20},
    {header: "Formatted New Allocation", key: "newAllocationFormatted", width: 20},
    {header: "Schedule 1", key: "schedule1", width: 15},
    {header: "Schedule 2", key: "schedule2", width: 15},
    {header: "Schedule 3", key: "schedule3", width: 15},
    {header: "Formatted Schedule", key: "formattedSchedule", width: 20}
  ];

  // Add rows of data
  holdersWithBalances.forEach(holder => {
    worksheet.addRow(holder);
  });

  // Define light red fill style
  const lightRedFill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {argb: "FFFFC7CE"}
  };

  // Apply light red fill to "Schedule 1," "Schedule 2," and "Schedule 3" columns
  worksheet.getColumn("schedule1").eachCell(cell => (cell.fill = lightRedFill));
  worksheet.getColumn("schedule2").eachCell(cell => (cell.fill = lightRedFill));
  worksheet.getColumn("schedule3").eachCell(cell => (cell.fill = lightRedFill));

  // Write the Excel file to disk
  await workbook.xlsx.writeFile("doge_holders.xlsx");
  console.log("Token holders and balances saved to doge_holders.xlsx.");
}

// Call the function
getTokenHolders().catch(err => {
  console.error("Error fetching token holders:", err);
});
