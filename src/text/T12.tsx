import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  numberOfLines?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const T12: React.FC<Props> = ({children, style = {}, numberOfLines = 0}) => {
  return (
    <p
      style={{
        fontSize: 12,
        lineHeight: 1.2,
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
    </p>
  );
};

export default T12;
