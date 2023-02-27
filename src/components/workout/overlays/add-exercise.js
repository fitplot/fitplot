import React from 'react';

import { useCreateExercise, useExercises } from '../../../hooks/use-exercises';
import { Label } from '../../forms';
import Combobox from '../../listbox-input';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';

export default function AddExercise({ open, onClose }) {
  const { data: exercises, ...query } = useExercises();
  const mutation = useCreateExercise();

  const isLoading = query.isLoading || mutation.isLoading;

  const onAdd = async (name) => {
    const exercise = await mutation.mutateAsync({ name });
    onClose(exercise.id);
  };

  const onSelect = (exercise) => onClose(exercise.id);

  return (
    <Overlay title='Add Exercise' open={open} onClose={onClose}>
      {isLoading && <LoadingIcon className='w-5 h-5' />}
      {!isLoading && (
        <div className='flex flex-col p-4 space-y-4 h-full'>
          <div className='flex flex-wrap grow-0 shrink-0 justify-between items-baseline'>
            <Label htmlFor='name'>Exercise name</Label>
          </div>
          <Combobox
            options={exercises}
            field='name'
            onAdd={onAdd}
            onSelect={onSelect}
          />
        </div>
      )}
    </Overlay>
  );
}
