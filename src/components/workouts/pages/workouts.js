import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntersection, useToggle } from 'react-use';

import useWorkouts from '../../../hooks/use-workouts';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../layouts';
import WorkoutList from '../../workout-list';
import AddWorkout from '../overlays/add-workout';
import WorkoutsMoreActions from '../overlays/workouts-more-actions';
import clsx from 'clsx';

export default function WorkoutsPage() {
  const { query } = useRouter();
  const {
    data: workouts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useWorkouts();

  const ref = React.useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  const [showAddWorkout, toggleAddWorkout] = useToggle('now' in query);
  const [showMoreActions, toggleMoreActions] = useToggle(false);

  const onMoreAction = React.useCallback(
    () => toggleMoreActions(true),
    [toggleMoreActions]
  );

  usePageContext({
    title: 'All Workouts',
    onMoreAction,
  });

  React.useEffect(() => {
    if (
      !isLoading &&
      !isFetchingNextPage &&
      hasNextPage &&
      intersection &&
      intersection.intersectionRatio > 0
    ) {
      fetchNextPage();
    }
  }, [isLoading, isFetchingNextPage, hasNextPage, intersection, fetchNextPage]);

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>
      <div className='flex flex-1 flex-col'>
        <WorkoutList
          className='mb-2'
          workouts={workouts}
          onCreate={() => toggleAddWorkout(true)}
        />
        {/* Watch bottom of list for infinite scroll */}
        <div
          ref={ref}
          className={clsx({
            'border-b border-red-500': process.env.NODE_ENV !== 'production',
          })}
        />
        {isFetchingNextPage && (
          <LoadingIcon className='mt-2 h-6 w-6 self-center' />
        )}
      </div>
      <AddWorkout
        open={showAddWorkout}
        onClose={() => toggleAddWorkout(false)}
      />
      <WorkoutsMoreActions
        open={showMoreActions}
        onClose={() => toggleMoreActions(false)}
        totalWorkouts={workouts ? workouts.length : undefined}
      />
    </>
  );
}
