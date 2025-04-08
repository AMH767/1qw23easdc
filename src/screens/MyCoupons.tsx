import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

import {URLS} from '../config';
import {items} from '../items';
import {components} from '../components';

export const MyCoupons: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const [loading, setLoading] = useState(false);
  const [couponsData, setCouponsData] = useState([]);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

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
      const results = await Promise.allSettled([axios.get(URLS.GET_COUPONS)]);

      const couponsResponse = results[0];

      if (couponsResponse.status === 'fulfilled') {
        setCouponsData(couponsResponse.value.data.coupons);
      } else {
        console.error('Error fetching coupons:', couponsResponse.reason);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setHeaderBgColor('white');
      } else {
        setHeaderBgColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='My Coupons'
        goBack={true}
        style={{
          backgroundColor: headerBgColor,
          transition: 'background-color 0.3s ease in-out',
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 20}}>
        <div
          className='container'
          style={{marginTop: 20}}
        >
          {couponsData.map((coupon, index, array) => {
            const isLast = index === array.length - 1;

            return (
              <items.Coupon
                key={index}
                coupon={coupon}
                isLast={isLast}
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
