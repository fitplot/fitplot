import Button from "../button";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Input, Label } from "../forms";
import { H2 } from "../typography";
import { useCreateWorkout } from "../../hooks/use-workouts";
import { useUser } from "../auth/UserProvider";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

export default function AddWorkout({ isOpen, close }) {
  const { user } = useUser();
  const mutation = useCreateWorkout();

  const createWorkout = async workoutName => {
    await mutation.mutateAsync({ name: workoutName, userId: user.id });
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label="Add Workout">
      <DialogContent className="!w-screen md:!w-half-screen">
        <form
          className="flex flex-col space-y-4"
          onSubmit={event => {
            const form = event.currentTarget;
            const workoutName = form.workout.value;
            // TODO: form validation
            if (workoutName) createWorkout(workoutName);
            event.preventDefault();
          }}
          autoComplete="off"
        >
          <H2>Workout Name</H2>
          <div>
            <div className="flex flex-wrap items-baseline justify-between">
              <Label htmlFor="exercise-name">Name this workout</Label>
            </div>
            <Input
              autoFocus
              autoComplete="off"
              type="text"
              id="workout-name"
              name="workout"
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
      </DialogContent>
    </DialogOverlay>
  );
}
