import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { useExercises } from '../../hooks/use-exercises';
import { useSets } from '../../hooks/use-sets';
import useWorkout from '../../hooks/use-workout';
import Button from '../button';
import Card from '../card';
import Layout from '../layout';
import { H1, Paragraph } from '../typography';
import AddExercise from './AddExercise';
import AddSet from './AddSet';
import EditExercise from './EditExercise';
import SetsView from './SetsView';

export default function Workout() {
  const router = useRouter();
  const { workoutId } = router.query;

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();

  const [activeExerciseId, setActiveExerciseId] = React.useState();
  const [exercisesById, setExercisesById] = React.useState({});

  // AddSet dialog
  const [showSetsDialog, setShowSetsDialog] = React.useState(false);
  const openSetsDialog = () => setShowSetsDialog(true);
  const closeSetsDialog = () => {
    setShowSetsDialog(false);
    setActiveExerciseId();
  };

  // AddExercise dialog
  const [showExerciseDialog, setShowExerciseDialog] = React.useState(false);
  const openExerciseDialog = () => setShowExerciseDialog(true);
  const closeExerciseDialog = (exerciseId) => {
    setShowExerciseDialog(false);
    setActiveExerciseId(exerciseId);
    if (exerciseId) {
      openSetsDialog();
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

  let setsByExercise;
  if (sets && !isLoadingSets) {
    setsByExercise = _.groupBy(sets, 'exerciseId');
  }

  return (
    <Layout>
      <div className='flex flex-col flex-1 space-y-2'>
        {isLoading && 'Loading workout...'}
        {!isLoading && workout && <H1>{workout.name || workout.id}</H1>}
        {!isLoading && !(sets && sets.length > 0) && (
          <Paragraph>To get started, add an exercise.</Paragraph>
        )}
        {!isLoading &&
          sets &&
          Object.entries(setsByExercise).map(([exerciseId, setsForExercise]) => {
            const exercise = exercisesById[exerciseId];

            return (
              <Card key={exerciseId} className='border border-gray-200'>
                <div className='p-4 text-sm font-medium text-gray-900'>
                  {exercise?.name || 'Unknown Exercise'}
                </div>
                <SetsView sets={setsForExercise} />
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
        <Button type='submit' onClick={openExerciseDialog}>
          Add Exercise
        </Button>
      </div>
      {!isLoading && (
        <>
          <AddExercise isOpen={showExerciseDialog} close={closeExerciseDialog} />
          <AddSet
            isOpen={showSetsDialog}
            close={closeSetsDialog}
            workoutId={workoutId}
            exerciseId={activeExerciseId}
          />
          <EditExercise
            exercise={exercisesById[activeExerciseId]}
            sets={setsByExercise[activeExerciseId]}
            isOpen={showEditExerciseDialog}
            close={closeEditExercise}
          />
        </>
      )}
    </Layout>
  );
}
