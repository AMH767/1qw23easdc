import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const rowCenterFlexEnd = (): React.CSSProperties => {
  return {display: 'flex', alignItems: 'flex-end', flexDirection: 'row'};
};

export default rowCenterFlexEnd;
