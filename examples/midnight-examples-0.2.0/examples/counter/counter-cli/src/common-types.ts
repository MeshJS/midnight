import { type Contract, type Witnesses, type CounterPrivateState } from '@midnight-ntwrk/counter-contract';
import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type PrivateStates = {
  counterPrivateState: CounterPrivateState;
};

export type CounterProviders = MidnightProviders<'increment', PrivateStates>;

export type CounterContract = Contract<CounterPrivateState, Witnesses<CounterPrivateState>>;

export type DeployedCounterContract = FoundContract<CounterPrivateState, CounterContract>;
