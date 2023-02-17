import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { useCreateSets } from '../../../hooks/use-sets';
import fitcode from '../../../lib/fitcode';
import { useUser } from '../../auth';
import Button from '../../button';
import { Input, Label } from '../../forms';
import Overlay from '../../overlay';
import SetsTable from '../components/sets-table';

export default function AddSet({ open, onClose, workoutId, exercise }) {
  const [sets, updateSets] = React.useState(null);
  const inputRef = React.useRef(null);

  const mutation = useCreateSets();
  const user = useUser();

  const preview = () => {
    const rawInput = inputRef.current.value;
    updateSets(fitcode(rawInput, { workoutId, exerciseId: exercise.id }));
  };

  const submit = async () => {
    await mutation.mutateAsync(
      sets.map((set) => ({ ...set, userId: user.user.id }))
    );
    updateSets(null);
    onClose();
  };

  return (
    <Overlay
      open={open}
      onClose={onClose}
      title='Add Sets'
      initialFocus={inputRef}
    >
      <div className='flex flex-col p-4 space-y-4'>
        <div className='p-4 text-sm font-medium text-gray-900'>
          {exercise?.name || 'Unknown Exercise'}
        </div>
        <div className='flex flex-wrap'>
          <Label htmlFor='exercise-name'>Type your FitCode™</Label>
        </div>
        <div className='flex'>
          <Input
            ref={inputRef}
            autoComplete='off'
            type='text'
            placeholder='5@185, 4@195, 2@205'
          />
          <Button className='p-1' type='button' onClick={() => preview()}>
            <ChevronRightIcon className='w-6 h-6' />
          </Button>
        </div>
        <div className='grow'>
          <SetsTable sets={sets} />
        </div>
        <Button
          className='flex justify-center'
          disabled={!(sets && sets.length > 0)}
          onClick={submit}
        >
          <CheckIcon className='inline-block w-6 h-6' />
        </Button>
      </div>
    </Overlay>
  );
}
