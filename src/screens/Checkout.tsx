import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {course as elements} from '../course';

export const Checkout: React.FC = () => {
  const navigate = hooks.useNavigate();

  const location = useLocation();
  const {pathname} = useLocation();

  const course = location.state.course;

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
        title='Checkout'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{paddingBottom: 0}}
        className='container'
      >
        <div style={{paddingTop: 20}}>
          {/* Course */}
          <div style={{...utils.rowCenter(), marginBottom: 30}}>
            <img
              src={course.preview_90x90}
              alt={course.title}
              style={{width: 80, height: 80, marginRight: 12}}
            />
            <div>
              <text.T14
                style={{...theme.fonts.Lato_700Bold, marginBottom: 3}}
                numberOfLines={2}
              >
                {course.name}
              </text.T14>
              <elements.CoursePrice course={course} />
            </div>
          </div>
          {/* Payment method */}
          <div
            className='custom-block'
            style={{
              padding: '19px 20px',
              ...utils.rowCenter(),
              marginBottom: 20,
            }}
            onClick={() => {
              navigate('/choose-payment-method');
            }}
          >
            <text.T16 style={{marginRight: 'auto'}}>Payment method</text.T16>
            <text.T16 style={{marginRight: 6}}>**** 6644</text.T16>
            <svg.RightArrowSvg />
          </div>
          {/* Apply a coupon */}
          <div style={{...utils.rowCenter(), marginBottom: 30}}>
            <text.T14 style={{marginRight: 8, color: theme.colors.mainColor}}>
              Apply a coupon
            </text.T14>
            <svg.RightArrowSvg />
          </div>
          {/* Total */}
          <div>
            <div style={{...utils.rowCenterSpcBtw(), marginBottom: 7}}>
              <text.T14 style={{color: theme.colors.mainColor}}>
                Subtotal
              </text.T14>
              <text.H6 style={{color: theme.colors.secondaryTextColor}}>
                $120
              </text.H6>
            </div>
            <div style={{...utils.rowCenterSpcBtw(), marginBottom: 17}}>
              <text.T14 style={{color: theme.colors.mainColor}}>
                Discount
              </text.T14>
              <text.H6 style={{color: theme.colors.secondaryTextColor}}>
                -$20
              </text.H6>
            </div>
            <div
              style={{
                height: 1,
                backgroundColor: '#D8CBE3',
                width: '100%',
                marginBottom: 10,
              }}
            />
            <div style={{...utils.rowCenterSpcBtw(), marginBottom: 17}}>
              <text.H4>Total</text.H4>
              <text.H4>$100</text.H4>
            </div>
          </div>
          {/* Button */}
          <components.Button
            title='Pay Now'
            onClick={() => {
              navigate('/payment-success');
            }}
            style={{marginBottom: 20}}
          />
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
