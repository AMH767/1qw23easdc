import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {components} from '../components';

export const ForgotPassword: React.FC = () => {
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
    return (
      <components.Header
        title='Forgot Password'
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
        <text.T16
          style={{paddingTop: 30, marginBottom: 20, whiteSpace: 'pre-line'}}
        >
          Please enter your email address. You will receive a link to create a
          new password via email.
        </text.T16>
        <custom.InputField
          label='Email'
          placeholder='kristinwatson@mail.com'
          containerStyle={{marginBottom: 20}}
        />
        <components.Button
          title='Send'
          onClick={() => {
            navigate('/new-password');
          }}
          style={{marginBottom: 20}}
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
