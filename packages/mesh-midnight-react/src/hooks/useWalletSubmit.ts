import { useCallback, useContext, useState } from "react";
import { WalletContext } from "../contexts";

export const useWalletSubmit = () => {
  const [error, setError] = useState<unknown>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { hasConnectedWallet, midnightBrowserWalletInstance } =
    useContext(WalletContext);

  const submitTx = useCallback(async (signedTx: string) => {
    setSubmitting(true);
    setError(undefined);

    try {
      if (hasConnectedWallet && midnightBrowserWalletInstance) {
        await midnightBrowserWalletInstance.submitTransaction(signedTx);
      }
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  }, [hasConnectedWallet, midnightBrowserWalletInstance]);

  return {
    error,
    submitting,
    submitTx,
  };
};
