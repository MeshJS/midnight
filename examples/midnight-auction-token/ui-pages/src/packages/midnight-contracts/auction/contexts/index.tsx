import React from 'react';
import { DeployedProvider } from './auction-deployment';
import { LocalStorageProvider } from './auction-localStorage';
import { Provider } from './auction-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './auction-providers';
export * from './auction-localStorage';
export * from './auction-localStorage-class';
export * from './auction-deployment';
export * from './auction-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}

export const AppProvider = ({ children, logger, TOKEN_ADDRESS }: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} TOKEN_ADDRESS={TOKEN_ADDRESS}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
