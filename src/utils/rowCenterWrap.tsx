import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const rowCenterWrap = (): React.CSSProperties => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  };
};

export default rowCenterWrap;
