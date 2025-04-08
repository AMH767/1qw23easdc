import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const rowWrapSpcBtween = (): React.CSSProperties => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
};

export default rowWrapSpcBtween;
