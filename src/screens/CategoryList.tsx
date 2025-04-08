import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {URLS} from '../config';
import {components} from '../components';
import {course as elements} from '../course';

export const CategoryList: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const title = location.state.title;

  const [loading, setLoading] = useState(false);
  const [coursesData, setCoursesData] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        filter={true}
        title={title}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 0}}>
        <div style={{paddingTop: 10, paddingBottom: 20}}>
          {coursesData.map((course, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <elements.CourseCard
                key={index}
                course={course}
                isLast={isLast}
                section='category list'
              />
            );
          })}
        </div>
      </main>
    );
  };

  return (
    <>
      {renderImageBackground()}
      {renderHeader()}
      {renderContent()}
    </>
  );
};
