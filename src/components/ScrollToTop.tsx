import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  return null;
};
