import React from 'react';

import { useCreateExercise, useExercises } from '../../../hooks/use-exercises';
import { useUser } from '../../auth';
import Dialog from '../../dialog';
import { Label } from '../../forms';
import ListboxInput from '../../listbox-input';
import LoadingIcon from '../../loading-icon';

const predicate = (input) => (exercise) =>
  exercise.name.toLowerCase().includes(input.toLowerCase());
const exactPredicate = (input) => (exercise) => exercise.name.toLowerCase() === input.toLowerCase();

export default function AddExercise({ open, onClose }) {
  const inputRef = React.useRef(null);

  const { data: exercises, ...query } = useExercises();
  const { user } = useUser();
  const mutation = useCreateExercise();

  const onSelect = (exercise) => {
    onClose(exercise.id);
  };

  const onSubmit = async (name) => {
    const exercise = await mutation.mutateAsync({ userId: user.id, name });
    onClose(exercise.id);
  };

  const isLoading = query.isLoading || mutation.isLoading;

  return (
    <Dialog title='Add Exercise' open={open} onClose={onClose} initialFocus={inputRef}>
      {isLoading && <LoadingIcon className='w-5 h-5' />}
      {!isLoading && (
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-between items-baseline'>
              <Label htmlFor='name'>Exercise name</Label>
            </div>
            <ListboxInput
              options={exercises}
              field='name'
              predicate={predicate}
              exactPredicate={exactPredicate}
              onSelect={onSelect}
              onSubmit={onSubmit}
              autoFocus
              type='text'
              id='name'
              name='name'
              autoComplete='off'
              required
              ref={inputRef}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
}
