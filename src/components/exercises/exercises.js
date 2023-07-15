import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import { useExercises } from '../../hooks/use-exercises';
import Combobox from '../combobox';
import LoadingIcon from '../loading-icon';
import { usePageContext } from '../page';

export default function ExercisesPage() {
  const router = useRouter();
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();
  const [isRedirecting, toggleIsRedirecting] = useToggle(false);

  usePageContext({
    title: 'My Exercises',
  });

  const orderedExercises = React.useMemo(
    () => (exercises ? _.sortBy([...exercises], ['name']) : []),
    [exercises],
  );

  const onSelect = React.useCallback(
    (exercise) => {
      toggleIsRedirecting(true);
      router.push(`/exercise/${exercise.id}`);
    },
    [router, toggleIsRedirecting],
  );

  const isLoading = isLoadingExercises || isRedirecting;

  if (isLoading)
    return (
      <div className='flex flex-col grow space-y-2'>
        <LoadingIcon className='self-center w-12 h-12' />
      </div>
    );

  return (
    <>
      <Head>
        <title>Exercises</title>
      </Head>
      <div className='flex flex-col flex-1 h-full'>
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
