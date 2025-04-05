import { ModeToggle } from "@/components/mode-toggle";
import { MidnightWallet } from "@meshsdk/midnight-react";
import { MidnightWallet as HeadlessWallet } from "@/components/wallet-widget/midnight-wallet";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <div>This is a Wallet Widget</div>
      <MidnightWallet />
      <div>This is a Headless Wallet</div>
      <HeadlessWallet />
    </>
  );
}
