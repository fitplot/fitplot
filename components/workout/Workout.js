import React from "react";
import { Input } from "../forms";
import Nav from "../nav";

const SET_DELIM = ",";
const MULTI_SET_DELIM = "x";
const WEIGHT_DELIM = "@";
const MULTI_WEIGHT_DELIM = "/";

export default function Workout() {
  const inputRef = React.useRef(null);

  const [sets, updateSets] = React.useState(null);

  const handleFitCode = (raw) => {
    const input = raw.replace(" ", "").toLowerCase();

    if (!input) return updateSets(null);

    const result = [];

    const isMultiSet = input.includes(MULTI_SET_DELIM);

    if (isMultiSet) {
      const setSplit = input.split(MULTI_SET_DELIM);
      const numberOfSets = setSplit[0];
      const remainder = setSplit[1];
      const [numberOfReps, weight] = remainder.split(WEIGHT_DELIM);

      const isMultiWeight = weight?.includes(MULTI_WEIGHT_DELIM);

      let weights = [];
      if (isMultiWeight) {
        weights = weight.split(MULTI_WEIGHT_DELIM);
      }

      let count = 0;
      while (count < numberOfSets) {
        result.push({
          reps: numberOfReps,
          weight: (isMultiWeight ? weights[count] : weight) || null,
        });
        count++;
      }
    } else {
      const setSplit = input.split(SET_DELIM);

      setSplit.forEach((setInput) => {
        const [numberOfReps, weight] = setInput.split(WEIGHT_DELIM);

        result.push({
          reps: numberOfReps,
          weight: weight || null,
        });
      });
    }

    updateSets(result);
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col">
        <form
          className="flex-none"
          onSubmit={(event) => {
            const form = event.currentTarget;
            handleFitCode(form.fitcode.value);
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
        <div className="flex-1">
          <div className="mt-4">
            {sets ? (
              <div className="not-prose relative bg-gray-50 rounded-xl dark:bg-gray-800/25">
                <div
                  className="inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-gray-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                  style={{ backgroundPosition: "10px 10px" }}
                >
                  <div className="rounded-xl overflow-auto">
                    <div className="shadow-sm my-8">
                      <table className="border-collapse table-auto w-full text-sm">
                        <thead>
                          <tr>
                            <th className="border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">
                              #
                            </th>
                            <th className="border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">
                              Reps
                            </th>
                            <th className="border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left">
                              Weight
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                          {sets.map(({ reps, weight }, i) => (
                            <tr key={i}>
                              <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                                {i + 1}
                              </td>
                              <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                                {reps}
                              </td>
                              <td className="border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 dark:text-gray-400">
                                {weight}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "No Sets"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
