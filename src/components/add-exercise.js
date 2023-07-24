import React from 'react';

import Combobox from '@/components/combobox';
import LoadingIcon from '@/components/loading-icon';
import Overlay from '@/components/overlay';
import { useCreateExercise, useExercises } from '@/hooks/use-exercises';

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
      {isLoading && <LoadingIcon className='h-5 w-5' />}
      {!isLoading && (
        <div className='flex h-full flex-col space-y-4 p-4'>
          <Combobox
            options={exercises}
            field='name'
            onAdd={onAdd}
            onSelect={onSelect}
            placeholder='Search exercises'
          />
        </div>
      )}
    </Overlay>
  );
}
