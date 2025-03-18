import { STATE } from '@midnight-ntwrk/bboard-contract-tutorial';
import { CompactError } from '@midnight-ntwrk/compact-runtime';
import { type Resource } from '@midnight-ntwrk/wallet';
import { type Wallet } from '@midnight-ntwrk/wallet-api';
import { webcrypto } from 'crypto';
import path from 'path';
import { BBoardAPI, type BBoardProviders } from '..';
import { TestEnvironment, TestProviders } from './commons';
import { currentDir } from './config';
import { createLogger } from './logger-utils';

const logDir = path.resolve(currentDir, '..', 'logs', 'tests', `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

// @ts-expect-error It is required
globalThis.crypto = webcrypto;

globalThis.WebSocket = WebSocket;

describe('BBoard API', () => {
  let testEnvironment: TestEnvironment;
  let wallet: Wallet & Resource;
  let providers: BBoardProviders;

  const allASCIIString = Array.from({ length: 128 }, (_, i) => String.fromCharCode(i)).join('');

  beforeAll(
    async () => {
      testEnvironment = new TestEnvironment(logger);
      const testConfiguration = await testEnvironment.start();
      wallet = await testEnvironment.getWallet();
      providers = await new TestProviders().configureProviders(wallet, testConfiguration.dappConfig);
    },
    1000 * 60 * 45,
  );

  afterAll(async () => {
    await testEnvironment.shutdown();
  });

  it('should deploy the contract and post and take down message [@slow][@smoke]', async () => {
    allure.description(`Deploys the bboard contract, posts a message, takes down a message, then verifies the state.`);
    allure.tms('PM-8572', 'PM-8572');
    allure.severity('blocker');
    allure.tag('bboard');

    const bBoardAPI = await BBoardAPI.deploy(providers, logger);
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual('');
        expect(bBoardState.state).toEqual(STATE.vacant);
        expect(bBoardState.instance).toBeGreaterThan(0n);
        expect(bBoardState.isOwner).toEqual(true);
      })
      .unsubscribe();

    await bBoardAPI.post(allASCIIString);
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual(allASCIIString);
        expect(bBoardState.state).toEqual(STATE.occupied);
      })
      .unsubscribe();

    await bBoardAPI.takeDown();
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual('');
        expect(bBoardState.state).toEqual(STATE.vacant);
      })
      .unsubscribe();
  });

  it('should not be possible to post message twice and take down message twice [@slow]', async () => {
    const bBoardAPI = await BBoardAPI.deploy(providers, logger);
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual('');
        expect(bBoardState.state).toEqual(STATE.vacant);
        expect(bBoardState.instance).toBeGreaterThan(0n);
        expect(bBoardState.isOwner).toEqual(true);
      })
      .unsubscribe();

    await bBoardAPI.post(allASCIIString);
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual(allASCIIString);
        expect(bBoardState.state).toEqual(STATE.occupied);
      })
      .unsubscribe();

    await expect(bBoardAPI.post('2nd post will fail')).rejects.toThrow(
      new CompactError('failed assert: Attempted to post to an occupied board'),
    );

    await bBoardAPI.takeDown();
    bBoardAPI.state$
      .subscribe((bBoardState) => {
        expect(bBoardState.message?.toString()).toEqual('');
        expect(bBoardState.state).toEqual(STATE.vacant);
      })
      .unsubscribe();

    await expect(bBoardAPI.takeDown()).rejects.toThrow(
      new CompactError('failed assert: Attempted to take down post from an empty board'),
    );
  });
});
