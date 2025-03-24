import { useDeployedContracts, useProviders, ContractState, ContractDeployment } from '@/packages/midnight-contracts/token';
import { useAssets } from '@/packages/midnight-react';
import { DeployedAPI, DerivedState } from '@meshsdk/token-api';
import { useCallback, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useSubscriptions = () => {
  const { hasConnectedWallet } = useAssets();
  const providers = useProviders();

  const deploy = useDeployedContracts();
  const [tokenContractDeployments, setTokenContractDeployments] = useState<ContractState[]>([]);
  const [tokenDeploymentObservable, setTokenDeploymentObservable] = useState<Observable<ContractDeployment> | undefined>(
    undefined,
  );
  const [tokenDeployment, setTokenDeployment] = useState<ContractDeployment>();
  const [deployedAPI, setDeployedAPI] = useState<DeployedAPI>();
  const [derivedState, setDerivedState] = useState<DerivedState>();

  useEffect(() => {
    if (!deploy) {
      return;
    }
    const subscription = deploy.contractDeployments$.subscribe(setTokenContractDeployments);

    return () => {
      subscription.unsubscribe();
    };
  }, [deploy]);

  const onJoin = useCallback(async (): Promise<void> => {
    setTokenDeploymentObservable(deploy.addContract('recent').observable);
  }, [deploy, setTokenDeploymentObservable]);

  useEffect(() => {
    if (hasConnectedWallet && providers) {
      void onJoin();
    }
  }, [onJoin, hasConnectedWallet, providers]);

  useEffect(() => {
    if (!tokenDeploymentObservable) {
      return;
    }
    const subscription = tokenDeploymentObservable.subscribe(setTokenDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [tokenDeploymentObservable]);

  useEffect(() => {
    if (!tokenDeployment) {
      return;
    }

    if (tokenDeployment.status === 'in-progress' || tokenDeployment.status === 'failed') {
      return;
    }
    setDeployedAPI((prev) => prev || tokenDeployment.api);
  }, [tokenDeployment, setDeployedAPI]);

  useEffect(() => {
    if (deployedAPI) {
      const subscriptionDerivedState = deployedAPI.state$.subscribe(setDerivedState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedAPI]);

  return {
    tokenContractDeployments,
    tokenDeployment,
    deployedAPI,
    derivedState,
  };
};
