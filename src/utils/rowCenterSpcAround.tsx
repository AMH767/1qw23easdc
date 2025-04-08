import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const rowCenterSpcAround = (): React.CSSProperties => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  };
};

export default rowCenterSpcAround;
