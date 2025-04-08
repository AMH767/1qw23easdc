import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const cards = [
  {
    id: 1,
    image: require('../assets/other/12.png'),
  },
  {
    id: 2,
    image: require('../assets/other/12.png'),
  },
  {
    id: 3,
    image: require('../assets/other/12.png'),
  },
];

export const MyWallet: React.FC = () => {
  const navigate = hooks.useNavigate();

  const location = useLocation();
  const {pathname} = useLocation();


  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [activeIndex, setActiveIndex] = useState(0);

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

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='My Wallet'
        goBack={true}
      />
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
        {cards?.map((item: any, index: number) => {
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
        style={{marginBottom: 16, marginTop: 20}}
      >
        <div className='embla__container'>
          {cards.map((item: any) => {
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
                  src={item.image}
                  style={{height: '100%', objectFit: 'cover', borderRadius: 10}}
                  onClick={() => {
                    navigate('/course-details', {});
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

  const renderPaymentMethods = (): JSX.Element => {
    return (
      <div className='container'>
        <div
          className='custom-block'
          style={{
            padding: ' 16px 20px',
            ...utils.rowCenterSpcBtw(),
            marginBottom: 10,
          }}
        >
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            Apple Pay
          </text.T16>
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            $346.84
          </text.T16>
        </div>
        <div
          className='custom-block'
          style={{
            padding: ' 16px 20px',
            ...utils.rowCenterSpcBtw(),
            marginBottom: 10,
          }}
        >
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            Pay Pal
          </text.T16>
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            $91.84
          </text.T16>
        </div>
        <div
          className='custom-block'
          style={{padding: ' 16px 20px', ...utils.rowCenterSpcBtw()}}
        >
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            Payoneer
          </text.T16>
          <text.T16 style={{color: theme.colors.bodyTextColor}}>
            <svg.PlusSvg />
          </text.T16>
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          marginTop: '14%',
          marginBottom: 20,
          justifyContent: 'center',
        }}
      >
        <button
          className='custom-block'
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            navigate('/add-a-new-card');
          }}
        >
          <svg.PlusSvg />
        </button>
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main>
        {renderCarousel()}
        {renderPaymentMethods()}
        {renderButton()}
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
