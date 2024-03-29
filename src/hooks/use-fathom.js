import React from 'react';
import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';

export default function useFathom() {
  const router = useRouter();

  React.useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: ['fitplot.io'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
}
