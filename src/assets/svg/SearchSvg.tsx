import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const SearchSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={14}
      height={14}
      fill='none'
    >
      <path
        fill='#666'
        fillRule='evenodd'
        d='M6.417 2.188a4.23 4.23 0 1 0 0 8.458 4.23 4.23 0 0 0 0-8.459ZM1.313 6.417a5.104 5.104 0 1 1 10.208 0 5.104 5.104 0 0 1-10.209 0Z'
        clipRule='evenodd'
      />
      <path
        fill='#666'
        fillRule='evenodd'
        d='M9.3 9.3a.583.583 0 0 1 .825 0l2.537 2.537a.583.583 0 0 1-.825.825L9.3 10.125a.583.583 0 0 1 0-.825Z'
        clipRule='evenodd'
      />
    </svg>
  );
};
