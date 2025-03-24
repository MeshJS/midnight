import React from 'react';
import { DeployedProvider } from './bboard-deployment';
import { BboardLocalStorageProvider } from './bboard-localStorage';
import { Provider } from './bboard-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './bboard-providers';
export * from './bboard-localStorage';
export * from './bboard-localStorage-class';
export * from './bboard-deployment';
export * from './bboard-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}

export const AppProvider = ({ children, logger, TOKEN_ADDRESS }: AppProviderProps) => {
  return (
    <BboardLocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} TOKEN_ADDRESS={TOKEN_ADDRESS}>{children}</DeployedProvider>
      </Provider>
    </BboardLocalStorageProvider>
  );
};
