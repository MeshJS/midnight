import { webcrypto } from 'crypto';
import path from 'path';
import { currentDir } from './config';
import { createLogger } from './logger-utils';
import { type TestConfiguration, TestEnvironment, TestProviders } from './localTest-class';
import { nativeToken, tokenType } from '@midnight-ntwrk/ledger';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import type { Resource } from '@midnight-ntwrk/wallet';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as utils from '../utils/index.js';
import { API, type Providers } from '../index';

const my_own_wallet = '5feff6534cae3d59e03275b299f2cd052e02e2084cfd63c4fff2568971c1343e|0300aa6a2d2ed980354bc5f14d595e6b6d8bd740bb99e9115c167c357e2b52865cb808f54d5ce551b5d79df33bb3878baaba5aa8a1be4d510b88'
const logDir = path.resolve(currentDir, '..', 'logs', 'tests', `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

// @ts-expect-error It is required
globalThis.crypto = webcrypto;

globalThis.WebSocket = WebSocket;

let testEnvironment: TestEnvironment;
let testConfiguration: TestConfiguration;
let wallet: Wallet & Resource;
let providers1: Providers;
let owner: API;
let tokenAddress: ContractAddress;
let keepAliveInterval: any;

beforeAll(async () => {
  testEnvironment = new TestEnvironment(logger);
  testConfiguration = await testEnvironment.start();
  wallet = await testEnvironment.getWallet1();
  console.log("fase1")
  providers1 = await new TestProviders().configureTokenProviders(wallet, testConfiguration.dappConfig);
  console.log("fase2")
  const contractPrivateId1 = 'owner';
  owner = await API.deploy(contractPrivateId1, providers1, logger); 
  console.log("fase3")
  tokenAddress = owner.deployedContractAddress;
  logger.info({tokenAddress});

  keepAliveInterval = setInterval(() => {
    console.log('Keeping container alive...');
  }, 60000); // every 60 seconds
});

afterAll(async () => {
  try {
    // await testEnvironment.shutdown();
    clearInterval(keepAliveInterval);
    await new Promise(() => {});
  } catch (e) {
    // ignore
  }
});

async function sendNativeToken(address: string, amount: bigint): Promise<string> {
  const transferRecipe = await wallet.transferTransaction([
    {
      amount,
      receiverAddress: address,
      type: nativeToken(),
    },
  ]);
  const transaction = await wallet.proveTransaction(transferRecipe);
  return await wallet.submitTransaction(transaction);
}

async function sendCustomToken(address: string, amount: bigint): Promise<string> {
  const transferRecipe = await wallet.transferTransaction([
    {
      amount,
      receiverAddress: address,
      type: tokenType(utils.pad('mesh_coin', 32), tokenAddress),
    },
  ]);
  const transaction = await wallet.proveTransaction(transferRecipe);
  return await wallet.submitTransaction(transaction);
}

test('prepare local env', async () => {
  // fund my wallets
  await sendNativeToken(
    my_own_wallet,
    10000n * 1000000n,
  );
  console.log('funded');

  await owner.mint();

  await sendCustomToken(
    my_own_wallet,
    100n,
  );

  await wallet.close();
});
