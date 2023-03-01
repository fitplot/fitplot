import { useMutation, useQuery } from 'react-query';

import queryClient from '../lib/query-client';

export function useExercises(options = {}) {
  return useQuery(
    'exercises',
    () => fetch('/api/exercises').then((res) => res.json()),
    options
  );
}

export function useCreateExercise() {
  return useMutation(
    (exercise) =>
      fetch('/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercises');
      },
    }
  );
}
