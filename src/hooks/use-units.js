import { useQuery } from '@tanstack/react-query';

export function useUnits(options = {}) {
  return useQuery(
    ['units'],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/units`).then((response) =>
        response.json(),
      ),
    options,
  );
}
