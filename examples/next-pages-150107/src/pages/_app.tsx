import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import "@meshsdk/midnight-react/styles.css";
import * as pino from "pino";
import { CardanoWallet } from "@meshsdk/midnight-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const logger = pino.pino({
  level: "trace",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MidnightMeshProvider logger={logger}>
          <CardanoWallet />
          <Component {...pageProps} />
        </MidnightMeshProvider>
      </NextThemesProvider>
    </>
  );
}
