import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

import LoadingIcon from '@/components/loading-icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOpenableModel } from '@/hooks/openable';
import { useCreateWorkout } from '@/hooks/use-workout';

export const modalId = 'AddWorkoutDialog';

export default function AddWorkoutDialog() {
  const model = useOpenableModel(modalId);

  const nameRef = React.useRef(null);
  const router = useRouter();
  const mutation = useCreateWorkout({
    onSuccess: (workout) => router.push(`/workout/${workout.id}`),
  });

  const submit = async () => {
    const rawInput = nameRef.current.value;
    const name = rawInput.trim();
    if (name) {
      await mutation.mutateAsync({ name });

      model.toggle(false);
    }
  };

  return (
    <Dialog open={model.open} onOpenChange={model.toggle}>
      <DialogContent className='flex flex-col gap-4 p-4'>
        <div className='flex flex-wrap'>
          <Label htmlFor='workout-name'>Name this workout</Label>
        </div>
        <Input ref={nameRef} type='text' id='workout-name' required />
        <Button disabled={mutation.isLoading} onClick={() => submit()}>
          {mutation.isLoading ? (
            <LoadingIcon />
          ) : (
            <CheckIcon className='h-4 w-4' />
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
