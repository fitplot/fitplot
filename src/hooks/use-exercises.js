import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export function useExercises(options = {}) {
  return useQuery(
    ['exercises'],
    () => fetch('/api/exercises').then((res) => res.json()),
    options,
  );
}

export function useNormalizedExercises(options = {}) {
  return useQuery(
    ['exercises'],
    () => fetch('/api/exercises').then((res) => res.json()),
    {
      select: (data) =>
        _(data)
          .map((x) => [x.id, x])
          .fromPairs()
          .value(),
      ...options,
    },
  );
}
