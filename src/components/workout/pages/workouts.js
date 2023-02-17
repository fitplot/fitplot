import { ChevronRightIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useToggle } from 'react-use';

import useWorkouts from '../../../hooks/use-workouts';
import Button from '../../button';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../page';
import { Paragraph } from '../../typography';
import AddWorkout from '../overlays/add-workout';
import WorkoutsMoreActions, {
  WORKOUTS_ORDERBY,
} from '../overlays/workouts-more-actions';

export default function WorkoutsPage() {
  const { data: workouts, isLoading } = useWorkouts();

  const [orderBy, setOrderBy] = React.useState(WORKOUTS_ORDERBY.Recent);

  const [showAddWorkout, toggleAddWorkout] = useToggle(false);
  const [showMoreActions, toggleMoreActions] = useToggle(false);

  const onMoreAction = React.useCallback(
    () => toggleMoreActions(true),
    [toggleMoreActions]
  );

  usePageContext({
    title: 'My Workouts',
    onMoreAction,
  });

  const orderedWorkouts = React.useMemo(() => {
    if (!workouts) return [];

    switch (orderBy.key) {
      case WORKOUTS_ORDERBY.Name.key:
        return _.sortBy([...workouts], ['name']);
      case WORKOUTS_ORDERBY.Recent.key:
      default:
        return [...workouts].sort((a, b) =>
          dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1
        );
    }
  }, [orderBy, workouts]);

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>
      <div className='flex flex-col flex-1 space-y-4'>
        <div className='flex flex-col flex-1 space-y-2'>
          {isLoading && (
            <LoadingIcon className='justify-self-center self-center w-12 h-12' />
          )}
          {!isLoading &&
            (orderedWorkouts.length > 0 ? (
              orderedWorkouts.map(({ id, name, createdAt }) => (
                <Link
                  key={id}
                  href={`/workout/${id}`}
                  className='inline-flex text-left bg-white border border-slate-200'
                >
                  <div className='flex-1 p-2'>
                    <div className='text-sm font-medium text-slate-900'>
                      {name}
                    </div>
                    <div className='text-sm font-medium text-slate-500'>
                      {dayjs(createdAt).format('MMM DD, YYYY h:mm a')}
                    </div>
                  </div>
                  <div className='flex flex-none items-center p-2 text-white bg-slate-900'>
                    <ChevronRightIcon className='w-6 h-6' />
                  </div>
                </Link>
              ))
            ) : (
              <Paragraph>No workout history.</Paragraph>
            ))}
        </div>
        <Button onClick={() => toggleAddWorkout(true)}>New Workout</Button>
      </div>
      <AddWorkout
        open={showAddWorkout}
        onClose={() => toggleAddWorkout(false)}
      />
      <WorkoutsMoreActions
        open={showMoreActions}
        onClose={() => toggleMoreActions(false)}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        totalWorkouts={workouts ? workouts.length : undefined}
      />
    </>
  );
}
