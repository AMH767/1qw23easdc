import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const flexCenter = (): React.CSSProperties => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export default flexCenter;
