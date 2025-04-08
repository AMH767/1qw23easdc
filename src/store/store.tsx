import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {slices} from './slices';

const rootReducer = combineReducers({
  tabSlice: slices.tabSlice.reducer,
  cartSlice: slices.cartSlice.reducer,
  filterSlice: slices.filterSlice.reducer,
  wishlistSlice: slices.wishlistSlice.reducer,
});

export const store = configureStore({reducer: rootReducer});
