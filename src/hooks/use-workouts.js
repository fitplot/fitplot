import { useQuery } from 'react-query';

export default function useWorkouts() {
  return useQuery('workouts', () =>
    fetch('/api/workouts').then((res) => res.json())
  );
}

export function useWorkoutsSummary() {
  return useQuery(['workouts', 'summary'], () =>
    fetch(`/api/workouts/summary`).then((res) => res.json())
  );
}
