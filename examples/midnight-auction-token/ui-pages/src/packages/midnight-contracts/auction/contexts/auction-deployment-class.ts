import { API, type Providers, type DeployedAPI } from '@meshsdk/auction-api';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { BehaviorSubject, type Observable } from 'rxjs';
import { type Logger } from 'pino';
import { type LocalStorageProps } from './auction-localStorage-class';

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
  readonly addContract: (contractType: ContractType, contractAddress: ContractAddress) => ContractState;
  readonly deployAndAddContract: (
    contractType: ContractType,
    title: string,
    description: string,
    estimated_value: number,
    deadline: string,
    image: string,
  ) => Promise<ContractState>;
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  readonly #contractDeploymentsSubject: BehaviorSubject<ContractState[]>;

  constructor(
    private readonly logger: Logger,
    private readonly localState: LocalStorageProps,
    private readonly tokenContractAddress: ContractAddress,
    private readonly providers?: Providers,
  ) {
    this.#contractDeploymentsSubject = new BehaviorSubject<ContractState[]>([]);
    this.contractDeployments$ = this.#contractDeploymentsSubject;
  }

  readonly contractDeployments$: Observable<ContractState[]>;

  addContract(contractType: ContractType, contractAddress: ContractAddress): ContractState {
    const deployments = this.#contractDeploymentsSubject.value;

    const deployment = new BehaviorSubject<ContractDeployment>({
      status: 'in-progress',
      address: contractAddress,
    });

    const contract: ContractState = { observable: deployment, contractType, address: contractAddress };

    const deploymentsToKeep = deployments.filter(
      (deployment) => !(deployment.observable.value.address === contractAddress && deployment.contractType === contractType),
    );
    this.#contractDeploymentsSubject.next([...deploymentsToKeep, contract]);
    void this.join(deployment, contractAddress);

    return contract;
  }

  async deployAndAddContract(
    contractType: ContractType,
    title: string,
    description: string,
    estimated_value: number,
    deadline: string,
    image: string,
  ): Promise<ContractState> {
    const deployments = this.#contractDeploymentsSubject.value;

    const deployment = new BehaviorSubject<ContractDeployment>({
      status: 'in-progress',
    });

    const contract: ContractState = { observable: deployment, contractType };

    this.#contractDeploymentsSubject.next([...deployments, contract]);
    const address = await this.deploy(deployment, title, description, estimated_value, deadline, image);

    return { observable: deployment, contractType, address };
  }

  private async deploy(
    deployment: BehaviorSubject<ContractDeployment>,
    title: string,
    description: string,
    estimated_value: number,
    deadline: string,
    image: string,
  ): Promise<string | undefined> {
    try {
      if (this.providers) {
        const uuid: string = crypto.randomUUID();        
        const api = await API.deploy(
          uuid,
          this.tokenContractAddress,
          this.providers,
          this.logger,
          title,
          description,
          estimated_value,
          deadline,
          image,
        );        
        this.localState.setContractPrivateId(uuid, api.deployedContractAddress);
        this.localState.addContract(api.deployedContractAddress);

        deployment.next({
          status: 'deployed',
          api,
          address: api.deployedContractAddress,
        });
        return api.deployedContractAddress;
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
    return undefined;
  }

  private async join(deployment: BehaviorSubject<ContractDeployment>, contractAddress: ContractAddress): Promise<void> {
    try {
      if (this.providers) {
        let uuid: string = crypto.randomUUID();
        const item = this.localState.getContractPrivateId(contractAddress);
        if (item != null) {
          uuid = item;
        } else {
          this.localState.setContractPrivateId(uuid, contractAddress);
        }
        const api = await API.subscribe(uuid, this.tokenContractAddress, this.providers, contractAddress, this.logger);

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
