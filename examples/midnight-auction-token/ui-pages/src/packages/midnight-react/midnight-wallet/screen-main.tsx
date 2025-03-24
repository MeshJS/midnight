import IconMonitorSmartphone from '../icons/icon-monitor-smartphone';

import { TooltipProvider } from '@/components/ui/tooltip';
import { useWallet, useWalletList } from '../hooks';
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
      <div className="grid gap-4 py-4 grid-cols-5 place-items-center gap-y-8">
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
