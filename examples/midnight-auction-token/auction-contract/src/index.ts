import ContractModule, { Ledger } from './managed/auction/contract/index.cjs';
import type { Certificate, Contract as ContractType, Witnesses, ZswapCoinPublicKey } from './managed/auction/contract/index.cjs';
import { WitnessContext } from '@midnight-ntwrk/compact-runtime';

export * from './managed/auction/contract/index.cjs';
export const ledger = ContractModule.ledger;
export const pureCircuits = ContractModule.pureCircuits;
export const { Contract } = ContractModule;
export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<T, W>;

export type PrivateState = {  
  readonly certificate: Certificate; 
};

export const createPrivateState = (certificate: Certificate) => ({
   certificate, 
});

export const witnesses = {
  local_secret_certificate: ({ privateState }: WitnessContext<Ledger, PrivateState>): [PrivateState, Certificate] => [
    
    privateState, 
    privateState.certificate, 
  ],
};

