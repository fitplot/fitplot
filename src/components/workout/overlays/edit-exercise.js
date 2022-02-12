import { CheckIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';

import { useUpdateExercise } from '../../../hooks/use-exercise';
import { useUpdateSet } from '../../../hooks/use-sets';
import Button from '../../button';
import Dialog from '../../dialog';
import { Input } from '../../forms';
import LoadingIcon from '../../loading-icon';
import SetsTable from '../components/sets-table';

export default function EditExercise({ exercise = {}, sets = [], open, onClose }) {
  const setMutation = useUpdateSet();
  const exerciseMutation = useUpdateExercise();

  const [dirtyExerciseName, setDirtyExerciseName] = React.useState(null);

  // Example dirty sets table (hash table):
  //     dirtySets = { 4: { volume: 10, amount: 100 } }
  const [dirtySets, setDirtySets] = React.useState({});

  const { name } = exercise;

  React.useEffect(() => {
    if (name) {
      // If rendered for a different exercise, reset the dirty exercise reference.
      setDirtyExerciseName(() => '');
    }
  }, [name]);

  React.useEffect(() => {
    if (sets && sets.length > 0) {
      // If rendered for a different exercise, reset the dirty sets table.
      setDirtySets(() => ({}));
    }
  }, [sets]);

  const submit = async () => {
    const requests = [];

    Object.entries(dirtySets)
      .map(([setId, changes]) => {
        const original = sets.find((set) => set.id === setId);

        return {
          ...original, // Persist the original set fields
          ...changes,
        };
      })
      .map((set) => setMutation.mutateAsync(set))
      .forEach((request) => requests.push(request));

    if (dirtyExerciseName && dirtyExerciseName.trim().length > 0) {
      const exerciseRequest = exerciseMutation.mutateAsync({
        ...exercise,
        name: dirtyExerciseName,
      });

      requests.push(exerciseRequest);
    }

    await Promise.all(requests);

    onClose();
  };

  const onEditExercise = (_name) => {
    setDirtyExerciseName(_name);
  };

  const onEditSet = (setId, changes) => {
    const previousChanges = dirtySets[setId];

    dirtySets[setId] = {
      ...previousChanges, // Persist any other changes to this set
      ...changes,
    };
  };

  const isLoading = setMutation.isLoading || exerciseMutation.isLoading;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='flex flex-col justify-center items-center'>
        {isLoading && <LoadingIcon className='w-5 h-5' />}
        {!isLoading && (
          <div className='flex flex-col flex-1 space-y-2'>
            <Input
              className='py-2 px-4 bg-white'
              type='textarea'
              defaultValue={name}
              onChange={(event) => onEditExercise(event.target.value)}
            />
            <SetsTable sets={sets} isEditable onEdit={onEditSet} />
            <div className='flex space-x-4'>
              <Button className='flex-1' onClick={() => onClose()}>
                <XIcon className='inline-block w-6 h-6' />
              </Button>
              <Button className='flex-1' onClick={() => submit()}>
                <CheckIcon className='inline-block w-6 h-6' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
