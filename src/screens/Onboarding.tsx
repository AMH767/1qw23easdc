import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {theme} from '../constants';
import {components} from '../components';

const onboarding = [
  {
    id: 1,
    title: 'Discover useful resources',
    image: 'https://george-fx.github.io/nuton_api/assets/onboarding/01_02.png',

    description:
      'E-Learning is for everyone. \n Discover useful resources and \n improve your skills.',
  },
  {
    id: 2,
    title: 'New profession',
    image: 'https://george-fx.github.io/nuton_api/assets/onboarding/02_02.png',

    description:
      'With us you can get a new profession, learn \n skills for career development or reconfigure \n your business. ',
  },
  {
    id: 3,
    title: 'Move forward',
    image: 'https://george-fx.github.io/nuton_api/assets/onboarding/03_02.png',

    description:
      'We have created a comfortable learning \n environment so that you always have the \n motivation to move forward.',
  },
];

export const Onboarding: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const navigate = hooks.useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const handleSlideChange = () => {
    if (emblaApi) {
      setActiveIndex(emblaApi.selectedScrollSnap());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (location.pathname.includes('Onboarding')) {
      metaThemeColor?.setAttribute('content', '#040325');
    } else {
      metaThemeColor?.setAttribute('content', '#ffffff');
    }
  }, [location]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', handleSlideChange);
    }
  }, [emblaApi]);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={2} />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header skip={true} />;
  };

  const renderSlider = (): JSX.Element => {
    return (
      <div
        className='embla'
        ref={emblaRef}
        style={{
          position: 'relative',
          height: '100%',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8%',
          marginTop: '8%',
        }}
      >
        <div className='embla__container'>
          {onboarding.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
                className='embla__slide'
              >
                <img
                  src={item.image}
                  alt='Carousel'
                  style={{
                    width: utils.clcPercentage(375, 205),
                    margin: '0 auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <div className='container'>
        <text.H2
          style={{
            textAlign: 'center',
            textTransform: 'capitalize',
            marginBottom: 10,
          }}
        >
          {onboarding[activeIndex].title}
        </text.H2>
      </div>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <div className='container'>
        <text.T16
          style={{
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {onboarding[activeIndex].description}
        </text.T16>
      </div>
    );
  };

  const renderDots = (): JSX.Element => {
    return (
      <div
        className='container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          marginBottom: '14%',
          marginTop: '14%',
          width: '100%',
        }}
      >
        {onboarding.map((item, index) => {
          const isSelected = index === activeIndex;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: isSelected
                  ? theme.colors.mainColor
                  : theme.colors.secondaryTextColor,
                width: isSelected ? 25 : 10,
                height: 2,
                borderRadius: 4,
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <div className='container'>
        <components.Button
          title='Get started'
          onClick={() => navigate('/sign-in')}
        />
      </div>
    );
  };

  return (
    <div style={{paddingTop: 42}}>
      {renderHeader()}
      {renderImageBackground()}
      {renderSlider()}
      {renderTitle()}
      {renderDescription()}
      {renderDots()}
      {renderButton()}
    </div>
  );
};
