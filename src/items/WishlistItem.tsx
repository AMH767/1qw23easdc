import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {theme} from '../constants';
import {CourseType} from '../types';
import {course as elements} from '../course';

type Props = {
  isLast?: boolean;
  course: CourseType;
};

export const WishlistItem: React.FC<Props> = ({course, isLast}) => {
  const navigate = hooks.useNavigate();

  return (
    <div
      style={{
        width: '100%',
        ...utils.rowCenter(),
        padding: '0 20px 10px 20px',
        marginBottom: isLast ? 0 : 10,
        borderBottom: '1px solid rgba(59, 89, 153, 0.1)',
      }}
    >
      {/* Image */}
      <custom.ImageBackground
        src={course.preview_90x90}
        imageStyle={{borderRadius: 10}}
        containerStyle={{
          minWidth: 110,
          height: 110,
          marginRight: 12,
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => navigate('/course-details', {state: {course}})}
      >
        <elements.CourseRating
          course={course}
          containerStyle={{margin: 2, position: 'absolute', bottom: 0, left: 0}}
        />
      </custom.ImageBackground>
      {/* Content */}
      <div style={{width: '100%', position: 'relative'}}>
        <div style={{width: 190}}>
          <elements.CourseName
            course={course}
            numberOfLines={2}
            style={{marginBottom: 4}}
          />
        </div>
        <elements.CourseDuration
          course={course}
          containerStyle={{marginBottom: 3}}
        />
        <div style={{...utils.rowCenterSpcBtw()}}>
          <elements.CoursePrice course={course} />
          <div
            style={{
              borderRadius: 5,
              cursor: 'pointer',
              userSelect: 'none',
              padding: '5px 19.5px',
              border: '1px solid #666666',
            }}
          >
            <text.T10
              style={{
                textTransform: 'capitalize',
                color: theme.colors.mainColor,
              }}
            >
              buy now
            </text.T10>
          </div>
        </div>
        <elements.CourseInWishlist
          course={course}
          size={20}
          style={{position: 'absolute', right: 0, top: 0}}
        />
      </div>
    </div>
  );
};
