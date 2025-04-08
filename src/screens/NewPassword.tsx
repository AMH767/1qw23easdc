import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const NewPassword: React.FC = () => {
  const navigate = hooks.useNavigate();

  const {pathname} = useLocation();

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
        title='Reset Password'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingBottom: 20}}
      >
        <text.T16 style={{marginTop: 27, marginBottom: 20}}>
          Enter new password and confirm.
        </text.T16>
        <custom.InputField
          label='New password'
          rightIcon={<svg.EyeOffSvg />}
          placeholder='••••••••'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='New password'
          rightIcon={<svg.EyeOffSvg />}
          placeholder='••••••••'
          containerStyle={{marginBottom: 20}}
        />
        <components.Button
          title='change password'
          onClick={() => {
            navigate('/forgot-password-sent-email');
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
