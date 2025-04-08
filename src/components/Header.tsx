import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {text} from '../text';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {CourseType} from '../types';
import {course as elements} from '../course';

type Props = {
  bag?: boolean;
  user?: boolean;
  logo?: boolean;
  skip?: boolean;
  title?: string;
  line?: boolean;
  clear?: boolean;
  search?: boolean;
  filter?: boolean;
  burger?: boolean;
  goBack?: boolean;
  course?: CourseType;
  creditCard?: boolean;
  addWishlist?: boolean;
  documentIcon?: boolean;
  style?: React.CSSProperties;
  clearOnClicked?: () => void;
};

export const Header: React.FC<Props> = ({
  bag,
  logo,
  line,
  skip,
  title,
  style,
  clear,
  goBack,
  search,
  filter,
  course,
  addWishlist,
  clearOnClicked,
}) => {
  const navigate = useNavigate();

  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setHeaderBgColor('white');
      } else {
        setHeaderBgColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderGoBack = (): JSX.Element | null => {
    const canGoBack = window.history.length > 1;

    if (goBack && canGoBack) {
      return (
        <div
          style={{
            height: '100%',
            padding: '0 20px',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.flexCenter(),
          }}
          onClick={() => navigate(-1)}
        >
          <svg.GoBackSvg />
        </div>
      );
    }

    return null;
  };

  const renderTitle = (): JSX.Element => {
    return (
      <text.H3
        style={{
          left: '50%',
          textAlign: 'center',
          position: 'absolute',
          width: 'calc(100% - 100px)',
          transform: 'translateX(-50%)',
          color: theme.colors.mainColor,
        }}
      >
        {title}
      </text.H3>
    );
  };

  const renderLogo = (): JSX.Element | null => {
    if (!logo) return null;

    return (
      <div
        style={{
          left: '50%',
          position: 'absolute',
          transform: 'translateX(-50%)',
        }}
      >
        {/* <svg.LogoSvg /> */}
      </div>
    );
  };

  const renderSearch = (): JSX.Element | null => {
    if (!search) return null;
    return (
      <div
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: 5,
          display: 'flex',
          marginRight: 20,
          flexDirection: 'row',
          width: 'calc(100% - 190px)',
        }}
      >
        {/* <svg.SearchSvg /> */}
      </div>
    );
  };

  const renderSkip = (): JSX.Element | null => {
    if (skip) {
      return (
        <div
          style={{
            position: 'absolute',
            right: 0,
            padding: '0 20px',
            top: 0,
            height: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.flexCenter(),
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_700Bold,
            fontSize: 14,
          }}
          onClick={() => navigate('/sign-in')}
        >
          Skip
        </div>
      );
    }

    return null;
  };

  const renderFilter = (): JSX.Element | null => {
    if (filter) {
      return (
        <div
          style={{
            position: 'absolute',
            right: 0,
            padding: '0 20px',
            top: 0,
            height: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.flexCenter(),
          }}
          onClick={() => navigate('/filter')}
        >
          <svg.FilterSvg />
        </div>
      );
    }

    return null;
  };

  const renderClear = (): JSX.Element | null => {
    if (clear) {
      return (
        <div
          style={{
            position: 'absolute',
            right: 0,
            padding: '0 20px',
            top: 0,
            height: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.flexCenter(),
          }}
          onClick={clearOnClicked}
        >
          <text.T14
            style={{...theme.fonts.Lato_700Bold, color: theme.colors.mainColor}}
          >
            Clear
          </text.T14>
        </div>
      );
    }

    return null;
  };

  const renderAddToWishlist = (): JSX.Element | null => {
    if (addWishlist) {
      return (
        <div
          style={{
            position: 'absolute',
            right: 0,
            padding: '0 20px',
            top: 0,
            height: '100%',
            cursor: 'pointer',
            userSelect: 'none',
            ...utils.flexCenter(),
          }}
        >
          <elements.CourseInWishlist
            course={course}
            size={20}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <header
      className={line ? 'header-line' : ''}
      style={{...style, backgroundColor: headerBgColor}}
    >
      {renderGoBack()}
      {renderLogo()}
      {renderTitle()}
      {renderSearch()}
      {renderSkip()}
      {renderFilter()}
      {renderClear()}
      {renderAddToWishlist()}
    </header>
  );
};
