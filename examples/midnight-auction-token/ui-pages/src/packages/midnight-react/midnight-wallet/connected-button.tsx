import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAssets, useWallet } from '../hooks';
import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function ConnectedButton() {
  const { disconnect } = useWallet();
  const { address } = useAssets();

  return (
    <>
      {address && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border border-[#0E1B2E] rounded-[3px] w-[140px] py-1.5 text-[16px]">
              {address.slice(0, 4)}...{address.slice(-4)}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`${ibmPlexSans.className} rounded-[3px] w-[140px] `}>
            <DropdownMenuItem
              className="text-[16px] text-[#0E1B2E] "
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[16px] text-[#0E1B2E]"
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
