import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntersection, useToggle } from 'react-use';

import AddWorkout from '@/components/add-workout';
import { usePageContext } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import WorkoutList from '@/components/workout-list';
import WorkoutsMoreActions from '@/components/workouts-more-actions';
import useWorkouts from '@/hooks/use-workouts';
import withUser from '@/lib/with-user';

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

  const [showAddWorkout, toggleAddWorkout] = useToggle(query.new !== undefined);
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

export const getServerSideProps = withUser();
