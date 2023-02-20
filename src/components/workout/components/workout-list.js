import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Paragraph } from '../../typography';

export default function WorkoutList({ className, workouts }) {
  if (workouts === undefined || workouts === null) return null;

  return (
    <div className={clsx(className, 'flex flex-col space-y-2')}>
      {workouts.length > 0 ? (
        workouts.map(({ id, name, createdAt, completedAt }) => (
          <Link
            key={id}
            href={`/workout/${id}`}
            className='inline-flex text-left bg-white border border-slate-200'
          >
            <div className='grow p-2'>
              <div className='text-sm font-medium text-slate-900'>
                <span>{name}</span>
              </div>
              <div className='text-sm font-medium text-slate-500'>
                {dayjs(createdAt).format('MMM DD, YYYY h:mm a')}
              </div>
            </div>
            {Boolean(completedAt) ? (
              <div className='flex shrink-0 p-4'>
                <CheckIcon className='text-green-500 w-6 h-6' />
              </div>
            ) : null}
            <div className='flex shrink-0 items-center p-2 text-white bg-slate-900'>
              <ChevronRightIcon className='w-6 h-6' />
            </div>
          </Link>
        ))
      ) : (
        <Paragraph>No workout history.</Paragraph>
      )}
    </div>
  );
}
