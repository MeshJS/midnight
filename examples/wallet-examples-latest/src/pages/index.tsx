import { MidnightWallet as HeadlessMidnightWallet } from "@/components/wallet-widget/midnight-wallet";
import { ModeToggle } from "@/components/mode-toggle";
// import { MidnightWallet } from "@meshsdk/midnight-react";

export default function Home() {
  return (
    <>
      <ModeToggle />
      {/* <MidnightWallet /> */}
      <HeadlessMidnightWallet />
    </>
  );
}
