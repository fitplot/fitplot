import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import React from 'react';

export default function useFathom() {
  const router = useRouter();

  React.useEffect(() => {
    Fathom.load('EZMLUALZ', {
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
