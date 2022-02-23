import { useMutation, useQuery } from 'react-query';

import queryClient from '../lib/query-client';

export function useWorkout(workoutId) {
  return useQuery(
    ['workout', workoutId],
    () => fetch(`/api/workout/${workoutId}`).then((res) => res.json()),
    { enabled: !!workoutId }
  );
}

export function useUpdateWorkout() {
  return useMutation(
    (workout) =>
      fetch('/api/workout', {
        method: 'PUT',
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      onSuccess: (workout) => {
        queryClient.invalidateQueries(['workout', workout.id]);
      },
    }
  );
}
