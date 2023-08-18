import React from 'react';
import {
  ArrowRightCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useCommandState } from 'cmdk';
import { useRouter } from 'next/router';

import { modalId as DeleteSetsDialoglId } from '@/components/dialogs/delete-sets-dialog';
import { modalId as DeleteWorkoutDialogId } from '@/components/dialogs/delete-workout-dialog';
import { Badge } from '@/components/ui/badge';
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useOpenable, useOpenableModel } from '@/hooks/openable';
import { useUpdateSet } from '@/hooks/use-sets';
import { useUpdateWorkout } from '@/hooks/use-workout';

export const modalId = 'GlobalCommand';

export default function GlobalCommand() {
  const router = useRouter();

  const model = useOpenableModel(modalId);
  const { type = 'item', data } = model.data || {};

  const [search, setSearch] = React.useState('');

  return (
    <>
      <CommandDialog
        open={model.open}
        onOpenChange={model.toggle}
        shouldFilter={false}
        value={search}
        onValueChange={setSearch}
      >
        {data && Array.isArray(data) && (
          <div className='p-2'>
            <Badge variant='secondary'>
              {data.length} {type}(s)
            </Badge>
          </div>
        )}
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <WorkoutCommandList model={model} type={type} data={data} />
          <SetCommandList model={model} type={type} data={data} />
          <CommandSeparator />
          <CommandItem
            onSelect={() => model.toggle(false) || router.push('/dashboard')}
          >
            <ArrowRightCircleIcon className='h-4 w-4' />
            <span>Go to dashboard</span>
          </CommandItem>
          <CommandItem
            onSelect={() => model.toggle(false) || router.push('/workouts')}
          >
            <ArrowRightCircleIcon className='h-4 w-4' />
            <span>Go to all workouts</span>
          </CommandItem>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function SetCommandList({ model, type, data }) {
  const search = useCommandState((state) => state.search);
  const [action, setAction] = React.useState('');

  const updateMutation = useUpdateSet();
  const deleteDialog = useOpenable(DeleteSetsDialoglId);

  const update = React.useCallback(
    async (partial) => {
      const updates = [];

      for (const set of data) {
        const payload = {
          id: set.id,
          ...partial,
        };
        updates.push(updateMutation.mutateAsync(payload));
      }

      await Promise.allSettled(updates);

      model.toggle(false);
    },
    [updateMutation, data, model],
  );

  const remove = React.useCallback(() => {
    deleteDialog.show(data);
    model.toggle(false);
  }, [deleteDialog, data, model]);

  const updateVolume = React.useCallback(() => {
    const volume = search && Number.parseInt(search.trim(), 10);
    if (volume) update({ volume });
  }, [search, update]);

  const updateAmount = React.useCallback(() => {
    const amount = search && Number.parseInt(search.trim(), 10);
    if (amount) update({ amount });
  }, [search, update]);

  const actions = React.useMemo(() => {
    return [
      {
        value: 'volume',
        label: 'Change volume',
        icon: <PencilIcon className='h-4 w-4' />,
        onSelect: () => setAction('volume'),
      },
      {
        value: 'amount',
        label: 'Change amount',
        icon: <PencilIcon className='h-4 w-4' />,
        onSelect: () => setAction('amount'),
      },
      {
        value: 'delete',
        label: 'Delete Set(s)',
        icon: <TrashIcon className='h-4 w-4' />,
        onSelect: () => remove(),
      },
    ];
  }, [setAction, remove]);

  if (type !== 'set') return null;

  return (
    <>
      {!action &&
        actions.map(({ value, label, icon, onSelect }) => (
          <CommandItem key={value} value={value} onSelect={onSelect}>
            {icon}
            <span>{label}</span>
          </CommandItem>
        ))}
      {action === 'volume' && (
        <CommandItem onSelect={() => updateVolume(search)}>
          <PencilIcon className='h-4 w-4' />
          <span>Change volume</span>
        </CommandItem>
      )}
      {action === 'amount' && (
        <CommandItem onSelect={() => updateAmount(search)}>
          <PencilIcon className='h-4 w-4' />
          <span>Change amount</span>
        </CommandItem>
      )}
    </>
  );
}

function WorkoutCommandList({ model, type, data }) {
  const [action, setAction] = React.useState(null);

  const updateMutation = useUpdateWorkout();
  const deleteDialog = useOpenable(DeleteWorkoutDialogId);

  const update = React.useCallback(
    async (partial) => {
      const updates = [];

      for (const workout of data) {
        const payload = {
          id: workout.id,
          ...partial,
        };
        updates.push(updateMutation.mutateAsync(payload));
      }

      await Promise.allSettled(updates);

      model.toggle(false);
    },
    [data, updateMutation, model],
  );

  const updateStatus = React.useCallback(
    (completedAt) => {
      update({ completedAt });
    },
    [update],
  );

  const remove = React.useCallback(async () => {
    deleteDialog.show({ data });
    model.toggle(false);
  }, [deleteDialog, model, data]);

  const actions = React.useMemo(() => {
    return [
      {
        value: 'status',
        label: 'Change status',
        icon: <PencilIcon className='h-4 w-4' />,
        onSelect: () => setAction('status'),
      },
      {
        value: 'delete',
        label: 'Delete workout(s)',
        icon: <TrashIcon className='h-4 w-4' />,
        onSelect: () => remove(),
      },
    ];
  }, [setAction, remove]);

  if (type !== 'workouts') return null;

  return (
    <>
      {!action &&
        actions.map(({ value, label, icon, onSelect }) => (
          <CommandItem key={value} value={value} onSelect={onSelect}>
            {icon}
            <span>{label}</span>
          </CommandItem>
        ))}
      {action === 'status' && (
        <>
          <CommandItem onSelect={() => updateStatus(dayjs())}>
            <PencilIcon className='h-4 w-4' />
            <span>Completed</span>
          </CommandItem>
          <CommandItem onSelect={() => updateStatus(null)}>
            <PencilIcon className='h-4 w-4' />
            <span>In Progress</span>
          </CommandItem>
        </>
      )}
    </>
  );
}
