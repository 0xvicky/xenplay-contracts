# 🐕 ADOGE Token — Predict. Win. Earn.

> A utility token powering a decentralized prediction market on Ascendia Chain (ex-AirDAO)

---

## 🌐 Overview

**ADOGE** is a utility token built for a decentralized prediction market platform — think Polymarket, but on-chain and community driven. Users stake ADOGE to predict real-world outcomes across sports, politics, crypto, and more. Winners earn ADOGE rewards proportional to their stake and prediction accuracy.

---

## 🔗 Token Details

| Property | Details |
|---|---|
| **Token Name** | ADOGE |
| **Network** | Ascendia Chain (ex-AirDAO) |
| **Contract Address** | `0x50c32756E5214443435FD391323f2923C1564153` |
| **Total Supply** | 1,000,000,000 (1 Billion) |
| **Token Standard** | ERC-20 |
| **Decimals** | 18 |

---

## 🎯 What is ADOGE?

ADOGE powers a prediction market where users can:

- 🔮 **Predict** outcomes of real-world events
- 💰 **Stake** ADOGE tokens on their predictions
- 🏆 **Earn** rewards when predictions are correct
- 📊 **Track** market sentiment across multiple categories

---

## 🪂 Airdrop

As part of the initial launch, ADOGE was airdropped to **200+ early community members** and DOGE holders as a reward for their early support.

- Airdrop list: [`airdroplist.json`](./airdroplist.json)
- Token holder balances: [`token_holders_balances.txt`](./token_holders_balances.txt)
- Holder data: [`doge_holders.xlsx`](./doge_holders.xlsx)

---

## 📁 Project Structure

```
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment & utility scripts
│   ├── deploy.js       # Main deployment script
│   ├── airdrop/        # Airdrop distribution scripts
│   ├── burn.js         # Token burn script
│   ├── setTax.js       # Tax configuration
│   ├── setRouter.js    # DEX router setup
│   └── withdrawAmount.js
├── ignition/modules/   # Hardhat Ignition deployment modules
├── constants/          # Deployed addresses & config
└── hardhat.config.js   # Hardhat configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/0xvicky/xenplay-contracts
cd xenplay-contracts
npm install
```

### Setup Environment

```bash
cp .env.example .env
# Add your private key and RPC URL
```

### Compile Contracts

```bash
npx hardhat compile
```

### Deploy

```bash
npx hardhat run scripts/deploy.js --network ascendia
```

### Run Airdrop

```bash
npx hardhat run scripts/airdrop/airdrop.js --network ascendia
```

---

## 🔐 Security

- Contract is deployed and verified on Ascendia Chain
- Private keys are never committed to this repository
- All sensitive data is managed via `.env` files

---

## 📜 License

MIT License — feel free to fork and build on top of this!

---

## 🤝 Connect

Built with ❤️ by **0xvicky**

> *Predict the future. Earn the present.*