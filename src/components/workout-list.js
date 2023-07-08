import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';

import relative from '../lib/date';
import { H5, Paragraph } from './typography';

export default function WorkoutList({ className, workouts }) {
  if (workouts === undefined || workouts === null) return null;

  return (
    <ul className={clsx(className, 'flex flex-col space-y-2')}>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <li>
            <Workout key={workout.id} workout={workout} />
          </li>
        ))
      ) : (
        <Paragraph>No workout history.</Paragraph>
      )}
    </ul>
  );
}

function Workout({ workout = {} }) {
  const { id, name, createdAt, completedAt } = workout;

  const date = relative(createdAt);

  return (
    <Link
      href={`/workout/${id}`}
      className='flex bg-white border border-slate-200'
    >
      <div className='grow p-2'>
        <div>
          <H5 as='h2'>{name}</H5>
        </div>
        <div>
          <span className='text-sm text-slate-500'>{date}</span>
        </div>
      </div>
      {Boolean(completedAt) && (
        <div className='flex shrink-0 items-center p-4'>
          <CheckIcon className='h-6 w-6 text-emerald-500' />
        </div>
      )}
      <div className='flex shrink-0 items-center p-2'>
        <ChevronRightIcon className='h-6 w-6' />
      </div>
    </Link>
  );
}
