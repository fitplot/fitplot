import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

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
import AddSet from '../overlays/add-set';
import EditExercise from '../overlays/edit-exercise';
import EditWorkout from '../overlays/edit-workout';

export default function Workout() {
  const router = useRouter();
  const { workoutId } = router.query;

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();

  const [activeExerciseId, setActiveExerciseId] = React.useState(null);
  const [exercisesById, setExercisesById] = React.useState({});

  // EditWorkout dialog
  const [showEditWorkoutDialog, setShowEditWorkoutDialog] = React.useState(false);
  const openEditWorkoutDialog = React.useCallback(
    () => setShowEditWorkoutDialog(true),
    [setShowEditWorkoutDialog]
  );
  const closeEditWorkoutDialog = () => setShowEditWorkoutDialog(false);

  usePageContext({ title: 'Workout', onMoreAction: openEditWorkoutDialog });

  // AddSet dialog
  const [showSetsDialog, setShowSetsDialog] = React.useState(false);
  const openSetsDialog = () => setShowSetsDialog(true);
  const closeSetsDialog = () => {
    setShowSetsDialog(false);
    setActiveExerciseId();
  };

  // AddExercise dialog
  const [showAddExerciseDialog, setShowAddExerciseDialog] = React.useState(false);
  const openAddExerciseDialog = () => setShowAddExerciseDialog(true);
  const closeAddExerciseDialog = (exerciseId) => {
    setShowAddExerciseDialog(false);

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
  const [showEditExerciseDialog, setShowEditExerciseDialog] = React.useState(false);
  const editExercise = (exerciseId) => {
    setActiveExerciseId(exerciseId);
    setShowEditExerciseDialog(true);
  };
  const closeEditExercise = () => {
    setShowEditExerciseDialog(false);
    setActiveExerciseId();
  };

  // Normalize exercises for lookup
  React.useEffect(() => {
    if (exercises) {
      setExercisesById(Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise])));
    } else {
      setExercisesById({});
    }
  }, [exercises]);

  const isLoading = isLoadingWorkout || isLoadingSets || isLoadingExercises;

  const setsByExercise = sets && !isLoadingSets ? _.groupBy(sets, 'exerciseId') : {};

  return (
    <>
      <div className='flex flex-col grow space-y-2'>
        {isLoading && <LoadingIcon className='w-5 h-5' />}
        {!isLoading && workout && <H1>{workout.name || workout.id}</H1>}
        {!isLoading && !(sets && sets.length > 0) && (
          <Paragraph>To get started, add an exercise.</Paragraph>
        )}
        {!isLoading &&
          sets &&
          Object.entries(setsByExercise).map(([exerciseId, setsForExercise]) => {
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
                  <Button className='w-1/2' onClick={() => addSetToExercise(exerciseId)}>
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
      {!isLoading && (
        <>
          <AddExercise open={showAddExerciseDialog} onClose={closeAddExerciseDialog} />
          <AddSet
            open={showSetsDialog}
            onClose={closeSetsDialog}
            workoutId={workoutId}
            exerciseId={activeExerciseId}
          />
          <EditExercise
            exercise={exercisesById[activeExerciseId]}
            sets={setsByExercise[activeExerciseId]}
            open={showEditExerciseDialog}
            onClose={closeEditExercise}
          />
          <EditWorkout
            open={showEditWorkoutDialog}
            onClose={closeEditWorkoutDialog}
            workout={workout}
          />
        </>
      )}
    </>
  );
}
