import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAssets, useWallet } from '@meshsdk/midnight-react';

export default function ConnectedButton() {
  const { disconnect } = useWallet();
  const { address } = useAssets();

  return (
    <>
      {address && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="mesh-border mesh-border-[#0E1B2E] mesh-rounded-[3px] mesh-w-[140px] mesh-py-1.5 mesh-text-[16px]">
              {address.slice(0, 4)}...{address.slice(-4)}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`mesh-rounded-[3px] mesh-w-[140px] `}>
            <DropdownMenuItem
              className="mesh-text-[16px] mesh-text-[#0E1B2E] mesh-cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Address3
            </DropdownMenuItem>
            <DropdownMenuItem
              className="mesh-text-[16px] mesh-text-[#0E1B2E] mesh-cursor-pointer"
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
