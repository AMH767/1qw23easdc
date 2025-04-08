import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {screens} from '../screens';

export const TabNavigator: React.FC = () => {
  const screen = hooks.useAppSelector((state) => state.tabSlice.screen);

  return (
    <>
      {screen === 'Home' && <screens.Home />}
      {screen === 'Search' && <screens.Search />}
      {screen === 'Profile' && <screens.Profile />}
      {screen === 'My Courses' && <screens.MyCourses />}
    </>
  );
};
