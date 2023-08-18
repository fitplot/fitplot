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
import { useDeleteExercise } from '@/hooks/use-exercise';

export const modalId = 'DeleteWorkoutDialog';

export default function DeleteWorkoutDialog() {
  const model = useOpenableModel(modalId);
  const data = model.data;

  const mutation = useDeleteExercise();

  const remove = React.useCallback(async () => {
    await mutation.mutateAsync(data);
    model.toggle(false);
  }, [data, mutation, model]);

  // nothing to delete
  if (!data) return null;

  return (
    <Dialog open={model.open} onOpenChange={model.toggle}>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this exercise?
        </DialogDescription>
        <Button variant='destructive' onClick={remove}>
          <TrashIcon className='h-4 w-4' />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
