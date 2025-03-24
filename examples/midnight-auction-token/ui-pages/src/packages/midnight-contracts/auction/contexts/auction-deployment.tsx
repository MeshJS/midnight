import type { PropsWithChildren } from 'react';
import React, { createContext, useMemo } from 'react';
import { type Logger } from 'pino';

import type { DeployedAPIProvider } from './auction-deployment-class';
import { useLocalState } from '../hooks/use-localStorage';
import { DeployedTemplateManager } from './auction-deployment-class';
import { useProviders } from '../hooks';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export const DeployedProviderContext = createContext<DeployedAPIProvider | undefined>(undefined);

export type DeployedProviderProps = PropsWithChildren<{
  logger: Logger;
  TOKEN_ADDRESS: ContractAddress;
}>;

export const DeployedProvider = ({ logger, TOKEN_ADDRESS, children }: DeployedProviderProps) => {
  const localState = useLocalState();
  const providers = useProviders();
  const manager = useMemo(() => {
    return new DeployedTemplateManager(logger, localState, TOKEN_ADDRESS, providers?.providers);
  }, [logger, localState, TOKEN_ADDRESS, providers?.providers]);

  return (
    <DeployedProviderContext.Provider value={manager}>
      {children}
    </DeployedProviderContext.Provider>
  );
};
