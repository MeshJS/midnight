import React from 'react';
import { DeployedProvider } from './token-deployment';
import { Provider } from './token-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './token-deployment';
export * from './token-deployment-class';
export * from './token-providers';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}

export const AppProvider = ({ children, logger, TOKEN_ADDRESS }: AppProviderProps) => {
  return (
    <Provider logger={logger}>
      <DeployedProvider logger={logger} TOKEN_ADDRESS={TOKEN_ADDRESS}>
        {children}
      </DeployedProvider>
    </Provider>
  );
};
