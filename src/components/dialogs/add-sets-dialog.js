import React from 'react';
import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import _ from 'lodash';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { List, ListItem } from '@/components/ui/list';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCreateExercise } from '@/hooks/use-exercise';
import { useSearchExercises } from '@/hooks/use-exercises';
import { useCreateSets, usePreviousSetsForExercise } from '@/hooks/use-sets';
import { useUnits } from '@/hooks/use-units';
import fitcode from '@/lib/fitcode';
import { cn } from '@/lib/utils';

import { useOpenableModel } from '../../hooks/openable';

export const AddSetsDialogId = 'AddSetsDialog';

const stateAtom = atomWithReset({
  search: '',
  exercise: null,
  unit: null,
  sets: null,
  isExercisePopoverOpen: false,
  isUnitPopoverOpen: false,
});
const searchAtom = atom(
  (get) => get(stateAtom).search,
  (get, set, search) => set(stateAtom, (state) => ({ ...state, search })),
);
const exerciseAtom = atom(
  (get) => get(stateAtom).exercise,
  (get, set, exercise) => set(stateAtom, (state) => ({ ...state, exercise })),
);
const unitAtom = atom(
  (get) => get(stateAtom).unit,
  (get, set, unit) => set(stateAtom, (state) => ({ ...state, unit })),
);
const setsAtom = atom(
  (get) => get(stateAtom).sets,
  (get, set, sets) => set(stateAtom, (state) => ({ ...state, sets })),
);
const exercisePopoverAtom = atom(
  (get) => get(stateAtom).isExercisePopoverOpen,
  (get, set, isExercisePopoverOpen) =>
    set(stateAtom, (state) => ({ ...state, isExercisePopoverOpen })),
);
const unitPopoverAtom = atom(
  (get) => get(stateAtom).isUnitPopoverOpen,
  (get, set, isUnitPopoverOpen) =>
    set(stateAtom, (state) => ({ ...state, isUnitPopoverOpen })),
);

export default function AddSetsDialog() {
  const model = useOpenableModel(AddSetsDialogId);
  const data = model.data;

  const workout = React.useMemo(() => data && data.workout, [data]);

  const [search, setSearch] = useAtom(searchAtom);
  const [exercise, setExercise] = useAtom(exerciseAtom);
  const [unit, setUnit] = useAtom(unitAtom);
  const [sets, setSets] = useAtom(setsAtom);
  const [isExercisePopoverOpen, setIsExercisePopoverOpen] =
    useAtom(exercisePopoverAtom);
  const [isUnitPopoverOpen, setIsUnitPopoverOpen] = useAtom(unitPopoverAtom);
  const reset = useResetAtom(stateAtom);

  const fitcodeInputRef = React.useRef(null);

  const toggleWithReset = React.useCallback(
    (value = false) => {
      if (!value) {
        model.toggle(false);
        reset();
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [model.toggle, reset],
  );

  const { data: exercises = [] } = useSearchExercises(search);
  const { data: units } = useUnits();
  const { data: previousSets } = usePreviousSetsForExercise(
    exercise && exercise.id,
    workout && workout.id,
  );
  const createExerciseMutation = useCreateExercise();
  const createSetsMutation = useCreateSets();

  React.useEffect(() => {
    if (units && units.length > 0)
      setUnit(units.find(({ delimiter }) => delimiter === 'lbs') || units[0]);
  }, [setUnit, units]);

  React.useEffect(() => {
    if (data && data.exercise) setExercise(data.exercise);
  }, [setExercise, data]);

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
    preview();
  };

  const onSelectUnit = (unit) => {
    setUnit(unit);
    setIsUnitPopoverOpen(false);
    preview();
  };

  const previousFitcode = React.useMemo(() => {
    if (!(Boolean(previousSets) && previousSets.length > 0)) return null;

    return fitcode.from(previousSets);
  }, [previousSets]);

  const preview = React.useCallback(() => {
    const rawInput = fitcodeInputRef.current.value;
    const partial = {
      workoutId: workout && workout.id,
      exerciseId: exercise && exercise.id,
      unitId: unit && unit.id,
    };
    console.log(partial);
    setSets(fitcode(rawInput.trim(), partial));
  }, [setSets, workout, exercise, unit]);

  const onChange = React.useCallback(
    (e) => _.throttle(preview, 100, { leading: false })(e),
    [preview],
  );

  const prefill = React.useCallback(() => {
    if (fitcodeInputRef.current) {
      fitcodeInputRef.current.value = previousFitcode;
      preview();
    }
  }, [previousFitcode, preview]);

  const submit = React.useCallback(async () => {
    await createSetsMutation.mutateAsync(sets);
    toggleWithReset();
  }, [createSetsMutation, sets, toggleWithReset]);

  const disabled = !Boolean(sets && sets.length > 0 && exercise && unit);

  return (
    <Dialog open={model.open} onOpenChange={toggleWithReset}>
      <DialogContent>
        <DialogHeader>Add an exercise</DialogHeader>
        <Popover
          open={isExercisePopoverOpen}
          onOpenChange={setIsExercisePopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button variant='outline' className='text-left'>
              <span className='flex-1'>
                {exercise ? exercise.name : 'Select an exercise'}
              </span>
              <ChevronDownIcon className='h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder='Select an exercise...'
                value={search}
                onValueChange={_.debounce(setSearch, 50, { maxWait: 50 })}
              />
              <CommandList className='max-h-56'>
                {Boolean(search) && (
                  <>
                    <CommandGroup heading='Create new'>
                      <CommandItem onSelect={() => onAddExercise(search)}>
                        {search}
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
                {Boolean(exercises && exercises.length > 0) && (
                  <CommandGroup heading={search ? 'Results' : 'Suggestions'}>
                    {exercises.map((x) => (
                      <CommandItem
                        key={x.id}
                        value={x.name}
                        onSelect={() => onSelectExercise(x)}
                        className='overflow-hidden text-ellipsis'
                      >
                        <CheckIcon
                          className={cn(
                            'h-4 w-4',
                            exercise && exercise.id === x.id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {x.name}
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
            ref={fitcodeInputRef}
            id='fitcode'
            type='text'
            placeholder={previousFitcode || '2x5@185'}
            onChange={onChange}
          />
          <Popover open={isUnitPopoverOpen} onOpenChange={setIsUnitPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className='w-16' variant='outline'>
                {unit ? unit.delimiter : <span>&mdash;</span>}
                <ChevronDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput placeholder='Select a unit...' />
                <CommandList className='max-h-56'>
                  {units &&
                    units.map((x) => (
                      <CommandItem
                        key={x.id}
                        value={[x.name, x.delimiter].join(' ')}
                        onSelect={() => onSelectUnit(x)}
                      >
                        <CheckIcon
                          className={cn(
                            'h-4 w-4',
                            unit && unit.id === x.id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {x.name}
                      </CommandItem>
                    ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex h-56 flex-col gap-4 text-sm'>
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
            <ScrollArea className='rounded border'>
              {Boolean(sets && sets.length > 0) && (
                <List>
                  {sets.map((x, index) => (
                    <ListItem key={index}>
                      <span>{fitcode.from(x)}</span>
                      {x.amount && unit && <span>{unit.name}</span>}
                    </ListItem>
                  ))}
                </List>
              )}
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
