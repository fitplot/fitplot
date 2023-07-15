import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function useUser(options = {}) {
  const router = useRouter();

  return useQuery(
    ['user'],
    () =>
      fetch('/api/me').then((response) => {
        if (response.ok) return response.data;
        throw response;
      }),
    {
      onError: (error) => {
        if (error.status === 401) router.push('/sign-in');
      },
      ...options,
    },
  );
}
