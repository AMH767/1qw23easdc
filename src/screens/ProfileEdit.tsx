import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {theme} from '../constants';
import {components} from '../components';

export const ProfileEdit: React.FC = () => {
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
    return (
      <img
        src={require('../assets/other/01.png')}
        alt='Sign In'
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: '50%',
          zIndex: -1,
          objectFit: 'cover',
          maxWidth: 650,
          transform: 'translateX(-50%)',
        }}
      />
    );
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Profile Edit'
        goBack={true}
        style={{backgroundColor: theme.colors.transparent}}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 0}}>
        <div
          style={{
            width: '32%',
            margin: '0 auto',
            marginBottom: '10%',
            marginTop: '6%',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => {}}
        >
          <img
            src='https://amh767.github.io/api-data/assets/category/4-4.png'
            alt='Profile'
            style={{width: '100%', height: 'auto', borderRadius: '50%'}}
          />
          <img
            src={require('../assets/other/05.png')}
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
        <div className='container'>
          <custom.InputField
            label='Name'
            placeholder='Чемпион🏊'
            containerStyle={{marginBottom: 10}}
          />
          <custom.InputField
            label='Email'
            placeholder='kristinwatson@mail.com'
            containerStyle={{marginBottom: 10}}
          />
          <custom.InputField
            label='Phone number'
            placeholder='+17 123456789'
            containerStyle={{marginBottom: 10}}
          />
          <custom.InputField
            label='Location'
            placeholder='Chicago, USA'
            containerStyle={{marginBottom: 20}}
          />
          <components.Button
            title='Save changes'
            style={{marginBottom: 20}}
            onClick={() => {
              navigate(-1);
            }}
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
