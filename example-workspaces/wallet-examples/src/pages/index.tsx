import { ModeToggle } from "@/components/mode-toggle";
import { MidnightWallet, useAssets } from "@meshsdk/midnight-react";
import { MidnightWallet as HeadlessWallet } from "@/components/wallet-widget/midnight-wallet";

export default function Home() {
  const {address} = useAssets();
  return (
    <>
      <ModeToggle />
      <div>This is a Wallet Widget</div>
      <MidnightWallet />
      <div>This is a Headless Wallet</div>
      <HeadlessWallet />
      {address}
    </>
  );
}
