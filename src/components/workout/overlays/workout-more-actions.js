import { ClockIcon } from '@heroicons/react/24/outline';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import { useDeleteWorkout, useUpdateWorkout } from '../../../hooks/use-workout';
import Button from '../../button';
import { Input, Label } from '../../forms';
import { ListMenu, ListMenuGroup, ListMenuItem } from '../../list-menu';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';

export default function WorkoutMoreActions({ workout = {}, open, onClose }) {
  const { name, createdAt, updatedAt, completedAt } = workout;

  const inputRef = React.useRef(null);
  const router = useRouter();

  const [showRenameWorkout, toggleRenameWorkout] = useToggle(false);
  const [showDeleteWorkout, toggleDeleteWorkout] = useToggle(false);

  const updateMutation = useUpdateWorkout();
  const deleteMutation = useDeleteWorkout();

  const submitRename = async () => {
    const rawInput = inputRef.current.value;
    const updatedName = rawInput.trim();
    if (updatedName) {
      await updateMutation.mutateAsync({
        ...workout,
        name: updatedName,
      });
      toggleRenameWorkout(false);
    }
  };

  const submitDelete = async () => {
    await deleteMutation.mutateAsync(workout);
    toggleDeleteWorkout(false);
    onClose();
    router.push('/workouts');
  };

  const submitToggleCompleted = async () => {
    await updateMutation.mutateAsync({
      ...workout,
      completedAt: completedAt ? null : dayjs().toISOString(),
    });
  };

  return (
    <>
      <Overlay open={open} onClose={onClose} title='More Actions'>
        <div className='flex flex-col'>
          <ListMenu>
            {workout && (
              <>
                <ListMenuGroup>
                  <ListMenuItem
                    onClick={() => toggleRenameWorkout(true)}
                    className='font-medium'
                  >
                    Rename Workout
                  </ListMenuItem>
                  <ListMenuItem
                    onClick={() => submitToggleCompleted()}
                    disabled={updateMutation.isLoading}
                  >
                    <div className='flex flex-1 space-x-2'>
                      {updateMutation.isLoading ? (
                        <LoadingIcon className='w-5 h-5' />
                      ) : (
                        <CheckIcon
                          className={clsx(
                            { 'text-green-500': Boolean(completedAt) },
                            'inline-block w-6 h-6'
                          )}
                        />
                      )}
                      <span>
                        Mark as {completedAt ? 'Incomplete' : 'Complete'}
                      </span>
                    </div>
                  </ListMenuItem>
                </ListMenuGroup>
                <ListMenuGroup>
                  <ListMenuItem className='text-slate-500'>
                    <div className='flex flex-1 space-x-2'>
                      <ClockIcon className='w-6 h-6' />
                      <span>Started on</span>
                    </div>
                    <div className='mt-auto'>
                      {dayjs(createdAt).format('MMM DD, YYYY h:mm a')}
                    </div>
                  </ListMenuItem>
                  <ListMenuItem className='text-slate-500'>
                    <div className='flex flex-1 space-x-2'>
                      <ClockIcon className='inline-block w-6 h-6' />
                      <span>Last updated on</span>
                    </div>
                    <div className='mt-auto'>
                      {dayjs(updatedAt).format('MMM DD, YYYY h:mm a')}
                    </div>
                  </ListMenuItem>
                  {completedAt ? (
                    <ListMenuItem className='text-slate-500'>
                      <div className='flex flex-1 space-x-2'>
                        <ClockIcon className='inline-block w-6 h-6' />
                        <span>Completed on</span>
                      </div>
                      <div className='mt-auto'>
                        {dayjs(completedAt).format('MMM DD, YYYY h:mm a')}
                      </div>
                    </ListMenuItem>
                  ) : null}
                </ListMenuGroup>
                <ListMenuGroup>
                  <ListMenuItem
                    onClick={() => toggleDeleteWorkout(true)}
                    className='text-red-500'
                  >
                    <div className='flex flex-1 items-center space-x-2'>
                      <TrashIcon className='w-6 h-6' />
                      <span>Delete</span>
                    </div>
                  </ListMenuItem>
                </ListMenuGroup>
              </>
            )}
          </ListMenu>
        </div>
      </Overlay>
      <Overlay
        open={showRenameWorkout}
        onClose={() => toggleRenameWorkout(false)}
        initialFocus={inputRef}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <div className='flex flex-wrap'>
            <Label htmlFor='workout-name'>Rename this workout</Label>
          </div>
          <Input
            ref={inputRef}
            autoComplete='off'
            type='text'
            id='workout-name'
            defaultValue={name}
            required
          />
          <Button
            className='flex justify-center'
            disabled={updateMutation.isLoading}
            onClick={() => submitRename()}
          >
            {updateMutation.isLoading ? (
              <LoadingIcon className='w-5 h-5' />
            ) : (
              <CheckIcon className='inline-block w-6 h-6' />
            )}
          </Button>
        </div>
      </Overlay>
      <Overlay
        open={showDeleteWorkout}
        onClose={() => toggleDeleteWorkout(false)}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <div className='flex flex-wrap'>
            <Label htmlFor='workout-name'>
              Are you sure you want to delete this workout?
            </Label>
          </div>
          <Button
            className='flex justify-center items-center text-white bg-red-500'
            disabled={deleteMutation.isLoading}
            onClick={() => submitDelete()}
          >
            {deleteMutation.isLoading ? (
              <LoadingIcon className='w-6 h-6' />
            ) : (
              <TrashIcon className='w-6 h-6' />
            )}
          </Button>
        </div>
      </Overlay>
    </>
  );
}
