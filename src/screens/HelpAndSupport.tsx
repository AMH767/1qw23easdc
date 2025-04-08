import React, {useState, useEffect} from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

const FAQData = [
  {
    id: 1,
    title: 'How do I send a wire transfer?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    title: 'Is there any fee for receiving a wire transfer?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    title: 'How does the identification code process work?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 4,
    title: 'Does Fingerprint login work for all devices?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    title: 'How to send an invoice?',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const menu = [
  {
    id: 1,
    title: 'Getting started',
    icon: require('../assets/other/06.png'),
    url: '',
  },
  {
    id: 2,
    title: 'profile',
    icon: require('../assets/other/09.png'),
    url: '/tab-navigator',
  },
  {
    id: 3,
    title: 'Purchase',
    icon: require('../assets/other/10.png'),
    url: '',
  },
  {
    id: 4,
    title: 'Course Taking',
    icon: require('../assets/other/11.png'),
    url: '',
  },
];

export const HelpAndSupport: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();
  }, [pathname]);

  const navigate = hooks.useNavigate();
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: 'smooth'});
    }, 10);
  }, [pathname]);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Help & Support'
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
        <Accordion.Root
          type='single'
          collapsible={true}
          style={{marginTop: 10}}
        >
          {FAQData?.map((item: any, index) => {
            const isOpen = openItem === item.id;
            return (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className='custom-block'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: 6,
                }}
                onClick={() => setOpenItem(isOpen ? null : item.id)}
              >
                <Accordion.Trigger
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    display: 'flex',
                    padding: '18px 20px 18px 20px',
                    ...utils.rowCenterSpcBtw(),
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: theme.colors.transparent,
                  }}
                >
                  <text.H6
                    numberOfLines={1}
                    style={{marginRight: 20}}
                  >
                    {item.title}
                  </text.H6>
                  {isOpen ? <svg.OpenSvg /> : <svg.CloseSvg />}
                </Accordion.Trigger>
                <Accordion.Content style={{padding: '0px 20px 20px 20px'}}>
                  <text.T16>{item.content}</text.T16>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
          }}
        >
          {menu.map((item, index) => {
            return (
              <div
                style={{
                  width: 'calc(50% - 7.5px)',
                  padding: '30px 0 22px 0',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor:
                    index === 0
                      ? '#ABC9FB'
                      : index === 1
                      ? '#FE9BB3'
                      : index === 2
                      ? '#54DAE2'
                      : index === 3
                      ? '#BEA1FE'
                      : '#D3F9F9',
                }}
                key={item.id}
                onClick={() => {
                  navigate(item.url);
                }}
              >
                <img
                  src={require('../assets/other/08.png')}
                  alt='arrow'
                  style={{
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                />
                <img
                  src={item.icon}
                  alt={item.title}
                  style={{
                    width: utils.clcPercentage(160, 50),
                    height: 'auto',
                    marginBottom: 14,
                    zIndex: 2,
                  }}
                />
                <text.H5
                  style={{
                    color: theme.colors.white,
                    textTransform: 'capitalize',
                    zIndex: 2,
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </text.H5>
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
