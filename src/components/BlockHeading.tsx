import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  title: string;
  viewAllVisible?: boolean;
  rightIcon?: React.ReactNode;
  viewAllOnClick?: () => void;
  rightIconOnClick?: () => void;
  containerStyle?: React.CSSProperties;
};

export const BlockHeading: React.FC<Props> = ({
  title,
  rightIcon,
  viewAllOnClick,
  containerStyle,
  rightIconOnClick,
  viewAllVisible = true,
}) => {
  return (
    <div style={{...utils.rowCenterSpcBtw(), ...containerStyle}}>
      <text.H3 style={{textTransform: 'capitalize'}}>{title}</text.H3>
      {viewAllOnClick && (
        <div
          onClick={viewAllOnClick}
          style={{cursor: 'pointer'}}
        >
          <svg.ViewAllSvg />
        </div>
      )}
    </div>
  );
};
