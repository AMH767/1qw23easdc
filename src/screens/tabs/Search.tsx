import axios from 'axios';
import {Swiper, SwiperSlide} from 'swiper/react';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../../text';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {URLS} from '../../config';
import {custom} from '../../custom';
import {svg} from '../../assets/svg';
import {components} from '../../components';
import {course as elements} from '../../course';
import {theme} from '../../constants';

const tags = [
  {
    id: 1,
    name: 'Java',
  },
  {
    id: 2,
    name: 'Python',
  },
  {
    id: 3,
    name: 'Marketing',
  },
  {
    id: 4,
    name: 'App',
  },
  {
    id: 5,
    name: 'Database',
  },
  {
    id: 6,
    name: 'Analytics',
  },
  {
    id: 7,
    name: 'UI/UX',
  },
];

export const Search: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const navigate = hooks.useNavigate();

  const [loading, setLoading] = useState(false);
  const [coursesData, setCoursesData] = useState([]);

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(URLS.GET_COURSES),
        // axios.get(URLS.GET_BANNERS),
      ]);

      const coursesResponse = results[0];

      if (coursesResponse.status === 'fulfilled') {
        setCoursesData(coursesResponse.value.data.courses);
      } else {
        console.error('Error fetching courses:', coursesResponse.reason);
      }

      // const productsResponse = results[0];
      // const bannersResponse = results[1];

      // if (productsResponse.status === 'fulfilled') {
      //   setProductsData(productsResponse.value.data.products);
      // } else {
      //   console.error('Error fetching products:', productsResponse.reason);
      // }

      // if (bannersResponse.status === 'fulfilled') {
      //   setBannersData(bannersResponse.value.data.banners);
      // } else {
      //   console.error('Error fetching banners:', bannersResponse.reason);
      // }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderSearchBar = (): JSX.Element => {
    return (
      <div className='container'>
        <div
          style={{
            padding: '9px 16px',
            width: '100%',
            marginBottom: 30,
            left: 20,
            top: 44,
            background:
              'linear-gradient(90deg, rgba(246, 189, 229, 0.5) 0%, rgba(174, 183, 248, 0.5) 100%)',
            borderRadius: 5,
            ...utils.rowCenter(),
          }}
        >
          <svg.SearchSvg />
          <text.T14 style={{marginLeft: 8, marginRight: 'auto'}}>
            Search
          </text.T14>
          <svg.FilterSvg />
        </div>
      </div>
    );
  };

  const renderNewCourses = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, width: '100%'}}>
        <components.BlockHeading
          title='New courses'
          containerStyle={{padding: '0 20px', marginBottom: 7}}
          viewAllOnClick={() => {
            navigate('/category-list', {state: {title: 'New Courses'}});
          }}
        />
        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          pagination={{clickable: true}}
        >
          {coursesData.map((course: any, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <SwiperSlide
                key={course.id}
                style={{
                  width: 230,
                  height: 300,
                  padding: 10,
                  cursor: 'pointer',
                  userSelect: 'none',
                  backgroundColor: index % 2 === 0 ? '#AEB7F8' : '#FE9BB3',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
                onClick={() => {
                  navigate('/course-details', {state: {course}});
                }}
              >
                <img
                  src={course.threeDPreview}
                  alt={course.name}
                  style={{
                    width: '88%',
                    margin: '0 auto',
                    marginTop: 10,
                    marginBottom: 'auto',
                  }}
                />
                <elements.CourseName
                  course={course}
                  numberOfLines={2}
                  style={{color: theme.colors.white, marginBottom: 16}}
                />
                <div style={{...utils.rowCenterSpcBtw()}}>
                  <div style={{...utils.rowCenter()}}>
                    <svg.ClockSvg color='#D7D9FE' />
                    <text.T14
                      style={{
                        marginLeft: 6,
                        marginRight: 'auto',
                        color: '#D7D9FE',
                      }}
                    >
                      {course.duration}
                    </text.T14>
                  </div>
                  <text.T16
                    style={{
                      color: theme.colors.white,
                      ...theme.fonts.Lato_700Bold,
                    }}
                  >
                    ${course.price.toFixed(2)}
                  </text.T16>
                </div>
                <elements.CourseRating
                  course={course}
                  containerStyle={{
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                />
                <elements.CourseInWishlist
                  course={course}
                  size={20}
                  customFillColor={theme.colors.white}
                  customStrokeColor={theme.colors.white}
                  style={{position: 'absolute', right: 10, top: 10}}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const renderTopRatedCourses = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <components.BlockHeading
          title='Top rated'
          viewAllOnClick={() => {
            navigate('/category-list', {state: {title: 'Top Rated'}});
          }}
          containerStyle={{marginBottom: 7, padding: '0 20px'}}
        />
        {coursesData.slice(0, 3).map((course: any, index, array) => {
          const isLast = index === array.length - 1;

          return (
            <elements.CourseCard
              key={course.id}
              course={course}
              isLast={isLast}
              section='top rated'
            />
          );
        })}
      </div>
    );
  };

  const renderSpecialForYou = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <components.BlockHeading
          title='Specially for you'
          viewAllOnClick={() => {
            navigate('/category-list', {state: {title: 'Specially for you'}});
          }}
          containerStyle={{marginBottom: 7, padding: '0 20px'}}
        />
        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          pagination={{clickable: true}}
        >
          {coursesData.slice(0, 3).map((course: any, index, array) => {
            const getRandomNumber = (min: number, max: number): number => {
              return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            const randomNumber = getRandomNumber(3, 17);
            return (
              <SwiperSlide
                key={course.id}
                style={{
                  width: 230,
                  height: 100,
                  backgroundColor: index % 2 === 0 ? '#FDF4EF' : '#EEF7FE',
                  borderRadius: 10,
                  padding: 16,
                  position: 'relative',
                  cursor: 'pointer',
                  userSelect: 'none',
                  overflow: 'hidden',
                }}
                onClick={() => {
                  navigate('/course-details', {state: {course}});
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#FED7C7',
                    borderRadius: 50,
                    position: 'absolute',
                    right: -20,
                    bottom: -40,
                  }}
                />
                <img
                  src={course.threeDPreview}
                  alt={course.name}
                  style={{
                    width: 70,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                />
                <div style={{marginRight: 50, marginBottom: 'auto'}}>
                  <elements.CourseName
                    course={course}
                    numberOfLines={2}
                    style={{color: theme.colors.bodyTextColor}}
                  />
                </div>
                <text.T14 style={{color: theme.colors.secondaryTextColor}}>
                  {randomNumber} Courses
                </text.T14>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const renderOftenSearched = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 20}}
      >
        <components.BlockHeading
          title='Often searched'
          containerStyle={{marginBottom: 7}}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {tags.map((tag, index, array) => {
            return (
              <div
                key={tag.id}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderRadius: 10,
                  padding: '10px 16px',
                  backgroundColor: '#EBE2FE',
                }}
                onClick={() => {
                  navigate('/category-list', {state: {title: tag.name}});
                }}
              >
                <text.H6 style={{color: '#7C6F97'}}>{tag.name}</text.H6>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBottomTabBar = (): JSX.Element => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingTop: 10}}>
        {renderSearchBar()}
        {renderNewCourses()}
        {renderTopRatedCourses()}
        {renderSpecialForYou()}
        {renderOftenSearched()}
      </main>
    );
  };

  return (
    <>
      {renderImageBackground()}
      {renderContent()}
      {renderBottomTabBar()}
    </>
  );
};
