import { CheckIcon } from '@heroicons/react/solid';
import React from 'react';

import { useCreateWorkout } from '../../../hooks/use-workouts';
import { useUser } from '../../auth/user';
import Button from '../../button';
import { Input, Label } from '../../forms';
import Overlay from '../../overlay';

export default function AddWorkout({ open, onClose }) {
  const inputRef = React.useRef(null);
  const { user } = useUser();
  const mutation = useCreateWorkout();

  const submit = async () => {
    const rawInput = inputRef.current.value;
    const workoutName = rawInput.trim();
    if (workoutName) {
      await mutation.mutateAsync({ name: workoutName, userId: user.id });
      onClose();
    }
  };

  return (
    <Overlay open={open} onClose={onClose} title='Add Workout'>
      <div className='flex flex-col space-y-4'>
        <div>
          <div className='flex flex-wrap justify-between items-baseline'>
            <Label htmlFor='workout-name'>Name this workout</Label>
          </div>
          <Input ref={inputRef} autoComplete='off' type='text' id='workout-name' required />
        </div>
        <div className='flex space-x-4'>
          <Button className='flex-1' type='button' onClick={() => submit()}>
            <CheckIcon className='inline-block w-6 h-6' />
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
