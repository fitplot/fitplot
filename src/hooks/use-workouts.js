import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

import { useUser } from '../components/auth/UserProvider';
import queryClient from '../lib/query-client';

export function useWorkouts() {
  const { user } = useUser();
  return useQuery('workouts', () => fetch(`/api/workouts/${user.id}`).then((res) => res.json()));
}

export function useCreateWorkout() {
  const router = useRouter();
  return useMutation(
    (workout) =>
      fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('workouts');
        router.push(`/workout/${res.id}`);
      },
    }
  );
}

export function useDeleteWorkout() {
  return useMutation(
    (workout) =>
      fetch('/api/workouts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('workouts');
      },
    }
  );
}
