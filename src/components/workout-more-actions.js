import React from 'react';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useToggle } from 'react-use';

import { modalId as DeleteWorkoutDialogId } from '@/components/dialogs/delete-workout-dialog';
import LoadingIcon from '@/components/loading-icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOpenable } from '@/hooks/openable';
import { useUpdateWorkout } from '@/hooks/use-workout';

export default function WorkoutMoreActions({ workout = {} }) {
  const { name, completedAt } = workout;

  const inputRef = React.useRef(null);
  const [open, toggle] = useToggle(false);
  const [showRenameWorkout, toggleRenameWorkout] = useToggle(false);

  const deleteDialog = useOpenable(DeleteWorkoutDialogId);
  const updateMutation = useUpdateWorkout();

  const remove = () => {
    deleteDialog.show(workout);
    toggle(false);
  };

  const submitRename = async () => {
    const rawInput = inputRef.current.value;
    const updatedName = rawInput.trim();
    if (updatedName) {
      await updateMutation.mutateAsync({
        ...workout,
        name: updatedName,
      });
      toggleRenameWorkout(false);
    }
  };

  const submitToggleCompleted = async () => {
    await updateMutation.mutateAsync({
      ...workout,
      completedAt: completedAt ? null : dayjs().toISOString(),
    });
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={toggle}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <EllipsisHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>
            <span>Workout</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => toggleRenameWorkout(true)}
            className='gap-2'
          >
            <PencilIcon className='h-4 w-4' />
            <span>Rename Workout</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => submitToggleCompleted()}
            disabled={updateMutation.isLoading}
            className='gap-2'
          >
            {updateMutation.isLoading ? (
              <LoadingIcon className='h-4 w-4' />
            ) : (
              <CheckCircleIcon
                className={clsx(
                  { 'text-green-500': Boolean(completedAt) },
                  'h-4 w-4',
                )}
              />
            )}
            <span>Mark as {completedAt ? 'Incomplete' : 'Complete'}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => remove()}
            className='gap-2 text-destructive-500'
          >
            <TrashIcon className='h-4 w-4' />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showRenameWorkout} onOpenChange={toggleRenameWorkout}>
        <DialogContent>
          <div className='flex flex-col space-y-4 p-4'>
            <div className='flex flex-wrap'>
              <Label htmlFor='workout-name'>Rename this workout</Label>
            </div>
            <Input
              ref={inputRef}
              type='text'
              id='workout-name'
              defaultValue={name}
              required
            />
            <Button
              className='flex justify-center'
              disabled={updateMutation.isLoading}
              onClick={() => submitRename()}
            >
              {updateMutation.isLoading ? (
                <LoadingIcon className='h-5 w-5' />
              ) : (
                <CheckIcon className='inline-block h-6 w-6' />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
