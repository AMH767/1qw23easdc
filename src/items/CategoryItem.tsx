import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

type Props = {
  item: any;
};

export const CategoryItem: React.FC<Props> = ({item}) => {
  return (
    <img
      src={item.image}
      alt={item.title}
      style={{
        width: '30%',
      }}
    />
  );
};
