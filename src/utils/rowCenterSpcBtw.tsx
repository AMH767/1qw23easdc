import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const rowCenterSpcBtw = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
};

export default rowCenterSpcBtw;
