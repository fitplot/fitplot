import { useMutation, useQuery } from 'react-query';

import queryClient from '../lib/query-client';

export function useGetExercise(exerciseId) {
  return useQuery(
    ['exercise', exerciseId],
    () => fetch(`/api/exercise/${exerciseId}`).then((res) => res.json()),
    { enabled: !!exerciseId }
  );
}

export function useUpdateExercise() {
  return useMutation(
    (exercise) =>
      fetch(`/api/exercise/${exercise.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }).then((res) => res.json()),
    {
      onSuccess: (exercise) => {
        queryClient.invalidateQueries(['exercise', exercise.id]);
        queryClient.invalidateQueries('exercises');
      },
    }
  );
}
