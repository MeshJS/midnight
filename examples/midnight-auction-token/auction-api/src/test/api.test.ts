import { type Resource } from '@midnight-ntwrk/wallet';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import { webcrypto } from 'crypto';
import path from 'path';
import { API, type Providers, emptyState } from '../index';
import { API as tokenAPI, type Providers as TokenProviders, emptyState as tokenEmptyState } from '@meshsdk/token-api';
import { TestEnvironment, TestProviders } from './auction-localTest-class';
import { currentDir } from './config';
import { createLogger } from './logger-utils';

import { encodeTokenType, nativeToken, type ContractAddress } from '@midnight-ntwrk/ledger';
import * as utils from '../utils/index.js';
import { Certificate, Maybe } from '@meshsdk/auction-contract';
import { encodeCoinPublicKey } from '@midnight-ntwrk/compact-runtime';

const logDir = path.resolve(currentDir, '..', 'logs', 'tests', `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

// @ts-expect-error It is required
globalThis.crypto = webcrypto;

globalThis.WebSocket = WebSocket;

describe('Game', () => {
  let testEnvironment: TestEnvironment;
  let wallet1: Wallet & Resource;
  let wallet2: Wallet & Resource;
  let providers1: Providers;
  let providers1_token: TokenProviders;
  let providers2: Providers;
  let providers2_token: TokenProviders;
  let tokenAddress: ContractAddress;

  beforeAll(async () => {
    testEnvironment = new TestEnvironment(logger);
    const testConfiguration = await testEnvironment.start();
    wallet1 = await testEnvironment.getWallet1();
    wallet2 = await testEnvironment.getWallet2();
    providers1 = await new TestProviders().configureProviders(wallet1, testConfiguration.dappConfig);
    providers1_token = await new TestProviders().configureTokenProviders(wallet1, testConfiguration.dappConfig);
    providers2 = await new TestProviders().configureProviders(wallet2, testConfiguration.dappConfig);
    providers2_token = await new TestProviders().configureTokenProviders(wallet2, testConfiguration.dappConfig);
  });

  afterAll(async () => {
    await testEnvironment.shutdown();
  });

  it('should simulate all contracts', async () => {
    const tokenContractPrivateId1 = 'tokenPrivateUser1';
    const user1 = await tokenAPI.deploy(tokenContractPrivateId1, providers1_token, logger);
    tokenAddress = user1.deployedContractAddress;
    await user1.mint();
    const tokenContractPrivateId2 = 'tokenPrivateUser2';
    const user2 = await tokenAPI.subscribe(
      tokenContractPrivateId2,
      providers2_token,
      user1.deployedContractAddress,
      logger,
    );
    await user2.mint();    

    const contractPrivateId1 = 'privateUser1';
    const p1certificate: Certificate = {
      age: 19n,
      aml: true,
      jurisdiction: true,
      owner: { bytes: encodeCoinPublicKey('04bcf7ad3be7a5c790460be82a713af570f22e0f801f6659ab8e84a52be6969e') },
      issuer: { bytes: new Uint8Array(32) },
      sk: utils.randomBytes(32),
    };
    providers1.privateStateProvider.set(contractPrivateId1, { certificate: p1certificate });
    const contractInstance1 = await API.deploy(
      contractPrivateId1,
      tokenAddress,
      providers1,
      logger,
      'title',
      'description',
      10,
      'monday',
      'image',
    );
    const bidAddress1 = contractInstance1.deployedContractAddress;

    const contractPrivateId2 = 'privateUser2';
    const p2certificate: Certificate = {
      age: 19n,
      aml: true,
      jurisdiction: true,
      owner: { bytes: encodeCoinPublicKey('04bcf7ad3be7a5c790460be82a713af570f22e0f801f6659ab8e84a52be6969e') },
      issuer: { bytes: new Uint8Array(32) },
      sk: utils.randomBytes(32),
    };
    providers2.privateStateProvider.set(contractPrivateId2, { certificate: p2certificate });
    const contractInstance2 = await API.subscribe(contractPrivateId2, tokenAddress, providers2, bidAddress1, logger);

    let maybeKeys: Maybe<Uint8Array>[] = [];
    contractInstance2.state$.subscribe((state) => {
      maybeKeys = [];
      console.log('contract registered', state.registered);

      const MAX_KEYS = 10;      

      // Loop through the incoming registered items, but only add up to 10 items.
      for (let i = 0; i < state.registered.length && maybeKeys.length < MAX_KEYS; i++) {        
        maybeKeys.push(state.registered[i]);
      }
      // Pad the vector to exactly 10 elements if necessary:
      while (maybeKeys.length < 10) {
        maybeKeys.push({
          is_some: false,
          value: new Uint8Array(32), // A zero-filled 32-byte array as placeholder
        });
      }
      console.log("maybe keys", maybeKeys);      
    });

    await contractInstance2.register(); 
    await contractInstance1.register();   

    await contractInstance1.approve_certificates(maybeKeys);

    await contractInstance1.start_bid();

    await contractInstance2.make_bid(11); 
    await contractInstance1.make_bid(12);
    await contractInstance2.make_bid(13);

    await contractInstance1.close_bid();
    
  });
});
