import { useQuery } from '@tanstack/react-query';

export function useUnits(options = {}) {
  return useQuery(
    ['units'],
    () => fetch('/api/units').then((response) => response.json()),
    options,
  );
}
