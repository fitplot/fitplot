import Button from "../button";
import { Dialog } from "@reach/dialog";
import { Input, Label } from "../forms";
import { H2 } from "../typography";
import { useCreateWorkout } from "../../hooks/use-workouts";
import { useUser } from "../auth/UserProvider";

export default function AddWorkout({ isOpen, close }) {
  const { user } = useUser();
  const mutation = useCreateWorkout();

  const newWorkout = async (workoutName) => {
    await mutation.mutateAsync({ name: workoutName, userId: user.id });
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={close} aria-label="Add Exercise">
      <form
        className="flex flex-col space-y-4"
        onSubmit={event => {
          const form = event.currentTarget;
          newWorkout(form.workout.value);
          event.preventDefault();
        }}
        autoComplete="off"
      >
        <H2>Name your workout!</H2>
        <div>
          <div className="flex flex-wrap items-baseline justify-between">
            <Label htmlFor="exercise-name">Workout name</Label>
          </div>
          <Input
            autoFocus
            type="text"
            id="workout-name"
            name="workout"
            required
          />
        </div>
        <div className="flex space-x-4">
          <Button className="flex-1" onClick={() => close()}>
            Cancel
          </Button>
          <Button className="flex-1" type="submit">
            Go Workout!
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
