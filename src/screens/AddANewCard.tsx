import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {components} from '../components';

export const AddANewCard: React.FC = () => {
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
    return (
      <components.Header
        title='Add a new card'
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
        <img
          src={require('../assets/other/12.png')}
          alt='card'
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 30,
          }}
        />
        <custom.InputField
          label='Name'
          placeholder='Kristin Watson'
          containerStyle={{marginBottom: 10}}
        />
        <custom.InputField
          label='Сard number'
          placeholder='7741 6588 2123 6644'
          containerStyle={{marginBottom: 10}}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <custom.InputField
            label='Expiry date'
            placeholder='MM/YY'
          />
          <custom.InputField
            label='CVV'
            placeholder='123'
          />
        </div>
        <components.Button
          title='Save card'
          onClick={() => {
            navigate(-1);
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
