import '../main.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/calendar';
import calendar from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Page, { PageContextProvider } from '../components/page';
import useAppLayout from '../hooks/use-app-layout';
import useFathom from '../hooks/use-fathom';
import queryClient from '../lib/query-client';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(weekOfYear);

function App({ Component, pageProps }) {
  useAppLayout();
  useFathom();

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
