import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {utils} from '../utils';
import {svg} from '../assets/svg';

export const Socials: React.FC = () => {
  const size = 60;
  const style = {
    width: size,
    aspectRatio: '1 / 1',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.05)',
    ...utils.flexCenter(),
  };

  return (
    <div
      style={{
        ...utils.rowCenter({gap: 10}),
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
      }}
    >
      <div style={{...style, cursor: 'pointer', userSelect: 'none'}}>
        <svg.FacebookSvg />
      </div>
      <div style={{...style, cursor: 'pointer', userSelect: 'none'}}>
        <svg.TwitterSvg />
      </div>
      <div style={{...style, cursor: 'pointer', userSelect: 'none'}}>
        <svg.GoogleSvg />
      </div>
    </div>
  );
};
