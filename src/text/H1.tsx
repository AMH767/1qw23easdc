import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

const H1: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element => {
  return (
    <h1
      style={{
        fontSize: 40,
        lineHeight: 1.2,
        color: theme.colors.mainColor,
        textAlign: 'left',
        ...theme.fonts.LeagueSpartan_700Bold,
        ...(numberOfLines
          ? {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: numberOfLines,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

export default H1;
