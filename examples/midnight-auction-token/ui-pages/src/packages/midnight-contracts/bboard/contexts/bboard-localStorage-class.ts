import type { Logger } from 'pino';

export interface LocalStorageProps {    
  readonly addContract: (contract: string) => void;
  readonly getContracts: () => string[];
  readonly getContractPrivateId: (contract: string) => string | null;
  readonly setContractPrivateId: (gameId: string, contract: string) => void;
}

export class LocalStorage implements LocalStorageProps {
  constructor(private readonly logger: Logger) {}  

  addContract(contract: string): void {
    this.logger.trace(`Adding contract ${contract}`);
    const item = window.localStorage.getItem('bboard_contracts');    
    const bboardContracts: string[] = item ? JSON.parse(item) : [];
    const updatedContracts = Array.from(new Set([...bboardContracts, contract]));
    window.localStorage.setItem('bboard_contracts', JSON.stringify(updatedContracts));
  }

  getContracts(): string[] {
    const item = window.localStorage.getItem('bboard_contracts');    
    const bboardContracts: string[] = item ? JSON.parse(item) : [];
    return Array.from<string>(new Set([...bboardContracts]));
  }

  getContractPrivateId(contract: string): string | null {
    return window.localStorage.getItem('bboard_contractPrivateId' + contract);
  }

  setContractPrivateId(contractPrivateId: string, contract: string): void {
    this.logger.trace(`Setting contract id ${contractPrivateId} for contract ${contract}`);
    window.localStorage.setItem('bboard_contractPrivateId' + contract, contractPrivateId);
  }
}
