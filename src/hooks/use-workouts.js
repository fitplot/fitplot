import { useInfiniteQuery } from '@tanstack/react-query';

export default function useWorkouts() {
  const { data: paginated, ...result } = useInfiniteQuery(
    ['workouts'],
    ({ pageParam: cursor }) => {
      const search = new URLSearchParams();
      if (cursor) search.set('cursor', cursor);
      return fetch(`/api/workouts?${search.toString()}`).then((res) =>
        res.json(),
      );
    },
    { getNextPageParam: (lastPage) => lastPage.cursor },
  );

  const data =
    paginated &&
    paginated.pages &&
    // eslint-disable-next-line unicorn/no-array-reduce
    paginated.pages.reduce((acc, page) => [...acc, ...page.workouts], []);

  return {
    data,
    ...result,
  };
}
