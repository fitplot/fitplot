import { Dialog } from "@reach/dialog";
import { Input, Label } from "../forms";
import { H2 } from "../typography";
import Button from "../button";
import { useExercises, useCreateExercise } from '../../hooks/use-exercises';

export default function AddExercise({ isOpen, close }) {
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();
  const mutation = useCreateExercise();

  const handleAddExercise = async (rawInput) => {
    const name = rawInput.trim();
    let exercise = exercises.find((exercise) => exercise.name === name);
    if (!exercise) {
      exercise = await mutation.mutateAsync({ userId: "", name });
    }
    close(exercise.id);
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={close} aria-label="Add Exercise">
      {isLoadingExercises && "Loading exercises..."}
      {!isLoadingExercises && (
        <form
          className="flex flex-col space-y-4"
          onSubmit={(event) => {
            const form = event.currentTarget;
            handleAddExercise(form.exercise.value);
            event.preventDefault();
          }}
          autoComplete="off"
        >
          <H2>Add Exercise</H2>
          <div>
            <div className="flex flex-wrap items-baseline justify-between">
              <Label htmlFor="exercise-name">Exercise name</Label>
            </div>
            <Input
              autoFocus
              type="text"
              id="exercise-name"
              name="exercise"
              required
            />
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1" text="Cancel" onClick={() => close()} />
            <Button className="flex-1" text="Add" type="submit" />
          </div>
        </form>
      )}
    </Dialog>
  );
}
