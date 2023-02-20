import { useQuery } from 'react-query';

import { useUser } from '../components/auth/user';

export default function useWorkouts() {
  const { user } = useUser();
  return useQuery('workouts', () =>
    fetch(`/api/workouts?userId=${user.id}`).then((res) => res.json())
  );
}

export function useWorkoutsSummary() {
  const { user } = useUser();
  return useQuery(['workouts', 'summary'], () =>
    fetch(`/api/workouts/summary?userId=${user.id}`).then((res) => res.json())
  );
}
