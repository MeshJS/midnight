import { ModeToggle } from "@/components/mode-toggle";
import { MidnightWallet, useAssets, useWallet } from "@meshsdk/midnight-react";
import { MidnightWallet as HeadlessWallet } from "@/components/wallet-widget/midnight-wallet";

export default function Home() {
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

  return (
    <>
      <ModeToggle />
      <div>This is a Wallet Widget</div>
      <MidnightWallet />
      <div>This is a Headless Wallet</div>
      <HeadlessWallet />
      <div>These are the kooks provided by useAssets</div>
      <div>
        <div>Wallet Name: {walletName}</div>
        <div>Address: {address}</div>
        <div>Coin Public Key: {coinPublicKey}</div>
        <div>Encryption Public Key: {encryptionPublicKey}</div>
        <div>Has Connected Wallet: {hasConnectedWallet ? "Yes" : "No"}</div>
        <div>Is Proof Server Online: {isProofServerOnline ? "Yes" : "No"}</div>
        <div>Indexer: {uris?.indexerUri}</div>
        <div>IndexerWS: {uris?.indexerWsUri}</div>
        <div>Proof Server: {uris?.proverServerUri}</div>
        <div>Node: {uris?.substrateNodeUri}</div>
      </div>
      <div>These are the kooks provided by useWallet</div>
      <div>
        <div>Connecting Wallet: {connectingWallet ? "Yes" : "No"}</div>
        <div onClick={disconnect}>Disconnect Wallet</div>
        <div onClick={() => setOpen(true)}>Open Wallet Dialog</div>
        <div onClick={() => connectWallet("mnLace")}>
          Connect to the Lace Wallet
        </div>
      </div>
    </>
  );
}
