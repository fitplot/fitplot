import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Input, Label } from "../forms";
import { H2 } from "../typography";
import Button from "../button";
import { useExercises, useCreateExercise } from "../../hooks/use-exercises";
import { useUser } from "../auth/UserProvider";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

export default function AddExercise({ isOpen, close }) {
  const { data: exercises, isLoading: isLoadingExercises } = useExercises();
  const { user } = useUser();
  const mutation = useCreateExercise();

  const handleAddExercise = async (rawInput) => {
    const name = rawInput.trim();
    let exercise = exercises.find((exercise) => exercise.name === name);
    if (!exercise) {
      exercise = await mutation.mutateAsync({ userId: user.id, name });
    }
    close(exercise.id);
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label="Add Exercise">
      <DialogContent className="!w-screen md:!w-half-screen">
        {isLoadingExercises && "Loading exercises..."}
        {!isLoadingExercises && (
          <form
            className="flex flex-col space-y-4"
            onSubmit={(event) => {
              const form = event.currentTarget;
              // TODO: form validation
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
              <Button className="flex-1" onClick={() => close()}>
                <XIcon className="w-6 h-6 inline-block" />
              </Button>
              <Button className="flex-1" type="submit">
                <CheckIcon className="w-6 h-6 inline-block" />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </DialogOverlay>
  );
}
