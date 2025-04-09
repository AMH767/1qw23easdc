import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {text} from '../text';
import {components} from '../components';

const poolInfo = [
  {
    id: 1,
    title: '🏊 О бассейне',
    content: (
      <div>
        <p>• Длина бассейна: <b>25 м</b></p>
        <p>• Температура воды: <b>+26…28°С</b> 🌡️</p>
        <p>• Количество дорожек: <b>5</b></p>
        <p>• Длительность сеанса: <b>45 минут</b> ⏱️</p>
      </div>
    ),
  },
  {
    id: 2,
    title: '🕒 Расписание на каждый день',
    content: (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px'}}>
        <div>07:00-07:45</div>
        <div>07:45-08:30</div>
        <div>08:30-09:15</div>
        <div>09:30-10:15</div>
        <div>10:15-11:00</div>
        <div>11:15-12:00</div>
        <div>12:00-12:45</div>
        <div style={{gridColumn: '1 / -1', color: '#ff6b6b', margin: '10px 0'}}>⏸️ Перерыв 13:00 до 14:15</div>
        <div>14:15-15:00</div>
        <div>15:00-15:45</div>
        <div>16:45-17:30</div>
        <div>19:00-19:45</div>
        <div>19:45-20:30</div>
        <div>20:30-21:15</div>
        <div>21:15-22:00</div>
      </div>
    ),
  },
  {
    id: 3,
    title: '📍 Как добраться',
    content: (
      <div>
        <p>🏠 <b>Адрес:</b> Большой Строченовский переулок, д.10, Москва</p>
        <p>🚇 <b>Метро:</b> Серпуховская (460 м)</p>
        <p>🚌 <b>Автобусная остановка:</b> Большой Строченовский переулок (270 м)</p>
        <p>📞 <b>Телефон:</b> <a href="tel:+74958001200" style={{color: '#4dabf7'}}>+7 (495) 800-12-00</a></p>
      </div>
    ),
  },
  {
    id: 4,
    title: '🔗 Дополнительная информация',
    content: (
      <a 
        href="https://basseiny.online/reu/#shedule-section" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{color: '#4dabf7', textDecoration: 'none'}}
      >
        🌐 Перейти на сайт бассейна
      </a>
    ),
  },
];

export const PrivacyRaspis: React.FC = () => {
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
        title='Информация о бассейне'
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
          {poolInfo.map((item) => {
            return (
              <div
                style={{
                  marginBottom: '10%',
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                key={item.id}
              >
                <text.H5 style={{marginBottom: 15, color: '#339af0'}}>{item.title}</text.H5>
                <text.T14 style={{lineHeight: '1.6'}}>{item.content}</text.T14>
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