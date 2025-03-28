import React, { createContext } from 'react';
import { type Logger } from 'pino';
import { LocalStorage, LocalStorageProps } from './bboard-localStorage-class';

export const BboardLocalStorageContext = createContext<LocalStorageProps | undefined>(undefined);

export interface BboardLocalStorageProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export const BboardLocalStorageProvider = ({ children, logger }: BboardLocalStorageProviderProps) => {
  return <BboardLocalStorageContext.Provider value={new LocalStorage(logger)}>{children}</BboardLocalStorageContext.Provider>;
};
