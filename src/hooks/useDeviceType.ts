import { useState, useEffect } from 'react';

// NOTE: don't fix this error, will break the loader
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth <= 768;
  });

  useEffect(() => {
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
