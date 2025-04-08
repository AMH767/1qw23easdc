import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const HelpCirceSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      fill='none'
    >
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z'
      />
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.575 7.5a2.5 2.5 0 0 1 4.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008'
      />
    </svg>
  );
};
