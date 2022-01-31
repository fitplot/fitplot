import React from "react";
import Head from 'next/head';
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "../lib/query-client";
import { UserProvider } from "../components/auth";

import "tailwindcss/tailwind.css";
import "@reach/dialog/styles.css";

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <Head>
          <meta name="description" content="Nexus Fitness" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="author" content="Nexus Fitness" />
          <meta name="theme-color" content="#B12A34" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:image" content="/favicon.ico"></meta>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools
          toggleButtonProps={{
            style: { bottom: "3rem" }
          }}
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
