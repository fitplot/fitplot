import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { useIntersection } from 'react-use';

import useWorkouts from '../../hooks/use-workouts';
import LoadingIcon from '../loading-icon';
import { usePageContext } from '../page';

export default function Timeline() {
  usePageContext({ title: 'Timeline' });

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

  const groups = React.useMemo(() => {
    if (!workouts) return [];

    const workoutsByWeek = _.groupBy(workouts, ({ createdAt }) =>
      dayjs(createdAt).week(),
    );

    return Object.entries(workoutsByWeek)
      .map(([week, workoutsInWeek]) => {
        const arbitrary = dayjs(workoutsInWeek[0].createdAt);

        const active = dayjs().isBefore(arbitrary.add(1, 'week'));

        return {
          week,
          date: arbitrary.startOf('week'),
          workouts: workoutsInWeek,
          active,
        };
      })
      .sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1));
  }, [workouts]);

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
    <div className='flex-1 flex flex-col'>
      {groups.map((group) => (
        <TimelineRow key={group.week} group={group} />
      ))}
      {/* Watch bottom of list for infinite scroll */}
      <div ref={ref} className='border-b border-red-500' />
      {isFetchingNextPage && (
        <LoadingIcon className='w-6 h-6 mt-2 self-center' />
      )}
    </div>
  );
}

function TimelineRow({ group }) {
  return (
    <div className='flex hover:bg-white'>
      <div className='flex-1 flex'>
        <TimelineBlock group={group} />
        <Summary group={group} />
      </div>
    </div>
  );
}

function TimelineBlock({ group }) {
  return (
    <div className='h-full shrink-0 w-10 md:w-16 relative'>
      <div
        className={clsx('absolute w-px right-0 top-[5px] bottom-[4px]', {
          'bg-gray-200': !group.active,
          'bg-secondary-500': group.active,
        })}
      />
      <div className='flex items-center justify-end absolute right-[-4px] bottom-[-20px] h-[40px]'>
        {group.date && (
          <span className='text-xs text-slate-500 text-right'>
            {dayjs(group.date).format('MMM')}
            <br />
            {dayjs(group.date).format('D')}
          </span>
        )}
        <TimelinePoint active={group.active} />
      </div>
    </div>
  );
}

function TimelinePoint({ active }) {
  return (
    <div
      className={clsx('w-[9px] h-[9px] rounded-full ml-2 md:ml-8 border', {
        'bg-secondary-500 border-secondary-500': active,
      })}
    />
  );
}

function Summary({ group }) {
  return (
    <div className='flex-1 flex items-center gap-2 mb-[1px] ml-6 md:ml-10 border-b py-6'>
      <ChevronRightIcon className='w-4 h-4 inline-block' />
      <span className='flex-1 font-medium'>Week {group.week}</span>
      <WeekDots className='flex' workouts={group.workouts} />
    </div>
  );
}

function WeekDots({ workouts, className }) {
  const workoutsByDayOfWeek = React.useMemo(() => {
    if (!workouts) return [];

    return _.groupBy(workouts, ({ createdAt }) => dayjs(createdAt).day());
  }, [workouts]);

  return (
    <div className={clsx(className, 'flex items-center gap-2')}>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => {
        const count = workoutsByDayOfWeek[day]
          ? workoutsByDayOfWeek[day].length
          : 0;
        return (
          <div
            key={day}
            className='flex w-[8px] h-[8px] items-center justify-center'
          >
            <WeekdayDot count={count} />
          </div>
        );
      })}
    </div>
  );
}

function WeekdayDot({ count }) {
  return (
    <div
      className={clsx('rounded-full', {
        'w-[6px] h-[6px] bg-slate-200': count === 0,
        'w-[9px] h-[9px] bg-emerald-500': count > 0,
      })}
    />
  );
}
