import { UserProvider } from "@auth0/nextjs-auth0";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
