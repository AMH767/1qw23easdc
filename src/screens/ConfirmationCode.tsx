import {useState, FC, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const ConfirmationCode: FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();

  const navigate = hooks.useNavigate();

  const [inputs, setInputs] = useState<string[]>(['', '', '', '', '']);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

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
        goBack={true}
        title='Verify your phone number'
      />
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <text.T16 style={{marginTop: 30, marginBottom: 27}}>
        Enter your OTP code here.
      </text.T16>
    );
  };

  const renderInputFields = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenterSpcBtw(), marginBottom: 20}}>
        {inputs.map((input, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              width: '17%',
              aspectRatio: 1 / 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              border: '1px solid #fff',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0px 4px 10px rgba(37, 73, 150, 0.05)',
            }}
          >
            <input
              maxLength={1}
              style={{
                textAlign: 'center',
                width: '100%',
                height: '100%',
                ...theme.fonts.LeagueSpartan_300Light,
                borderRadius: 10,
                border: 'none',
                backgroundColor: theme.colors.transparent,
                fontSize: 26,
                color: theme.colors.mainColor,
              }}
              type='number'
              min={0}
              max={9}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderIfDidNotReceiveCode = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30, ...utils.rowCenter()}}>
        <text.T16 style={{marginRight: 5}}>Didn’t receive the OTP? </text.T16>
        <text.T16
          style={{
            fontSize: 16,
            cursor: 'pointer',
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_700Bold,
          }}
        >
          Resend.
        </text.T16>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='verify'
        style={{marginBottom: 20}}
        onClick={() => {
          navigate('/account-created');
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingBottom: 0}}
      >
        {renderDescription()}
        {renderInputFields()}
        {renderIfDidNotReceiveCode()}
        {renderButton()}
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
