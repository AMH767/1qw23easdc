import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {components} from '../components';

const privacyPolicy = [
  {
    id: 1,
    title: '1. Terms',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    title: '2. Use license',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    title: '3. Disclaimer',
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export const PrivacyPolicy: React.FC = () => {
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
        title='Privacy Policy'
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
        <div style={{marginTop: '10%', marginBottom: 20}}>
          {privacyPolicy.map((item) => {
            return (
              <div
                style={{marginBottom: '10%'}}
                key={item.id}
              >
                <text.H5 style={{marginBottom: 10}}>{item.title}</text.H5>
                <text.T14>{item.content}</text.T14>
              </div>
            );
          })}
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
