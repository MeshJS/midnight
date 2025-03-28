import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { useDeployedContracts, useProviders } from '@/packages/midnight-contracts/auction';
import { useEffect, useState } from 'react';
import { useAuctionContractsSubscriptions } from '@/modules/midnight-contracts/auction/hooks/use-contracts-subscriptions';
import { ContractPage } from '@/modules/home/components/admin-contracts';
import { api } from '@/utils/api';
import { NewAuction } from '@/modules/home/components/new-auction';
import { ManageAuctions } from '@/modules/home/components/manage-auctions';
import { Footer } from '@/modules/home/components/footer';
import { PendingCertificates } from '@/modules/home/components/pending-certificates';
import { ApprovedCertificates } from '@/modules/home/components/approved-certificates';

const Admin = () => {
  const { auctionContractDeployments, auctionContractDeployments_refresh } = useAuctionContractsSubscriptions();
  const providers = useProviders();
  const [deploymentStatus, setDeploymentStatus] = useState<'deploying' | 'deploying-done' | 'deploying-error' | undefined>(
    undefined,
  );

  useEffect(() => {
    if (deploymentStatus === 'deploying') {
      toast.info('deploying auction contract');
    }
    if (deploymentStatus === 'deploying-done') {
      toast.dismiss(); // Remove previous messages
      toast.info('deployment done');
    }
  }, [deploymentStatus]);

  useEffect(() => {
    if (providers?.flowMessage) {
      toast.info(providers.flowMessage, {
        id: 'flowMessageToast', // Use a fixed ID to avoid duplicates
        duration: Infinity,
      });
    }
  }, [providers?.flowMessage]);

  return (
    <div className="flex flex-col items-center justify-between gap-y-20 min-h-screen pt-[70px] text-white">
      <h1 className="w-[600px] pt-12 text-white/80 text-5xl font-[family-name:var(--font-eb-garamond)]">
          Admin
        </h1>
      <div className="w-[600px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem className="border-b border-[#707070]" value="item-1">
            <AccordionTrigger>
              <div className="pl-5 font-[family-name:var(--font-eb-garamond)] text-white/70 text-[20px]">New Auction</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-[#707070] rounded-[3px] py-8">
                <NewAuction
                  auctionContractDeployments={auctionContractDeployments}
                  auctionContractDeployments_refresh={auctionContractDeployments_refresh}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b border-[#707070]" value="item-2">
            <AccordionTrigger>
              <div className="pl-5 font-[family-name:var(--font-eb-garamond)] text-white/70 text-[20px]">Manage Auctions</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-[#707070] rounded-[3px] px-4 py-5">
                <ManageAuctions
                  auctionContractDeployments={auctionContractDeployments}
                  auctionContractDeployments_refresh={auctionContractDeployments_refresh}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b border-[#707070]" value="item-3">
            <AccordionTrigger>
              <div className="pl-5 font-[family-name:var(--font-eb-garamond)] text-white/70 text-[20px]">
                Pending Certificates
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-[#707070] rounded-[3px] px-4 py-5">
                <PendingCertificates auctionContractDeployments={auctionContractDeployments} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-b border-[#707070]" value="item-4">
            <AccordionTrigger>
              <div className="pl-5 font-[family-name:var(--font-eb-garamond)] text-white/70 text-[20px]">
                Approved Certificates
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border border-[#707070] rounded-[3px] px-4 py-8">
                <ApprovedCertificates auctionContractDeployments={auctionContractDeployments}/>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};
export default Admin;
