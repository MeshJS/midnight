import { useEffect, useState } from "react";
import { DAppConnectorAPI } from "@midnight-ntwrk/dapp-connector-api";
import { MidnightBrowserWallet } from "@/lib/midnight/wallet/browser-wallet";

export const useWalletList = () => {
  const [wallets, setWallets] = useState<DAppConnectorAPI[]>([]);
  useEffect(() => {
    async function get() {
      setWallets(MidnightBrowserWallet.getAvailableWallets());
    }
    get();
  }, []);

  return wallets;
};
