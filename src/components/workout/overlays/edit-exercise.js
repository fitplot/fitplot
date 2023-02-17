import { CheckIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { useUpdateSet } from '../../../hooks/use-sets';
import Button from '../../button';
import LoadingIcon from '../../loading-icon';
import Overlay from '../../overlay';
import SetsTable from '../components/sets-table';

export default function EditExercise({ sets = [], open, onClose }) {
  const mutation = useUpdateSet();

  // Example dirty sets table (hash table):
  //     dirtySets = { 4: { volume: 10, amount: 100 } }
  const [dirtySets, setDirtySets] = React.useState({});

  React.useEffect(() => {
    if (sets && sets.length > 0) {
      // If rendered for a different exercise, reset the dirty sets table.
      setDirtySets({});
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
      .map((set) => mutation.mutateAsync(set))
      .forEach((request) => requests.push(request));

    await Promise.all(requests);

    onClose();
  };

  const onEdit = (setId, changes) => {
    const previousChanges = dirtySets[setId];

    dirtySets[setId] = {
      ...previousChanges, // Persist any other changes to this set
      ...changes,
    };
  };

  return (
    <Overlay open={open} onClose={onClose}>
      <div className='flex flex-col p-4 space-y-4'>
        <div className='flex flex-col flex-1 space-y-2'>
          <SetsTable sets={sets} isEditable onEdit={onEdit} />
          <Button
            className='flex justify-center'
            disabled={mutation.isLoading}
            onClick={() => submit()}
          >
            {mutation.isLoading ? (
              <LoadingIcon className='w-6 h-6' />
            ) : (
              <CheckIcon className='inline-block w-6 h-6' />
            )}
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
