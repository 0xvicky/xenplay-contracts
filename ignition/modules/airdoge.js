const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AirDogeModule", builder => {
  const airdg = builder.contract("Airdoge", [
    "0x6a528a18b46aA166C7801bE234DF943dE7bC6b19",
    "0x0F488C8e51a49D729971626987fFf2d4CB66690c"
  ]);

  return {airdg};
});

//router 0xf7237C595425b49Eaeb3Dc930644de6DCa09c3C4

//owner can mint
//
