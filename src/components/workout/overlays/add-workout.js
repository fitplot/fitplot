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
      <div className='flex flex-col p-4 space-y-4'>
        <div className='flex flex-wrap'>
          <Label htmlFor='workout-name'>Name this workout</Label>
        </div>
        <Input ref={inputRef} autoComplete='off' type='text' id='workout-name' required />
        <Button className='flex justify-center' type='button' onClick={() => submit()}>
          <CheckIcon className='inline-block w-6 h-6' />
        </Button>
      </div>
    </Overlay>
  );
}
