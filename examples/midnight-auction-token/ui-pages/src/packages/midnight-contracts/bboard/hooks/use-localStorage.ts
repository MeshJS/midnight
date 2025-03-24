import { useContext } from 'react';
import { BboardLocalStorageContext } from '../contexts/bboard-localStorage';
import { LocalStorageProps } from '../contexts/bboard-localStorage-class';

export const useLocalState = (): LocalStorageProps => {
  const context = useContext(BboardLocalStorageContext);

  if (!context) {
    throw new Error('Hook being used outside of the provider');
  }
  return context;
};
