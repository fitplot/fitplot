import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useToggle } from 'react-use';

import { useExercises } from '../../../hooks/use-exercises';
import { useSets } from '../../../hooks/use-sets';
import { useWorkout } from '../../../hooks/use-workout';
import Button from '../../button';
import Card from '../../card';
import LoadingIcon from '../../loading-icon';
import { usePageContext } from '../../page';
import { H1, Paragraph } from '../../typography';
import SetsTable from '../components/sets-table';
import AddExercise from '../overlays/add-exercise';
import AddOrEditSets from '../overlays/add-or-edit-sets';
import EditExercise from '../overlays/edit-exercise';
import WorkoutMoreActions from '../overlays/workout-more-actions';

export default function WorkoutPage() {
  const router = useRouter();
  const { workoutId } = router.query;

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();

  const [activeExerciseId, setActiveExerciseId] = React.useState(null);

  const [showWorkoutActions, toggleWorkoutActions] = useToggle(false);
  const closeEditWorkoutDialog = () => toggleWorkoutActions(false);

  const onMoreAction = React.useCallback(
    () => toggleWorkoutActions(true),
    [toggleWorkoutActions]
  );

  usePageContext({ title: 'Workout', onMoreAction });

  // AddSet dialog
  const [showAddOrEditSets, toggleAddOrEditSets] = useToggle(false);
  const openSetsDialog = () => toggleAddOrEditSets(true);
  const closeSetsDialog = () => {
    toggleAddOrEditSets(false);
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
  const [showEditExerciseDialog, toggleEditExercise] = useToggle(false);
  const editExercise = (exerciseId) => {
    setActiveExerciseId(exerciseId);
    toggleEditExercise(true);
  };
  const closeEditExercise = () => {
    toggleEditExercise(false);
    setActiveExerciseId();
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
      <div className='flex flex-col grow space-y-2'>
        <LoadingIcon className='self-center w-12 h-12' />
      </div>
    );

  const hasSets = Boolean(sets && sets.length > 0);

  return (
    <>
      <Head>
        <title>{workout ? workout.name : 'Workouts'}</title>
      </Head>
      <div className='flex flex-col grow space-y-2'>
        {workout && <H1>{workout.name || workout.id}</H1>}
        {!hasSets && <Paragraph>To get started, add an exercise.</Paragraph>}
        {Object.entries(setsByExercise).map(([exerciseId, setsForExercise]) => {
          const exercise = exercisesById[exerciseId];
          return (
            <Card key={exerciseId} className='bg-white border border-gray-200'>
              <div className='p-4 text-sm font-medium text-gray-900'>
                {exercise?.name || 'Unknown Exercise'}
              </div>
              <SetsTable sets={setsForExercise} />
              <div className='flex'>
                <Button
                  className='w-1/2 text-inherit bg-slate-200'
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
            </Card>
          );
        })}
        <Button type='submit' onClick={openAddExerciseDialog}>
          Add Exercise
        </Button>
      </div>
      <AddExercise open={showAddExercise} onClose={closeAddExerciseDialog} />
      <AddOrEditSets
        open={showAddOrEditSets}
        onClose={closeSetsDialog}
        workoutId={workoutId}
        exercise={exercisesById[activeExerciseId]}
      />
      <EditExercise
        exercise={exercisesById[activeExerciseId]}
        sets={setsByExercise[activeExerciseId]}
        open={showEditExerciseDialog}
        onClose={closeEditExercise}
      />
      <WorkoutMoreActions
        open={showWorkoutActions}
        onClose={closeEditWorkoutDialog}
        workout={workout}
      />
    </>
  );
}
