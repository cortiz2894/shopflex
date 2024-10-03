import { useState, useEffect } from 'react';
import { isWindowDefined } from '@/utils/window';

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (!isWindowDefined()) {
      return;
    }
    return window.innerWidth <= 768;
  });

  useEffect(() => {
    if (!isWindowDefined()) {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return isMobile;
};

export default useDeviceType;
