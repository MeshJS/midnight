import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ContractPage } from './admin-contracts';
import { ContractState } from '@/packages/midnight-contracts/auction';
import { Subscription } from 'rxjs';

interface ManageAuctionsProps {
  auctionContractDeployments: ContractState[];
  auctionContractDeployments_refresh: () => Subscription;
}

export const ManageAuctions = ({ auctionContractDeployments, auctionContractDeployments_refresh }: ManageAuctionsProps) => {
  return (
    <div className='space-y-5'>
        {auctionContractDeployments.map((contract, id) => (
        <ContractPage key={id} contract={contract} />
      ))}
    </div>
  );
};
