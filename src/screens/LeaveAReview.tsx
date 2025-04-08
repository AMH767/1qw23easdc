import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const LeaveAReview: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const navigate = hooks.useNavigate();

  const [rating, setRating] = useState<number>(0);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = () => {
    return (
      <components.Header
        title='Leave a Review'
        goBack={true}
      />
    );
  };

  const renderContent = () => {
    return (
      <main className='container'>
        <img
          alt='order successful'
          src={'https://george-fx.github.io/nuton_api/assets/images/06.png'}
          style={{
            width: utils.clcPercentage(375, 237),
            margin: '0 auto',
            marginBottom: 14,
          }}
        />
        <text.H2
          style={{
            textAlign: 'center',
            textTransform: 'capitalize',
            marginBottom: 20,
          }}
        >
          Please rate the course!
        </text.H2>
        <components.RatingStars
          containerStyle={{marginBottom: 20}}
          setRating={setRating}
          rating={rating}
        />
        <text.T16
          style={{
            textAlign: 'center',
            marginBottom: 25,
          }}
        >
          Your comments and suggestions help us improve the service quality
          better!
        </text.T16>
        <div
          className='custom-block'
          style={{
            position: 'relative',
            marginBottom: 25,
            borderRadius: 10,
          }}
        >
          <textarea
            className='input-field'
            style={{
              width: '100%',
              height: 130,
              borderColor: theme.colors.white,
              borderRadius: 10,
              display: 'block',
              boxSizing: 'border-box',
              verticalAlign: 'top',
              overflow: 'auto',
              textAlign: 'left',
              padding: '8px 20px',
              resize: 'none',
              color: theme.colors.mainColor,
            }}
            placeholder='Enter your comment'
          />
        </div>

        <components.Button
          title='submit'
          onClick={() => {
            navigate('/tab-navigator');
          }}
        />
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
