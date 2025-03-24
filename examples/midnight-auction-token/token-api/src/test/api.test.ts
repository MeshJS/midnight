import { type Resource } from '@midnight-ntwrk/wallet';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import { webcrypto } from 'crypto';
import path from 'path';
import { API, type Providers } from '..';
import { TestEnvironment, TestProviders } from './localTest-class';
import { currentDir } from './config';
import { createLogger } from './logger-utils';

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
  let providers2: Providers;  

  beforeAll(async () => {
    testEnvironment = new TestEnvironment(logger);
    const testConfiguration = await testEnvironment.start();
    wallet1 = await testEnvironment.getWallet1();
    wallet2 = await testEnvironment.getWallet2();
    providers1 = await new TestProviders().configureTokenProviders(wallet1, testConfiguration.dappConfig);
    providers2 = await new TestProviders().configureTokenProviders(wallet2, testConfiguration.dappConfig); 
  });

  afterAll(async () => {
    await testEnvironment.shutdown();
  });

  it('should simulate all contracts', async () => {
    const contractPrivateId1 = 'privateUser1';
    const user1 = await API.deploy(contractPrivateId1, providers1, logger);        
    user1.state$.subscribe((state) => console.log({state}));
    user1.turns$.subscribe((turn) => console.log({turn}));
    console.log('First minting started');
    await user1.mint(); 
    console.log('First minting done');
    const contractPrivateId2 = 'privateUser2';
    const user2 = await API.subscribe(contractPrivateId2, providers2, user1.deployedContractAddress, logger); 
    console.log("withdrawing")
    await user1.owner_withdraw();
    console.log("withdrawing done")
    console.log('Second minting started');    
    await user1.mint();   
    console.log('Second minting done');     
    console.log('Third minting started');    
    await user2.mint();   
    console.log('Third minting done');   
    console.log("second withdrawing")
    await user2.owner_withdraw();
    console.log("second withdrawing done")
  });
});
