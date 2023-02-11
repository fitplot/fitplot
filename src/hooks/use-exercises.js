import { useMutation, useQuery } from 'react-query';

import { useUser } from '../components/auth/user';
import queryClient from '../lib/query-client';

export function useExercises() {
  const { user } = useUser();
  return useQuery('exercises', () =>
    fetch(`/api/exercises?userId=${user.id}`).then((res) => res.json())
  );
}

export function useCreateExercise() {
  return useMutation(
    (exercise) =>
      fetch('/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercises');
      },
    }
  );
}
