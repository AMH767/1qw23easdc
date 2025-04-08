import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const CloseSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={11}
      height={6}
      fill='none'
    >
      <g>
        <path
          stroke='#111'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='m.857.857 4.286 4.286L9.429.857'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            d='M10.143 5.857V.143h-10v5.714z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
