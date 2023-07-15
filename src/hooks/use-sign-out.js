import { useMutation } from 'react-query';

export default function useSignOut(options) {
  return useMutation(
    ['sign-out'],
    () =>
      fetch('/api/sign-out', {
        method: 'POST',
      }).then((response) => {
        if (response.ok)
          return response.status === 204 ? response.text() : response.json();

        return response;
      }),
    options,
  );
}
