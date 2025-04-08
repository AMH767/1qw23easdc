import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const RightArrowSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={6}
      height={10}
      fill='none'
    >
      <g>
        <path
          stroke='#111'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='M1 9.286 5.286 5 1 .714'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M6 0H.286v10H6z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
