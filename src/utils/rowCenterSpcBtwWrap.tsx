import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const rowCenterSpcBtwWrap = (): React.CSSProperties => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
};
