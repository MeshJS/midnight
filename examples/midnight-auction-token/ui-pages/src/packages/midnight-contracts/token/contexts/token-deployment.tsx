import type { PropsWithChildren } from 'react';
import React, { createContext } from 'react';
import { type Logger } from 'pino';

import type { DeployedAPIProvider } from './token-deployment-class';

import { DeployedTemplateManager } from './token-deployment-class';
import { useProviders } from '../hooks';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export const DeployedProviderContext = createContext<DeployedAPIProvider | undefined>(undefined);

export type DeployedGameProviderProps = PropsWithChildren<{
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}>;

export const DeployedProvider = ({ logger, TOKEN_ADDRESS, children }: DeployedGameProviderProps) => {
  
  const providers = useProviders();
  return (
    <DeployedProviderContext.Provider value={new DeployedTemplateManager(logger, TOKEN_ADDRESS, providers?.providers)}>
      {children}
    </DeployedProviderContext.Provider>
  );
};
