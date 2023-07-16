import { useMutation } from '@tanstack/react-query';

export default function useAddToWaitlist(options = {}) {
  return useMutation(
    (item) =>
      fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }).then((res) => res.json()),
    options
  );
}
