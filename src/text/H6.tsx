import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CSSProperties} from 'react';

import {theme} from '../constants';

type Props = {
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

export const H6: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element | null => {
  return (
    <h5
      style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: theme.colors.mainColor,
        textAlign: 'left',
        ...theme.fonts.Lato_700Bold,
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
    </h5>
  );
};
