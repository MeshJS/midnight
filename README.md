# Mesh Midnight

Midnight is a next-generation blockchain that protects user, business, and transaction data. Its zero-knowledge (ZK) proofs ensure privacy without compromising data protection or ownership.

Mesh Midnight provides tools, documentations, and education materials to remove the barriers preventing organizations and service providers from leveraging Midnight technology.

[midnight.meshjs.dev](https://midnight.meshjs.dev/)

# 🌌 Midnight Examples Guide – Powered by Mesh & Edda Labs

> **Unleash the power of privacy with Zero-Knowledge proofs**  
> A developer-friendly walkthrough for setting up, compiling, and testing **Midnight smart contracts** – featuring **Counter** and **Bulletin Board** examples.

---

## 📜 Table of Contents
1. [🚀 Introduction](#-introduction)
2. [🖥️ Prerequisites](#-prerequisites)
3. [🔧 Environment Setup](#-environment-setup)
4. [📦 Clone & Build Midnight Examples](#-clone--build-midnight-examples)
5. [🧮 Counter Contract](#-counter-contract)
6. [📢 Bulletin Board Contract](#-bulletin-board-contract)
7. [🌐 UI Testing in Browser](#-ui-testing-in-browser)
8. [💡 Bonus Tips](#-bonus-tips)
9. [📚 Resources](#-resources)

---

## 🚀 Introduction

Welcome to the **Midnight Developer Experience**! This guide walks you through setting up your system to **build, deploy, and test privacy-preserving smart contracts** on the Midnight blockchain.

Using **Mesh Midnight’s tools** and the **official examples** by Midnight’s core team, you’ll work hands-on with:

- 🧱 **Compact DSL Compiler**  
- 🧪 **Zero-Knowledge Proof Server (Docker)**  
- 🛠️ **Node.js Projects with TurboRepo**  
- 🌍 **Local Testnet & Standalone Configurations**

---

## 🖥️ Prerequisites

| Tool / Software       | Version         | Purpose                                  |
|-----------------------|-----------------|------------------------------------------|
| Windows Subsystem for Linux (WSL2) | Latest          | Linux environment on Windows            |
| Docker Desktop        | Latest          | Hosting Proof Server, Node, Indexer     |
| VS Code               | Latest          | IDE with Compact DSL plugin             |
| Lace Wallet           | v1.2.5          | Midnight-compatible wallet               |
| Node.js               | v18             | Required for building Midnight examples |
| Yarn                  | Latest          | Package manager                         |
| Compact Compiler      | v0.22           | Compile Midnight circuits               |

> ⚙️ **Optional Tools**: Git CLI, NVM (Node Version Manager)

---

## 🔧 Environment Setup

1. **Install WSL2**  
   ```bash
   wsl --install
   wsl --list --verbose
Install Docker Desktop

Enable WSL2 Integration in settings
Confirm install via Docker GUI
Install Lace Wallet (Manual Extension)

Download v1.2.5 → unzip
Load unpacked extension in Chrome (Developer Mode ON)
Sync to Midnight Testnet & Fund via Faucet
Install Compact Compiler

Download binary → unzip into ~/my-binaries
Update .bashrc to include binary path
Test: compactc --version
Install Compact Plugin (VSCode)

Download .vsix plugin file
Install from VS Code extensions: “Install from VSIX”
📦 Clone & Build Midnight Examples
Clone Repo from Mage Organization:

bash
Copy
Edit
git clone https://github.com/MageOrg/midnight-examples.git
cd midnight-examples
Ensure Correct Node Version:

bash
Copy
Edit
nvm install 18
nvm use 18
yarn --version
Install Dependencies & Build:

bash
Copy
Edit
yarn install
npx turbo run build
🧮 Counter Contract
Mode	Description
Testnet Remote	Uses Midnight-hosted services + local proof
Standalone Local	Runs everything via Docker locally
👉 Running (Testnet Remote):
bash
Copy
Edit
cd packages/counter-cli
yarn testnet-remote
Choose New Wallet
Fund test wallet from Lace
Deploy Contract → Increment → Verify Value
👉 Running (Standalone):
bash
Copy
Edit
docker stop proof-server
yarn standalone
Spins up: Node, Proof Server, Indexer
Deploy → Increment Counter → Verify
📢 Bulletin Board Contract
Features:
Post & Erase Messages
View Ledger & Private State
👉 Running CLI (Testnet Remote):
bash
Copy
Edit
cd packages/bulletin-board-cli
yarn testnet-remote
Create wallet → Fund → Deploy Contract
Post message “Hello all” → View Ledger
👉 Running CLI (Standalone):
bash
Copy
Edit
docker stop proof-server
yarn standalone
Docker spins up 3 services
Post + Erase message with proof logs visible
🌐 UI Testing in Browser
Serve Bulletin Board UI

bash
Copy
Edit
cd packages/bulletin-board-ui
yarn start
Open: http://localhost:3000

Wallet Connected (Lace)
Proof Server Running
Testnet Network Configured
Actions:

Create Bulletin → Post “Hello all from browser”
Erase Message → View Logs
💡 Bonus Tips
Task	Command / Tip
Check Proof Server Logs	Docker Desktop → Container Logs
Reset Docker Instance	CTRL+C to stop instance, re-run command
Fix Network ID Errors	Check main.ts → networkId: "testnet"
Faster Rebuild of UI	yarn build in bulletin-board-ui only
📚 Resources
🌐 Mesh Midnight Docs: midnight.meshjs.dev
📖 Compact DSL Docs: compat.meshjs.dev
🧱 Midnight Examples Repo: MageOrg/midnight-examples
🧪 T-DUST Faucet: tadafaucet.midnight.dev
🧭 Conclusion
You’ve just set up a fully functional Midnight development environment with privacy-preserving smart contracts! Whether running on Testnet or entirely local, you’re now ready to explore ZK-powered applications on Midnight.
Next Up: Dive into the code structure and build your own custom circuits.







