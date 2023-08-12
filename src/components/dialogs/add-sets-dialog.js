import React from 'react';
import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { useToggle } from 'react-use';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCreateExercise } from '@/hooks/use-exercise';
import { useExercises } from '@/hooks/use-exercises';
import { useCreateSets, usePreviousSetsForExercise } from '@/hooks/use-sets';
import fitcode from '@/lib/fitcode';

import { useOpenableModel } from '../../hooks/openable';

export const AddSetsDialogId = 'AddSetsDialog';

export default function AddSetsDialog() {
  const [query, setQuery] = React.useState('');

  const model = useOpenableModel(AddSetsDialogId);

  const [exercise, setExercise] = React.useState(null);
  const [unit, setUnit] = React.useState('lbs');

  const [isExercisePopoverOpen, setIsExercisePopoverOpen] = useToggle(false);
  const [isUnitPopoverOpen, setIsUnitPopoverOpen] = useToggle(false);

  const { data: options = [] } = useExercises();
  const createExerciseMutation = useCreateExercise();

  React.useEffect(() => {
    if (model.data && model.data.exercise) setExercise(model.data.exercise);
  }, [setExercise, model.data]);

  const onAddExercise = async (name) => {
    const exercise = await createExerciseMutation.mutateAsync({
      name: name.trim(),
    });
    setExercise(exercise);
    setIsExercisePopoverOpen(false);
  };

  const onSelectExercise = (exercise) => {
    setExercise(exercise);
    setIsExercisePopoverOpen(false);
  };

  const onSelectUnit = (unit) => {
    setUnit(unit);
    setIsUnitPopoverOpen(false);
  };

  const filteredOptions = React.useMemo(() => {
    return query
      ? options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
      : options.slice(0, 3);
  }, [options, query]);

  const hasExactMatch = React.useMemo(() => {
    return options.some(
      (option) => option.name.toLowerCase() === query.toLowerCase()
    );
  }, [options, query]);

  const [sets, updateSets] = React.useState(null);
  const inputRef = React.useRef(null);

  const { data: previousSets } = usePreviousSetsForExercise(
    exercise && exercise.id,
    workout && workout.id
  );
  const createSetsMutation = useCreateSets();

  const previousFitcode = React.useMemo(() => {
    if (!(Boolean(previousSets) && previousSets.length > 0)) return null;

    return fitcode.from(previousSets);
  }, [previousSets]);

  const preview = React.useCallback(
    (e) => {
      const rawInput = e.target.value;
      updateSets(
        fitcode(rawInput.trim(), {
          workoutId: workout && workout.id,
          exerciseId: exercise && exercise.id,
          unit,
        })
      );
    },
    [updateSets, exercise, unit]
  );

  const onChange = React.useCallback(
    (e) => _.throttle(preview, 250, { leading: false })(e),
    [preview]
  );

  const prefill = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = previousFitcode;
    }
  }, [previousFitcode]);

  const submit = async () => {
    await createSetsMutation.mutateAsync(sets);
    updateSets(null);
    setIsOpen(false);
  };

  const disabled = !(sets && sets.length > 0 && exercise);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className='max-h-full overflow-y-scroll top-auto bottom-[0%] translate-y-0 data-[state=closed]:slide-out-to-bottom-[48%] data-[state=open]:slide-in-from-bottom-[48%]'>
        <DialogHeader>Add an exercise</DialogHeader>
        <Popover
          open={isExercisePopoverOpen}
          onOpenChange={setIsExercisePopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button variant='outline'>
              {exercise ? exercise.name : 'Select an exercise'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder='Find an exercise...'
                value={query}
                onValueChange={setQuery}
              />
              <CommandList className='max-h-56'>
                <CommandEmpty>No results found.</CommandEmpty>
                {Boolean(query && !hasExactMatch) && (
                  <>
                    <CommandGroup heading='Create new'>
                      <CommandItem onSelect={() => onAddExercise(query)}>
                        {query}
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
                {filteredOptions.length > 0 && (
                  <CommandGroup heading={query ? 'Results' : 'Suggestions'}>
                    {filteredOptions.map((exercise) => (
                      <CommandItem
                        key={exercise.id}
                        value={exercise.name}
                        onSelect={() => onSelectExercise(exercise)}
                      >
                        {exercise.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Label htmlFor='fitcode'>Type your FitCode™</Label>
        <div className='flex gap-2'>
          <Input
            ref={inputRef}
            id='fitcode'
            type='text'
            placeholder={previousFitcode || '2x5@185'}
            onChange={onChange}
          />
          <Popover open={isUnitPopoverOpen} onOpenChange={setIsUnitPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className='w-16' variant='outline'>
                {unit || 'Units'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder='Find an exercise...' />
                <CommandList className='max-h-56'>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {['lbs', 'kgs', 'mins', 'secs', 'mi', 'km'].map((unit) => (
                    <CommandItem key={unit} onSelect={() => onSelectUnit(unit)}>
                      {unit}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='h-56 flex flex-col gap-4 text-sm'>
          <Label>Preview</Label>
          {Boolean(!sets && previousFitcode) && (
            <Alert>
              <InformationCircleIcon className='h-4 w-4 text-blue-500' />
              <AlertTitle>Progress check!</AlertTitle>
              <AlertDescription className='mb-2'>
                Last time you did this exercise for{' '}
                <span className='font-medium'>{previousFitcode}</span>
              </AlertDescription>
              <Button
                className='flex w-full'
                size='sm'
                onClick={() => prefill()}
              >
                <span className='text-sm'>Start from here</span>
              </Button>
            </Alert>
          )}
          {Boolean(!sets && !previousFitcode) && (
            <span className='self-center justify-self-center'>
              No preview available.
            </span>
          )}
          {Boolean(sets) && (
            <ScrollArea className='border rounded'>
              <span>TODO</span>
            </ScrollArea>
          )}
        </div>
        <Button variant='primary' disabled={disabled} onClick={submit}>
          <CheckIcon className='h-4 w-4' />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
