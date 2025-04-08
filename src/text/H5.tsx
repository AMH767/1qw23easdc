import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  to?: string;
  hover?: boolean;
  style?: CSSProperties;
  numberOfLines?: number;
  children: React.ReactNode;
};

const H5: React.FC<Props> = ({
  style,
  children,
  numberOfLines = 0,
}): JSX.Element | null => {
  return (
    <h5
      style={{
        fontSize: 16,
        lineHeight: 1.5,
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

export default H5;
