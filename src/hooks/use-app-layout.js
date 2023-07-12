import React from 'react';
import { useWindowSize } from 'react-use';

export default function useAppLayout() {
  const { height } = useWindowSize();

  React.useLayoutEffect(() => {
    if (height && height > 0) {
      const heightPx = `${height}px`;

      ['html', 'body', '#__next'].forEach((query) => {
        const el = document.querySelector(query);
        if (el) el.style.height = heightPx;
      });
    }
  }, [height]);
}
