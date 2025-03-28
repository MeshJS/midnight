import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import {  
  type Contract,
  type Witnesses,    
  PrivateState
} from '@meshsdk/token-contract';

export type PrivateStates = Record<string, PrivateState>;

export type ContractInstance = Contract<PrivateState, Witnesses<PrivateState>>;

export type CircuitKeys = Exclude<keyof ContractInstance['impureCircuits'], number | symbol>;

export type Providers = MidnightProviders<CircuitKeys, PrivateStates>;

export type DeployedContract = FoundContract<PrivateState, ContractInstance>;

export type UserAction = {
  action: "minting" | "minting-done" | "withdrawing" | "withdrawing-done" | undefined;  
  error: "minting-error" | "withdrawing-error" | undefined;
};

export type DerivedState = {   
  readonly tvlDust: bigint;
  readonly tvlToken: bigint;    
  readonly isOwner: boolean;
  userAction: UserAction
};

export const emptyState: DerivedState = {    
  tvlDust: 0n,
  tvlToken: 0n,
  isOwner: false, 
  userAction: { action: undefined, error: undefined }
};


