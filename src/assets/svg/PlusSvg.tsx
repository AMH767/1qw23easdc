import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const PlusSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={12}
      height={12}
      fill='none'
    >
      <path
        fill='#111'
        d='M6.612 0v5.124h4.884v1.62H6.612v5.16H4.86v-5.16H0v-1.62h4.86V0h1.752Z'
      />
    </svg>
  );
};
