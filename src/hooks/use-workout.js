import { useMutation, useQuery } from 'react-query';

import queryClient from '../lib/query-client';

export function useWorkout(workoutId) {
  return useQuery(
    ['workout', workoutId],
    () => fetch(`/api/workout/${workoutId}`).then((res) => res.json()),
    { enabled: !!workoutId }
  );
}

export function useCreateWorkout({ onSuccess }) {
  return useMutation(
    (workout) =>
      fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      onSuccess: async (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);
        await onSuccess(workout);
      },
    }
  );
}

export function useUpdateWorkout() {
  return useMutation(
    (workout) =>
      fetch(`/api/workout/${workout.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      onSuccess: (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);
      },
    }
  );
}

export function useDeleteWorkout() {
  return useMutation(
    (workout) =>
      fetch(`/api/workout/${workout.id}`, {
        method: 'DELETE',
      }).then((res) => res.json()),
    {
      onSuccess: (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);
      },
    }
  );
}
