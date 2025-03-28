import { useAuctionContractSubscription } from '@/modules/midnight-contracts/auction/hooks/use-contract-subscription';
import { ContractState } from '@/packages/midnight-contracts/auction';
import { STATE } from '@meshsdk/auction-contract';
import Image from 'next/image';

interface AuctionCardProps {
  contract: ContractState;
  setIndex: (index: number | undefined) => void;
  index: number | undefined;
  setOpenDialog: (open: boolean) => void;
}

export const AuctionCard = ({ contract, setIndex, setOpenDialog, index }: AuctionCardProps) => {
  const { contractDeployment, contractState } = useAuctionContractSubscription(contract);
  return (
    <div
      className="relative h-[370px] w-[270px] cursor-pointer"
      onClick={() => {
        setIndex(index);
        setOpenDialog(true);
      }}
    >
      <div className="absolute left-3 top-2 rounded-[5px] bg-white/10 px-2 py-1 text-[15px] text-white backdrop-blur-md">
        {contractState?.state === STATE.open && 'Upcoming'}
        {contractState?.state === STATE.active && 'Live'}
        {contractState?.state === STATE.closed && 'Closed'}
      </div>
      <div className="absolute bottom-0 h-fit w-full space-y-2 rounded-b-[5px] bg-white/20 p-2.5 backdrop-blur-lg">
        <h2 className="font-[family-name:var(--font-eb-garamond)] text-[18px] text-white">
          {/* {contractDeployment?.address}           */}
          {contractState?.info.title}
        </h2>
        <p className="text-[13px] text-[#D28C13]">{contractState?.info.description}</p>
        <p className="text-[13px] leading-[1.3] text-[#0E1B2E]">Bidding closes on{" "} {contractState?.info.deadline}</p>
      </div>
      <div className="h-[80%] w-full">
        {contractState?.info.image && (
          <Image
            className="pointer-events-none h-full w-full rounded-[5px] object-cover"
            src={contractState?.info.image}
            alt="sample"
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  );
};
