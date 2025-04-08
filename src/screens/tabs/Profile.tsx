import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../../text';
import {items} from '../../items';
import {hooks} from '../../hooks';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';

export const Profile: React.FC = () => {
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

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header title='My Profile' />;
  };

  const renderBottomTabBar = (): JSX.Element => {
    return <components.BottomTabBar />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main className='container'>
        <div
          style={{
            width: '32%',
            margin: '0 auto',
            marginBottom: 20,
            marginTop: 20,
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => navigate('/profile/edit')}
        >
          <img
            src='https://amh767.github.io/api-data/assets/category/4-4.png'
            alt='Profile'
            style={{width: '100%', height: 'auto', borderRadius: '50%'}}
          />
          <img
            src={require('../../assets/other/02.png')}
            alt='camera'
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '30%',
              height: 'auto',
            }}
          />
        </div>
        <text.H2
          numberOfLines={1}
          style={{textAlign: 'center'}}
        >
          Kristin Watson
        </text.H2>
        <text.T16
          numberOfLines={1}
          style={{textAlign: 'center', marginBottom: 20}}
        >
          kristinwatson@mail.com
        </text.T16>
        <items.ProfileItem
          title='Wishlist'
          icon={<svg.HeartSvg />}
          containerStyle={{marginBottom: 6}}
          onClick={() => {
            navigate('/profile/my-wishlist');
          }}
        />
        <items.ProfileItem
          title='Coupons'
          icon={<svg.GiftSvg />}
          containerStyle={{marginBottom: 6}}
          onClick={() => {
            navigate('/profile/my-coupons');
          }}
        />
        <items.ProfileItem
          title='Wallet'
          icon={<svg.WalletSvg />}
          containerStyle={{marginBottom: 6}}
          onClick={() => {
            navigate('/profile/my-wallet');
          }}
        />
        <items.ProfileItem
          title='Help & Support'
          icon={<svg.HelpCirceSvg />}
          containerStyle={{marginBottom: 6}}
          onClick={() => {
            navigate('/profile/help-and-support');
          }}
        />
        <items.ProfileItem
          title='Privacy Policy'
          icon={<svg.FileTextSvg />}
          containerStyle={{marginBottom: 6}}
          onClick={() => {
            navigate('/profile/privacy-policy');
          }}
        />
        <items.ProfileItem
          navIcon={false}
          title='Sign out'
          icon={<svg.LogOutSvg />}
          containerStyle={{marginBottom: 20}}
          onClick={() => {
            navigate('/sign-in');
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
      {renderBottomTabBar()}
    </>
  );
};
