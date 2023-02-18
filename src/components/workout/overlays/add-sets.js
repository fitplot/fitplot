import { CheckIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import React from 'react';

import { useCreateSets } from '../../../hooks/use-sets';
import fitcode from '../../../lib/fitcode';
import { useUser } from '../../auth';
import Button from '../../button';
import { Input, Label } from '../../forms';
import Overlay from '../../overlay';
import SetsTable from '../components/sets-table';

export default function AddSets({ open, onClose, workoutId, exercise }) {
  const [sets, updateSets] = React.useState(null);
  const inputRef = React.useRef(null);

  const mutation = useCreateSets();
  const user = useUser();

  const preview = React.useCallback(
    (e) => {
      const rawInput = e.target.value;
      updateSets(
        fitcode(rawInput.trim(), { workoutId, exerciseId: exercise.id })
      );
    },
    [updateSets, workoutId, exercise]
  );

  const onChange = React.useCallback(
    (e) => _.throttle(preview, 250, { leading: false })(e),
    [preview]
  );

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
        <div className='p-4 font-medium text-gray-900'>
          {exercise?.name || 'Unknown Exercise'}
        </div>
        <div className='flex flex-wrap'>
          <Label htmlFor='fitcode'>Type your FitCode™</Label>
        </div>
        <Input
          ref={inputRef}
          id='fitcode'
          autoComplete='off'
          type='text'
          placeholder='5@185, 4@195, 2@205'
          onChange={onChange}
        />
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
