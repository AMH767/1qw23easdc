import {store} from '../store/store';
import {useRefresh} from './useRefresh';
import {useWindowSize} from './useWindowSize';
import {useDynamicHeight} from './useDynamicHeight';
import {useNavigate as useNavigateRRD} from 'react-router-dom';
import {
  useDispatch as useDispatchRR,
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRR<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useNavigate = () => useNavigateRRD();

export const hooks = {
  useRefresh,
  useWindowSize,
  useDispatch,
  useAppSelector,
  useNavigate,
  useDynamicHeight,
};
