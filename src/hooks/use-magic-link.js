import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useMagicLink(options = {}) {
  const router = useRouter();

  return useMutation(
    ['magic-link'],
    ({ dust }) =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/magic?dust=${dust}`, {
        method: 'POST',
      }),
    {
      ...options,
      onSuccess: async (magicLink) => {
        router.replace('/dashboard');

        if (options.onSuccess) {
          await options.onSuccess(magicLink);
        }
      },
    },
  );
}
