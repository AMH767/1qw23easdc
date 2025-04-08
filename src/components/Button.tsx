import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {utils} from '../utils';
import {theme} from '../constants';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  colorScheme?: 'dark' | 'transparent';
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  style,
  onClick,
  colorScheme = 'dark',
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        color:
          colorScheme === 'dark' ? theme.colors.white : theme.colors.mainColor,
        height: 60,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 10,
        userSelect: 'none',
        cursor: 'pointer',
        textTransform: colorScheme === 'dark' ? 'capitalize' : 'none',
        background:
          colorScheme === 'dark'
            ? theme.colors.mainColor
            : theme.colors.transparent,
        ...utils.flexCenter(),
        fontFamily:
          colorScheme === 'dark' ? 'Lato-Bold' : 'LeagueSpartan-Regular',
        ...style,
      }}
    >
      {title}
    </div>
  );
};
