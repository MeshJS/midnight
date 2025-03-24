import { type ContractAddress, tokenType, convert_bigint_to_Uint8Array } from '@midnight-ntwrk/compact-runtime';
import { type Logger } from 'pino';
import {
  type ContractInstance,
  type DerivedState,
  type Providers,
  type DeployedContract,
  emptyState,
  type PrivateStates,
  type UserAction,
} from './common-types.js';
import {
  type PrivateState,
  Contract,
  createPrivateState,
  ledger,
  pureCircuits,
  witnesses,
  type CoinInfo,
  Maybe,
  Certificate,
} from '@meshsdk/auction-contract';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import {
  BehaviorSubject,
  combineLatest,
  concat,
  defer,
  from,
  map,
  type Observable,
  of,
  retry,
  scan,
  Subject,
} from 'rxjs';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import type { PrivateStateProvider } from '@midnight-ntwrk/midnight-js-types/dist/private-state-provider';
import { encodeTokenType } from '@midnight-ntwrk/onchain-runtime';
import { encodeContractAddress, nativeToken } from '@midnight-ntwrk/ledger';
import { error } from 'console';

const contractInstance: ContractInstance = new Contract(witnesses);

export interface DeployedAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<DerivedState>;

  start_bid: () => Promise<void>;
  close_bid: () => Promise<void>;
  approve_certificates: (approved_hashes: Maybe<Uint8Array>[]) => Promise<void>;
  register: () => Promise<void>;
  make_bid: (value: number) => Promise<void>;
}

export class API implements DeployedAPI {
  private constructor(
    public readonly contractPrivateId: string,
    public readonly tokenContractAddress: ContractAddress,
    public readonly deployedContract: DeployedContract,
    public readonly providers: Providers,
    private readonly logger: Logger,
  ) {
    const combine = (acc: DerivedState, value: DerivedState): DerivedState => {
      return {
        state: value.state,
        whoami: value.whoami,
        registered: value.registered,
        confirmed: value.confirmed,
        owner: value.owner,
        info: value.info,
        highestBid: value.highestBid,
        userAction: value.userAction,
      };
    };
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.turns$ = new BehaviorSubject<UserAction>({
      action: undefined,
      error: undefined,
    });
    this.privateStates$ = new Subject<PrivateState>();
    this.state$ = combineLatest(
      [
        providers.publicDataProvider
          .contractStateObservable(this.deployedContractAddress, { type: 'all' })
          .pipe(map((contractState) => ledger(contractState.data))),
        concat(
          from(defer(() => providers.privateStateProvider.get(contractPrivateId) as Promise<PrivateState>)),
          this.privateStates$,
        ),
        this.turns$,
      ],
      (ledgerState, privateState, userAction) => {
        const whoami = pureCircuits.registration_hash(privateState.certificate);
        let maybeKeys: Maybe<Uint8Array>[] = [];
        for (const [key, value] of ledgerState.registeredHashes) {
          if (value === false) {
            maybeKeys.push({
              is_some: true,
              value: key,
            });
          }
        }
        let maybeKeysConfirmed: Maybe<Uint8Array>[] = [];
        for (const [key, value] of ledgerState.registeredHashes) {
          if (value === true) {
            maybeKeysConfirmed.push({
              is_some: true,
              value: key,
            });
          }
        }
        const result: DerivedState = {
          state: ledgerState.state,
          whoami: toHex(whoami),
          registered: maybeKeys,
          confirmed: maybeKeysConfirmed,
          owner: ledgerState.adminPublicKey,
          info: {title: ledgerState.title, description: ledgerState.description, minBid: ledgerState.estimatedValue, deadline: ledgerState.deadline, image: ledgerState.image},
          highestBid: ledgerState.highestBid, 
          userAction,
        };
        return result;
      },
    ).pipe(
      scan(combine, emptyState),
      retry({
        // sometimes websocket fails
        delay: 500,
      }),
    );
  }

  readonly deployedContractAddress: ContractAddress;

  readonly state$: Observable<DerivedState>;

  readonly turns$: BehaviorSubject<UserAction>;

  readonly privateStates$: Subject<PrivateState>;

  async start_bid(): Promise<void> {
    this.logger?.info('Starting Bid');
    this.turns$.next({
      action: 'opening-bid',
      error: undefined,
    });

    try {
      const txData = await this.deployedContract.callTx.start_bid();
      this.logger?.trace({
        start_bid: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        action: 'opening-done',
        error: undefined,
      });
    } catch (e) {
      this.turns$.next({
        action: undefined,
        error: 'opening-error',
      });
      throw e;
    }
  }

  async close_bid(): Promise<void> {
    this.logger?.info('Closing the bid');
    this.turns$.next({
      action: 'closing-bid',
      error: undefined,
    });
    try {
      const txData = await this.deployedContract.callTx.close_bid();
      this.logger?.trace({
        close_bid: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        action: 'closing-done',
        error: undefined,
      });
    } catch (e) {
      this.turns$.next({
        action: undefined,
        error: 'closing-error',
      });
      throw e;
    }
  }

  coin(value: number): CoinInfo {
    return {
      nonce: utils.randomBytes(32),
      color: encodeTokenType(tokenType(utils.pad('mesh_coin', 32), this.tokenContractAddress)),
      value: BigInt(value),
    };
  }

  static coin_dust(value: number): CoinInfo {
    return {
      nonce: utils.randomBytes(32),
      color: encodeTokenType(nativeToken()),
      value: BigInt(value * 1000000),
    };
  }

  async approve_certificates(approved_hashes: Maybe<Uint8Array>[]): Promise<void> {
    this.logger?.info('Approving certificates');
    this.turns$.next({
      action: 'approving-hashed',
      error: undefined,
    });
    try {
      const txData = await this.deployedContract.callTx.approve_certificates(approved_hashes);
      this.logger?.trace({
        approve_certificates: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        action: 'approving-hashedDone',
        error: undefined,
      });
    } catch (e) {
      this.turns$.next({
        action: undefined,
        error: 'approving-error',
      });
      throw e;
    }
  }

  async register(): Promise<void> {
    this.logger?.info('Registering to the bid');
    this.turns$.next({
      action: 'registering',
      error: undefined,
    });
    try {
      const txData = await this.deployedContract.callTx.register();
      this.logger?.trace({
        register: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        action: 'registering-done',
        error: undefined,
      });
    } catch (e) {
      this.turns$.next({
        action: undefined,
        error: 'registering-error',
      });
      throw e;
    }
  }

  async make_bid(value: number): Promise<void> {
    this.logger?.info('Making a bid');
    this.turns$.next({
      action: 'bidding',
      error: undefined,
    });
    try {
      const txData = await this.deployedContract.callTx.make_bid(this.coin(value));
      this.logger?.trace({
        make_bid: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      this.turns$.next({
        action: 'bidding-done',
        error: undefined,
      });
    } catch (e) {
      this.turns$.next({
        action: undefined,
        error: 'bidding-error',
      });
      throw e;
    }
  }

  static async deploy(
    contractPrivateId: string,
    tokenContractAddress: string,
    providers: Providers,
    logger: Logger,
    title: string,
    description: string,
    estimated_value: number,
    deadline: string,
    image: string,
  ): Promise<API> {
    logger.info({
      deployContract: {
        contractPrivateId,
      },
    });
    const deployedTemplateContract = await deployContract(providers, {
      privateStateKey: contractPrivateId,
      contract: contractInstance,
      initialPrivateState: await API.getPrivateState(contractPrivateId, providers.privateStateProvider),
      args: [
        {
          bytes: encodeContractAddress(tokenContractAddress),
        },
        title,
        description,
        BigInt(estimated_value),
        deadline,
        image,
      ],
    });

    logger.trace({
      contractDeployed: {
        contractPrivateId,
        finalizedDeployTxData: deployedTemplateContract.deployTxData.public,
      },
    });

    return new API(contractPrivateId, tokenContractAddress, deployedTemplateContract, providers, logger);
  }

  static async subscribe(
    contractPrivateId: string,
    tokenContractAddress: ContractAddress,
    providers: Providers,
    contractAddress: ContractAddress,
    logger: Logger,
  ): Promise<API> {
    logger.info({
      subscribeContract: {
        contractPrivateId,
        contractAddress,
      },
    });

    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      contract: contractInstance,
      privateStateKey: contractPrivateId,
      initialPrivateState: await API.getPrivateState(contractPrivateId, providers.privateStateProvider),
    });

    logger.trace({
      contractSubscribed: {
        contractPrivateId,
        finalizedDeployTxData: deployedContract.deployTxData.public,
      },
    });

    return new API(contractPrivateId, tokenContractAddress, deployedContract, providers, logger);
  }

  static async getOrCreateInitialPrivateState(
    privateStateProvider: PrivateStateProvider<PrivateStates>,
  ): Promise<PrivateState> {
    let state = await privateStateProvider.get('start');

    if (state === null) {
      state = this.createPrivateState({
        age: 0n,
        aml: false,
        jurisdiction: false,
        owner: { bytes: new Uint8Array(32) },
        issuer: { bytes: new Uint8Array(32) },
        sk: utils.randomBytes(32),
      });
      await privateStateProvider.set('start', state);
    }
    return state;
  }

  static async exists(providers: Providers, contractAddress: ContractAddress): Promise<boolean> {
    try {
      const state = await providers.publicDataProvider.queryContractState(contractAddress);
      if (state === null) {
        return false;
      }
      void ledger(state.data); // try to parse it
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getCertificateHash(
    providers: Providers,
    contractPrivateId: string,
    contractAddress: ContractAddress,
  ): Promise<Uint8Array | null> {
    const private_state = await this.getPrivateState(contractPrivateId, providers.privateStateProvider);
    return pureCircuits.registration_hash(private_state.certificate);
  }

  private static async getPrivateState(
    contractPrivateId: string,
    providers: PrivateStateProvider<PrivateStates>,
  ): Promise<PrivateState> {
    const existingPrivateState = await providers.get(contractPrivateId);
    const initialState = await this.getOrCreateInitialPrivateState(providers);
    return existingPrivateState ?? initialState;
  }

  private static createPrivateState(certificate: Certificate): PrivateState {
    return createPrivateState(certificate);
  }
}

export * as utils from './utils/index.js';
export * from './common-types.js';
