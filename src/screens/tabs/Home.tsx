import axios from 'axios';
import {Swiper, SwiperSlide} from 'swiper/react';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

import {text} from '../../text';
import {URLS} from '../../config';
import {hooks} from '../../hooks';
import {utils} from '../../utils';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {course as elements} from '../../course';

const CATEGORY_PATHS: Record<number, string> = {
  1: '/ai-chat',
  2: '/PrivacyPlanner',
  3: '/pools',
  4: '/training-plan',
  5: '/PrivacyMusic',
  6: '/video'
};

export const Home: React.FC = () => {
  const navigate = hooks.useNavigate();
  const location = useLocation();
  const {pathname} = useLocation();

  const [loading, setLoading] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [activeIndex, setActiveIndex] = useState(0);
  const [coursesData, setCoursesData] = useState([]);
  const [bannersData, setBannersData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const handleSlideChange = () => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', handleSlideChange);
    }
  }, [emblaApi]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(URLS.GET_COURSES),
        axios.get(URLS.GET_CATEGORIES),
        axios.get(URLS.GET_BANNERS),
      ]);

      const coursesResponse = results[0];
      const categoriesResponse = results[1];
      const bannersResponse = results[2];

      if (coursesResponse.status === 'fulfilled') {
        setCoursesData(coursesResponse.value.data.courses);
      } else {
        console.error('Error fetching courses:', coursesResponse.reason);
      }

      if (categoriesResponse.status === 'fulfilled') {
        setCategoriesData(categoriesResponse.value.data.categories);
      } else {
        console.error('Error fetching categories:', categoriesResponse.reason);
      }

      if (bannersResponse.status === 'fulfilled') {
        setBannersData(bannersResponse.value.data.banners);
      } else {
        console.error('Error fetching banners:', bannersResponse.reason);
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

  const renderBottomTabBar = (): JSX.Element => {
    return <components.BottomTabBar />;
  };

  const renderTopBlock = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{marginBottom: 20}}
      >
        <div
          className='custom-block'
          style={{padding: 20}}
        >
          <div style={{...utils.rowCenter(), marginBottom: 4}}>
            <img
              src={'https://amh767.github.io/api-data/assets/category/4-4.png'}
              alt='logo'
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 10,
                marginBottom: 4,
              }}
            />
            <text.H2 numberOfLines={1}>Привет Чемпион </text.H2>
          </div>
          <text.T14
            style={{color: theme.colors.bodyTextColor, marginBottom: 12}}
          >
            Здесь ты найдешь все для себя
          </text.T14>
          <div
            style={{
              background:
                'linear-gradient(90deg, rgba(155, 245, 255, 0.5) 0%, rgba(186, 238, 255, 0.5) 100%)',
              borderRadius: 5,
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div style={{marginRight: 8}}>
              
            </div>
            <input
              className='top-placeholder'
              type='text'
              placeholder='Поиск'
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: theme.colors.secondaryTextColor,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderIndicator = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          bottom: 20,
          left: 20,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {bannersData?.map((item: any, index: number) => {
          const isSelected = index === activeIndex;
          return (
            <div
              style={{
                background: isSelected
                  ? theme.colors.mainColor
                  : theme.colors.secondaryTextColor,
                width: isSelected ? 25 : 10,
                height: 2,
                borderRadius: 6,
              }}
              key={index}
            />
          );
        })}
      </div>
    );
  };

  const renderCarouselContent = (): JSX.Element => {
    return (
      <div
        className='embla'
        ref={emblaRef}
        style={{marginBottom: 16}}
      >
        <div className='embla__container'>
          {bannersData.map((item: any, index: number, array: any[]) => {
            return (
              <div
                key={item.id}
                className='embla__slide'
                style={{
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  userSelect: 'none',
                  padding: '0 20px',
                }}
              >
                <img
                  src={item.banner}
                  style={{height: '100%', objectFit: 'cover', borderRadius: 10}}
                  onClick={() => {
                    navigate('/PrivacyRaspis', {
                      state: {course: coursesData[0]},
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCarousel = () => {
    return (
      <div style={{position: 'relative', marginBottom: 30}}>
        {renderCarouselContent()}
        {renderIndicator()}
      </div>
    );
  };

  const renderCategories = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <components.BlockHeading
          title='Категории'
          viewAllOnClick={() => {
            navigate('/category-grid');
          }}
          containerStyle={{marginBottom: 7, padding: '0 20px'}}
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{clickable: true}}
        >
          {categoriesData.map((category: any) => (
            <SwiperSlide
              key={category.id}
              style={{
                width: 'auto',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '8px 20px',
                height: 89,
              }}
              onClick={() => {
                navigate(CATEGORY_PATHS[category.id], {
                  state: {title: category.name}
                });
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
              />
              <text.T14
                numberOfLines={1}
                style={{
                  textTransform: 'capitalize',
                  ...theme.fonts.Lato_700Bold,
                  color: theme.colors.white,
                }}
              >
                {category.name}
              </text.T14>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  const renderTopRatedCourses = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <components.BlockHeading
          title='Тренировки'
          viewAllOnClick={() => {
            navigate('/category-list', {state: {title: 'Тренировки'}});
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

  // const renderPopular = (): JSX.Element => {
  //   return (
  //     <div style={{marginBottom: 20}}>
  //       <components.BlockHeading
  //         title='Popular'
  //         viewAllOnClick={() => {
  //           navigate('/category-list', {state: {title: 'Popular'}});
  //         }}
  //         containerStyle={{marginBottom: 7, padding: '0 20px'}}
  //       />
  //       <Swiper
  //         spaceBetween={16}
  //         slidesPerView={'auto'}
  //         pagination={{clickable: true}}
  //       >
  //         {coursesData.map((course: any, index, array) => {
  //           const isLast = index === array.length - 1;
  //           return (
  //             <SwiperSlide
  //               key={course.id}
  //               style={{
  //                 width: 230,
  //                 cursor: 'pointer',
  //                 userSelect: 'none',
  //                 borderRadius: 10,
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 position: 'relative',
  //               }}
  //               onClick={() => {
  //                 navigate('/course-details', {state: {course}});
  //               }}
  //             >
  //               <div
  //                 style={{
  //                   position: 'relative',
  //                   width: '100%',
  //                   height: 120,
  //                   marginBottom: 10,
  //                 }}
  //               >
  //                 <img
  //                   src={course.bigPreview}
  //                   alt={course.name}
  //                   style={{
  //                     width: '100%',
  //                     height: '100%',
  //                     position: 'absolute',
  //                     borderRadius: 10,
  //                     inset: 0,
  //                   }}
  //                 />
  //                 <elements.CourseRating
  //                   course={course}
  //                   containerStyle={{
  //                     position: 'absolute',
  //                     left: 2,
  //                     bottom: 2,
  //                   }}
  //                 />
  //                 <elements.CourseInWishlist
  //                   course={course}
  //                   size={20}
  //                   style={{
  //                     position: 'absolute',
  //                     right: 0,
  //                     top: 0,
  //                     margin: 10,
  //                   }}
  //                   customFillColor={theme.colors.white}
  //                   customStrokeColor={theme.colors.white}
  //                 />
  //               </div>
  //               <div style={{display: 'flex'}}>
  //                 <div style={{marginRight: 8}}>
  //                   <svg.PlaySvg />
  //                 </div>
  //                 <div>
  //                   <elements.CourseName
  //                     course={course}
  //                     numberOfLines={1}
  //                     shortName={true}
  //                   />
  //                   <text.T16 style={{color: theme.colors.secondaryTextColor}}>
  //                     London Universiry
  //                   </text.T16>
  //                 </div>
  //               </div>
  //             </SwiperSlide>
  //           );
  //         })}
  //       </Swiper>
  //     </div>
  //   );
  // };

  const renderContent = (): JSX.Element => {
    return (
      <main>
        {renderImageBackground()}
        {renderTopBlock()}
        {renderCarousel()}
        {renderCategories()}
        {renderTopRatedCourses()}
        {/* {renderPopular()} */}
      </main>
    );
  };

  return (
    <>
      {renderContent()}
      {renderBottomTabBar()}
    </>
  );
};
