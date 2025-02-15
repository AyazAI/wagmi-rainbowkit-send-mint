import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import "../../global.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import Head from "next/head";
import { config } from "../wagmi";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Your Website Title</title>
        <meta property="og:title" content="Wagmi RainbowKit Send Mint" />
        <meta
          property="og:description"
          content="Wagmi RainbowKit Send Mint Example"
        />
        <meta
          name="image"
          property="og:image"
          content="https://i.ibb.co/Cp3b6zvM/image.png"
        />
        <meta property="og:url" content="https://ayaz.netlify.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Muhammad Ayaz" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
