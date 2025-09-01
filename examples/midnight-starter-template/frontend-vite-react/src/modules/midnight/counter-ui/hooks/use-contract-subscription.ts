import {  
  ContractDeployment,
  useProviders,
  useDeployedContracts,
  ContractFollow,
} from "@/modules/midnight/counter-ui";
import { DerivedState } from "../api/common-types";
import { useCallback, useEffect, useState } from "react";
import { ContractControllerInterface } from "../api/contractController";
import { useAssets } from "@meshsdk/midnight-react";
import { Observable } from "rxjs";

export const useContractSubscription = () => {
  const { hasConnectedWallet } = useAssets();
  const providers = useProviders();
  const deploy = useDeployedContracts();

  const [counterDeploymentObservable, setCounterDeploymentObservable] =
    useState<Observable<ContractDeployment> | undefined>(undefined);

  const [contractDeployment, setContractDeployment] =
    useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] =
    useState<ContractControllerInterface>();
  const [derivedState, setDerivedState] = useState<DerivedState>();

  const onDeploy = async (): Promise<ContractFollow> => {
    const contractFollow = await deploy.deployContract();
    return contractFollow;
  }

  const onJoin = useCallback(async (): Promise<void> => {
    setCounterDeploymentObservable(deploy.joinContract().observable);
  }, [deploy, setCounterDeploymentObservable]);

  useEffect(() => {
    if (hasConnectedWallet && providers) {
      void onJoin();
    }
  }, [onJoin, hasConnectedWallet, providers]);

  useEffect(() => {
    if (!counterDeploymentObservable) {
      return;
    }
    const subscription = counterDeploymentObservable.subscribe(
      setContractDeployment
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [counterDeploymentObservable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }

    if (
      contractDeployment.status === "in-progress" ||
      contractDeployment.status === "failed"
    ) {
      return;
    }
    setDeployedContractAPI((prev) => prev || contractDeployment.api);
  }, [contractDeployment, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState =
        deployedContractAPI.state$.subscribe(setDerivedState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  return {       
    deployedContractAPI,
    derivedState,
    onDeploy,
    providers
  };
};
