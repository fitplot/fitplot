import React from 'react';
import { useWindowSize } from 'react-use';

export default function useInAppLayout() {
  const { height } = useWindowSize();

  React.useEffect(() => {
    if (height && height > 0) {
      const heightPx = `${height}px`;

      for (const query of ['html', 'body', '#__next']) {
        const el = document.querySelector(query);
        if (el) el.style.height = heightPx;
      }
    }
  }, [height]);
}
