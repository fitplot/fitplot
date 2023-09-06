import { useMutation } from '@tanstack/react-query';

export default function useSignOut(options = {}) {
  return useMutation(
    ['sign-out'],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/sign-out`, {
        method: 'POST',
      }).then((response) => {
        if (response.ok)
          return response.status === 204 ? response.text() : response.json();

        return response;
      }),
    options,
  );
}
