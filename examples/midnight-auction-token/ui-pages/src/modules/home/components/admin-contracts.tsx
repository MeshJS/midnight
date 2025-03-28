import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuctionContractSubscription } from '@/modules/midnight-contracts/auction/hooks/use-contract-subscription';
import { ContractState } from '@/packages/midnight-contracts/auction';
import { useAssets } from '@/packages/midnight-react';
import { STATE } from '@meshsdk/auction-contract';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ContractPageProps {
  contract: ContractState;
}

export const ContractPage = ({ contract }: ContractPageProps) => {
  const {
    contractDeployment,
    contractState,
    start_auction,
    close_auction,
    list_register,
    list_confirmed,
    register,
    approve_certificates,
    bid,
  } = useAuctionContractSubscription(contract);
  const { coinPublicKey } = useAssets();
  const [list_register_, setList_register_] = useState<(string | undefined)[] | undefined>(undefined);
  const [list_confirmed_, setList_confirmed_] = useState<(string | undefined)[] | undefined>(undefined);

  useEffect(() => {
    if (contractState?.userAction?.action === 'opening-bid') {
      toast.info('opening Auction');
    }
    if (contractState?.userAction?.action === 'opening-done') {
      toast.dismiss(); // Remove previous messages
      toast.info('Auction was opened');
    } 

    if (contractState?.userAction?.action === 'closing-bid') {
      toast.info('closing Auction');
    }
    if (contractState?.userAction?.action === 'closing-done') {
      toast.dismiss(); // Remove previous messages
      toast.info('Auction was closed');
    }
    console.log(contractState?.userAction.action);
  }, [contractState?.userAction.action]);

  useEffect(() => {
    const list_register_ = list_register();
    setList_register_(list_register_);
  }, [list_register]);

  useEffect(() => {
    const list_confirmed_ = list_confirmed();
    setList_confirmed_(list_confirmed_);
  }, [list_confirmed]);

  return (
    <div className="flex flex-col w-full space-y-5 bg-[#3E4858] rounded-[3px] p-3">
      <div className="flex justify-between">
        <div className="flex flex-col space-y-2">
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
        <div className="flex items-end">
          <Button 
          disabled={contractState?.state === STATE.closed}
          className="py-0 h-fit rounded-[3px] bg-gradient-to-r from-[#D26608] to-[#D28C13] font-normal transition-all hover:from-[#E07318] hover:to-[#E29E35]">
            <div className="rounded-[3px] px-2.5 py-1">
              {contractState?.state === STATE.open && (
                <div className="cursor-pointer" onClick={start_auction}>
                  Start Contract
                </div>
              )}
              {contractState?.state === STATE.active && (
                <div className="cursor-pointer" onClick={close_auction}>
                  Close Contract
                </div>
              )}
              {contractState?.state === STATE.closed && <div>Contract Closed</div>}
            </div>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col space-y-1.5">
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Title:</h1>
            <p className="text-white/80">{contractState?.info.title}</p>
          </div>
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Description:</h1>
            <p className="text-white/80">{contractState?.info.description}</p>
          </div>
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Owner:</h1>
            <p className="text-white/80">
              {contractState?.owner && toHex(contractState?.owner.bytes) === coinPublicKey ? 'yes' : 'no'}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 items-end">
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Min Bid:</h1>
            <p className="text-white/80">{contractState?.info.minBid.toString()}{' '}tBid</p>
          </div>
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Deadline:</h1>
            <p className="text-white/80">{contractState?.info.deadline}</p>
          </div>
          <div className="flex gap-x-2">
            <h1 className="text-white/50">Cover Image:</h1>
            <p className="text-white/80">{contractState?.info.image}</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="py-2 flex flex-col items-center">

    //   <div>Address: {contractDeployment?.address}</div>
    //   <div className="flex">
    //     State of the contract:{' '}
    //     {contractState?.state === STATE.open ? (
    //       <div className="cursor-pointer" onClick={start_auction}>
    //         Start Contract
    //       </div>
    //     ) : contractState?.state === STATE.active ? (
    //       <div className="cursor-pointer" onClick={close_auction}>
    //         Close Contract
    //       </div>
    //     ) : (
    //       'Contract is closed'
    //     )}
    //   </div>
    //   <div>Am i the owner?: {contractState?.owner && (toHex(contractState?.owner.bytes) === coinPublicKey).toString()}</div>
    //   <div>Registered Certificates: {list_register_ && list_register_.toString()}</div>
    //   <div>Confirmed Certificates: {list_confirmed_ && list_confirmed_.toString()}</div>
    //   <div onClick={register}> Registrar no BID</div>
    //   <div onClick={set_myId1}>Set My ID1</div>
    //   <div onClick={set_myId2}>Set My ID2</div>
    //   <div onClick={set_myId3}>Set My ID3</div>
     
    //   <div onClick={() => approve_certificates(['e90936a4daa108d901e3b5793c095d70d64397d80a8ffc6e378882302a3d31f6'])}>
    //     {' '}
    //     Approve Certificates
    //   </div>
    //   <div onClick={() => bid(11)}> Make Bid</div>
    //   <div>Contract Title: {contractState?.info.title}</div>
    //   <div>Contract Description: {contractState?.info.description}</div>
    //   <div>Contract MinBid: {contractState?.info.minBid.toString()}</div>
    //   <div>Contract Deadline: {contractState?.info.deadline}</div>
    //   <div>Contract Image: {contractState?.info.image}</div>
    // </div>
  );
};
