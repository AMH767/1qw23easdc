import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {utils} from '../../utils';
import {URLS} from '../../config';
import {theme} from '../../constants';
import {components} from '../../components';
import {course as elements} from '../../course';

export const MyCourses: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const [loading, setLoading] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('ongoing');

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([axios.get(URLS.GET_COURSES)]);

      const coursesResponse = results[0];

      if (coursesResponse.status === 'fulfilled') {
        setCoursesData(coursesResponse.value.data.courses);
      } else {
        console.error('Error fetching courses:', coursesResponse.reason);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header title='My Courses' />;
  };

  const renderTabs = (): JSX.Element => {
    return (
      <div style={{marginTop: 8, ...utils.rowCenter(), marginBottom: 20}}>
        {['ongoing', 'completed'].map((tab) => {
          return (
            <button
              key={tab}
              style={{
                width: '50%',
                padding: '8px 20px',
                textTransform: 'capitalize',
                lineHeight: 1.7,
                textAlign: 'center',
                fontFamily: tab === selectedTab ? 'Lato-Bold' : 'Lato-Regular',
                fontSize: 14,
                color:
                  tab === selectedTab
                    ? theme.colors.mainColor
                    : theme.colors.secondaryTextColor,
                borderBottom:
                  tab === selectedTab
                    ? '1px solid #111111'
                    : '1px solid #E7E6E7',
              }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>
    );
  };

  const renderCourses = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        {coursesData.map((course: any) => {
          return (
            <elements.CourseCard
              key={course.id}
              course={course}
              section='my courses'
              status={selectedTab as 'ongoing' | 'completed'}
            />
          );
        })}
      </div>
    );
  };

  const renderBottomTabBar = (): JSX.Element => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main className='container'>
        {renderTabs()}
        {renderCourses()}
      </main>
    );
  };

  return (
    <>
      {renderImageBackground()}
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
    </>
  );
};
