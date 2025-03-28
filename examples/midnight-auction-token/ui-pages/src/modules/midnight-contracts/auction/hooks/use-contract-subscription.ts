import {
  ContractState,
  ContractDeployment,
  useProviders as useProvidersAuction,
  useLocalState,
} from '@/packages/midnight-contracts/auction';
import { DeployedAPI, DerivedState, utils } from '@meshsdk/auction-api';
import { Certificate, createPrivateState, Maybe } from '@meshsdk/auction-contract';
import { useCallback, useEffect, useState } from 'react';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import { encodeCoinPublicKey } from '@midnight-ntwrk/compact-runtime';
import { useAssets } from '@/packages/midnight-react';

export const useAuctionContractSubscription = (contractStates?: ContractState, key?: string | number) => {
  const [contractDeployment, setContractDeployment] = useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] = useState<DeployedAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [contractState, setContractState] = useState<DerivedState>();
  const [isLoading, setIsLoading] = useState(!!contractStates?.observable);
  const { coinPublicKey } = useAssets();
  const providersAuction = useProvidersAuction();
  const localStorage = useLocalState();

  /** ✅ Force reset state when key (modal) changes */
  useEffect(() => {
    setContractDeployment(undefined);
    setDeployedContractAPI(undefined);
    setContractState(undefined);
    setErrorMessage(undefined);
    setIsLoading(!!contractStates?.observable);
  }, [key]); // 👈 Resets state when a new contract is selected (modal reopens)

  useEffect(() => {
    if (!contractStates?.observable) {
      return;
    }
    const subscription = contractStates.observable.subscribe(setContractDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [contractStates?.observable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }
    if (contractDeployment.status === 'in-progress') {
      return;
    }
    setIsLoading(false);

    if (contractDeployment.status === 'failed') {
      setErrorMessage(
        contractDeployment.error.message.length ? contractDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }
    setDeployedContractAPI((prev) => prev || contractDeployment.api);
  }, [contractDeployment, setIsLoading, setErrorMessage, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState = deployedContractAPI.state$.subscribe(setContractState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  const register = async () => {
    if (deployedContractAPI) {
      try {
        await deployedContractAPI.register();
      } catch (e) {
        throw e;
      }
    }
  };

  const list_register = useCallback(() => {
    if (deployedContractAPI && contractState) {
      const list = contractState.registered.map((cert) => {
        if (cert.is_some) {
          return toHex(cert.value);
        }
      });
      console.log(list);
      return list;
    }
  }, [contractState, deployedContractAPI]);

  const list_confirmed = useCallback(() => {
    if (deployedContractAPI && contractState) {
      const list = contractState.confirmed.map((cert) => {
        if (cert.is_some) {
          return toHex(cert.value);
        }
      });
      console.log(list);
      return list;
    }
  }, [contractState, deployedContractAPI]);

  const approve_certificates = async (approvedHexCertificates: string[]) => {
    try {
      if (deployedContractAPI && contractState) {
        const maybeKeys: Maybe<Uint8Array>[] = [];
        const MAX_KEYS = 10;
        for (let i = 0; i < contractState.registered.length && maybeKeys.length < MAX_KEYS; i++) {
          const cert = contractState.registered[i];
          if (cert.is_some) {
            // Convert the stored certificate to a hex string.
            const certHex = toHex(cert.value);
            // Only include this certificate if its hex representation is in our approved list.
            if (approvedHexCertificates.includes(certHex)) {
              maybeKeys.push(cert);
            }
          }
        }
        while (maybeKeys.length < 10) {
          maybeKeys.push({
            is_some: false,
            value: new Uint8Array(32),
          });
        }
        await deployedContractAPI.approve_certificates(maybeKeys);
      }
    } catch (e) {
      throw e;
    }
  };

  const start_auction = () => {
    if (deployedContractAPI) {
      deployedContractAPI.start_bid();
    }
  };

  const bid = async (value: number) => {
    try {
      if (deployedContractAPI) {
        await deployedContractAPI.make_bid(value);
      }
    } catch (e) {
      throw e;
    }
  };

  const close_auction = () => {
    if (deployedContractAPI) {
      deployedContractAPI.close_bid();
    }
  };

  const set_myId1 = () => {
    if (providersAuction && contractStates?.address && coinPublicKey) {
      const p1certificate: Certificate = {
        age: 19n,
        aml: true,
        jurisdiction: true,
        owner: { bytes: encodeCoinPublicKey(coinPublicKey) },
        issuer: { bytes: new Uint8Array(32) },
        sk: utils.randomBytes(32),
      };
      const my_private_key = localStorage.getContractPrivateId(contractStates.address);
      if (!my_private_key) return;
      providersAuction.privateStateProvider.set(my_private_key, createPrivateState(p1certificate));
    }
  };

  const set_myId2 = () => {
    if (providersAuction && contractStates?.address && coinPublicKey) {
      const p1certificate: Certificate = {
        age: 17n,
        aml: true,
        jurisdiction: true,
        owner: { bytes: encodeCoinPublicKey(coinPublicKey) },
        issuer: { bytes: new Uint8Array(32) },
        sk: utils.randomBytes(32),
      };
      const my_private_key = localStorage.getContractPrivateId(contractStates.address);
      if (!my_private_key) return;
      providersAuction.privateStateProvider.set(my_private_key, createPrivateState(p1certificate));
    }
  };

  const set_myId3 = () => {
    if (providersAuction && contractStates?.address && coinPublicKey) {
      const p1certificate: Certificate = {
        age: 21n,
        aml: false,
        jurisdiction: true,
        owner: { bytes: encodeCoinPublicKey(coinPublicKey) },
        issuer: { bytes: new Uint8Array(32) },
        sk: utils.randomBytes(32),
      };
      const my_private_key = localStorage.getContractPrivateId(contractStates.address);
      if (!my_private_key) return;
      providersAuction.privateStateProvider.set(my_private_key, createPrivateState(p1certificate));
    }
  };

  const set_myId4 = () => {
    if (providersAuction && contractStates?.address && coinPublicKey) {
      const p1certificate: Certificate = {
        age: 19n,
        aml: true,
        jurisdiction: false,
        owner: { bytes: encodeCoinPublicKey(coinPublicKey) },
        issuer: { bytes: new Uint8Array(32) },
        sk: utils.randomBytes(32),
      };
      const my_private_key = localStorage.getContractPrivateId(contractStates.address);
      if (!my_private_key) return;
      providersAuction.privateStateProvider.set(my_private_key, createPrivateState(p1certificate));
    }
  };

  return {
    contractDeployment,
    deployedContractAPI,
    errorMessage,
    contractState,
    isLoading,
    register,
    list_register,
    list_confirmed,
    approve_certificates,
    start_auction,
    bid,
    close_auction,
    set_myId1,
    set_myId2,
    set_myId3,
    set_myId4,
  };
};
