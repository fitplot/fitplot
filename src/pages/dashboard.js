import React from 'react';
import { CheckCircleIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import Head from 'next/head';
import { useIntersection } from 'react-use';

import LoadingIcon from '@/components/loading-icon';
import Navbar from '@/components/navbar';
import { List, ListItem } from '@/components/ui/list';
import useWorkouts from '@/hooks/use-workouts';
import { cn } from '@/lib/utils';
import withUser from '@/lib/with-user';

export default function Timeline() {
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
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar.Title>
        <span>Dashboard</span>
      </Navbar.Title>
      <div className='flex flex-1 flex-col items-center justify-center'>
        {isLoading && <LoadingIcon />}
        {!isLoading && (
          <List className='flex-1 divide-y-0'>
            <>
              {groups.map((group) => (
                <Week key={group.week} group={group} />
              ))}
              {/* Watch bottom of list for infinite scroll */}
              <div
                ref={ref}
                className={clsx({
                  'border-b border-red-500':
                    process.env.NODE_ENV !== 'production',
                })}
              />
              {isFetchingNextPage && (
                <LoadingIcon className='mt-2 self-center' />
              )}
            </>
          </List>
        )}
      </div>
    </>
  );
}

function Week({ group }) {
  return (
    <ListItem
      href='/workouts'
      className={cn('flex', {
        'h-[70px]': !group.active,
        'h-[280px]': group.active,
      })}
    >
      <CalendarBlock group={group} />
      <Summary group={group} />
    </ListItem>
  );
}

function CalendarBlock({ group }) {
  return (
    <div className='relative h-full w-10 shrink-0 md:w-16'>
      <div
        className={clsx('absolute bottom-[4px] right-0 top-[5px] w-px', {
          'bg-border': !group.active,
          'bg-primary': group.active,
        })}
      />
      <div className='absolute bottom-[-20px] right-[-4px] flex h-[40px] items-center justify-end'>
        {group.date && (
          <span className='text-right text-xs text-muted-foreground'>
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
        'border-primary bg-primary': active,
      })}
    />
  );
}

function Summary({ group }) {
  const Icon = group.active ? PlayCircleIcon : CheckCircleIcon;

  const started = group.workouts.length;
  const completed = group.workouts.filter(({ completedAt }) =>
    Boolean(completedAt),
  ).length;
  return (
    <div className='mb-[1px] ml-6 flex flex-1 flex-col border-b'>
      <div className='flex items-center gap-2 py-6 md:ml-10'>
        <Icon
          className={clsx('inline-block h-6 w-6', {
            'text-muted-foreground': !group.active,
            'text-primary': group.active,
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
        'h-[6px] w-[6px] bg-muted-foreground/20': count === 0,
        'h-[9px] w-[9px] bg-success': count > 0,
      })}
    />
  );
}

export const getServerSideProps = withUser();
