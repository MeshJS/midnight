import { useDeployedContracts, ContractState, useLocalState } from '@/packages/midnight-contracts/auction';
import { useCallback, useEffect, useState } from 'react';

export const useAuctionContractsSubscriptions = () => {
  const localState = useLocalState();
  const deploy = useDeployedContracts();
  const [auctionContractDeployments, setAuctionContractDeployments] = useState<ContractState[]>([]);
 
  const auctionContractDeployments_refresh = useCallback(() => {
    localState.getContracts().forEach((contractAddress) => { 
      // provider to get contract state to filter (could be a database or indexer, tradeoffs??)    
      deploy.addContract('recent', contractAddress);
    });
    const subscription = deploy.contractDeployments$.subscribe((newDeployments) => {
      console.log('New contract deployments received:', newDeployments);
      setAuctionContractDeployments(newDeployments);
    });
    return subscription;
  }, [deploy, localState]);

  useEffect(() => {
    const subscription = auctionContractDeployments_refresh();

    return () => {
      subscription.unsubscribe();
    };
  }, [auctionContractDeployments_refresh]);

  return {
    auctionContractDeployments,
    auctionContractDeployments_refresh
  };
};
