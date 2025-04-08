import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {components} from '../components';

export const CourseCompleted: React.FC = () => {
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
    return <components.Background version={2} />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header goBack={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className='container'
        style={{paddingTop: '20%', paddingBottom: 20}}
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
            src='https://george-fx.github.io/nuton_api/assets/images/07.png'
            style={{width: '70%', height: 'auto'}}
          />
          <text.H2 style={{textAlign: 'center', marginBottom: 10}}>
            Congratulations!
          </text.H2>
          <text.T16
            style={{
              whiteSpace: 'pre-line',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            You have received a course completion{'\n'}certificate.
          </text.T16>
          <components.Button
            title='Download certificate'
            onClick={() => {}}
          />
          <components.Button
            colorScheme='transparent'
            title='leave feedback'
            onClick={() => {
              navigate('/leave-a-review');
            }}
          />
        </div>
      </main>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderImageBackground()}
      {renderContent()}
    </>
  );
};
