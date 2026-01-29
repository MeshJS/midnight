import { useCallback, useContext, useState } from "react";
import { WalletContext } from "../contexts";

export const useWalletBalanceProve = () => {
  const [error, setError] = useState<unknown>();
  const [result, setResult] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { hasConnectedWallet, midnightBrowserWalletInstance } =
    useContext(WalletContext);

  const submitTx = useCallback(async (tx: string) => {
    setSubmitting(true);
    setError(undefined);

    try {
      if (hasConnectedWallet && midnightBrowserWalletInstance) {
        const balancedTx = await midnightBrowserWalletInstance.balanceAndProveTransaction(tx);
        setResult(balancedTx);
      }
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  }, [hasConnectedWallet, midnightBrowserWalletInstance]);

  return {
    error,
    result,
    submitting,
    submitTx,
  };
};
