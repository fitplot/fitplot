import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import Link from 'next/link';
import React from 'react';
import { useIntersection } from 'react-use';

import { usePageContext } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import useWorkouts from '@/hooks/use-workouts';
import withUser from '@/lib/with-user';

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
      dayjs(createdAt).week()
    );

    return Object.entries(workoutsByWeek)
      .map(([key, workoutsInWeek]) => {
        const week = +key;
        const arbitrary = dayjs(workoutsInWeek[0].createdAt);
        const active = dayjs().week() === week;

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
    <div className='flex flex-1 flex-col'>
      {groups.map((group) => (
        <Week key={group.week} group={group} />
      ))}
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
  );
}

function Week({ group }) {
  return (
    <Link href='/workouts' className='flex hover:bg-white'>
      <div className='flex flex-1'>
        <CalendarBlock group={group} />
        <Summary group={group} />
      </div>
    </Link>
  );
}

function CalendarBlock({ group }) {
  return (
    <div className='relative h-full w-10 shrink-0 md:w-16'>
      <div
        className={clsx('absolute bottom-[4px] right-0 top-[5px] w-px', {
          'bg-gray-200': !group.active,
          'bg-primary-500': group.active,
        })}
      />
      <div className='absolute bottom-[-20px] right-[-4px] flex h-[40px] items-center justify-end'>
        {group.date && (
          <span className='text-right text-xs text-slate-500'>
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
      className={clsx('ml-2 h-[9px] w-[9px] rounded-full border md:ml-8', {
        'border-primary-500 bg-primary-500': active,
      })}
    />
  );
}

function Summary({ group }) {
  const Icon = group.active ? PlayCircleIcon : CheckCircleIcon;

  const started = group.workouts.length;
  const completed = group.workouts.filter(({ completedAt }) =>
    Boolean(completedAt)
  ).length;
  return (
    <div className='mb-[1px] ml-6 flex flex-1 flex-col border-b'>
      <div className='flex items-center gap-2 py-6 md:ml-10'>
        <Icon
          className={clsx('inline-block h-6 w-6', {
            'text-slate-300': !group.active,
            'text-primary-500': group.active,
          })}
        />
        <span className='flex-1 font-medium'>Week {group.week}</span>
        <WeekDots className='flex' workouts={group.workouts} />
      </div>
      {Boolean(group.active) && (
        <div className='flex flex-col divide-y text-xs'>
          <div className='flex py-2'>
            <div className='flex-1'>Started</div>
            <div className='font-bold'>{started}</div>
          </div>
          <div className='flex py-2'>
            <div className='flex-1'>Completed</div>
            <div className='font-bold'>{completed}</div>
          </div>
        </div>
      )}
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
            className='flex h-[8px] w-[8px] items-center justify-center'
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
        'h-[6px] w-[6px] bg-slate-200': count === 0,
        'h-[9px] w-[9px] bg-emerald-500': count > 0,
      })}
    />
  );
}

export const getServerSideProps = withUser();
