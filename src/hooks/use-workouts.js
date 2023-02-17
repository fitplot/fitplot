import { useQuery } from 'react-query';

import { useUser } from '../components/auth/user';

export default function useWorkouts() {
  const { user } = useUser();
  return useQuery('workouts', () =>
    fetch(`/api/workouts?userId=${user.id}`).then((res) => res.json())
  );
}
