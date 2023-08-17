import '../main.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/calendar';
import calendar from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import Head from 'next/head';

import { InAppLayout } from '@/components/layouts';
import useAppLayout from '@/hooks/use-app-layout';
import useFathom from '@/hooks/use-fathom';
import queryClient from '@/lib/query-client';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(weekOfYear);

function App({ Component, pageProps }) {
  useAppLayout();
  useFathom();

  const Layout = Component.getLayout ? Component.getLayout() : InAppLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name='description' content='FitPlot' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='author' content='FitPlot' />
        {/* slate-50 */}
        <meta name='theme-color' content='rgb(241 245 249)' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:image' content='/favicon.ico' />
      </Head>
      <Layout user={pageProps.user}>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
      {/*<JotaiDevTools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
}

export default App;
