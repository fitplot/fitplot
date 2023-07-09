import { PlayIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, TrophyIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Head from 'next/head';

import useUser from '../../hooks/use-user';
import { useWorkoutsSummary } from '../../hooks/use-workouts';
import Button from '../button';
import Card from '../card';
import LoadingIcon from '../loading-icon';
import { H1, H2 } from '../typography';
import WorkoutList from '../workout-list';

export default function Dashboard() {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: summary, isLoading: isLoadingWorkoutSummary } =
    useWorkoutsSummary();

  const isLoading = isLoadingUser || isLoadingWorkoutSummary;

  if (isLoading)
    return (
      <div className='flex flex-col grow space-y-2'>
        <LoadingIcon className='self-center w-12 h-12' />
      </div>
    );

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='flex grow flex-col space-y-4'>
        {user ? <H1 className='uppercase'>{user.username}</H1> : null}
        <div className='flex space-x-2'>
          <DashboardHighlight
            className='grow'
            icon={<TrophyIcon className='h-8 w-8 text-yellow-500' />}
            title='Total Workouts'
            value={summary.total}
            isLoading={isLoading}
          />
          <DashboardHighlight
            className='grow'
            icon={<CheckCircleIcon className='h-8 w-8 text-green-500' />}
            title='Total Completed'
            value={summary.totalCompleted}
            isLoading={isLoading}
          />
        </div>
        <Button
          href='/workouts?now'
          className='flex items-center justify-center aspect-square w-1/2 flex-col self-center rounded-full drop-shadow-lg'
        >
          <PlayIcon className='h-16 w-16' />
        </Button>
        <H2 className='font-medium self-center'>Start Workout</H2>
        <H2>Recent Workouts</H2>
        {isLoading && (
          <LoadingIcon className='h-6 w-6 self-center justify-self-center' />
        )}
        {!isLoading && <WorkoutList workouts={summary.workouts} />}
        <Button href='/workouts'>See All Workouts</Button>
      </div>
    </>
  );
}

function DashboardHighlight({ className, icon, title, isLoading, value }) {
  return (
    <Card
      className={clsx(
        className,
        'flex flex-col items-center gap-2 rounded bg-slate-200 p-4',
      )}
    >
      {icon}
      <span className='font-medium'>{title}</span>
      {isLoading ? (
        <LoadingIcon className='h-6 w-6' />
      ) : (
        <span className='text-6xl font-bold'>{value}</span>
      )}
    </Card>
  );
}
