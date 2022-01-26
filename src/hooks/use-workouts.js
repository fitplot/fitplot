import { useQuery } from 'react-query';

export function useWorkouts() {
  return useQuery("workouts", () =>
    fetch("/api/workouts").then((res) => res.json())
  );
}
