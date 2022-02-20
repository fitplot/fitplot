import { TrashIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import React from 'react';

import { useUpdateSet } from '../../../hooks/use-sets';
import { ListMenu, ListMenuItem } from '../../list-menu';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';

export default function EditWorkout({ workout: { createdAt, updatedAt } = {}, open, onClose }) {
  const mutation = useUpdateSet();
  // TODO: :point_up: actually use this mutation

  const createdAtMessage = `Started on ${dayjs(createdAt).format('MMM DD, YYYY h:mm a')}`;
  const updatedAtMessage = `Last edited on ${dayjs(updatedAt).format('MMM DD, YYYY h:mm a')}`;

  return (
    <Overlay open={open} onClose={onClose}>
      <div className='flex flex-col'>
        {mutation.isLoading && <LoadingIcon className='w-5 h-5' />}
        {!mutation.isLoading && (
          <ListMenu>
            <ListMenuItem onClick={() => undefined} className='font-medium'>
              Rename (TODO)
            </ListMenuItem>
            <ListMenuItem className='text-slate-500'>{createdAtMessage}</ListMenuItem>
            <ListMenuItem className='text-slate-500'>{updatedAtMessage}</ListMenuItem>
            <ListMenuItem onClick={() => undefined} className='text-red-500'>
              <div className='flex flex-1 items-center space-x-2'>
                <TrashIcon className='w-5 h-5' />
                <span>Delete</span>
              </div>
            </ListMenuItem>
          </ListMenu>
        )}
      </div>
    </Overlay>
  );
}
