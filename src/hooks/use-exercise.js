import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '../lib/query-client';

export function useExercise(exerciseId, options = {}) {
  return useQuery(
    ['exercise', exerciseId],
    () => fetch(`/api/exercise/${exerciseId}`).then((res) => res.json()),
    { ...options, enabled: Boolean(exerciseId) && (options.enabled ?? true) },
  );
}

export function useUpdateExercise(options = {}) {
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
      ...options,
      onSuccess: async (exercise) => {
        queryClient.invalidateQueries(['exercise', exercise.id]);
        queryClient.invalidateQueries('exercises');

        if (options.onSuccess) {
          await options.onSuccess(exercise);
        }
      },
    },
  );
}

export function useDeleteExercise(options = {}) {
  return useMutation(
    ({ exercise, reassignTo }) => {
      const params = new URLSearchParams();
      if (reassignTo) params.append('reassignTo', reassignTo);

      return fetch(`/api/exercise/${exercise.id}?${params.toString()}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }).then((response) => (response.ok ? response.json() : response));
    },
    {
      ...options,
      onSuccess: async (exercise) => {
        queryClient.invalidateQueries(['exercise', exercise.id]);
        queryClient.invalidateQueries('exercises');

        if (options.onSuccess) {
          await options.onSuccess(exercise);
        }
      },
    },
  );
}

export function useCreateExercise(options = {}) {
  return useMutation(
    (exercise) =>
      fetch(`/api/exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (exercise) => {
        queryClient.invalidateQueries('exercises');

        if (options.onSuccess) {
          await options.onSuccess(exercise);
        }
      },
    },
  );
}
