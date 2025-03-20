# Edda Labs - Auction Platform
<div align="center">
  <img src="https://res.cloudinary.com/dsj3o4xyn/image/upload/v1741022494/Cover_pxmy2c.jpg" alt="Development Process snapshot" width="900" height="500">
</div>


## 📱 Overview
This repository features a fully functional decentralized application (DApp) built with Midnight technology that leverages zero-knowledge proofs to securely authenticate users bidding on house sales. It integrates smart contracts written in Midnight’s Compact language to generate proofs verifying aspects of a digital identity, and it boasts a sleek, modern, and intuitive user interface designed to provide an exceptional user experience. The application connects seamlessly with Lace Wallet, uses mocked off-chain data for demonstration purposes, and includes sections for minting the token necessary to perform bids, an administration section for administering bidding rooms, and a user section where users place bids and authenticate themselves.

## 📇 Purpose of the DApp
- We've worked hard to make this repository easy to use, enabling every developer to deploy their own application with their own tokens. By integrating Ngrok, developers can quickly launch their applications, share them with friends and colleagues, and iterate rapidly. This repository is dedicated to education and accelerated development.
- Demonstrate Midnight's capabilities of performing restrictive logic on a decentralized ledger based on private information.
- Demonstrate how decentralized identity can be seamlessly integrated within the Midnight platform.
- Showcase the necessity and effective use of zero-knowledge proofs (ZKPs) to prove information without revealing it, ensuring privacy and trustlessness.
- Highlight Midnight's ability to enable the development of end-to-end decentralized applications that combine secure computation, privacy, and usability.
- Provide a real-world example of how private and complex logic can be executed seamlessly while maintaining user confidentiality, leveraging Midnight's Compact smart contracts, APIs, providers and Lace Wallet.

## 🕹️ Demo
We’ve prepared a series of demo videos to showcase the key features of the auction platform. In these videos, you'll see how to:

- Connect your wallet and get an overview of the DApp (1:06). [Watch video](https://drive.google.com/file/d/1kZJtYNNzyqbFxfZA2KGaPLAAMKkrcB4V/view?usp=sharing)
- Mint tBID tokens (0:42). [Watch video](https://drive.google.com/file/d/1c-IITNw1wMWHlVb959mef1sd6JpgMFlt/view?usp=sharing)
- Create an auction (1:06). [Watch video](https://drive.google.com/file/d/1QXvHvXIw8PkAECvX8-zH79zOx3b6nz7r/view?usp=sharing)
- Register for an auction (1:02). [Watch video](https://drive.google.com/file/d/1dQVb-5h36ZB2nkL0Hoe12zGLA9skcQY-/view?usp=sharing)
- Admin approves certificates (0:43). [Watch video](https://drive.google.com/file/d/10fVSQ2WixWvdnYN-rgABugsC-aPoWnnc/view?usp=sharing)
- Start an auction as an admin (0:59). [Watch video](https://drive.google.com/file/d/1petEj78KlQEx_4YeoJfoIfMrx90ZCNYk/view?usp=sharing)
- Place a bid (1:11). [Watch video](https://drive.google.com/file/d/1LO-zb_bBHWzkam8xyhsAoxMYmG8pPpGj/view?usp=sharing)
- Close an auction (1:02). [Watch video](https://drive.google.com/file/d/18Gfa_0x5L-xSc0eHt1VE8Qbi3gE0OLYg/view?usp=sharing)

## 📜 How to use the platform
This auction platform offers a decentralized, secure, and transparent bidding experience without relying on traditional web2 authentication, ensuring that your private data remains protected. Instead, it uses the Coin public key for user authentication, along with decentralized identifiers issued by authorized issuers (stored in a local database) for access control and identity verification. The platform is structured to provide distinct functionalities for administrators, regular users, and token minting, while delivering a sleek, intuitive, and engaging user interface. We've put a lot of effort into the details to ensure the experience is not only secure but also easy to use and visually appealing.

### Admin
- Administrators can open bidding rooms for auctions by setting details such as the bid title, description, house image, and minimum bid—all securely recorded on the blockchain for full transparency. They also specify the opening and closing times for each room to establish a clear auction timeline.
- Start and close bidding rooms.
- Approve certificate hashes from registered users—these hashes can later be verified with the issuer without revealing any additional information. The administrator will only check that the hash is valid and was emitted by an authorized issuer by confirming its existence, ensuring that no further details are disclosed and that private information remains secure.
- When a bidding room is closed, the administrator collects the accumulated funds for future management.
- This feature is available to all users, so any user who creates a bidding room automatically gains administrator privileges.

### Users 
- Users can register for any open bidding room as long as they possess an identifier that complies with the bidding room's requirements. For this auction platform, users must meet four prerequisites: they must be the owner of the certificate (controlled by the Coin Public Key), be over 18 years old, AML compliant, and free of any issues with local jurisdiction regulations.
- In this version of the platform, we are using mock data that includes four different certificates—some that meet all prerequisites for testing and others that do not. Despite using simulated data, we have designed the architecture to support integration with various issuers and decentralized identity frameworks. This is detailed in the arquitecture section, which lays the foundation for future work streams. 
- Once a bidding room is closed to new registrations, continue to place bids during the auction.
- Place bids that must exceed the previous highest bid, with the contract refunding the prior highest bid to its owner.

### Minting
- Mint the token necessary for placing bids.
- Each token costs 1 tDUST, and tokens can be minted in chunks of 100, provided that the user has sufficient tDUST available.
- The owner of the bidding tokens can withdraw the funds accumulated in the treasury from the sale of bidding tokens.

## 🔨 Build

### Prerequisites

- [Midnight Compact compiler](https://docs.midnight.network/develop/tutorial/building/prereqs#midnight-compact-compiler)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/)

### Compiler configuration:

- Ensure your compact compiler environment variable is configured by running:
```shell
     echo $COMPACT_HOME
     compactc --version
```    
- If nothing is returned, add the following line to your bashrc file (Linux), making sure to update the path to your compact binaries location:
```shell
    export COMPACT_HOME="<YOUR-COMPACT-COMPILER-LOCATION>"
    export PATH="$COMPACT_HOME:$PATH"
```

### Build the repository
```shell
    yarn 
    yarn build
```

## ⚗️ Test

```shell
    npx turbo test
```

## 🖥️ Run locally - Standalone Network
- **Initialize Network Variables:** Update "my_own_wallet" variable with your own wallet address from Lace Wallet:
    - [prepare-local-standalone-env.test.ts](token-api/src/test/prepare-local-standalone-env.test.ts)      
- **Initialize Midnight instances and token smart contract.** Make sure to have docker engine running.
```shell
    yarn environment
```
- **Initialize UI Variables:** Create a .env file at the ui-pages level based on the [.env.example](ui-pages/.env.example). The PostgreSQL password will be generated in the next step, so just copy the format provided in the .env.example file. Optionally, insert your Blockfrost key. The token smart contract address was generated and displayed in the console when you ran "yarn environment"—simply copy the address  and paste it into your .env file<br>

- **Initialize UI server and Postgres Database.** Running Ngrok is Optional (domain need to be updated in the package.json):
```shell
    cd ui-pages 
    yarn dev
    yarn db:init
    yarn ngrok:init
```
- Set your Lace wallet network to "Undeployed" and ensure it's fully synced. You should then see a balance of 10,000 tDust and 100 tBid tokens.
- Go to https://localhost:3000/ using Chrome browser and start setting up bid rooms and making bids 🤓

## 🏯 Tech Stack 
- Compact Compiler: v0.21.0
- Compact Language: 0.14.0
- Proof-server: 3.0.2
- Midnight-pubsub-indexer: 2.2.7
- Midnight-node: 0.6.6-6288973b
- Midnight SDK: compatible with example 0.1.17
- Lace Wallet: v1.2.5
- Midnight Vscode extension: v0.2.13
- Frontend: React & Next 15.
- Reactivity: RX-JS library.

## 🎇 Arquitecture
Below is an overview of how Midnight technology integrates with authorized issuers and various decentralized identity frameworks, as illustrated in the attached diagram.

The architecture features three main participants: the Issuer, the User, and the DApp. The Issuer plays a critical role by performing various off-chain checks—such as wallet verification, KYC, and AML—to act as a robust identity verifier. In doing so, it supports multiple identity frameworks, including Identus and KERI. The issuer issues hashed certificates that prove user attributes (such as age, AML compliance, or local jurisdiction clearance) and stores these certificate hashes in an Issuer Smart Contract, marking them as valid or revoked. No personal information is exposed in this process; only the hash and its status are recorded, ensuring that sensitive data remains private.

On the user side, individuals hold their private certificates and utilize Midnight’s zero-knowledge proof (ZKP) circuits to demonstrate compliance without revealing any underlying personal data. When interacting with the DApp Smart Contract, they reference the valid certificate hashes from the Issuer Smart Contract to prove their eligibility—for example, to participate in auctions or access specific features—while keeping all confidential information hidden.

The DApp relies on these ZKP proofs to verify that a user meets the necessary requirements without ever handling sensitive data directly. Cross-smart-contract communication allows the DApp to confirm the validity of certificate hashes and any associated revocations, guaranteeing that only legitimate certificates are used.

By employing Midnight technology, this system preserves privacy by only sharing proof of compliance, enhances security through cryptographic verification of certificate hashes and ZKPs, and maintains decentralization by storing the relevant data and logic on-chain. The platform’s design offers flexibility for integrating with multiple identity frameworks—enabling a wide range of future use cases that benefit from verifiable and privacy-preserving identity solutions.

Midnight’s Compact language also provides primitives for digital signature verification within ZK circuits. In this particular setup, digital signature checks are not strictly necessary because cross-smart-contract communication handles the validation. This approach reduces the complexity and cost of the circuits while supporting the critical ability to revoke signatures—a key feature for decentralized identity scenarios where certificates may need to be invalidated without revealing sensitive details.

<div align="center">
  <img src="https://res.cloudinary.com/dsj3o4xyn/image/upload/v1740919481/Arquitecture_m5aj9t.jpg" alt="Development Process snapshot" width="1000" height="800">
</div>



## 🔧 Development Process 
The development process was divided into four phases, each focusing on a key aspect of the DApp development and its features:
### Phase#1: Contract & Witness Logic, contract compilation (COMPACT) and Unit Testing
- Compile Contract using comptactc 
- Build the contract using yarn build
- Test the contract using yarn test

### Phase#2: Contract API, Midnight SDK and Local Network Testing
- Elaborate the API and build it using yarn build
- Elaborate the test Class and run it with yarn test

### Phase#3: React Integration with Providers and Hooks
- Three context providers and hooks are build for each contract: Deployments, localStorage and Providers.

### Phase#4: UI Integration with subscription hooks and libraries
- Specific hooks for subscribing to observables are built here.
- Connection with dB in case is necessary.
- UI
- Midnight wallet Widget.

<div align="center">
  <img src="https://res.cloudinary.com/dsj3o4xyn/image/upload/v1740826655/framework_lcryjv.png" alt="Development Process snapshot" width="800" height="800">
</div>

### Workspaces
The auction platform is powered by two distinct smart contracts: one mints the token required to place a bid, and the other handles the auction/identity logic. The repository is organized into workspaces, each dedicated to a specific phase or contract:

- **`token-contract`**: Phase#1 implementation for token contract.
- **`token-api`**: Phase#2 implementation for token contract.
- **`auction-contract`**: Phase#1 implementation for auction/identity contract.
- **`auction-api`**: Phase#2 implementation for auction/identity contract.
- **`compact`**: Wrapper of Compact compiler.
- **`ui-pages`**: Phase#3 and Phase#4 for token and auction/identity contract.

## 🌟 Innovation - Pushing the boundaries
- **`Mesh SDK for Midnight:`** 
A groundbreaking development is the creation of the Mesh SDK - Midnight package, which is designed to simplify the development process for business developers. For this project, we have delivered a wallet widget that allows developers to plug and play a complete, working wallet component directly into their applications. The SDK will be deployed in four distinct phases, explained above in the Development Process section, enabling developers to engage at various levels of abstraction according to their expertise and needs. Notably, phase #4 of the SDK for the auction & token contract provides ready-to-use providers and hooks. This means that developers do not need to grasp the underlying intricacies of Midnight technology—understanding the business logic and having basic React knowledge is sufficient. This phased approach balances flexibility with readiness, fostering a more accessible and robust development ecosystem on the Midnight platform.

- **`Developer-Friendly Repository for Education and Rapid Development:`** 
We understand the challenges new developers face when setting up, testing, and running decentralized applications. To address these pain points, this repository is built with a strong focus on education and rapid local development. Developers can quickly get the application running on their local machines without the need to host or sign up with any cloud provider. With NGROK integration, sharing the application with friends and other developers is seamless, eliminating traditional barriers and accelerating the learning process. No more pain testing Midnight functionalities—just plug in, start learning, and iterate.

- **`Robust Revocation Logic Without Digital Signatures:`** 
Our design intentionally avoids relying on digital signature verification within the zero-knowledge circuits, as digital signatures are effective for validating data integrity but do not offer a mechanism for revoking certificates. Recognizing the necessity of a revocation process in decentralized identity management, revocation is currently performed manually by the administrator, who checks the issuer's list of approved certificate hashes. In a future work stream, we plan to integrate automated revocation logic through cross-contract communication. This approach allows any certificate to be promptly revoked when necessary while avoiding the additional overhead and compatibility challenges that come with incorporating diverse cryptographic primitives, thereby maintaining both security and efficiency.

- **`Integrated Token-Based Bidding:`** 
Both smart contracts are seamlessly integrated so that the tokens minted by the Token Smart Contract serve as the exclusive currency for placing bids. No other coins are accepted, ensuring a consistent and secure economic model throughout the auction process.

- **`Certificate Ownership Binding:`** 
Each certificate is tied to the owner's coin public key and is verified within the circuit. This binding means that even if a certificate is compromised, it cannot be misused unless the attacker also controls the corresponding Midnight wallet, thereby exponentially enhancing security and identity control.

- **`Automated Treasury Management:`** 
The token smart contract not only mints and manages bidding tokens but also includes a treasury mechanism, allowing the owner to withdraw accumulated funds at any time for streamlined financial oversight.

- **`Zero-Knowledge Proofs for Identity Verification:`**
Implementing ZKP circuits with Midnight technology allows us to verify user attributes and eligibility without exposing sensitive personal data.

- **`Decentralized Identity Integration:`** 
The platform supports various decentralized identity frameworks (such as KERI and Identus) and leverages off-chain checks (KYC, AML, wallet verification) to ensure robust identity verification.

- **`Intuitive User Interface & Experience:`** 
A sleek and engaging UI has been developed to make the platform accessible and user-friendly, ensuring that both administrators and participants can navigate complex decentralized processes with ease.

- **`Robust Testing Framework:`** 
A comprehensive suite of unit, integration, and simulation tests validates the functionality and security of the smart contracts, maintaining the platform's reliability and integrity as it evolves.

- **`Future-Ready Architecture:`** 
Designed for scalability and adaptability, the architecture lays a solid foundation for integrating additional identity frameworks and advanced automation features in future iterations.


## 📋 Contract Features
The platform leverages a set of smart contracts that provide core functionalities for decentralized auctions and identity verification. These features are organized into three main areas:

### Token Smart Contract:
The Token Smart Contract is responsible for minting and managing the tokens necessary for placing bids. It enforces a fixed token cost (e.g., 1 tDUST per token) and supports minting in predetermined batch sizes, ensuring users have the required tokens to participate in auctions. Additionally, this contract manages a treasury, allowing the owner to withdraw funds at any time, thus streamlining the financial management of the platform.

- Contract Control 
    ```typescript
    export ledger counter: Counter;
    export ledger nonce: Bytes<32>;
    export ledger tvl_token: Uint<64>;

    export ledger reward: QualifiedCoinInfo;  
    export ledger tvl_dust: Uint<64>;
    export sealed ledger owner_public_key: ZswapCoinPublicKey;
    ```
    ```typescript
    assert coin.value == 100000000 "requires 100 * 1000000 t-dust";
    assert coin.color == native_token() "Invalid coin provided";

    export sealed ledger owner_public_key: ZswapCoinPublicKey; //This is being controled by the owner's ZswapCoinPublicKey and checked by a circuit

    constructor(initNonce: Bytes<32>) {
    nonce = initNonce;
     owner_public_key = own_public_key();
    } //The owner is initialized only during the contract deployment and it is protected by the sealed command

    const send_result =  send(reward, left<ZswapCoinPublicKey, ContractAddress>(owner_public_key), reward.value); //The contract handles a treasury and only pays to the owner
    ```

- Circuits
    ```typescript
    export circuit mint(coin: CoinInfo): [] {...}
    export circuit owner_withdraw(): [] {...}
    ```

### Auction/Identity Smart Contract
The Auction/Identity Smart Contract handles the core auction logic, including the creation and management of bidding rooms, the verification of user eligibility via certificate hashes, and the processing of bids. It integrates decentralized identity verification by ensuring that only users meeting the defined criteria—such as age, AML compliance, and jurisdiction requirements—can participate. The contract also manages the approval and rejection of registration hashes. While this process is currently performed manually by the administrator, it can be optimized for automation once cross-contract communication capabilities are available in Midnight. Furthermore, the contract handles bid refunds to previous highest bidders, all while maintaining transparency and security on-chain.

An interesting feature incorporated into the auction module is that each certificate is bound to the owner's coin public key, which is verified within the circuit. This means that even if a user loses control of the certificate, it cannot be exploited unless the entity also controls the corresponding user's Midnight wallet. This design significantly enhances the security of the platform and reinforces identity control.

- Witness Control: 
    ```typescript
    witness local_secret_certificate(): Certificate;  //The certificate holds information such as age, AML, jurisdictions, owner ZswapCoinPK, issuer and SK
    ```  
- Contract Control 
    ```typescript
    export sealed ledger reward_coin_color: Bytes<32>; 
    export sealed ledger admin_public_key: ZswapCoinPublicKey;
    export ledger registered_hashes: Map<Bytes<32>, Boolean>;

    export ledger state: STATE;
    export sealed ledger title: Opaque<"string">;
    export sealed ledger description: Opaque<"string">;
    export sealed ledger estimatedValue: Uint<128>;
    export sealed ledger deadline: Opaque<"string">;
    export sealed ledger image: Opaque<"string">;

    export ledger instance: Counter;
    export ledger highest_bidder: Maybe<ZswapCoinPublicKey>;
    export ledger highest_bid: Uint<128>; 
    export ledger treasury: QualifiedCoinInfo;
    export ledger treasury_balance: Uint<128>;

    constructor(token_address: ContractAddress, title_: Opaque<"string">, description_: Opaque<"string">, estimatedValue_: Uint<128>, deadline_: Opaque<"string">, image_: Opaque<"string">) {...}

    assert (admin_public_key == own_public_key()) "You are not the admin";
    assert (state == STATE.open) "The auction is not open";
    assert (state == STATE.active) "The auction has not yet started"; 
    assert (certificate.age > 18) "You must be over 18 to participate";
    assert (certificate.aml == true) "You must be AML compliance to participate";
    assert (certificate.jurisdiction == true) "You must be jurisdiction compliance to participate";
    assert (certificate.owner == own_public_key()) "You must be the owner of the certificate to register";
    assert (registered_hashes.member(registration_hash(certificate))) "You are not registered";
    assert (registered_hashes.lookup(registration_hash(certificate)) == true) "Your registration is not approved";
    assert (coin.color == reward_coin_color) "Invalid coin provided"; 
    assert (coin.value > highest_bid) "requires to be higher than previous bid";

    send(treasury, left<ZswapCoinPublicKey, ContractAddress>(highest_bidder.value), treasury.value);  //the contract always return the balance of the previous highest bidder automatically when a highest bid is placed.
    ```  

- Circuits
    ```typescript
    export circuit start_bid(): [] {...}
    export circuit close_bid(): [] {...}
    export circuit approve_certificates(approved_hashes: Vector<10, Maybe<Bytes<32>>>): [] {...}
    export circuit register(): [] {...}
    export circuit make_bid(coin: CoinInfo): [] {...}
    ```

### Test Framework
The Test Framework module rigorously validates the functionality of both the Token and Auction/Identity smart contracts. It comprises unit tests, integration tests, and simulation scenarios to ensure that the contracts perform as expected under various conditions. This framework is essential for maintaining the reliability, security, and overall integrity of the platform as it evolves.

## 🔩 SDK Features
- **`Plug-and-Play Wallet Widget:`**
A fully functional wallet widget that enables developers to quickly integrate a complete, ready-to-use wallet component into their applications without extensive setup.

- **`Pre-Built Hooks and Providers:`**
In phase#3 of the SDK, ready-to-use hooks and providers for the auction & token contract are included. Developers can focus on business logic and user experience without needing in-depth knowledge of the underlying Midnight technology.

- **`Smart Contract Integration Hooks:`**
In phase#4, the SDK provides hooks for integrating and executing smart contract actions within the UI. These hooks automatically subscribe to observables, ensuring that any state changes in the contract—such as transaction results or updated values—are reflected in real time in the UI.

- **`Seamless Browser Integration with Lace Wallet:`**
The SDK enables easy connection and signing of blockchain transactions directly via the browser's Lace Wallet, ensuring a smooth and secure user experience.

- **`Exclusive Token Integration:`**
The SDK enforces that only the tokens minted by the platform's token smart contract are accepted for bidding—no other coins are allowed. This integration creates a consistent and secure economic model throughout the application.

- **`Modular, Phased Architecture:`**
Deployed in four distinct phases, the SDK caters to developers with varying levels of expertise. Each phase offers increased abstraction and functionality, allowing developers to work at the level that best suits their needs.

- **`Local Network Simulation:`**
Configured a local network to simulate testnet operations (undeployed), enabling rapid prototyping and testing of contract deployments.

- **`Robust Contract API:`**
Developed a comprehensive Contract API as a TypeScript class using providers. This API manages deployments, user interactions, and contract-circuit operations, centralizing the logic for easier maintenance.

- **`Real-Time Transaction Handling:`**
Implemented functionality for submitting transactions and verifying results in real time, with automated error handling and transaction monitoring to ensure smooth operations.

- **`Real-Time Responsiveness:`**
Achieved live updates through the use of indexer WebSockets, observables, and RX-JS tools within the Contract API, ensuring that the UI remains up-to-date without needing page refreshes.

- **`Headless Wallet Integration:`**
Incorporated a headless Lace wallet implementation to facilitate seamless blockchain transaction signing without UI overhead.

- **`Streamlined Development Process:`**
Adhered to best practices by utilizing workspaces and Turbo for efficient installation and development. Developers can compile and build the source code for Phase#1, Phase#2 and Phase#3 with a single command (yarn build).

- **`Extensive Unit Testing:`**
Performed unit testing using Docker, a local network, providers, and Jest, along with an instance of the Contract API class. Tests simulated multiple users (each represented by a separate certificate via an in-memory private provider).

## 📱 Application Features

- **`Real-Time Blockchain Updates:`**
The platform provides live updates for all blockchain actions, ensuring that bid submissions, token minting, and transaction statuses are immediately reflected in the UI.

- **`Dynamic Auction Dashboard:`**
A dynamic dashboard displays the current highest bid, remaining time, and live auction status, keeping users fully informed throughout the bidding process. Real-time statistics such as the current highest bid, token balances, and auction countdowns are displayed, providing users with all the necessary information to participate effectively.

- **`Focused Auction Overview:`**
Each user is presented with a clear view of the current auction status—showing real-time bid values and countdowns.

- **`User-Friendly Notifications:`**
The UI features unambiguous indicators for bid acceptance, rejections, and auction outcomes, so users can immediately understand the status of their actions. Instant feedback is provided through toasters and notifications for events like invalid bids, loading states, and disconnected wallets, ensuring a seamless user experience.

- **`Responsive, Desktop-Optimized Interface:`**
The platform is optimized for desktop devices, ensuring smooth and efficient interactions with a clean, modern design.

- **`Active Bidder Highlighting:`**
The current highest bid is prominently highlighted, drawing attention to critical updates during the auction.

- **`Bid Validation Controls:`**
The system enforces valid bid amounts based solely on the auction's timing, certificate credentials and highest value criteria, preventing any out-of-range or invalid bids.

- **`Certificate Selection for Bidding:`**
Before registering, users have the option to select which certificate they want to use for placing bids. This step ensures that the chosen certificate meets the auction's requirements and reinforces secure, decentralized identity verification.

- **`Automated Winner Declaration:`**
Once the auction period ends or no further bids are received, the platform automatically declares the winner based on the highest bid.

- **`Intuitive Bid Placement:`**
Users can easily place bids with a simple click, streamlining the process and ensuring that transactions are executed quickly and efficiently.

- **`Minting Functionality:`**
The system includes a seamless token minting process, where users can mint the exclusive tokens required for bidding. The Token Smart Contract enforces a fixed token cost and supports minting in predetermined batch sizes, ensuring that only these tokens are used throughout the auction.

- **`Admin Control Panel:`**
Administrators benefit from a dedicated control panel featuring intuitive tools to manage auction rooms, approve or reject registration hashes, and monitor real-time auction activities, all within a user-friendly interface.

- **`Clean and Intuitive UI Design:`**
The overall interface is designed with clarity and simplicity in mind, providing an optimal experience for both regular users and administrators alike.

## 🕜 Upcoming Features

- **`Notion of Time within Compact:`**
A robust timing mechanism that will allow smart contracts to enforce deadlines, manage auction durations, and control time-based conditions within the Compact language. This feature is planned for future implementation as support for timing logic is introduced.

- **`Cross-Contract Communication:`**
An automated cross-contract communication system is on our roadmap. This will enable seamless interactions between different smart contracts—optimizing processes like registration hash approvals and certificate revocation—once Midnight provides native support for such capabilities.

- **`Recursive Zero-Knowledge for Cross-Blockchain Communication:`**
Future work will explore recursive zero-knowledge proofs that enable verifiable interactions across multiple blockchain networks. This feature aims to further decentralize identity verification and enhance interoperability, taking advantage of advanced cross-blockchain communication techniques.

## 🛠️ Findings or Improvements

### Phase#1 Succeeds but Phase#2 Fails:
- merge_coin Functionality: When using merge_coin together with CoinInfo and Write_coin, the Phase 1 test passes, but Phase 2 fails.
- Circuit Sizes: Phase1 does not take this in consideration.
- Testing Framework Limitations: Phase 1 only considers private states and the logic derived from coins received through circuits. The testing framework does not account for ZswapCoinPks (which are populated with zeros in every case) and does not track any Zswap coin balances.

### Coins Lost or Not Tracked by the Wallet:
- If the Kachina proof is generated and the transaction is signed, an immediate browser refresh causes the wallet to lose track of coin balances. However, if you wait until both proofs (Kachina and Zwap) are generated, this issue does not occur.

### General Issues:
- Next App Router not compatible with some Midnight Libraries, specifically the public provider.
- New versions released with examples 0.2.0 are failing when minting tokens.

## 📜 Midnigh Background knowledge

### Contract instance
- circuits: post, public_key, take_down
- impureCircuits: post, take_down
- initialState
- witnesses: local_secret_key

### Circuit Result
- Context: currentPrivateState, currentZswapLocalState, originalState, transactionContext
- Proof Data: input, output, privateTranscriptOutput, publicTranscript
- Result

### Deployed Contract
- CallTx: access to circuits, after submitting a circuit you get the resulted deployedTxData
- deployTxData: public, private
- public: blockhash, blockHeight, contractAddress, initialContractState, status, tx, txHash, txId
- private: initialPrivateState, signingKey
- circuitMaintenanceTx: access to circuits
- contractMaintenanceTx: replate author

### Providers
- Midnight Provider: submitTx
- Private State Provider: clear, clearSigningKeys, get, getSigningKey, remove, removeSigningKey, set, setSigningKey
- Proof Provider: proofTx
- Public Data Provider: contractStateObservable, queryContractState, queryDeployContractState, queryZSwapAllContractState, watchForContractState, watchForDeployTxData, watchForTxData
- Wallet Provider: balanceTx, coinPublicKey
- ZK Config Provider: get, getProverKey, getVerifierKey, getVerifierKeys, getZKIR

### Initialization
- First spin up instances
- Configure wallet (need instances)
- Configure providers (depend on wallet & need instances)
- CallTx (depend on providers)




