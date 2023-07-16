import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useToggle } from 'react-use';

import { useDeleteSet, useUpdateSet } from '../../../hooks/use-sets';
import Button from '../../button';
import { Input, Label } from '../../forms';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';

export default function EditSet({ open, onClose, exercise = {}, set = {} }) {
  const amountRef = React.createRef();
  const volumeRef = React.createRef();

  const [showDeleteWorkout, toggleDeleteWorkout] = useToggle(false);

  const updateMutation = useUpdateSet();
  const deleteMutation = useDeleteSet();

  const submitUpdate = async () => {
    const amount = amountRef.current.value.trim();
    const volume = volumeRef.current.value.trim();

    // amount is a required field
    if (amount) {
      await updateMutation.mutateAsync({
        ...set,
        amount,
        volume,
      });
      onClose();
    }
  };

  const submitDelete = async () => {
    await deleteMutation.mutateAsync(set);
    toggleDeleteWorkout(false);
    onClose();
  };

  if (!set || !exercise) return null;

  return (
    <>
      <Overlay open={open} onClose={onClose} title='Edit Set'>
        <div className='flex flex-col space-y-4 p-4'>
          <div className='p-4 font-medium text-gray-900'>{exercise.name}</div>
          <div className='flex flex-wrap'>
            <Label htmlFor='volume'>Volume</Label>
          </div>
          <Input
            id='volume'
            ref={volumeRef}
            defaultValue={set.volume}
            type='text'
          />
          <div className='flex flex-wrap'>
            <Label htmlFor='amount'>Amount</Label>
          </div>
          <Input
            id='amount'
            ref={amountRef}
            defaultValue={set.amount}
            type='text'
          />
          <div className='flex'>
            <Button
              className='flex flex-1 justify-center bg-red-500'
              disabled={updateMutation.isLoading}
              onClick={() => toggleDeleteWorkout(true)}
            >
              <TrashIcon className='h-6 w-6' />
            </Button>
            <Button
              className='flex flex-1 justify-center'
              disabled={updateMutation.isLoading}
              onClick={() => submitUpdate()}
            >
              {updateMutation.isLoading ? (
                <LoadingIcon className='inline-block h-6 w-6' />
              ) : (
                <CheckIcon className='inline-block h-6 w-6' />
              )}
            </Button>
          </div>
        </div>
      </Overlay>
      <Overlay
        open={showDeleteWorkout}
        onClose={() => toggleDeleteWorkout(false)}
      >
        <div className='flex flex-col space-y-4 p-4'>
          <div className='flex flex-wrap'>
            <Label htmlFor='workout-name'>
              Are you sure you want to delete this set?
            </Label>
          </div>
          <Button
            className='flex items-center justify-center bg-red-500 text-white'
            disabled={deleteMutation.isLoading}
            onClick={() => submitDelete()}
          >
            {deleteMutation.isLoading ? (
              <LoadingIcon className='h-6 w-6' />
            ) : (
              <TrashIcon className='h-6 w-6' />
            )}
          </Button>
        </div>
      </Overlay>
    </>
  );
}
