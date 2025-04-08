import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {setScreen} from '../store/slices/tabSlice';

const tabs = [
  {
    id: 1,
    name: 'Home',
    icon: svg.HomeTabSvg,
  },
  {
    id: 2,
    name: 'Search',
    icon: svg.SearchTabSvg,
  },
  {
    id: 3,
    name: 'My Courses',
    icon: svg.MyCourses,
  },
  {
    id: 4,
    name: 'Profile',
    icon: svg.ProfileTabSvg,
  },
];

export const BottomTabBar: React.FC = () => {
  const dispatch = hooks.useDispatch();
  const tabScreen = hooks.useAppSelector((state) => state.tabSlice.screen);

  return (
    <footer>
      <ul>
        {tabs.map((tab) => {
          return (
            <li
              key={tab.id}
              onClick={() => dispatch(setScreen(tab.name))}
              style={{
                cursor: 'pointer',
                borderRadius: 3,
              }}
            >
              <tab.icon
                color={
                  tabScreen === tab.name
                    ? theme.colors.mainColor
                    : theme.colors.secondaryTextColor
                }
              />
            </li>
          );
        })}
      </ul>
    </footer>
  );
};
