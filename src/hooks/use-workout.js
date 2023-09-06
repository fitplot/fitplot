import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '../lib/query-client';

export function useWorkout(workoutId, options = {}) {
  return useQuery(
    ['workout', workoutId],
    () => fetch(`/api/workout/${workoutId}`).then((res) => res.json()),
    { ...options, enabled: Boolean(workoutId) && (options.enabled ?? true) },
  );
}

export function useCreateWorkout(options = {}) {
  return useMutation(
    (workout) =>
      fetch(`/api/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);

        if (options.onSuccess) {
          await options.onSuccess(workout);
        }
      },
    },
  );
}

export function useUpdateWorkout(options = {}) {
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
      ...options,
      onSuccess: async (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);

        if (options.onSuccess) {
          await options.onSuccess(workout);
        }
      },
    },
  );
}

export function useDeleteWorkout(options = {}) {
  return useMutation(
    (workout) =>
      fetch(`/api/workout/${workout.id}`, {
        method: 'DELETE',
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (workout) => {
        queryClient.invalidateQueries('workouts');
        queryClient.invalidateQueries(['workout', workout.id]);

        if (options.onSuccess) {
          await options.onSuccess(workout);
        }
      },
    },
  );
}
