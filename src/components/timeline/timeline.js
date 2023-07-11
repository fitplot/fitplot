import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';

import Button from '../button';
import useWorkouts from '../../hooks/use-workouts';
import LoadingIcon from '../loading-icon';

export default function Timeline() {
  const { data: workouts, isLoading } = useWorkouts();

  const groups = React.useMemo(() => {
    if (!workouts) return [];

    const workoutsByWeek = _.groupBy(workouts, ({ createdAt }) =>
      dayjs(createdAt).week(),
    );

    return Object.entries(workoutsByWeek)
      .map(([week, workoutsInWeek]) => {
        const arbitrary = dayjs(workoutsInWeek[0].createdAt);

        const isCurrent = dayjs().isBefore(arbitrary.add(1, 'week'));

        return {
          week,
          date: arbitrary.startOf('week'),
          workouts: workoutsInWeek,
        };
      })
      .sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1));
  }, [workouts]);

  if (isLoading)
    return (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <LoadingIcon className='w-12 h-12' />
      </div>
    );

  return (
    <div className='flex-1 flex flex-col'>
      {groups.map((group) => (
        <Group group={group} />
      ))}
    </div>
  );
}

function Group({ group }) {
  return (
    <a className='flex hover:bg-white' href='#'>
      <div className='flex-1 flex'>
        <TimelinePoint group={group} />
        <Summary group={group} />
      </div>
    </a>
  );
}

function TimelinePoint({ group }) {
  return (
    <div className='h-full shrink-0 w-10 md:w-16 relative'>
      <div className='absolute w-px right-0 top-[5px] bottom-[4px] bg-gray-200' />
      <div className='flex items-center justify-end absolute right-[-4px] bottom-[-20px] h-[40px]'>
        {group.date && (
          <span className='text-xs text-slate-500 text-right'>
            {dayjs(group.date).format('MMM')}
            <br />
            {dayjs(group.date).format('D')}
          </span>
        )}
        <Bullet />
      </div>
    </div>
  );
}

function Bullet() {
  return <div className='w-[9px] h-[9px] rounded-full ml-2 md:ml-8 border' />;
}

function Summary({ group }) {
  const total = group.workouts.length;

  const completed = group.workouts.filter(({ completedAt }) =>
    Boolean(completedAt),
  ).length;

  return (
    <div className='flex-1 flex items-center gap-2 mb-[1px] ml-10 border-b py-6'>
      <ChevronRightIcon className='w-4 h-4 inline-block' />
      <span className='flex-1 font-medium'>Week {group.week}</span>
      <div className='flex items-center gap-4'>
        <span className='text-sm'>
          Completed{' '}
          <span className='font-medium'>
            {completed}/{total}
          </span>
        </span>
      </div>
    </div>
  );
}
