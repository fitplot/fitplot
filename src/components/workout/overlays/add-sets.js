import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import _ from 'lodash';
import React from 'react';

import {
  useCreateSets,
  usePreviousSetsForExercise,
} from '../../../hooks/use-sets';
import fitcode from '../../../lib/fitcode';
import { useUser } from '../../auth';
import Button from '../../button';
import { Input, Label } from '../../forms';
import Overlay from '../../overlay';
import SetsTable from '../../sets-table';
import { H2 } from '../../typography';

export default function AddSets({ open, onClose, workoutId, exercise = {} }) {
  const [sets, updateSets] = React.useState(null);
  const inputRef = React.useRef(null);

  const { data: previousSets } = usePreviousSetsForExercise(
    exercise.id,
    workoutId
  );
  const mutation = useCreateSets();
  const user = useUser();

  const previousFitcode = React.useMemo(() => {
    if (!(Boolean(previousSets) && previousSets.length > 0)) return null;

    return fitcode.from(previousSets);
  }, [previousSets]);

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
        <H2>{exercise?.name}</H2>
        {previousFitcode && (
          <div className='flex items-center p-4 space-x-4 bg-slate-200 rounded'>
            <InformationCircleIcon className='w-6 h-6 text-blue-500' />
            <div className='grow p-2'>
              <div className='text-sm text-slate-500'>
                <span>Last time you did this exercise for</span>
              </div>
              <div className='text-sm font-medium text-slate-900'>
                {previousFitcode}
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-wrap'>
          <Label htmlFor='fitcode'>Type your FitCode™</Label>
        </div>
        <Input
          ref={inputRef}
          id='fitcode'
          autoComplete='off'
          type='text'
          placeholder={previousFitcode || '2x5@185'}
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
