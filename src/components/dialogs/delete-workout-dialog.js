import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useOpenableModel } from '@/hooks/openable';
import { useDeleteWorkout } from '@/hooks/use-workout';

import LoadingIcon from '../loading-icon';

export const modalId = 'DeleteWorkoutDialog';

export default function DeleteWorkoutDialog() {
  const model = useOpenableModel(modalId);
  const data = model.data;

  const mutation = useDeleteWorkout();

  const remove = React.useCallback(async () => {
    const removals = [];

    for (const workout of data) {
      removals.push(mutation.mutateAsync(workout));
    }

    await Promise.allSettled(removals);

    model.toggle(false);
  }, [data, mutation, model]);

  // nothing to delete
  if (!data) return null;

  return (
    <Dialog open={model.open} onOpenChange={model.toggle}>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete {data.length} workout(s)?
        </DialogDescription>
        <Button
          variant='destructive'
          disabled={mutation.isLoading}
          onClick={remove}
        >
          {mutation.isLoading ? (
            <LoadingIcon />
          ) : (
            <TrashIcon className='h-4 w-4' />
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
