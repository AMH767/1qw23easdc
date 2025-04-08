import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {CourseType} from '../types';

type Props = {
  course: CourseType;
  containerStyle?: React.CSSProperties;
};

export const CourseRating: React.FC<Props> = ({course, containerStyle}) => {
  return (
    <div
      style={{
        padding: '2px 6px',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.white,
        ...utils.rowCenter(),
        ...containerStyle,
      }}
    >
      <svg.StarSvg style={{marginBottom: 0.5}} />
      <span
        style={{
          ...theme.fonts.Lato_700Bold,
          fontSize: 10,
          lineHeight: 1.7,
          marginLeft: 4,
          color: theme.colors.bodyTextColor,
        }}
      >
        {course.rating}
      </span>
    </div>
  );
};
