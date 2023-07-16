import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useMagicLink() {
  const router = useRouter();

  return useMutation(
    ['magic-link'],
    ({ dust }) => fetch(`/api/magic?dust=${dust}`, { method: 'POST' }),
    {
      onSuccess: () => {
        router.replace('/dashboard');
      },
    }
  );
}
