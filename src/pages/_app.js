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
        <Component {...pageProps} />
        <ReactQueryDevtools
          toggleButtonProps={{
            style: { bottom: "3rem" },
          }}
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
