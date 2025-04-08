import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CSSProperties} from 'react';

import {utils} from '../utils';
import {theme} from '../constants';

type Props = {
  onClick?: () => void;
  numberOfLines?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const T18: React.FC<Props> = ({
  onClick,
  children,
  style = {},
  numberOfLines = 0,
}) => {
  return (
    <p
      style={{
        fontSize: 18,
        lineHeight: 1.7,
        color: theme.colors.bodyTextColor,
        textAlign: 'left',
        ...theme.fonts.Lato_400Regular,
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
      onClick={onClick}
    >
      {children}
    </p>
  );
};
