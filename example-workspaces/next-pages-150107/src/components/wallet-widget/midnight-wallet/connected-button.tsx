import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAssets, useWallet } from '@meshsdk/midnight-react';
import { Button } from '@/components/ui/button';

export default function ConnectedButton() {
  const { disconnect } = useWallet();
  const { address } = useAssets();

  return (
    <>
      {address && (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {address.slice(0, 4)}...{address.slice(-4)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
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
