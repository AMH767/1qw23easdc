import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {custom} from '../custom';
import {components} from '../components';

export const VerifyYourPhoneNumber: React.FC = () => {
  const navigate = hooks.useNavigate();

  const location = useLocation();
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
        title='Verify Your Phone Number'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingBottom: 0}}
      >
        <div style={{marginTop: 30}}>
          <text.T16 style={{marginBottom: 20}}>
            We have sent you an SMS with a code to number +17 0123456789.
          </text.T16>
          <custom.InputField
            label='Phone Number'
            placeholder='+17123456789'
            containerStyle={{marginBottom: 20}}
          />
          <components.Button
            title='confirm'
            style={{marginBottom: 20}}
            onClick={() => navigate('/confirmation-code')}
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
