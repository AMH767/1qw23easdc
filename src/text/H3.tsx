import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CSSProperties} from 'react';

import {theme} from '../constants';

type Props = {
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

const H3: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element | null => {
  return (
    <h3
      style={{
        fontSize: 20,
        lineHeight: 1.7,
        color: theme.colors.mainColor,
        textAlign: 'left',
        ...theme.fonts.LeagueSpartan_400Regular,
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
    </h3>
  );
};

export default H3;
