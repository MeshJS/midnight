import { useAuctionContractSubscription } from '@/modules/midnight-contracts/auction/hooks/use-contract-subscription';
import { useEffect, useState } from 'react';
import { ContractState } from '@/packages/midnight-contracts/auction';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface ConfirmedCertificatesProps {
  contract: ContractState;
}

export const ConfirmedCertificates = ({ contract }: ConfirmedCertificatesProps) => {
  const { list_confirmed,contractDeployment } = useAuctionContractSubscription(contract);
  const [list_confirmed_, setList_confirmed_] = useState<(string | undefined)[] | undefined>(undefined);

  useEffect(() => {
    const list_confirmed_ = list_confirmed();
    setList_confirmed_(list_confirmed_);
  }, [list_confirmed]);

  return (
    <div className='border border-[#707070] rounded-[3px] p-3 space-y-3'>
      <div className="flex gap-x-2">
          <h1 className="text-white/50">Contract Address: </h1>
          <div className="flex gap-x-2">
            <div className="text-white/80">
              {contractDeployment?.address &&
                `${contractDeployment.address.slice(0, 15)}...${contractDeployment.address.slice(-15)}`}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    className="cursor-pointer"
                    onClick={() => {
                      contractDeployment?.address && navigator.clipboard.writeText(contractDeployment.address);
                      toast.success('Contract address copied!');
                    }}
                    src="/copy-white.svg"
                    alt="copy"
                    width={12}
                    height={12}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Copy contract</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      <ul className="">
        {list_confirmed_ && list_confirmed_.map((item) => (<div className='flex flex-col py-1 text-white/80'>{item}</div>))}
        </ul>
    </div>
  );
};
