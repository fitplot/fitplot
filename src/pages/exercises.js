import React from 'react';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';

import Combobox from '@/components/combobox';
import { usePageContext } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import { useExercises } from '@/hooks/use-exercises';
import withUser from '@/lib/with-user';

export default function ExercisesPage() {
  const router = useRouter();
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();
  const [isRedirecting, toggleIsRedirecting] = useToggle(false);

  usePageContext({
    title: 'All Exercises',
  });

  const orderedExercises = React.useMemo(
    () => (exercises ? _.sortBy([...exercises], ['name']) : []),
    [exercises]
  );

  const onSelect = React.useCallback(
    (exercise) => {
      toggleIsRedirecting(true);
      router.push(`/exercise/${exercise.id}`);
    },
    [router, toggleIsRedirecting]
  );

  const isLoading = isLoadingExercises || isRedirecting;

  if (isLoading)
    return (
      <div className='flex grow flex-col space-y-2'>
        <LoadingIcon className='h-12 w-12 self-center' />
      </div>
    );

  return (
    <>
      <Head>
        <title>Exercises</title>
      </Head>
      <div className='-mx-4 flex h-full flex-1 flex-col'>
        <Combobox
          placeholder='Search exercises'
          options={orderedExercises}
          onSelect={onSelect}
          field='name'
        />
      </div>
    </>
  );
}

export const getServerSideProps = withUser();
