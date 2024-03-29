import '../main.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'cal-sans';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/calendar';
import calendar from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import Head from 'next/head';

import { InAppLayout } from '@/components/layouts';
import useFathom from '@/hooks/use-fathom';
import queryClient from '@/lib/query-client';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(weekOfYear);

function App({ Component, pageProps }) {
  useFathom();

  const Layout = Component.getLayout ? Component.getLayout() : InAppLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        {/* SEO Information */}
        <meta name='description' content='FitPlot' />
        <meta name='author' content='FitPlot' />

        {/* Iconography */}
        <meta property='og:image' content='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/round-32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/round-16.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/square-180.png' />
        <link rel='manifest' href='/site.webmanifest' />

        {/* Theme using the color for --primary */}
        <link
          rel='mask-icon'
          href='/safari-pinned-tab.svg'
          color='hsl(262.1 83.3% 57.8%)'
        />
        <meta name='msapplication-TileColor' content='hsl(262.1 83.3% 57.8%)' />
        <meta name='theme-color' content='hsl(262.1 83.3% 57.8%)' />

        {/* Viewport */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1'
        />

        {/* Robots */}
        {process.env.FITPLOT_ENV !== 'production' && (
          <>
            <meta name='robots' content='noindex,nofollow' />
            <meta name='googlebot' content='noindex,nofollow' />
          </>
        )}
      </Head>
      <Layout user={pageProps.user}>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
