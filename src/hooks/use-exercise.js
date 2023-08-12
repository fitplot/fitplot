import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '../lib/query-client';

export function useExercise(exerciseId) {
  return useQuery(
    ['exercise', exerciseId],
    () => fetch(`/api/exercise/${exerciseId}`).then((res) => res.json()),
    { enabled: Boolean(exerciseId) }
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

export function useDeleteExercise(options) {
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
      onSuccess: (exercise) => {
        queryClient.invalidateQueries(['exercise', exercise.id]);
        queryClient.invalidateQueries('exercises');
      },
      ...options,
    }
  );
}

export function useCreateExercise(options = {}) {
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
      ...options,
    }
  );
}
