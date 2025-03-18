import { type Config, StandaloneConfig, TestnetRemoteConfig, currentDir } from './config';
import {
  DockerComposeEnvironment,
  GenericContainer,
  type StartedDockerComposeEnvironment,
  type StartedTestContainer,
  Wait,
} from 'testcontainers';
import path from 'path';
import * as Rx from 'rxjs';
import { type CoinInfo, nativeToken, Transaction, type TransactionId } from '@midnight-ntwrk/ledger';
import type { Logger } from 'pino';
import type { Wallet } from '@midnight-ntwrk/wallet-api';
import { type Resource, WalletBuilder } from '@midnight-ntwrk/wallet';
import {
  type BalancedTransaction,
  createBalancedTx,
  type MidnightProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import type { PrivateStates } from '../common-types';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

export interface TestConfiguration {
  seed: string;
  entrypoint: string;
  dappConfig: Config;
  psMode: string;
}

export class LocalTestConfig implements TestConfiguration {
  seed = GENESIS_MINT_WALLET_SEED;
  entrypoint = 'dist/standalone.js';
  dappConfig = new StandaloneConfig();
  psMode = 'undeployed';
}

export function parseArgs(required: string[]): TestConfiguration {
  let entry = '';
  if (required.includes('entry')) {
    if (process.env.TEST_ENTRYPOINT !== undefined) {
      entry = process.env.TEST_ENTRYPOINT;
    } else {
      throw new Error('TEST_ENTRYPOINT environment variable is not defined.');
    }
  }

  let seed = '';
  if (required.includes('seed')) {
    if (process.env.TEST_WALLET_SEED !== undefined) {
      seed = process.env.TEST_WALLET_SEED;
    } else {
      throw new Error('TEST_WALLET_SEED environment variable is not defined.');
    }
  }

  let cfg: Config = new TestnetRemoteConfig();
  let env = '';
  let psMode = 'undeployed';
  if (required.includes('env')) {
    if (process.env.TEST_ENV !== undefined) {
      env = process.env.TEST_ENV;
    } else {
      throw new Error('TEST_ENV environment variable is not defined.');
    }
    switch (env) {
      case 'testnet':
        cfg = new TestnetRemoteConfig();
        psMode = 'testnet';
        break;
      default:
        throw new Error(`Unknown env value=${env}`);
    }
  }

  return {
    seed,
    entrypoint: entry,
    dappConfig: cfg,
    psMode,
  };
}

export class TestEnvironment {
  private readonly logger: Logger;
  private env: StartedDockerComposeEnvironment | undefined;
  private dockerEnv: DockerComposeEnvironment | undefined;
  private container: StartedTestContainer | undefined;
  private testConfig: TestConfiguration;
  private testWallet: TestWallet | undefined;

  constructor(logger: Logger) {
    this.logger = logger;
    this.testConfig = new LocalTestConfig();
  }

  start = async (): Promise<TestConfiguration> => {
    if (process.env.RUN_ENV_TESTS === 'true') {
      this.testConfig = parseArgs(['seed', 'env']);
      this.logger.info(`Test wallet seed: ${this.testConfig.seed}`);
      this.logger.info('Proof server starting...');
      this.container = await TestEnvironment.getProofServerContainer(this.testConfig.psMode);
      this.testConfig.dappConfig = {
        ...this.testConfig.dappConfig,
        proofServer: `http://${this.container.getHost()}:${this.container.getFirstMappedPort()}`,
      };
    } else {
      this.testConfig = new LocalTestConfig();
      this.logger.info('Test containers starting...');
      const composeFile = process.env.COMPOSE_FILE ?? 'standalone.yml';
      this.logger.info(`Using compose file: ${composeFile}`);
      this.dockerEnv = new DockerComposeEnvironment(path.resolve(currentDir, '..', '..'), composeFile)
        .withWaitStrategy(
          'bboard-api-proof-server',
          Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1),
        )
        .withWaitStrategy('bboard-api-indexer', Wait.forLogMessage(/Transactions subscription started/, 1))
        .withWaitStrategy('bboard-api-node', Wait.forLogMessage(/Running JSON-RPC server/, 1));
      this.env = await this.dockerEnv.up();

      this.testConfig.dappConfig = {
        ...this.testConfig.dappConfig,
        indexer: TestEnvironment.mapContainerPort(this.env, this.testConfig.dappConfig.indexer, 'bboard-api-indexer'),
        indexerWS: TestEnvironment.mapContainerPort(
          this.env,
          this.testConfig.dappConfig.indexerWS,
          'bboard-api-indexer',
        ),
        node: TestEnvironment.mapContainerPort(this.env, this.testConfig.dappConfig.node, 'bboard-api-node'),
        proofServer: TestEnvironment.mapContainerPort(
          this.env,
          this.testConfig.dappConfig.proofServer,
          'bboard-api-proof-server',
        ),
      };
    }
    this.logger.info(`Configuration:${JSON.stringify(this.testConfig)}`);
    this.logger.info('Test containers started');
    return this.testConfig;
  };

  static mapContainerPort = (env: StartedDockerComposeEnvironment, url: string, containerName: string) => {
    const mappedUrl = new URL(url);
    const container = env.getContainer(containerName);

    mappedUrl.port = String(container.getFirstMappedPort());

    return mappedUrl.toString().replace(/\/+$/, '');
  };

  static getProofServerContainer = async (env: string = 'undeployed') =>
    await new GenericContainer('ghcr.io/midnight-ntwrk/proof-server:3.0.6')
      .withExposedPorts(6300)
      .withCommand([`midnight-proof-server --network ${env}`])
      .withEnvironment({ RUST_BACKTRACE: 'full' })
      .withWaitStrategy(Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1))
      .start();

  shutdown = async () => {
    if (this.testWallet !== undefined) {
      await this.testWallet.close();
    }
    if (this.env !== undefined) {
      this.logger.info('Test containers closing');
      await this.env.down();
    }
    if (this.container !== undefined) {
      this.logger.info('Test container closing');
      await this.container.stop();
    }
  };

  getWallet = async () => {
    this.testWallet = new TestWallet(this.logger);
    return await this.testWallet.setup(this.testConfig);
  };
}

export class TestWallet {
  private wallet: (Wallet & Resource) | undefined;
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  setup = async (testConfiguration: TestConfiguration) => {
    this.logger.info('Setting up wallet');
    this.wallet = await this.buildWalletAndWaitForFunds(testConfiguration.dappConfig, testConfiguration.seed);
    expect(this.wallet).not.toBeNull();
    const state = await Rx.firstValueFrom(this.wallet.state());
    expect(state.balances[nativeToken()].valueOf()).toBeGreaterThan(BigInt(0));
    return this.wallet;
  };

  waitForFunds = (wallet: Wallet) =>
    Rx.firstValueFrom(
      wallet.state().pipe(
        Rx.throttleTime(10_000),
        Rx.tap((state) => {
          const scanned = state.syncProgress?.synced ?? 0n;
          const total = state.syncProgress?.total.toString() ?? 'unknown number';
          this.logger.info(
            `Wallet processed ${scanned} indices out of ${total}, transactions=${state.transactionHistory.length}`,
          );
        }),
        Rx.filter((state) => {
          // Let's allow progress only if wallet is synced
          const synced = state.syncProgress?.synced;
          const total = state.syncProgress?.total;
          return synced !== undefined && synced === total;
        }),
        Rx.map((s) => s.balances[nativeToken()] ?? 0n),
        Rx.filter((balance) => balance > 0n),
      ),
    );

  buildWalletAndWaitForFunds = async (
    { indexer, indexerWS, node, proofServer }: Config,
    seed: string,
  ): Promise<Wallet & Resource> => {
    const wallet = await WalletBuilder.buildFromSeed(
      indexer,
      indexerWS,
      proofServer,
      node,
      seed,
      getZswapNetworkId(),
      'warn',
    );
    wallet.start();
    const state = await Rx.firstValueFrom(wallet.state());
    this.logger.info(`Your wallet seed is: ${seed}`);
    this.logger.info(`Your wallet address is: ${state.address}`);
    let balance = state.balances[nativeToken()];
    if (balance === undefined || balance === 0n) {
      this.logger.info(`Your wallet balance is: 0`);
      this.logger.info(`Waiting to receive tokens...`);
      balance = await this.waitForFunds(wallet);
    }
    this.logger.info(`Your wallet balance is: ${balance}`);
    return wallet;
  };

  close = async () => {
    if (this.wallet !== undefined) {
      await this.wallet.close();
    }
  };
}

export class TestProviders {
  createWalletAndMidnightProvider = async (wallet: Wallet): Promise<WalletProvider & MidnightProvider> => {
    const state = await Rx.firstValueFrom(wallet.state());
    return {
      coinPublicKey: state.coinPublicKey,
      balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
        return wallet
          .balanceTransaction(
            ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
            newCoins,
          )
          .then((tx) => wallet.proveTransaction(tx))
          .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
          .then(createBalancedTx);
      },
      submitTx(tx: BalancedTransaction): Promise<TransactionId> {
        return wallet.submitTransaction(tx);
      },
    };
  };

  configureProviders = async (wallet: Wallet & Resource, config: Config) => {
    const walletAndMidnightProvider = await this.createWalletAndMidnightProvider(wallet);
    return {
      privateStateProvider: levelPrivateStateProvider<PrivateStates>({
        privateStateStoreName: config.privateStateStoreName,
      }),
      publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
      zkConfigProvider: new NodeZkConfigProvider<'post' | 'take_down'>(config.zkConfigPath),
      proofProvider: httpClientProofProvider(config.proofServer),
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider,
    };
  };
}
