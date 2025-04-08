import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const columnCenter = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };
};

export default columnCenter;
