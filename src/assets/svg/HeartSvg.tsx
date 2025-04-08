import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const HeartSvg: React.FC = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={19}
      fill='none'
    >
      <path
        stroke='#111'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.367 3.586a4.619 4.619 0 0 0-1.488-.928 4.87 4.87 0 0 0-3.508 0 4.619 4.619 0 0 0-1.488.928L10 4.41l-.883-.824a4.756 4.756 0 0 0-3.242-1.254c-1.216 0-2.382.451-3.242 1.254-.86.802-1.342 1.89-1.342 3.025s.483 2.223 1.342 3.026l.884.824L10 16.512l6.483-6.05.884-.825c.425-.397.763-.87.994-1.388.23-.52.349-1.076.349-1.638 0-.562-.119-1.118-.35-1.637-.23-.52-.567-.991-.993-1.388v0Z'
      />
    </svg>
  );
};
