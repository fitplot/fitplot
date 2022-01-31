import React from "react";
import Dialog from "@reach/dialog";
import { Input, Label } from "../forms";
import { ChevronRightIcon } from "@heroicons/react/solid";
import SetsView from "./SetsView";
import Button from "../button";
import { H2 } from "../typography";
import { fitcode } from "../../lib/fitcode";
import { useCreateSet } from "../../hooks/use-sets";
import { useUser } from "../auth";

export default function AddSet({ isOpen, close, workoutId, exerciseId }) {
  const inputRef = React.useRef(null);

  const [sets, updateSets] = React.useState(null);

  const mutation = useCreateSet();
  const user = useUser();

  const handleInput = rawInput => {
    updateSets(fitcode(rawInput, { workoutId, exerciseId }));
  };

  const submit = async () => {
    await Promise.all(
      sets.reduce(
        (all, set) => [
          ...all,
          mutation.mutateAsync({ ...set, userId: user.user.id })
        ],
        []
      )
    );
    updateSets(null);
    close();
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={close} aria-label="Add Sets">
      <div className="flex flex-col">
        <form
          className="flex-none"
          onSubmit={event => {
            const form = event.currentTarget;
            handleInput(form.fitcode.value);
            event.preventDefault();
          }}
          autoComplete="off"
        >
          <H2>Add Sets</H2>
          <div className="my-6">
            <div className="flex flex-wrap items-baseline justify-between mb-4">
              <Label htmlFor="exercise-name">Type your FitCode™</Label>
            </div>
            <div className="flex">
              <Input
                ref={inputRef}
                type="text"
                name="fitcode"
                placeholder="5@185, 4@195"
              />
              <Button className="p-1">
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </form>
        <div className="flex-1 p-4">
          <SetsView sets={sets} />
        </div>
        <Button disabled={!(sets && sets.length)} onClick={submit}>
          Add
        </Button>
      </div>
    </Dialog>
  );
}
