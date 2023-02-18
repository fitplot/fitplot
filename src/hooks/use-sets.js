import { useMutation, useQuery } from 'react-query';

import queryClient from '../lib/query-client';

export function useSets(workoutId) {
  return useQuery(
    ['set', workoutId],
    () => fetch(`/api/workout/${workoutId}/sets`).then((res) => res.json()),
    { enabled: !!workoutId }
  );
}

export function useCreateSets() {
  return useMutation(
    (sets) =>
      fetch(`/api/workout/sets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sets),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['set']);
      },
    }
  );
}

export function useUpdateSet() {
  return useMutation(
    (set) =>
      fetch(`/api/workout/set/${set.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(set),
      }).then((res) => res.json()),
    {
      onSuccess: (set) => {
        queryClient.invalidateQueries(['set', set.workoutId]);
      },
    }
  );
}

export function useDeleteSet() {
  return useMutation(
    (set) =>
      fetch(`/api/workout/set/${set.id}`, {
        method: 'DELETE',
      }).then((res) => res.json()),
    {
      onSuccess: (set) => {
        queryClient.invalidateQueries(['set', set.id]);
        queryClient.invalidateQueries(['set']);
      },
    }
  );
}
