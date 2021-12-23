import React from 'react';
import { Input } from '../forms';
import Nav from '../nav';

const SET_DELIM = ',';
const MULTI_SET_DELIM = 'x';
const WEIGHT_DELIM = '@';
const MULTI_WEIGHT_DELIM = '/';

export default function Workout() {
  const inputRef = React.useRef(null);

  const [formValues, setFormValues] = React.useState({
    fitCode: '',
  });

  const [workout, setWorkout] = React.useState(null);

  const handleFitCode = (raw) => {
    const input = raw.replace(" ", "").toLowerCase();

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
      
      const workout = [];

      let count = 0;
      while (count < numberOfSets) {
        workout.push({
          reps: numberOfReps,
          weight: (isMultiWeight ? weights[count] : weight) || null,
        });
        count++;
      }

      setWorkout(workout);

      return;
    }

    const setSplit = input.split(SET_DELIM);

    const workout = [];

    setSplit.forEach(setInput => {
      const [numberOfReps, weight] = setInput.split(WEIGHT_DELIM);

      workout.push({
        reps: numberOfReps,
        weight: weight || null,
      });
    });

    setWorkout(workout);
  };

  return (
  <div>
    <Nav />
    <div className="flex flex-col">
      <form
        onSubmit={event => {
          const form = event.currentTarget;
          setFormValues({ fitCode: form.fitCode.value });
          handleFitCode(form.fitCode.value);

          event.preventDefault();
        }}
      >
        <Input
          ref={inputRef}
          type="text"
          name="fitCode"
          defaultValue={formValues.fitCode}
          placeholder="5@185, 4@195, 2@205"
        />
      </form>
      <div className="flex-1">
        <div className="mt-4 -mb-3">
        <div className="not-prose bg-gray-50 rounded-xl dark:bg-gray-800/25">
          <div className="inset-0 bg-grid-gray-100">
            <div className="rounded-xl">
              <div className="shadow-sm my-8">
                {workout ? (
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Reps</th>
                        <th>Weight</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {workout.map(({ reps, weight }, i) => (
                        <tr key={i}>
                          <td>Set</td>
                          <td>{reps}</td>
                          <td>{weight}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                )
                : 'No Workout'}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  </div>
  )
}
