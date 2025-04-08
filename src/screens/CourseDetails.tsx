import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import * as Accordion from '@radix-ui/react-accordion';

import {text} from '../text';
import {URLS} from '../config';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {items} from '../items';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {course as elements} from '../course';

const lessons = [
  {
    id: 1,
    title: '01. Introduction',
    lecture: '3 lectures',
    duration: '7 min',
    content: [
      {
        id: 1,
        title: 'Setting up individual Camera Rigs',
        duration: '00:44',
      },
      {
        id: 2,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '03:49',
      },
      {
        id: 3,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '02:22',
        locked: true,
      },
    ],
  },
  {
    id: 2,
    title: '02. Movement in VR',
    lecture: '8 lectures',
    duration: '1h 33 min',
    content: [
      {
        id: 1,
        title: 'Setting up individual Camera Rigs',
        duration: '00:44',
      },
      {
        id: 2,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '03:49',
      },
      {
        id: 3,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '02:22',
        locked: true,
      },
    ],
  },
  {
    id: 3,
    title: '03. Distance Grabber',
    lecture: '8 lectures',
    duration: '1h 33 min',
    content: [
      {
        id: 1,
        title: 'Setting up individual Camera Rigs',
        duration: '00:44',
      },
      {
        id: 2,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '03:49',
      },
      {
        id: 3,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '02:22',
        locked: true,
      },
    ],
  },
  {
    id: 4,
    title: '04. Snap Zones',
    lecture: '8 lectures',
    duration: '1h 33 min',
    content: [
      {
        id: 1,
        title: 'Setting up individual Camera Rigs',
        duration: '00:44',
      },
      {
        id: 2,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '03:49',
      },
      {
        id: 3,
        title: 'Setting Up VRTKs Tracked Alias',
        duration: '02:22',
        locked: true,
      },
    ],
  },
];

const tabs = [
  {
    id: 1,
    name: 'Description',
  },
  {
    id: 2,
    name: 'Lessons',
  },
  {
    id: 3,
    name: 'Instructor',
  },
  {
    id: 4,
    name: 'Reviews',
  },
];

const reviews = [
  {
    id: 1,
    name: 'Lillian Davis',
    rating: 5,
    date: 'March 3, 2022',
    comment: 'Lots of good info.',
    avatar: 'https://george-fx.github.io/nuton_api/assets/users/02.jpg',
  },
  {
    id: 2,
    name: 'Adam Thompson',
    rating: 5,
    date: 'March 28, 2022',
    comment: 'Great course!',
    avatar: 'https://george-fx.github.io/nuton_api/assets/users/03.jpg',
  },
  {
    id: 3,
    name: 'Ryan Howard',
    rating: 5,
    date: 'February 12, 2022',
    comment: 'It was a great course.',
    avatar: 'https://george-fx.github.io/nuton_api/assets/users/04.jpg',
  },
];

export const CourseDetails: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const navigate = hooks.useNavigate();

  const course = location.state.course;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [coursesData, setCoursesData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

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

  const renderPreviewImage = (): JSX.Element => {
    return (
      <div
        style={{marginTop: 20, marginBottom: 20}}
        className='container'
      >
        <img
          src={course.innerPreview}
          alt='preview'
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
      </div>
    );
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        course={course}
        addWishlist={true}
      />
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <div className='container'>
        <text.H4
          style={{marginBottom: 6}}
          numberOfLines={2}
        >
          {course.name}
        </text.H4>
      </div>
    );
  };

  const renderRating = (): JSX.Element => {
    return (
      <div
        style={{...utils.rowCenter({gap: 6}), marginBottom: 20}}
        className='container'
      >
        <div style={{...utils.rowCenter({gap: 3})}}>
          <text.T10
            style={{
              ...theme.fonts.Lato_700Bold,
              color: '#FFC700',
              marginTop: 3,
            }}
          >
            5.0
          </text.T10>
          <components.Rating />
        </div>
        <text.T10>(149 ratings) 2,719 students</text.T10>
      </div>
    );
  };

  const renderTabs = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
        }}
        className='container'
      >
        {tabs.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              className={selectedTab.id === item.id ? 'custom-block' : ''}
              key={item.id}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                ...utils.rowCenter(),
                padding: '14px 10px',
              }}
              onClick={() => setSelectedTab(item)}
            >
              <span
                style={{
                  color:
                    selectedTab.id === item.id
                      ? theme.colors.mainColor
                      : theme.colors.secondaryTextColor,
                  ...theme.fonts.LeagueSpartan_600SemiBold,
                  fontSize: 8,
                  textTransform: 'uppercase',
                }}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAboutCourse = (): JSX.Element | null => {
    if (selectedTab.id === 1) {
      return (
        <div
          className='container'
          style={{marginBottom: 20}}
        >
          <text.H5 style={{marginBottom: 10}}>About Course</text.H5>
          <span style={{...utils.rowCenter({gap: 10}), marginBottom: 6}}>
            <svg.UserSvg />
            <text.T16>{course.author}</text.T16>
          </span>
          <span style={{...utils.rowCenter({gap: 10}), marginBottom: 6}}>
            <svg.VideoSvg />
            <text.T16>14 hours on-demand video</text.T16>
          </span>
          <span style={{...utils.rowCenter({gap: 10}), marginBottom: 6}}>
            <svg.DownloadSvg />
            <text.T16>16 downloadable resources</text.T16>
          </span>
          <span style={{...utils.rowCenter({gap: 10}), marginBottom: 10}}>
            <svg.CertificateSvg />
            <text.T16>Certificate of completion</text.T16>
          </span>
          <text.T16 style={{marginBottom: 25}}>
            Welcome to Udemy's first, No Coding Required, VR development course,
            using VRTK 4. Build once and deploy to both Oculus.
          </text.T16>
          <components.Button
            title='Buy course'
            onClick={() => {
              navigate('/checkout', {state: {course}});
            }}
          />
        </div>
      );
    }

    return null;
  };

  const renderLessons = (): JSX.Element | null => {
    if (selectedTab.id === 2) {
      return (
        <div className='container'>
          <Accordion.Root
            type='single'
            collapsible={true}
          >
            {lessons?.map((item: any, index) => {
              const isOpen = openItem === item.id;
              return (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => setOpenItem(isOpen ? null : item.id)}
                >
                  <Accordion.Trigger
                    className='custom-block'
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      borderRadius: 10,
                      marginBottom: 10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.05)',
                    }}
                  >
                    <text.H5 numberOfLines={1}>{item.title}</text.H5>
                    <text.T10>
                      {item.lecture} • {item.duration}
                    </text.T10>
                  </Accordion.Trigger>
                  <Accordion.Content style={{marginBottom: 20, marginTop: 20}}>
                    {item.content.map((content: any) => {
                      return (
                        <div
                          key={content.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: 6,
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <div style={{...utils.rowCenter()}}>
                            <svg.SmallPlaySvg />
                            <text.T14
                              numberOfLines={1}
                              style={{marginRight: 'auto', marginLeft: 10}}
                            >
                              {content.title}
                            </text.T14>
                            <text.T14 numberOfLines={1}>
                              {content.duration}
                            </text.T14>
                          </div>
                        </div>
                      );
                    })}
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
          <components.Button
            title='Buy course'
            onClick={() => {
              navigate('/checkout');
            }}
            style={{marginBottom: 20, marginTop: 20}}
          />
        </div>
      );
    }

    return null;
  };

  const renderReviews = (): JSX.Element | null => {
    if (selectedTab.id === 4) {
      return (
        <div
          style={{marginBottom: 20}}
          className='container'
        >
          {reviews.map((item, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.ReviewItem
                key={item.id}
                review={item}
                isLast={isLast}
              />
            );
          })}
        </div>
      );
    }

    return null;
  };

  const renderInstructor = (): JSX.Element | null => {
    if (selectedTab.id === 3) {
      return (
        <div>
          <div
            className='container'
            style={{marginBottom: 30}}
          >
            <text.H5 style={{marginBottom: 2}}>{course.author}</text.H5>
            <text.T10 style={{marginBottom: 10}}>{course.position}</text.T10>
            <div style={{...utils.rowCenter(), marginBottom: 30}}>
              <img
                src={course.authorImage}
                alt='author'
                style={{borderRadius: 5, width: 91, marginRight: 10}}
              />
              <div>
                <div style={{...utils.rowCenter({gap: 7}), marginBottom: 6}}>
                  <svg.StarSvg color={theme.colors.mainColor} />
                  <text.T10 style={{color: theme.colors.bodyTextColor}}>
                    4.5 Instructor Rating
                  </text.T10>
                </div>
                <div style={{...utils.rowCenter({gap: 7}), marginBottom: 6}}>
                  <svg.ChatSvg />
                  <text.T10 style={{color: theme.colors.bodyTextColor}}>
                    116 Reviews
                  </text.T10>
                </div>
                <div style={{...utils.rowCenter({gap: 7}), marginBottom: 6}}>
                  <svg.GraduateSvg />
                  <text.T10 style={{color: theme.colors.bodyTextColor}}>
                    936 Students
                  </text.T10>
                </div>
                <div style={{...utils.rowCenter({gap: 7}), marginBottom: 6}}>
                  <svg.BtnPlaySvg />
                  <text.T10 style={{color: theme.colors.bodyTextColor}}>
                    12 Courses
                  </text.T10>
                </div>
              </div>
            </div>
            <text.H5 style={{marginBottom: 10}}>About teacher</text.H5>
            <text.T16
              style={{color: theme.colors.bodyTextColor, marginBottom: 10}}
            >
              I started working as a software developer at the age of 23, and
              never looked back. I explored careers as varied as being a Game
              Developer, Educator and Drone Pilot, over the last 25 years. None
              of these provided a continual challenge in the same way the
              combination of...
            </text.T16>
            <svg.ShowMoreSvg />
          </div>
          <div style={{marginBottom: 30, width: '100%'}}>
            <components.BlockHeading
              title='Courses'
              containerStyle={{padding: '0 20px', marginBottom: 7}}
              viewAllOnClick={() => {
                navigate('/category-list', {state: {title: 'Courses'}});
              }}
            />
            <Swiper
              spaceBetween={16}
              slidesPerView={'auto'}
              pagination={{clickable: true}}
            >
              {coursesData.map((course: any, index: any, array: any) => {
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
        </div>
      );
    }

    return null;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 0}}>
        {renderPreviewImage()}
        {renderTitle()}
        {renderRating()}
        {renderTabs()}
        {renderAboutCourse()}
        {renderLessons()}
        {renderReviews()}
        {renderInstructor()}
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
