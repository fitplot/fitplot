import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';

export default function useWorkouts(options = {}) {
  const query = useInfiniteQuery(
    ['workouts'],
    ({ pageParam: cursor }) => {
      const search = new URLSearchParams();
      if (cursor) search.set('cursor', cursor);
      return fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/workouts?${search.toString()}`,
      ).then((res) => res.json());
    },
    {
      ...options,
      getNextPageParam: (lastPage) => lastPage.cursor,
      select: (data) => _.flatMap(data.pages, 'workouts'),
    },
  );

  return query;
}
