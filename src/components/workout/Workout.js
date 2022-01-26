import React from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { H1 } from "../typography";
import Button from "../button";
import Card from "../card";
import Nav from "../nav";
import SetsView from "./SetsView";
import AddExercise from "./AddExercise";
import AddSet from "./AddSet";
import useWorkout from '../../hooks/use-workout';
import useSets from '../../hooks/use-sets';
import useExercises from '../../hooks/use-exercises';

export default function Workout() {
  const router = useRouter();
  const { workoutId } = router.query;

  const [activeExerciseId, setActiveExerciseId] = React.useState(null);
  const [exercisesById, setExercisesById] = React.useState({});

  const [showExerciseDialog, setShowExerciseDialog] = React.useState(false);
  const openExerciseDialog = () => setShowExerciseDialog(true);
  const closeExerciseDialog = (exerciseId) => {
    setShowExerciseDialog(false);
    setActiveExerciseId(exerciseId || null);
    if (exerciseId) {
      openSetsDialog();
    }
  };

  const [showSetsDialog, setShowSetsDialog] = React.useState(false);
  const openSetsDialog = () => setShowSetsDialog(true);
  const closeSetsDialog = () => {
    setShowSetsDialog(false);
    setActiveExerciseId(null);
  };

  const addSetToExercise = (exerciseId) => {
    setActiveExerciseId(exerciseId);
    openSetsDialog();
  };

  const { data: workout, isLoading: isLoadingWorkout } = useWorkout(workoutId);
  const { data: sets, isLoading: isLoadingSets } = useSets(workoutId);
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();

  React.useEffect(() => {
    if (exercises) {
      setExercisesById(exercises.reduce((acc, exercise) => { 
        acc[exercise.id] = exercise;
        return acc;
      }, {}));
    } else {
      setExercisesById({});
    }
  }, [exercises]);

  const isLoading = isLoadingWorkout || isLoadingSets || isLoadingExercises;

  let setsByExercise;
  if (sets && !isLoadingSets) {
    setsByExercise = _.groupBy(sets, "exerciseId");
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-col p-6">
        {isLoading && "Loading workout..."}
        {!isLoading && workout && <H1>{workout.name || workout.id}</H1>}
        {!isLoading &&
          !(sets && sets.length) &&
          "This workout is empty! To get started, add an exercise."}
        {!isLoading &&
          sets &&
          Object.entries(setsByExercise).map(
            ([exerciseId, setsForExercise]) => (
              <Card
                key={exerciseId}
                className="mb-4 px-6 py-4 border border-gray-200"
              >
                <div className="mb-4 text-sm font-medium text-gray-900">
                  {exercisesById[exerciseId] ? exercisesById[exerciseId].name : 'Unknown Exercise'}
                </div>
                <SetsView sets={setsForExercise} />
                <div className="mt-4 flex flex-row-reverse">
                  <Button
                    text="Add Set"
                    onClick={() => addSetToExercise(exerciseId)}
                  />
                </div>
              </Card>
            )
          )}
        <Button
          type="submit"
          text="Add Exercise"
          onClick={openExerciseDialog}
        />
      </div>
      <AddExercise isOpen={showExerciseDialog} close={closeExerciseDialog}/>
      <AddSet
        isOpen={showSetsDialog}
        close={closeSetsDialog}
        workoutId={workoutId}
        exerciseId={activeExerciseId}
      />
    </div>
  );
}
