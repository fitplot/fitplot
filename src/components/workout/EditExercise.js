import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import React from 'react';

import { useUpdateSet } from '../../hooks/use-sets';
import Button from '../button';
import { Input } from '../forms';
import LoadingIcon from '../loading-icon';
import SetsView from './SetsView';

export default function EditExercise({ exercise: { name } = {}, sets = [], isOpen, close }) {
  const mutation = useUpdateSet();

  // Example dirty sets table (hash table):
  //    dirty = { 4: { volume: 10, amount: 100 } }
  const [dirty, setDirty] = React.useState({});

  React.useEffect(() => {
    if (sets && sets.length > 0) {
      // If rendered for a different exercise, reset the dirty sets table.
      setDirty(() => ({}));
    }
  }, [sets]);

  const submit = async () => {
    await Promise.all(
      // For each entry in the dirty sets table...
      Object.entries(dirty)
        // Create a new updated set
        .map(([setId, changes]) => {
          const original = sets.find((set) => set.id === setId);

          return {
            ...original, // Persist the original set fields
            ...changes,
          };
        })
        // And PUT each new set
        .map((set) => mutation.mutateAsync(set))
    );

    close();
  };

  const onEditSet = (setId, changes) => {
    const previousChanges = dirty[setId];

    dirty[setId] = {
      ...previousChanges, // Persist any other changes to this set
      ...changes,
    };
  };

  const { isLoading } = mutation;

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label='View EditExercise'>
      <DialogContent className='!w-screen md:!w-half-screen' aria-label='View EditExercise'>
        <div className='flex flex-col justify-center items-center'>
          {isLoading && <LoadingIcon className='w-5 h-5' />}
          {!isLoading && (
            <div className='flex flex-col flex-1 space-y-2'>
              <Input className='py-2 px-4 bg-white' type='textarea' defaultValue={name} />
              <SetsView sets={sets} isEditable onEdit={onEditSet} />
              <div className='flex space-x-4'>
                <Button className='flex-1' onClick={() => close()}>
                  <XIcon className='inline-block w-6 h-6' />
                </Button>
                <Button className='flex-1' onClick={() => submit()}>
                  <CheckIcon className='inline-block w-6 h-6' />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </DialogOverlay>
  );
}
