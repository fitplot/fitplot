import { useMutation } from 'react-query';

export default function useSignUp(options) {
  return useMutation(
    ['sign-up'],
    ({ email, firstName }) =>
      fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      }).then((response) => (response.ok ? response.json() : response)),
    options,
  );
}
