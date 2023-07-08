import {
  CheckCircleIcon,
  PowerIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Head from 'next/head';

import useUser from '../../hooks/use-user';
import { useWorkoutsSummary } from '../../hooks/use-workouts';
import Button from '../button';
import Card from '../card';
import LoadingIcon from '../loading-icon';
import { H1, H2 } from '../typography';
import WorkoutList from '../workout-list';

export default function Home() {
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: summary, isLoading: isLoadingWorkoutSummary } =
    useWorkoutsSummary();

  const isLoading = isLoadingUser || isLoadingWorkoutSummary;

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex grow flex-col space-y-4'>
        {user ? <H1 className='uppercase'>{user.username}</H1> : null}
        <div className='flex space-x-2'>
          <HomeHighlight
            className='grow'
            icon={<TrophyIcon className='h-8 w-8 text-yellow-500' />}
            title='Total Workouts'
            value={summary.total}
            isLoading={isLoading}
          />
          <HomeHighlight
            className='grow'
            icon={<CheckCircleIcon className='h-8 w-8 text-green-500' />}
            title='Total Completed'
            value={summary.totalCompleted}
            isLoading={isLoading}
          />
        </div>
        <Button className='aspect-square w-1/2 flex-col self-center rounded-full'>
          <PowerIcon className='h-16 w-16' />
        </Button>
        <H2 className='self-center'>Start Workout</H2>
        <H2>Recent Workouts</H2>
        {isLoading && (
          <LoadingIcon className='h-6 w-6 self-center justify-self-center' />
        )}
        {!isLoading && <WorkoutList workouts={summary.workouts} />}
        <Button href='/workouts'>
          See All Workouts
        </Button>
      </div>
    </>
  );
}

function HomeHighlight({ className, icon, title, isLoading, value }) {
  return (
    <Card
      className={clsx(
        className,
        'flex flex-col items-center gap-2 rounded bg-slate-200 p-4'
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
