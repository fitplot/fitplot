import { useMutation } from '@tanstack/react-query';

export default function useSignIn(options = {}) {
  return useMutation(
    ['sign-in'],
    ({ email }) =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }),
    options,
  );
}
