import React from "react";
import SetsPreview from './SetsPreview';
import { Input } from "../forms";
import Nav from "../nav";
import { fitcode } from "../../lib/fitcode";

export default function Workout() {
  const inputRef = React.useRef(null);

  const [sets, updateSets] = React.useState(null);

  const handleInput = (rawInput) => {
    updateSets(fitcode(rawInput));
  };

  return (
    <div>
      <Nav />
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
          <Input
            ref={inputRef}
            type="text"
            name="fitcode"
            placeholder="5@185, 4@195, 2@205"
          />
        </form>
        <div className="flex-1 p-4">
          <SetsPreview sets={sets} />
        </div>
      </div>
    </div>
  );
}
