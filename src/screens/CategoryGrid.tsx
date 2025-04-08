import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {URLS} from '../config';
import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const CategoryGrid: React.FC = () => {
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

  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(URLS.GET_CATEGORIES),
      ]);

      const categoriesResponse = results[0];

      if (categoriesResponse.status === 'fulfilled') {
        setCategoriesData(categoriesResponse.value.data.categories);
      } else {
        console.error('Error fetching categories:', categoriesResponse.reason);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Categories'
        goBack={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 0}}>
        <div
          className='container'
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <div style={{width: 'calc(50% - 7.5px)'}}>
            {categoriesData.slice(0, 3).map((category: any, index, array) => {
              const isLast = index === array.length - 1;
              return (
                <div
                  key={category.id}
                  style={{
                    width: '100%',
                    height: 260,
                    cursor: 'pointer',
                    userSelect: 'none',
                    padding: '30px 10px',
                    position: 'relative',
                    marginBottom: isLast ? 0 : 15,
                  }}
                  onClick={() => {
                    navigate('/category-list', {state: {title: category.name}});
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 10,
                      position: 'absolute',
                      inset: 0,
                      zIndex: -1,
                    }}
                  />
                  <text.H2
                    style={{
                      color: theme.colors.white,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category.name}
                  </text.H2>
                  <text.T14
                    style={{
                      color: theme.colors.white,
                      ...theme.fonts.Lato_700Bold,
                    }}
                  >
                    {category.quantity} Courses
                  </text.T14>
                </div>
              );
            })}
          </div>
          <div style={{width: 'calc(50% - 7.5px)'}}>
            {categoriesData.slice(3, 6).map((category: any, index, array) => {
              const isLast = index === array.length - 1;
              return (
                <div
                  key={category.id}
                  style={{
                    width: '100%',
                    height: 210,
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'relative',
                    marginBottom: isLast ? 0 : 15,
                    padding: '30px 10px',
                  }}
                  onClick={() => {
                    navigate('/category-list', {state: {title: category.name}});
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 10,
                      position: 'absolute',
                      inset: 0,
                      zIndex: -1,
                    }}
                  />
                  <text.H2
                    style={{
                      color: theme.colors.white,
                      textTransform: 'capitalize',
                    }}
                  >
                    {category.name}
                  </text.H2>
                  <text.T14
                    style={{
                      color: theme.colors.white,
                      ...theme.fonts.Lato_700Bold,
                    }}
                  >
                    {category.quantity} Courses
                  </text.T14>
                </div>
              );
            })}
          </div>
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
