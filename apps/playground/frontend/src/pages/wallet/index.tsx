import {
  MidnightWallet,
  useAssets,
  useWallet,
} from "@meshsdk/midnight-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

export function Wallet() {
  const {
    address,
    coinPublicKey,
    encryptionPublicKey,
    hasConnectedWallet,
    isProofServerOnline,
    uris,
    walletName,
  } = useAssets();
  const { connectingWallet, disconnect, setOpen, connectWallet } = useWallet();

  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Wallet Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 break-all">
        <div className="card bg-card shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Wallet Widget</h2>
          <MidnightWallet isDark={isDark} />
          <ModeToggle /> 
          <div className="card bg-card shadow p-6 flex flex-col gap-4 md:col-span-2">
            <h2 className="text-lg font-semibold">Wallet Actions</h2>
            <div className="flex gap-4 flex-wrap items-center">
              <button
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded cursor-pointer"
                onClick={disconnect}
              >
                Disconnect
              </button>
              <button
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Open Wallet Dialog
              </button>
              <button
                className="px-4 py-2 bg-accent text-accent-foreground rounded cursor-pointer"
                onClick={() => connectWallet("mnLace")}
              >
                Connect Lace
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-card shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Asset Details</h2>
          <div className="space-y-1 break-all">
            <div>Wallet Name: {walletName}</div>
            <div>Address: {address}</div>
            <div>Coin Public Key: {coinPublicKey}</div>
            <div>Encryption Public Key: {encryptionPublicKey}</div>
            <div>Has Connected Wallet: {hasConnectedWallet ? "Yes" : "No"}</div>
            <div>
              Is Proof Server Online: {isProofServerOnline ? "Yes" : "No"}
            </div>
            <div>Indexer: {uris?.indexerUri}</div>
            <div>IndexerWS: {uris?.indexerWsUri}</div>
            <div>Proof Server: {uris?.proverServerUri}</div>
            <div>Node: {uris?.substrateNodeUri}</div>
            <span className="text-sm opacity-70">
              Connecting: {connectingWallet ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
