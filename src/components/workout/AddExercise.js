import { DialogContent, DialogOverlay } from '@reach/dialog';

import { useCreateExercise, useExercises } from '../../hooks/use-exercises';
import { useUser } from '../auth/UserProvider';
import { Label } from '../forms';
import ListboxInput from '../listbox-input';
import LoadingIcon from '../loading-icon';
import { H2 } from '../typography';

const predicate = (input) => (exercise) =>
  exercise.name.toLowerCase().includes(input.toLowerCase());
const exactPredicate = (input) => (exercise) => exercise.name.toLowerCase() === input.toLowerCase();

export default function AddExercise({ isOpen, close }) {
  const { data: exercises, ...query } = useExercises();
  const { user } = useUser();
  const mutation = useCreateExercise();

  const onSelect = (exercise) => {
    close(exercise.id);
  };

  const onSubmit = async (name) => {
    const exercise = await mutation.mutateAsync({ userId: user.id, name });
    close(exercise.id);
  };

  const isLoading = query.isLoading || mutation.isLoading;

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label='Add Exercise'>
      <DialogContent className='!w-screen md:!w-half-screen'>
        {isLoading && <LoadingIcon className='w-5 h-5' />}
        {!isLoading && (
          <div className='flex flex-col space-y-4'>
            <H2>Add Exercise</H2>
            <div className='flex flex-col'>
              <div className='flex flex-wrap justify-between items-baseline'>
                <Label htmlFor='name'>Exercise name</Label>
              </div>
              <ListboxInput
                options={exercises}
                field='name'
                predicate={predicate}
                exactPredicate={exactPredicate}
                onSelect={onSelect}
                onSubmit={onSubmit}
                autoFocus
                type='text'
                id='name'
                name='name'
                autoComplete='off'
                required
              />
            </div>
          </div>
        )}
      </DialogContent>
    </DialogOverlay>
  );
}
