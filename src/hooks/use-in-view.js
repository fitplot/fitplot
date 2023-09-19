import React from 'react';
import { useIntersection } from 'react-use';

export function useInView(ref, options = {}) {
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const [once, lock] = React.useState(false);

  const inView = intersection && intersection.intersectionRatio === 1;

  React.useEffect(() => {
    if (inView && options.once) lock(true);
  }, [inView, options.once]);

  return once || inView;
}
