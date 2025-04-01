import IconMonitorSmartphone from '../icons/icon-monitor-smartphone';

import { TooltipProvider } from '@/components/ui/tooltip';
import { useWallet, useWalletList } from '@meshsdk/midnight-react';
import WalletIcon from './wallet-icon';

export default function ScreenMain({
  setOpen,
}: {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setOpen: Function;
}) {
  const wallets = useWalletList();
  const { connectWallet } = useWallet();

  return (
    <TooltipProvider>
      <div className="mesh-grid mesh-gap-4 mesh-py-4 mesh-grid-cols-5 mesh-place-items-center mesh-gap-y-8">
        {wallets.map((wallet, index) => (
          <WalletIcon
            key={index}
            iconReactNode={<IconMonitorSmartphone />}
            name={wallet.name == "mnLace" ? "LACE" : "UNDEFINED"}
            action={() => {
              connectWallet(wallet.name);
              setOpen(false);
            }}
          />
        ))}  
      </div>
    </TooltipProvider>
  );
}
