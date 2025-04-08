import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  coupon: any;
  isLast: boolean;
};

export const Coupon: React.FC<Props> = ({coupon, isLast}) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 20,
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid #FFFFFF',
        boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.1)',
        borderRadius: 10,
        marginBottom: isLast ? 0 : 10,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          ...theme.fonts.Lato_700Bold,
          fontSize: 30,
          marginRight: 4,
          color: theme.colors.mainColor,
        }}
      >
        {coupon.discount}
      </span>
      <svg.PercentOffSvg />
      <div
        style={{
          width: 1,
          height: 22,
          backgroundColor: theme.colors.mainColor,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
      <div>
        <text.T12
          numberOfLines={1}
          style={{marginBottom: 1}}
        >
          {coupon.title}
        </text.T12>
        <text.T10 numberOfLines={1}>{coupon.activationCode}</text.T10>
      </div>
    </div>
  );
};
