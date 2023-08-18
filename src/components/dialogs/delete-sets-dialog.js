import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

import LoadingIcon from '@/components/loading-icon';
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

export default function DeleteSetsDialog() {
  const model = useOpenableModel(modalId);
  const data = model.data;

  const mutation = useDeleteSet();

  const remove = React.useCallback(async () => {
    const removals = [];

    for (const set of data) {
      removals.push(mutation.mutateAsync(set));
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
          Are you sure you want to delete {data.length} set(s)?
        </DialogDescription>
        <Button
          variant='destructive'
          onClick={remove}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading && <LoadingIcon />}
          {!mutation.isLoading && <TrashIcon className='h-4 w-4' />}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
