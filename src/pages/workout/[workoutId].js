import { CheckCircleIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import AddExercise from '@/components/add-exercise';
import AddSets from '@/components/add-sets';
import EditSets from '@/components/edit-sets';
import { usePageContext } from '@/components/layouts';
import LoadingIcon from '@/components/loading-icon';
import SetsTable from '@/components/sets-table';
import { H1, Paragraph } from '@/components/typography';
import MoreActions from '@/components/workout-more-actions';
import { useExercises } from '@/hooks/use-exercises';
import { useSets } from '@/hooks/use-sets';
import { useWorkout } from '@/hooks/use-workout';
import withUser from '@/lib/with-user';
import { Button } from '@/components/ui/button';

export default function WorkoutPage() {
  const router = useRouter();
  const { workoutId } = router.query;

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();

  const { name, completedAt } = workout || {};
  const isReadonly = Boolean(completedAt);

  const [activeExerciseId, setActiveExerciseId] = React.useState(null);

  const [showWorkoutActions, toggleWorkoutActions] = useToggle(false);
  const closeEditWorkoutDialog = () => toggleWorkoutActions(false);

  const onMoreAction = React.useCallback(
    () => toggleWorkoutActions(true),
    [toggleWorkoutActions]
  );

  usePageContext({ title: 'Workout', onMoreAction });

  // AddSets dialog
  const [showAddSets, toggleAddSets] = useToggle(false);
  const openSetsDialog = () => toggleAddSets(true);
  const closeSetsDialog = () => {
    toggleAddSets(false);
    setActiveExerciseId();
  };

  // AddExercise dialog
  const [showAddExercise, toggleAddExercise] = useToggle(false);
  const openAddExerciseDialog = () => toggleAddExercise(true);
  const closeAddExerciseDialog = (exerciseId) => {
    toggleAddExercise(false);

    if (exerciseId && typeof exerciseId === 'string') {
      setActiveExerciseId(exerciseId);
      openSetsDialog();
    } else {
      setActiveExerciseId(null);
    }
  };

  const addSetToExercise = (exerciseId) => {
    setActiveExerciseId(exerciseId);
    openSetsDialog();
  };

  // EditExercise dialog
  const [showEditSetsDialog, toggleEditSets] = useToggle(false);
  const editExercise = (exerciseId) => {
    setActiveExerciseId(exerciseId);
    toggleEditSets(true);
  };
  const closeEditSets = () => {
    toggleEditSets(false);
    setActiveExerciseId(null);
  };

  // Normalize exercises for lookup
  const exercisesById = React.useMemo(() => {
    if (!exercises) return {};

    return Object.fromEntries(
      exercises.map((exercise) => [exercise.id, exercise])
    );
  }, [exercises]);

  const setsByExercise = React.useMemo(() => {
    if (!sets) return {};

    return _.groupBy(sets, 'exerciseId');
  }, [sets]);

  const isLoading = isLoadingWorkout || isLoadingSets || isLoadingExercises;

  if (isLoading)
    return (
      <div className='flex grow flex-col space-y-2'>
        <LoadingIcon className='h-12 w-12 self-center' />
      </div>
    );

  const hasSets = Boolean(sets && sets.length > 0);

  return (
    <>
      <Head>
        <title>{name || 'Workout'}</title>
      </Head>
      <div className='flex grow flex-col space-y-4'>
        <H1 as='div' className='flex items-center space-x-2'>
          {isReadonly ? (
            <>
              <div className='flex-1'>{name}</div>
              <CheckCircleIcon className='h-6 w-6 text-green-500' />
            </>
          ) : (
            name
          )}
        </H1>
        {!hasSets && <Paragraph>To get started, add an exercise.</Paragraph>}
        {Object.entries(setsByExercise).map(([exerciseId, setsForExercise]) => {
          const exercise = exercisesById[exerciseId];
          return (
            <div
              key={exerciseId}
              className='border border-gray-200 bg-slate-200'
            >
              <div className='p-4 font-medium text-gray-900'>
                {exercise?.name || 'Unknown Exercise'}
              </div>
              <SetsTable sets={setsForExercise} />
              {!isReadonly && (
                <div className='flex'>
                  <Button
                    className='w-1/2 bg-slate-200 text-inherit'
                    onClick={() => editExercise(exerciseId)}
                  >
                    Edit
                  </Button>
                  <Button
                    className='w-1/2'
                    onClick={() => addSetToExercise(exerciseId)}
                  >
                    Add Set
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {!isReadonly && (
          <Button type='submit' onClick={openAddExerciseDialog}>
            Add Exercise
          </Button>
        )}
      </div>
      <AddExercise open={showAddExercise} onClose={closeAddExerciseDialog} />
      <AddSets
        open={showAddSets}
        onClose={closeSetsDialog}
        workoutId={workoutId}
        exercise={exercisesById[activeExerciseId]}
      />
      <EditSets
        exercise={exercisesById[activeExerciseId]}
        sets={setsByExercise[activeExerciseId]}
        open={showEditSetsDialog}
        onClose={closeEditSets}
      />
      <MoreActions
        open={showWorkoutActions}
        onClose={closeEditWorkoutDialog}
        workout={workout}
      />
    </>
  );
}

export const getServerSideProps = withUser();
