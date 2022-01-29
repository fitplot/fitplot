import { useQuery } from "react-query";

export function useWorkout(workoutId) {
  return useQuery(
    ["workout", workoutId],
    () => fetch(`/api/workout/${workoutId}`).then(res => res.json()),
    { enabled: !!workoutId }
  );
}
