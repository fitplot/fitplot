import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Input, Label } from "../forms";
import { ChevronRightIcon } from "@heroicons/react/solid";
import SetsView from "./SetsView";
import Button from "../button";
import { H2 } from "../typography";
import { fitcode } from "../../lib/fitcode";
import { useCreateSet } from "../../hooks/use-sets";
import { useUser } from "../auth";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

export default function AddSet({ isOpen, close, workoutId, exerciseId }) {
  const [sets, updateSets] = React.useState(null);

  const mutation = useCreateSet();
  const user = useUser();

  const handleInput = (rawInput) => {
    updateSets(fitcode(rawInput, { workoutId, exerciseId }));
  };

  const commit = async () => {
    await Promise.all(
      sets.reduce(
        (all, set) => [
          ...all,
          mutation.mutateAsync({ ...set, userId: user.user.id }),
        ],
        []
      )
    );
    updateSets(null);
    close();
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label="Add Sets">
      <DialogContent className="!w-screen md:!w-half-screen">
        <div className="flex flex-col space-y-4">
          <form
            className="flex-none flex flex-col space-y-4"
            onSubmit={(event) => {
              const form = event.currentTarget;
              handleInput(form.fitcode.value);
              event.preventDefault();
            }}
            autoComplete="off"
          >
            <H2>Add Sets</H2>
            <div>
              <div className="flex flex-wrap items-baseline justify-between mb-4">
                <Label htmlFor="exercise-name">Type your FitCode™</Label>
              </div>
              <Input
                autoFocus
                autoComplete="off"
                type="text"
                name="fitcode"
                placeholder="5@185, 4@195, 2@205"
              />
            </div>
            <div className="flex">
              <Input
                autoFocus
              autoComplete="off"
                type="text"
                name="fitcode"
                placeholder="5@185, 4@195"
              />
              <Button className="p-1">
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </div>
          </form>
          <div className="flex-1">
            <SetsView sets={sets} />
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1" onClick={() => close()}>
              <XIcon className="w-6 h-6 inline-block" />
            </Button>
            <Button disabled={!(sets && sets.length)} onClick={commit}>
              <CheckIcon className="w-6 h-6 inline-block" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
}
