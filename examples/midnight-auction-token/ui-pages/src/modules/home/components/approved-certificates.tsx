import { ContractState } from '@/packages/midnight-contracts/auction';
import { ConfirmedCertificates } from './confirmed-certificates';

interface ApprovedCertificatesProps {
  auctionContractDeployments: ContractState[];
}

export const ApprovedCertificates = ({ auctionContractDeployments }: ApprovedCertificatesProps) => {
  return (
    <div className="space-y-5">
      {auctionContractDeployments.map((contract, id) => (
        <ConfirmedCertificates contract={contract} key={id} />
      ))}
    </div>
  );
};
