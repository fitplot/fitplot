import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export default function useMagicLink() {
  const router = useRouter();

  return useMutation(
    ['magic-link'],
    ({ dust }) => fetch(`/api/magic?dust=${dust}`, { method: 'POST' }),
    {
      onSuccess: () => {
        router.replace('/');
      },
    }
  );
}
