import { CheckIcon, TrophyIcon } from '@heroicons/react/24/solid';
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
      <div className='flex flex-col flex-1 space-y-4'>
        {user ? <H1 className='uppercase'>{user.username}</H1> : null}
        <HomeHighlight>
          <TrophyIcon className='w-6 h-6 text-yellow-500' />
          <div className='grow'>Total Workouts</div>
          {isLoading ? (
            <LoadingIcon className='w-6 h-6' />
          ) : (
            <div>{summary.total}</div>
          )}
        </HomeHighlight>
        <HomeHighlight>
          <CheckIcon className='w-6 h-6 text-green-500' />
          <div className='grow'>Total Completed</div>
          {isLoading ? (
            <LoadingIcon className='w-6 h-6' />
          ) : (
            summary.totalCompleted
          )}
        </HomeHighlight>
        <H2>Recent Workouts</H2>
        {isLoading && (
          <LoadingIcon className='justify-self-center self-center w-6 h-6' />
        )}
        {!isLoading && <WorkoutList workouts={summary.workouts} />}
        <Button href='/workouts' className='text-center'>
          See All Workouts
        </Button>
      </div>
    </>
  );
}

function HomeHighlight({ children }) {
  return (
    <Card className='flex items-center p-4 space-x-4 font-medium text-white bg-slate-900 rounded-lg border'>
      {children}
    </Card>
  );
}
