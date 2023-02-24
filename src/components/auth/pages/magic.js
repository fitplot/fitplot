import { SparklesIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';

import useMagicLink from '../../../hooks/use-magic-link';

export default function Magic() {
  const router = useRouter();

  const mutation = useMagicLink();

  React.useMemo(() => {
    if (router.query.dust) mutation.mutate({ dust: router.query.dust });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.dust]);

  return (
    <div className='flex flex-1 justify-center items-center'>
      <SparklesIcon className='w-6 h-6' />
    </div>
  );
}
