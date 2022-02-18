import { CheckIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';

import { useCreateSet } from '../../../hooks/use-sets';
import fitcode from '../../../lib/fitcode';
import { useUser } from '../../auth';
import Button from '../../button';
import { Input, Label } from '../../forms';
import Overlay from '../../overlay';
import SetsTable from '../components/sets-table';

export default function AddSet({ open, onClose, workoutId, exerciseId }) {
  const [sets, updateSets] = React.useState(null);
  const inputRef = React.useRef(null);

  const mutation = useCreateSet();
  const user = useUser();

  const preview = () => {
    const rawInput = inputRef.current.value;
    updateSets(fitcode(rawInput, { workoutId, exerciseId }));
  };

  const submit = async () => {
    await Promise.all(sets.map((set) => mutation.mutateAsync({ ...set, userId: user.user.id })));
    updateSets(null);
    onClose();
  };

  return (
    <Overlay open={open} onClose={onClose} title='Add Sets' initialFocus={inputRef}>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col flex-none space-y-4'>
          <div className='flex flex-wrap justify-between items-baseline mb-4'>
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
        </div>
        <div className='flex-1'>
          <SetsTable sets={sets} />
        </div>
        <div className='flex space-x-4'>
          <Button className='flex-1' onClick={() => onClose()}>
            <XIcon className='inline-block w-6 h-6' />
          </Button>
          <Button className='flex-1' disabled={!(sets && sets.length > 0)} onClick={submit}>
            <CheckIcon className='inline-block w-6 h-6' />
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
