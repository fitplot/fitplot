import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import _ from 'lodash';
import Link from 'next/link';

import relative from '@/lib/date';

export default function WorkoutList({ className, workouts, onCreate }) {
  if (!workouts) return null;

  const groups = _.groupBy(workouts, ({ completedAt }) =>
    Boolean(completedAt) ? 'Completed' : 'In Progress'
  );

  return (
    <>
      {Object.entries(groups).map(([title, group]) => {
        return (
          <React.Fragment key={title}>
            <div className='-mx-4 flex items-center bg-slate-100 px-4 py-2'>
              <span className='flex-1 text-sm uppercase'>{title}</span>
              <PlusIcon className='h-6 w-6' onClick={onCreate} />
            </div>
            <ul className='divide-y'>
              {group.map((workout) => {
                return (
                  <li key={workout.id}>
                    <Workout workout={workout} />
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        );
      })}
    </>
  );
}

function Workout({ workout = {} }) {
  const { id, name, createdAt, completedAt } = workout;

  const date = relative(createdAt);
  const completed = Boolean(completedAt);

  return (
    <Link
      href={`/workout/${id}`}
      className='-mx-4 flex gap-4 border-slate-200 px-4 hover:bg-slate-50'
    >
      <div className='flex w-[9px] shrink-0 items-center justify-center'>
        <div
          className={clsx('rounded-full', {
            'h-[6px] w-[6px] bg-slate-200': !completed,
            'h-[9px] w-[9px] bg-emerald-500': completed,
          })}
        />
      </div>
      <div className='flex grow items-center py-2'>
        <span className='flex-1'>{name}</span>
        <span className='text-xs text-slate-500'>{date}</span>
      </div>
    </Link>
  );
}
