import { ContractState } from '@/packages/midnight-contracts/auction';
import { CertificatePage } from './certificate-page';

interface PendingCertificatesProps {
  auctionContractDeployments: ContractState[];
}

export const PendingCertificates = ({ auctionContractDeployments }: PendingCertificatesProps) => {
  return (
    <div className="space-y-5">
      {auctionContractDeployments.map((contract, id) => (
        <CertificatePage contract={contract} key={id} />
      ))}
    </div>
  );
};
