import { useQuery } from 'react-query';

export default function useWorkout(workoutId) {
  return useQuery(
    ['workout', workoutId],
    () => fetch(`/api/workout/${workoutId}`).then((res) => res.json()),
    { enabled: !!workoutId }
  );
}
