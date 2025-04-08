import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const SignIn: React.FC = () => {
  const navigate = hooks.useNavigate();

  const location = useLocation();
  const {pathname} = useLocation();

  const [rememberMe, setRememberMe] = React.useState(false);

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
        title='Sign In'
        goBack={true}
      />
    );
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
          marginBottom: 14,
        }}
      >
        Welcome Back!
      </text.H1>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <text.T18 style={{textAlign: 'center', marginBottom: 26}}>
        Sign in to continue
      </text.T18>
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <>
        <custom.InputField
          label='Email'
          rightIcon={<svg.CheckSvg />}
          placeholder='kristinwatson@mail.com'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='Password'
          placeholder='••••••••'
          rightIcon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 16}}
        />
      </>
    );
  };

  const renderRemForgot = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenterSpcBtw(), marginBottom: 30}}>
        {/* Remember me */}
        <div
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.rowCenterSpcBtw(),
          }}
          onClick={() => setRememberMe(!rememberMe)}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              ...utils.flexCenter(),
              border: `1px solid ${theme.colors.bodyTextColor}`,
            }}
          >
            {rememberMe && <svg.InputCheckSvg />}
          </div>
          <text.T16 style={{marginLeft: 12}}>Remember me</text.T16>
        </div>
        {/* Forgot password */}
        <text.T16
          onClick={() => navigate('/forgot-password')}
          style={{
            cursor: 'pointer',
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_700Bold,
          }}
        >
          Lost your password?
        </text.T16>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Sign in'
        onClick={() => {
          navigate('/tab-navigator');
        }}
        style={{marginBottom: 20}}
      />
    );
  };

  const renderIfDonTHaveAccount = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenter(), marginBottom: 40}}>
        <text.T16 style={{marginRight: 4}}>Don’t have an account?</text.T16>
        <text.T16
          onClick={() => navigate('/sign-up')}
          style={{
            cursor: 'pointer',
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_700Bold,
          }}
        >
          Sign up.
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
        style={{paddingBottom: 0}}
        className='container'
      >
        {renderLogo()}
        {renderTitle()}
        {renderDescription()}
        {renderInputFields()}
        {renderRemForgot()}
        {renderButton()}
        {renderIfDonTHaveAccount()}
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
