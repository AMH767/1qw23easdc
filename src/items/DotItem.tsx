import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {theme} from '../constants';

type Props = {
  isSelected: boolean;
};

export const DotItem: React.FC<Props> = ({isSelected}) => {
  return (
    <div
      style={{
        background: isSelected ? theme.colors.mainColor : theme.colors.white,
        width: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isSelected
          ? theme.colors.mainColor
          : theme.colors.secondaryTextColor,
        height: 10,
        borderRadius: 5,
      }}
    />
  );
};
