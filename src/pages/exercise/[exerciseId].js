import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import ExerciseMoreActions from '../../components/exercise-more-actions';
import { usePageContext } from '../../components/layouts';
import LoadingIcon from '../../components/loading-icon';
import { Paragraph } from '../../components/typography';
import { useExercise } from '../../hooks/use-exercise';
import withUser from '../../lib/with-user';

export default function Exercise() {
  const router = useRouter();
  const { exerciseId } = router.query;

  const [showMoreActions, toggleShowMoreActions] = useToggle(false);

  const { data: exercise, isLoading } = useExercise(exerciseId);

  const onMoreAction = React.useCallback(() => {
    toggleShowMoreActions(true);
  }, [toggleShowMoreActions]);

  usePageContext({
    title: isLoading ? 'Exercise' : exercise.name,
    onMoreAction,
  });

  if (isLoading)
    return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <LoadingIcon className='h-12 w-12' />
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
      <ExerciseMoreActions
        open={showMoreActions}
        onClose={() => toggleShowMoreActions(false)}
        exercise={exercise}
      />
    </>
  );
}

export const getServerSideProps = withUser();
