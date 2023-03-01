import { ClockIcon } from '@heroicons/react/24/outline';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import {
  useDeleteExercise,
  useUpdateExercise,
} from '../../../hooks/use-exercise';
import { useExercises } from '../../../hooks/use-exercises';
import Button from '../../button';
import Combobox from '../../combobox';
import { Input, Label } from '../../forms';
import { ListMenu, ListMenuGroup, ListMenuItem } from '../../list-menu';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';
import { Paragraph } from '../../typography';

export default function MoreActions({ open, onClose, exercise = {} }) {
  const router = useRouter();

  const inputRef = React.useRef(null);

  const [showRenameExercise, toggleRenameExercise] = useToggle(false);
  const [showDeleteExercise, toggleDeleteExercise] = useToggle(false);
  const [showReassignExercise, toggleReassignExercise] = useToggle(false);

  const updateMutation = useUpdateExercise();
  const deleteMutation = useDeleteExercise();

  const { data: exercises } = useExercises({
    enabled: showReassignExercise,
  });

  const submitRename = async () => {
    const rawInput = inputRef.current.value;
    const updatedName = rawInput.trim();
    if (updatedName) {
      await updateMutation.mutateAsync({
        ...exercise,
        name: updatedName,
      });
      toggleRenameExercise(false);
    }
  };

  const submitDelete = async () => {
    const response = await deleteMutation.mutateAsync(exercise);

    if (response.id) {
      toggleDeleteExercise(false);
      onClose();
      router.push('/exercises');
    } else if (!response.ok && response.status === 409) {
      toggleReassignExercise(true);
    }
  };

  const submitReassign = async ({ id: reassignTo }) => {
    const response = await deleteMutation.mutateAsync({ exercise, reassignTo });

    if (response.id) {
      toggleDeleteExercise(false);
      toggleReassignExercise(false);
      onClose();
      router.push('/exercises');
    } else if (!response.ok && response.status === 409) {
      toggleReassignExercise(true);
    }
  };

  const { name, createdAt, updatedAt } = exercise;

  const orderedExercises = React.useMemo(
    () => (exercises ? _.sortBy([...exercises], ['name']) : []),
    [exercises]
  );

  return (
    <>
      <Overlay open={open} onClose={onClose} title='More Actions'>
        <ListMenu>
          <ListMenuGroup>
            <ListMenuItem
              onClick={() => toggleRenameExercise(true)}
              className='font-medium'
            >
              Rename Exercise
            </ListMenuItem>
          </ListMenuGroup>
          <ListMenuGroup>
            <ListMenuItem className='text-slate-500'>
              <div className='flex flex-1 space-x-2'>
                <ClockIcon className='w-6 h-6' />
                <span>Created on</span>
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
          </ListMenuGroup>
          <ListMenuGroup>
            <ListMenuItem
              onClick={() => toggleDeleteExercise(true)}
              className='text-red-500'
            >
              <div className='flex flex-1 items-center space-x-2'>
                <TrashIcon className='w-6 h-6' />
                <span>Delete</span>
              </div>
            </ListMenuItem>
          </ListMenuGroup>
        </ListMenu>
      </Overlay>
      <Overlay
        open={showRenameExercise}
        onClose={() => toggleRenameExercise(false)}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <div className='flex flex-wrap'>
            <Label htmlFor='exercise-name'>Rename this workout</Label>
          </div>
          <Input
            ref={inputRef}
            type='text'
            id='exercise-name'
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
        open={showDeleteExercise}
        onClose={() => toggleDeleteExercise(false)}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <div className='flex flex-wrap'>
            <Label>Are you sure you want to delete this exercise?</Label>
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
      <Overlay
        open={showReassignExercise}
        onClose={() => toggleReassignExercise(false)}
      >
        <div className='flex flex-col p-4 space-y-4'>
          <div className='flex flex-wrap'>
            <Paragraph>
              This exercise has sets. You will need to pick another exercise to
              move these sets to before removing it.
            </Paragraph>
          </div>
          <Combobox
            options={orderedExercises}
            onSelect={submitReassign}
            field='name'
          />
        </div>
      </Overlay>
    </>
  );
}
