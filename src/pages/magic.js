import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

import { MarketingLayout } from '@/components/layouts';
import useMagicLink from '@/hooks/use-magic-link';

export default function Magic() {
  const router = useRouter();

  const mutation = useMagicLink();

  React.useMemo(() => {
    if (router.query.dust) mutation.mutate({ dust: router.query.dust });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.dust]);

  return (
    <div className='flex h-8 h-full flex-1 items-center justify-center'>
      <SparklesIcon className='h-6 w-6 animate-pulse' />
    </div>
  );
}

Magic.getLayout = () => MarketingLayout;
