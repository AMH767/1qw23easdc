import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {hooks} from '../hooks';
import {items} from '../items';
import {components} from '../components';

export const MyWishlist: React.FC = () => {
  const {list} = hooks.useAppSelector((state) => state.wishlistSlice);

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
        title='My Wishlist'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element | null => {
    if (!list.length) {
      return (
        <main style={{paddingBottom: 0}}>
          <text.T18 style={{textAlign: 'center', marginTop: '60%'}}>
            Your wishlist is empty
          </text.T18>
        </main>
      );
    }

    return (
      <main style={{paddingBottom: 0}}>
        <div style={{marginTop: 10}}>
          {list.map((course, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.WishlistItem
                key={index}
                course={course}
              />
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
