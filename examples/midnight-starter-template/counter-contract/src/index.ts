export * as Counter from "./managed/counter/contract/index.cjs";
export * from "./witnesses";

import ContractModule from './managed/counter/contract/index.cjs';
import type { Contract as ContractType, Witnesses } from './managed/counter/contract/index.cjs';

export const ledger = ContractModule.ledger;
export const pureCircuits = ContractModule.pureCircuits;
export const { Contract } = ContractModule;
export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<T, W>;
export type Ledger = ContractModule.Ledger;
