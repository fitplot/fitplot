import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import { useExercise } from '../../../hooks/use-exercise';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../page';
import { Paragraph } from '../../typography';
import MoreActions from '../overlays/more-actions';

export default function Exercise() {
  const router = useRouter();
  const { exerciseId } = router.query;

  const [showMoreActions, toggleShowMoreActions] = useToggle(false);

  const { data: exercise, isLoading } = useExercise(exerciseId);

  const { name } = exercise;

  const onMoreAction = React.useCallback(() => {
    toggleShowMoreActions(true);
  }, [toggleShowMoreActions]);

  usePageContext({
    title: name,
    onMoreAction,
  });

  if (isLoading)
    return (
      <div className='flex flex-col grow justify-center items-center'>
        <LoadingIcon className='w-12 h-12' />
      </div>
    );

  return (
    <>
      <Head>
        <title>Exercise</title>
      </Head>
      <Paragraph className='text-gray-500'>
        This is an exercise detail page. More coming soon!
      </Paragraph>
      <MoreActions
        open={showMoreActions}
        onClose={() => toggleShowMoreActions(false)}
        exercise={exercise}
      />
    </>
  );
}
