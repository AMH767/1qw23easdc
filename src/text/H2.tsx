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

const H2: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element => {
  return (
    <h2
      style={{
        fontSize: 26,
        lineHeight: 1.1,
        color: theme.colors.mainColor,
        textAlign: 'left',
        ...theme.fonts.LeagueSpartan_500Medium,
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
    </h2>
  );
};

export default H2;
