import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteSet } from '@/hooks/use-sets';

import { useOpenableModel } from '../../hooks/openable';

export const modalId = 'DeleteSetsDialog';

export default function DeleteSetsDialog({ data = [] }) {
  const mutation = useDeleteSet();

  const model = useOpenableModel(modalId);

  const remove = React.useCallback(async () => {
    const removals = [];

    for (const set of data) {
      removals.push(mutation.mutateAsync(set));
    }

    await Promise.allSettled(removals);

    model.toggle(false);
  }, [data, mutation, model]);

  return (
    <Dialog open={model.open} onOpenChange={model.toggle}>
      <DialogContent>
        <DialogTitle>Confirm</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete {data.length} set(s)?
        </DialogDescription>
        <Button variant='destructive' onClick={remove}>
          <TrashIcon className='h-4 w-4' />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
