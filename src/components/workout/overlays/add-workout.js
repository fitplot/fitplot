import { CheckIcon, XIcon } from '@heroicons/react/solid';

import { useCreateWorkout } from '../../../hooks/use-workouts';
import { useUser } from '../../auth/user';
import Button from '../../button';
import Dialog from '../../dialog';
import { Input, Label } from '../../forms';

export default function AddWorkout({ open, onClose }) {
  const { user } = useUser();
  const mutation = useCreateWorkout();

  const createWorkout = async (workoutName) => {
    await mutation.mutateAsync({ name: workoutName, userId: user.id });
  };

  return (
    <Dialog open={open} onClose={onClose} title='Add Workout'>
      <form
        className='flex flex-col space-y-4'
        onSubmit={(event) => {
          const form = event.currentTarget;
          const workoutName = form.workout.value;
          // TODO: form validation
          if (workoutName) createWorkout(workoutName);
          event.preventDefault();
        }}
        autoComplete='off'
      >
        <div>
          <div className='flex flex-wrap justify-between items-baseline'>
            <Label htmlFor='exercise-name'>Name this workout</Label>
          </div>
          <Input
            autoFocus
            autoComplete='off'
            type='text'
            id='workout-name'
            name='workout'
            required
          />
        </div>
        <div className='flex space-x-4'>
          <Button className='flex-1' onClick={() => onClose()}>
            <XIcon className='inline-block w-6 h-6' />
          </Button>
          <Button className='flex-1' type='submit'>
            <CheckIcon className='inline-block w-6 h-6' />
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
