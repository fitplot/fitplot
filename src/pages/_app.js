import 'tailwindcss/tailwind.css';

import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { UserProvider } from '../components/auth';
import Page from '../components/page/page';
import useAppLayout from '../hooks/use-app-layout';
import queryClient from '../lib/query-client';

function App({ Component, pageProps }) {
  useAppLayout();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name='description' content='Nexus Fitness' />
          <link rel='icon' href='/favicon.ico' />
          <meta name='author' content='Nexus Fitness' />
          <meta name='theme-color' content='#B12A34' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta property='og:image' content='/favicon.ico' />
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
