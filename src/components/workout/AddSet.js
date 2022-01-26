import React from "react";
import Dialog from "@reach/dialog";
import { Input, Label } from "../forms";
import SetsView from "./SetsView";
import Button from "../button";
import { H2 } from '../typography';
import { fitcode } from "../../lib/fitcode";
import { useCreateSet } from "../../hooks/use-sets";

export default function AddSet({ isOpen, close, workoutId, exerciseId }) {
  const inputRef = React.useRef(null);

  const [sets, updateSets] = React.useState(null);

  const mutation = useCreateSet();

  const handleInput = (rawInput) => {
    updateSets(fitcode(rawInput, { workoutId, exerciseId }));
  };

  const submit = async () => {
    await Promise.all(sets.reduce((all, set) => [...all, mutation.mutateAsync(set)], []));
    updateSets(null);
    close();
  };

  return (
    <Dialog isOpen={isOpen} onDismiss={close} aria-label="Add Sets">
      <div className="flex flex-col">
        <form
          className="flex-none"
          onSubmit={(event) => {
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
          <Input
            ref={inputRef}
            type="text"
            name="fitcode"
            placeholder="5@185, 4@195, 2@205"
          />
          </div>
        </form>
        <div className="flex-1 p-4">
          <SetsView sets={sets} />
        </div>
        <Button disabled={!(sets && sets.length)} text="Add" onClick={submit} />
      </div>
    </Dialog>
  );
}
