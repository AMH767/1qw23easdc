import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {CourseType} from '../types';
import {course as elements} from '../course';

type Props = {
  isLast?: boolean;
  course: CourseType;
  status?: 'ongoing' | 'completed';
  section: 'top rated' | 'category list' | 'my courses';
};

export const CourseCard: React.FC<Props> = ({
  course,
  section,
  isLast,
  status,
}) => {
  const navigate = hooks.useNavigate();

  if (section === 'top rated') {
    return (
      <div
        style={{
          width: '100%',
          padding: '0 20px',
          cursor: 'pointer',
          userSelect: 'none',
          ...utils.rowCenter(),
          marginBottom: isLast ? 0 : 10,
          paddingBottom: isLast ? 0 : 10,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomStyle: isLast ? 'none' : 'solid',
          borderBottomColor: `rgba(59, 89, 153, 0.1)`,
        }}
        onClick={() => navigate('/course-details', {state: {course}})}
      >
        <div
          style={{
            minWidth: 130,
            minHeight: 90,
            marginRight: 12,
            position: 'relative',
          }}
        >
          <img
            src={course.preview_90x90}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              position: 'absolute',
              inset: 0,
            }}
          />
          <elements.CourseRating
            course={course}
            containerStyle={{
              margin: 2,
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          />
        </div>
        <div style={{width: '100%', position: 'relative'}}>
          <div style={{width: 202, marginRight: 30}}>
            <text.H6
              numberOfLines={2}
              style={{marginBottom: 10}}
            >
              {course.name}
            </text.H6>
          </div>
          <div style={{...utils.rowCenter()}}>
            <svg.ClockSvg color={theme.colors.secondaryTextColor} />
            <text.T14
              style={{
                marginLeft: 6,
                marginRight: 'auto',
                color: theme.colors.secondaryTextColor,
              }}
            >
              {course.duration}
            </text.T14>
            <elements.CoursePrice course={course} />
          </div>
          <elements.CourseInWishlist
            course={course}
            size={20}
            style={{position: 'absolute', right: 0, top: 0}}
          />
        </div>
      </div>
    );
  }

  if (section === 'category list') {
    return (
      <div
        style={{
          width: '100%',
          padding: '0 20px',
          cursor: 'pointer',
          userSelect: 'none',
          ...utils.rowCenter(),
          marginBottom: isLast ? 0 : 10,
          paddingBottom: isLast ? 0 : 10,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomStyle: isLast ? 'none' : 'solid',
          borderBottomColor: `rgba(59, 89, 153, 0.1)`,
        }}
        onClick={() => navigate('/course-details', {state: {course}})}
      >
        <div
          style={{
            minWidth: 130,
            minHeight: 90,
            marginRight: 12,
            position: 'relative',
          }}
        >
          <img
            src={course.preview_90x90}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              position: 'absolute',
              inset: 0,
            }}
          />
          <elements.CourseRating
            course={course}
            containerStyle={{
              margin: 2,
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          />
        </div>
        <div style={{width: '100%', position: 'relative'}}>
          <div style={{width: 202, marginRight: 30}}>
            <text.H6
              numberOfLines={2}
              style={{marginBottom: 10}}
            >
              {course.name}
            </text.H6>
          </div>
          <div style={{...utils.rowCenter()}}>
            <svg.ClockSvg />
            <text.T14 style={{marginLeft: 6, marginRight: 'auto'}}>
              {course.duration}
            </text.T14>
            <elements.CoursePrice course={course} />
          </div>
          <elements.CourseInWishlist
            course={course}
            size={20}
            style={{position: 'absolute', right: 0, top: 0}}
          />
        </div>
      </div>
    );
  }

  if (section === 'my courses') {
    return (
      <button
        className='custom-block'
        style={{
          width: '48%',
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <div
          style={{height: 96, position: 'relative'}}
          onClick={() => navigate('/course-details', {state: {course}})}
        >
          <img
            src={course.preview_90x90}
            alt='course'
            style={{
              height: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
          <svg.PlayBtnSvg
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <div style={{padding: '11px 14px 14px 14px'}}>
          <text.T14
            numberOfLines={2}
            style={{color: theme.colors.mainColor}}
          >
            {course.name}
          </text.T14>
          {status === 'ongoing' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'space-between',
                }}
              >
                <text.T12
                  style={{
                    color: theme.colors.secondaryTextColor,
                    ...theme.fonts.Lato_400Regular,
                  }}
                >
                  56%
                </text.T12>
                <div style={{...utils.rowCenter({gap: 3})}}>
                  <svg.StarSvg />
                  <text.T10
                    style={{
                      ...theme.fonts.Lato_700Bold,
                      color: theme.colors.mainColor,
                    }}
                  >
                    {course.rating}
                  </text.T10>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 3,
                  backgroundColor: '#C3D9FD',
                  borderRadius: 3,
                }}
              >
                <div
                  style={{
                    width: '56%',
                    height: 3,
                    backgroundColor: '#55ACEE',
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          )}
          {status === 'completed' && (
            <button
              style={{
                width: '100%',
                border: `1px solid ${theme.colors.secondaryTextColor}`,
                borderRadius: 5,
                marginTop: 6,
                padding: '4px 0px',
                ...utils.flexCenter(),
              }}
              onClick={() => navigate('/course-completed')}
              // onClick={() => navigate('/course-completed-certificate')}
            >
              <text.T10 style={{color: theme.colors.mainColor}}>
                View certificate
              </text.T10>
            </button>
          )}
        </div>
      </button>
    );
  }

  return null;
};
