import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '../lib/query-client';

export function useSets(workoutId, options = {}) {
  return useQuery(
    ['set', workoutId],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/workout/${workoutId}/sets`,
      ).then((res) => res.json()),
    { ...options, enabled: Boolean(workoutId) && (options.enabled ?? true) },
  );
}

export function usePreviousSetsForExercise(
  exerciseId,
  workoutId,
  options = {},
) {
  return useQuery(
    ['set', 'previous', exerciseId, workoutId],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/exercise/${exerciseId}/sets/previous?workoutId=${workoutId}`,
      ).then((res) => res.json()),
    {
      ...options,
      enabled:
        Boolean(exerciseId) && Boolean(workoutId) && (options.enabled ?? true),
    },
  );
}

export function useCreateSets(options = {}) {
  return useMutation(
    (sets) =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sets),
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (sets) => {
        queryClient.invalidateQueries(['set']);

        if (options.onSuccess) {
          await options.onSuccess(sets);
        }
      },
    },
  );
}

export function useUpdateSet(options = {}) {
  return useMutation(
    (set) =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/workout/set/${set.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(set),
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (set) => {
        queryClient.invalidateQueries(['set', set.workoutId]);

        if (options.onSuccess) {
          await options.onSuccess(set);
        }
      },
    },
  );
}

export function useDeleteSet(options = {}) {
  return useMutation(
    (set) =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/workout/set/${set.id}`, {
        method: 'DELETE',
      }).then((res) => res.json()),
    {
      ...options,
      onSuccess: async (set) => {
        queryClient.invalidateQueries(['set']);

        if (options.onSuccess) {
          await options.onSuccess(set);
        }
      },
    },
  );
}
