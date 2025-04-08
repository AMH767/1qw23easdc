import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

type Props = {
  version: 1 | 2;
};

export const Background: React.FC<Props> = ({version}): JSX.Element | null => {
  if (version === 1) {
    return (
      <img
        src={require('../assets/other/01.png')}
        alt='Sign In'
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: '50%',
          zIndex: -1,
          objectFit: 'fill',
          maxWidth: 650,
          transform: 'translateX(-50%)',
        }}
      />
    );
  }

  if (version === 2) {
    return (
      <img
        src={require('../assets/other/03.png')}
        alt='Sign In'
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: '50%',
          zIndex: -1,
          objectFit: 'fill',
          maxWidth: 650,
          transform: 'translateX(-50%)',
        }}
      />
    );
  }

  return null;
};
