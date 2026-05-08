const ExcelJS = require("exceljs");
const fs = require("fs");

// Excel file path
const excelFilePath = "doge_holders.xlsx";
const jsonFilePath = "airdroplist.json";

// Dead address to check for exclusion
const deadAddress = "0x000000000000000000000000000000000000dEaD";

async function generateAirdropList() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelFilePath);
  const worksheet = workbook.getWorksheet("Token Holders");

  const airdropList = [];

  for (const row of worksheet.getRows(2, 159)) {
    const address = row.getCell("A").value;
    const schedule1Amount = row.getCell("F").value;

    // Exclude dead address and zero amounts
    if (address !== deadAddress && schedule1Amount > 0) {
      airdropList.push({
        recipient: address,
        amount: schedule1Amount.toString()
      });
    }
  }

  // Write JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify({airdroplist: airdropList}, null, 2));
  console.log(`Airdrop list generated: ${jsonFilePath}`);
}

// Run the generator
generateAirdropList().catch(error => {
  console.error("Error generating airdrop list:", error);
});
