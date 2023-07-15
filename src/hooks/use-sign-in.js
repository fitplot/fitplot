import { useMutation } from 'react-query';

export default function useSignIn(options) {
  return useMutation(
    ['sign-in'],
    ({ email }) =>
      fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }),
    options,
  );
}
