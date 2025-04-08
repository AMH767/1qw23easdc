import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

interface rowSpcOptions {
  gap?: number;
  wrap?: boolean;
}

const rowSpcBtw = ({gap, wrap}: rowSpcOptions = {}): React.CSSProperties => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: gap !== undefined ? `${gap}px` : undefined,
    flexWrap: wrap ? 'wrap' : 'nowrap',
  };
};

export default rowSpcBtw;
