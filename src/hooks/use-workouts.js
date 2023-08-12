import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useWorkouts() {
  const query = useInfiniteQuery(
    ['workouts'],
    ({ pageParam: cursor }) => {
      const search = new URLSearchParams();
      if (cursor) search.set('cursor', cursor);
      return fetch(`/api/workouts?${search.toString()}`).then((res) =>
        res.json()
      );
    },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
      select: (data) => _.flatMap(data.pages, 'workouts'),
    }
  );

  return query;
}
