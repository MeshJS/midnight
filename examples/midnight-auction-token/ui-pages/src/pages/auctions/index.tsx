import { Input } from '@/components/ui/input';
import { AuctionCard } from '@/modules/home/components/auction-card';
import { AuctionModal } from '@/modules/home/components/auction-modal';
import { Footer } from '@/modules/home/components/footer';
import { ContractState, useDeployedContracts } from '@/packages/midnight-contracts/auction';
import { api } from '@/utils/api';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return arr.reduce((acc: T[][], _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
};

const Auctions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const { data, isLoading } = api.getTable.getMany.useQuery();
  const { data: dataSmartContracts, isLoading: isLoadingSmartContracts } = api.getTable.getSmartContracts.useQuery();
  const deploy = useDeployedContracts();
  const [auctionContractDeployments, setAuctionContractDeployments] = useState<ContractState[]>([]);

  const auctionContractDeployments_refresh = useCallback(() => {
    if (dataSmartContracts) {
      dataSmartContracts.forEach((item) => {
        deploy.addContract('recent', item.smartContract);
      });
      const subscription = deploy.contractDeployments$.subscribe((newDeployments) => {
        console.log('New contract deployments received:', newDeployments);
        setAuctionContractDeployments(newDeployments);
      });
      return subscription;
    }
  }, [deploy, dataSmartContracts]);

  useEffect(() => {
    const subscription = auctionContractDeployments_refresh();
    if (subscription) {
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [auctionContractDeployments_refresh]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isLoadingSmartContracts || !dataSmartContracts) {
    return <div>Loading...</div>;
  }

  const chunkedData = chunkArray(auctionContractDeployments, 3);

  return (
    <div className="relative flex flex-col h-[calc(100vh-70px)] justify-center mt-[70px]">
      <AuctionModal openDialog={openDialog} setOpenDialog={setOpenDialog} index={index} contracts={auctionContractDeployments} />
      <div className="flex justify-center absolute bottom-0 -z-10 h-[50%]  w-full bg-[#3E4858]">
        <h1 className="absolute top-[-55px] pl-12 w-full max-w-[2000px] text-white/80 text-5xl font-[family-name:var(--font-eb-garamond)]">
          Auctions
        </h1>
      </div>
      <div className="flex justify-center pb-10">
        <div className="relative w-[910px]">
          <Image className="absolute left-[470px] top-[10px]" src="/search.svg" alt="search" height={14} width={14} />
          <Input placeholder="Search" className="pl-5 w-[500px] border-none rounded-[3px] bg-[#3E4858] text-white" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-16 h-[410px] w-full overflow-y-auto snap-y snap-mandatory pt-16">
        {chunkedData.map((group, rowIndex) => (
          <div key={rowIndex} className=" snap-center">
            <div className="grid grid-cols-3 gap-x-10">
              {group.map((item, colIndex) => {
                console.log('rowIndex', rowIndex);
                console.log('ColIndex', colIndex);
                return (
                  <AuctionCard
                    key={rowIndex * 3 + colIndex}
                    contract={item}
                    index={rowIndex * 3 + colIndex}
                    setIndex={setIndex}
                    setOpenDialog={setOpenDialog}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className="h-20" />
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Auctions;
