import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const ForgotPasswordSentEmail: React.FC = () => {
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
    return <components.Background version={2} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingTop: '14%', paddingBottom: 20}}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            alt='Success'
            src={require('../assets/other/04.png')}
            style={{width: '13.33%', height: 'auto', marginBottom: 10}}
          />
          <span
            style={{
              ...theme.fonts.LeagueSpartan_500Medium,
              fontSize: 12,
              color: theme.colors.mainColor,
            }}
          >
            Nuton
          </span>
          <img
            alt='Success'
            src='https://george-fx.github.io/nuton_api/assets/images/04.png'
            style={{width: '70%', height: 'auto'}}
          />
          <text.H2
            style={{
              textAlign: 'center',
              marginBottom: 10,
              textTransform: 'capitalize',
              whiteSpace: 'pre-line',
            }}
          >
            Your password has {'\n'}
            been reset!
          </text.H2>
          <text.T16
            style={{
              whiteSpace: 'pre-line',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            Qui ex aute ipsum duis. Incididunt{'\n'}adipisicing voluptate
            laborum
          </text.T16>
          <components.Button
            title='Done'
            onClick={() => navigate('/sign-in')}
          />
        </div>
      </main>
    );
  };

  return (
    <>
      {renderImageBackground()}
      {renderContent()}
    </>
  );
};
