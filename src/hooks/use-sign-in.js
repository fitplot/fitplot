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
      }).then((response) => {
        if (response.ok)
          return response.status === 204 ? response.text() : response.json();

        return response;
      }),
    options
  );
}
