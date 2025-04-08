import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {theme} from '../constants';

import {hooks} from '../hooks';
import {addToWishlist} from '../store/slices/wishlistSlice';
import {removeFromWishlist} from '../store/slices/wishlistSlice';

type Props = {
  size?: 20;
  course: any;
  customFillColor?: string;
  customStrokeColor?: string;
  style?: React.CSSProperties;
};

export const CourseInWishlist: React.FC<Props> = ({
  size,
  style,
  course,
  customFillColor = theme.colors.accentColor,
  customStrokeColor = theme.colors.secondaryTextColor,
}): JSX.Element | null => {
  const dispatch = hooks.useDispatch();

  const {list} = hooks.useAppSelector((state) => state.wishlistSlice);
  const courseExist = (item: any) => list.find((i) => i.id === item.id);

  const renderHeart_20 = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={20}
        height={20}
        fill='none'
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          ...style,
          borderRadius: 4,
        }}
        onClick={(event: any) => {
          event.stopPropagation();
          if (courseExist(course)) {
            dispatch(removeFromWishlist(course));
          }
          if (!courseExist(course)) {
            dispatch(addToWishlist(course));
          }
        }}
      >
        <path
          fill={
            courseExist(course) ? customFillColor : theme.colors.transparent
          }
          stroke={courseExist(course) ? customFillColor : customStrokeColor}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.2}
          d='M17.367 3.842a4.584 4.584 0 0 0-6.484 0L10 4.725l-.883-.883a4.584 4.584 0 1 0-6.484 6.483l.884.883L10 17.692l6.483-6.484.884-.883a4.585 4.585 0 0 0 0-6.483v0Z'
        />
      </svg>
    );
  };

  if (size === 20) {
    return renderHeart_20();
  }

  return null;
};
