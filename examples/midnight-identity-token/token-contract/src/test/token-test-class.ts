import {
  CircuitContext,
  CircuitResults,
  constructorContext,
  encodeContractAddress,
  QueryContext,
  sampleContractAddress,
  tokenType,
} from '@midnight-ntwrk/compact-runtime';
import {nativeToken} from '@midnight-ntwrk/zswap';
import * as crypto from 'node:crypto';
import {
  PrivateState,
  witnesses,
  Contract,
  Ledger,
  ledger,
  Witnesses,
  CoinInfo,
  createPrivateState,
} from '../index.js';
import { ContractAddress, encodeTokenType } from '@midnight-ntwrk/onchain-runtime';

type ContractInstanceType = Contract<PrivateState, Witnesses<PrivateState>>;

export const randomSk = (): Uint8Array => crypto.getRandomValues(Buffer.alloc(32));

function pad(s: string, n: number): Uint8Array {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(s);
  if (n < utf8Bytes.length) {
    throw new Error(`The padded length n must be at least ${utf8Bytes.length}`);
  }
  const paddedArray = new Uint8Array(n);
  paddedArray.set(utf8Bytes);
  return paddedArray;
}

export class Simulator {
  readonly contract: ContractInstanceType;
  userPrivateStates: Record<string, PrivateState>;
  turnContext: CircuitContext<PrivateState>;
  contractAddress: ContractAddress;
  updateUserPrivateState: (newPrivateState: PrivateState) => void;

  constructor(privateState: PrivateState) {
    this.contract = new Contract(witnesses);
    this.contractAddress = sampleContractAddress();
    const { currentPrivateState, currentContractState, currentZswapLocalState } = this.contract.initialState(
      constructorContext(privateState, '0'.repeat(64)),
      randomSk(),
    );
    this.userPrivateStates = { ['p1']: currentPrivateState };
    this.turnContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(currentContractState.data, sampleContractAddress()),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.updateUserPrivateState = (newPrivateState: PrivateState) => {};
  }

  static deployContract(): Simulator {
    return new Simulator(createPrivateState());
  }

  private buildTurnContext(currentPrivateState: PrivateState): CircuitContext<PrivateState> {
    return {
      ...this.turnContext,
      currentPrivateState,
    };
  }

  createPrivateState(pName: string): void {
    this.userPrivateStates[pName] = createPrivateState();
  }

  getLedgerState(): Ledger {
    return ledger(this.turnContext.transactionContext.state);
  }

  getPrivateState(): PrivateState {
    return this.turnContext.currentPrivateState;
  }

  private updateUserPrivateStateByName =
    (name: string) =>
    (newPrivateState: PrivateState): void => {
      this.userPrivateStates[name] = newPrivateState;
    };

  as(name: string): Simulator {
    this.turnContext = this.buildTurnContext(this.userPrivateStates[name]);
    this.updateUserPrivateState = this.updateUserPrivateStateByName(name);
    return this;
  }

  updateStateAndGetLedger<T>(circuitResults: CircuitResults<PrivateState, T>): Ledger {
    this.turnContext = circuitResults.context;
    console.log('currentZswap inputs', circuitResults.context.currentZswapLocalState.inputs);
    console.log('currentZswap outputs', circuitResults.context.currentZswapLocalState.outputs);
    console.log('result of circuit', circuitResults.result);
    this.updateUserPrivateState(circuitResults.context.currentPrivateState);
    return this.getLedgerState();
  }

  coin(value: number): CoinInfo {
    return {
      nonce: randomSk(),
      color: encodeTokenType(nativeToken()),
      value: BigInt(value),
    };
  }

  mint(value: number): Ledger {
    return this.updateStateAndGetLedger(this.contract.impureCircuits.mint(this.turnContext, this.coin(value)));
  }

  owner_withdraw(): Ledger {
    return this.updateStateAndGetLedger(this.contract.impureCircuits.owner_withdraw(this.turnContext));
  }
}
