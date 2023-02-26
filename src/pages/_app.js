import 'tailwindcss/tailwind.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/calendar';
import calendar from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Page, { PageContextProvider } from '../components/page';
import useAppLayout from '../hooks/use-app-layout';
import queryClient from '../lib/query-client';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

function App({ Component, pageProps }) {
  useAppLayout();

  return (
    <QueryClientProvider client={queryClient}>
      <PageContextProvider>
        <Head>
          <meta name='description' content='Nexus Fitness' />
          <link rel='icon' href='/favicon.ico' />
          <meta name='author' content='Nexus Fitness' />
          {/* slate-50 */}
          <meta name='theme-color' content='rgb(241 245 249)' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta property='og:image' content='/favicon.ico' />
        </Head>
        <Page {...pageProps}>
          <Component {...pageProps} />
        </Page>
      </PageContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
