const {ethers} = require("ethers");
const XLSX = require("xlsx");

// Token and Provider Configurations
const newTokenAddress = "YOUR_NEW_TOKEN_ADDRESS";
const provider = new ethers.providers.InfuraProvider(
  "homestead",
  "YOUR_INFURA_PROJECT_ID"
);
const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
const abi = ["function transfer(address to, uint256 amount)"];

// Initializing Contract
const tokenContract = new ethers.Contract(newTokenAddress, abi, wallet);

// Load Excel File
const workbook = XLSX.readFile("doge_holders.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const holders = XLSX.utils.sheet_to_json(sheet);

// Key for the airdrop schedule
const key = "1"; // Change this to "2" or "3" for different schedules

async function airdropTokens() {
  for (let holder of holders) {
    if (
      key === "1" &&
      sheet[`E${holders.indexOf(holder) + 2}`].s.fill.fgColor.rgb === "FFCCCC"
    ) {
      // Light red
      await airdrop(holder, "schedule1", "E");
    } else if (
      key === "2" &&
      sheet[`F${holders.indexOf(holder) + 2}`].s.fill.fgColor.rgb === "FFCCCC"
    ) {
      // Light red
      await airdrop(holder, "schedule2", "F");
    } else if (
      key === "3" &&
      sheet[`G${holders.indexOf(holder) + 2}`].s.fill.fgColor.rgb === "FFCCCC"
    ) {
      // Light red
      await airdrop(holder, "schedule3", "G");
    }
  }

  // Write updated Excel file to disk
  XLSX.writeFile(workbook, "doge_holders.xlsx");
}

async function airdrop(holder, schedule, column) {
  const amount = ethers.BigNumber.from(holder[schedule]);
  await tokenContract.transfer(holder.address, amount);
  console.log(`Airdropped ${amount.toString()} tokens to ${holder.address}`);

  // Mark the cell as light green
  const cellAddress = `${column}${holders.indexOf(holder) + 2}`;
  sheet[cellAddress].s = {fill: {fgColor: {rgb: "CCFFCC"}}}; // Light green
}

airdropTokens()
  .then(() => console.log("Airdrop completed!"))
  .catch(err => console.error("Error during airdrop:", err));
