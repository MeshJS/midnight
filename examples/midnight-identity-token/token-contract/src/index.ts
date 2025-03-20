import ContractModule from './managed/token/contract/index.cjs';
import type { Contract as ContractType, Witnesses, Ledger } from './managed/token/contract/index.cjs';

export * from './managed/token/contract/index.cjs';
export const ledger = ContractModule.ledger;
export const pureCircuits = ContractModule.pureCircuits;
export const { Contract } = ContractModule;
export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<T, W>;

export type PrivateState = Record<string, never>;

export const createPrivateState = (): PrivateState => ({})

export const witnesses = {};