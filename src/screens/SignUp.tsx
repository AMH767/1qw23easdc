import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const SignUp: React.FC = () => {
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

  const renderLogo = (): JSX.Element => {
    return (
      <img
        src={require('../assets/other/04.png')}
        alt='logo'
        style={{
          margin: '0 auto',
          marginBottom: 20,
          marginTop: '10%',
          width: utils.clcPercentage(375, 30),
        }}
      />
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <text.H1
        style={{
          textTransform: 'capitalize',
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        Sign up
      </text.H1>
    );
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        title='Sign Up'
      />
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <div>
        <custom.InputField
          label='Name'
          rightIcon={<svg.CheckSvg />}
          placeholder='kristinwatson@mail.com'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='Email'
          placeholder='••••••••'
          rightIcon={<svg.CheckSvg />}
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='Password'
          placeholder='••••••••'
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='Password'
          placeholder='••••••••'
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 20}}
        />
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='sign up'
        style={{marginBottom: 20}}
        onClick={() => navigate('/verify-your-phone-number')}
      />
    );
  };

  const renderAlreadyHaveAnAccount = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenter(), marginBottom: 37}}>
        <text.T16 style={{color: theme.colors.bodyTextColor, marginRight: 5}}>
          Already have an account?
        </text.T16>
        <text.T16
          style={{
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_700Bold,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => navigate('/sign-in')}
        >
          Sign in.
        </text.T16>
      </div>
    );
  };

  const renderSocials = (): JSX.Element => {
    return <components.Socials />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingBottom: 0}}
      >
        {renderLogo()}
        {renderTitle()}
        {renderInputFields()}
        {renderButton()}
        {renderAlreadyHaveAnAccount()}
        {renderSocials()}
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
