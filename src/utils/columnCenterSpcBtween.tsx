import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const columnCenterSpcBtween = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
};

export default columnCenterSpcBtween;
