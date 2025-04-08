import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  title: string;
  titleStyle?: any;
  navIcon?: boolean;
  icon?: JSX.Element;
  onClick?: () => void;
  emailVerify?: boolean;
  goNavigation?: boolean;
  containerStyle?: React.CSSProperties;
};

export const ProfileItem: React.FC<Props> = ({
  titleStyle,
  title,
  icon,
  onClick,
  navIcon = true,
  containerStyle,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        height: 56,
        width: '100%',
        padding: '0 20px',
        cursor: 'pointer',
        userSelect: 'none',

        borderRadius: 10,
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid white',
        boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.1)',
        ...utils.rowCenter(),
        ...containerStyle,
      }}
    >
      {icon}
      <text.T16 style={{marginLeft: 14, ...titleStyle}}>{title}</text.T16>
      {onClick && navIcon && (
        <div style={{marginLeft: 'auto'}}>
          <svg.RightArrowSvg />
        </div>
      )}
    </div>
  );
};
