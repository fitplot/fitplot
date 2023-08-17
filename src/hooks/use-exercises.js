import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export function useSearchExercises(query = '', options = {}) {
  return useQuery(
    ['exercises', query],
    () => {
      const search = new URLSearchParams();
      if (query) search.set('query', query);
      return fetch(`/api/exercises?${search.toString()}`).then((res) =>
        res.json(),
      );
    },
    {
      ...options,
      select: (response) => response.exercises,
    },
  );
}

export function useExercises(options = {}) {
  return useInfiniteQuery(
    ['exercises'],
    ({ pageParam: cursor }) => {
      const search = new URLSearchParams();
      if (cursor) search.set('cursor', cursor);
      return fetch(`/api/exercises?${search.toString()}`).then((res) =>
        res.json(),
      );
    },
    {
      ...options,
      getNextPageParam: (lastPage) => lastPage.cursor,
      select: (data) => _.flatMap(data.pages, 'exercises'),
    },
  );
}
