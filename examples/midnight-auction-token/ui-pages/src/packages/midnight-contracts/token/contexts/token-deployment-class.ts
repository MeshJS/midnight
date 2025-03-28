import { API, type Providers, type DeployedAPI } from '@meshsdk/token-api';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { BehaviorSubject, type Observable } from 'rxjs';
import { type Logger } from 'pino';

export type ContractType = 'recent' | 'youcouldjoin' | 'yours' | 'allOther';

export interface ContractState {
  readonly observable: BehaviorSubject<ContractDeployment>;
  readonly contractType: ContractType;
  address?: ContractAddress;
}

export interface InProgressContractDeployment {
  readonly status: 'in-progress';
  readonly address?: ContractAddress;
}

export interface DeployedContract {
  readonly status: 'deployed';
  readonly api: DeployedAPI;
  readonly address: ContractAddress;
}

export interface FailedContractDeployment {
  readonly status: 'failed';
  readonly error: Error;
  readonly address?: ContractAddress;
}

export type ContractDeployment = InProgressContractDeployment | DeployedContract | FailedContractDeployment;

export interface DeployedAPIProvider {
  readonly contractDeployments$: Observable<ContractState[]>;
  readonly addContract: (contractType: ContractType) => ContractState;  
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  readonly #contractDeploymentsSubject: BehaviorSubject<ContractState[]>;

  constructor(
    private readonly logger: Logger,    
    private readonly tokenContractAddress: ContractAddress,
    private readonly providers?: Providers,
  ) {
    this.#contractDeploymentsSubject = new BehaviorSubject<ContractState[]>([]);
    this.contractDeployments$ = this.#contractDeploymentsSubject;
  }

  readonly contractDeployments$: Observable<ContractState[]>;

  addContract(contractType: ContractType): ContractState {
    const deployments = this.#contractDeploymentsSubject.value;

    const deployment = new BehaviorSubject<ContractDeployment>({
      status: 'in-progress',
      address: this.tokenContractAddress,
    });

    const contract: ContractState = { observable: deployment, contractType, address: this.tokenContractAddress };

    const deploymentsToKeep = deployments.filter(
      (deployment) => !(deployment.observable.value.address === this.tokenContractAddress && deployment.contractType === contractType),
    );
    this.#contractDeploymentsSubject.next([...deploymentsToKeep, contract]);
    void this.join(deployment, this.tokenContractAddress);

    return contract;
  }  

  private async join(deployment: BehaviorSubject<ContractDeployment>, contractAddress: ContractAddress): Promise<void> {
    try {
      if (this.providers) {
        //proivide a random uuid since i do not need private state for this contract
        const uuid: string = crypto.randomUUID();        
        const api = await API.subscribe(uuid, this.providers, contractAddress, this.logger);

        deployment.next({
          status: 'deployed',
          api,
          address: api.deployedContractAddress,
        });
      } else {
        deployment.next({
          status: 'failed',
          error: new Error('Providers are not available'),
        });
      }
    } catch (error: unknown) {
      this.logger.error(error);
      deployment.next({
        status: 'failed',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }
}
