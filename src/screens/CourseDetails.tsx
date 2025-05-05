import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import * as Accordion from '@radix-ui/react-accordion';

import {text} from '../text';
import {URLS} from '../config';
import {hooks} from '../hooks';
import {utils} from '../utils';
import {items} from '../items';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';
import {course as elements} from '../course';

const lessons = [
  {
    id: '1',
    title: '01. Базовые упражнения',
    lecture: '4 упражнения',
    duration: '20 мин',
    content: [
      {
        id: '1-1',
        title: '🐬 Дельфин на груди с руками вдоль тела',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> отработка бедренной волны и правильной позиции тела в воде.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Ляг на воду, руки вдоль тела<br/>
          - Выполняй дельфинообразные движения телом, начиная волну от груди<br/>
          - Держи корпус расслабленным, движения мягкими<br/><br/>
          <em>🌀 Совет:</em> представь, что ты — волна, катящаяся по поверхности воды.
        `,
      },
      {
        id: '1-2',
        title: '✋ Баттерфляй с одной рукой',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> изоляция и отработка движения одной руки.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Плыви баттерфляем, работая только одной рукой<br/>
          - Вторая рука вытянута вперёд или вдоль тела<br/>
          - На каждый гребок — два удара ногами<br/><br/>
          <em>🔥 Совет:</em> следи, чтобы корпус не "проваливался" в воду.
        `,
      },
      {
        id: '1-3',
        title: '🌊 Волнообразные движения с доской',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> развитие правильной волны тела.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Держи доску перед собой на вытянутых руках<br/>
          - Сосредоточься на волнообразном движении от груди к ногам<br/>
          - Избегай резких сгибаний в коленях<br/><br/>
          <em>💦 Совет:</em> представь, что твоё тело — это хлыст.
        `,
      },
      {
        id: '1-4',
        title: '🧘‍♂️ Дыхание с паузами',
        duration: '05:00',
        locked: true,
        description: `
          <strong>Цель:</strong> синхронизация дыхания с движениями.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Выполняй стандартный баттерфляй<br/>
          - Делай вдох только через каждые 2-3 цикла<br/>
          - Концентрируйся на плавности<br/><br/>
          <em>🌬️ Совет:</em> выдох начинай сразу после входа в воду.
        `,
      },
    ],
  },
  {
    id: '2',
    title: '02. Техника в воде',
    lecture: '5 упражнений',
    duration: '25 мин',
    content: [
      {
        id: '2-1',
        title: '🌪 Баттерфляй с задержкой дыхания',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> развитие ритма и силы.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Плыви баттерфляем без вдохов 5-7 метров<br/>
          - Сохраняй технику даже при усталости<br/>
          - Делай акцент на мощном выдохе в воду<br/><br/>
          <em>💪 Совет:</em> это упражнение отлично развивает выносливость.
        `,
      },
      {
        id: '2-2',
        title: '🔄 Баттерфляй с паузами',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> осознанность каждого движения.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - После каждого гребка делай паузу 1-2 секунды<br/>
          - Контролируй положение тела в фазе скольжения<br/>
          - Следи за симметрией движений<br/><br/>
          <em>👁️ Совет:</em> полезно выполнять перед зеркалом на дне.
        `,
      },
      {
        id: '2-3',
        title: '🏋️‍♂️ Удары дельфином с доской',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> усиление ног и развитие волны.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Держи доску перед собой на вытянутых руках<br/>
          - Выполняй мощные волнообразные удары<br/>
          - Старайся не "бить" по воде, а проходить сквозь неё<br/><br/>
          <em>⚡ Совет:</em> можно выполнять на спине для разнообразия.
        `,
      },
      {
        id: '2-4',
        title: '🤸‍♀️ Баттерфляй на боку',
        duration: '05:00',
        description: `
          <strong>Цель:</strong> улучшение ротации тела.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Плыви на боку, выполняя гребки одной рукой<br/>
          - Вторая рука прижата к бедру<br/>
          - Меняй стороны через каждые 25 метров<br/><br/>
          <em>🔄 Совет:</em> помогает исправить асимметрию в технике.
        `,
      },
      {
        id: '2-5',
        title: '🌈 Комбинации: 3 кроля — 3 баттерфляя',
        duration: '05:00',
        locked: true,
        description: `
          <strong>Цель:</strong> координация между стилями.<br/><br/>
          <strong>Как выполнять:</strong><br/>
          - Чередуй три гребка кролем и три цикла баттерфляем<br/>
          - Следи за плавностью перехода<br/>
          - Держи стабильное положение корпуса<br/><br/>
          <em>🎯 Совет:</em> помогает включать баттерфляй в комплексные тренировки.
        `,
      },
    ],
  },
];

const tabs = [
  {
    id: 'lessons',
    name: 'Упражнения',
  },
];

export const CourseDetails: React.FC = () => {
  const location = useLocation();
  const {pathname} = useLocation();
  const navigate = hooks.useNavigate();
  const course = location.state?.course || {
    name: 'Совершенствование техники плавания баттерфляем',
    innerPreview: 'https://via.placeholder.com/800x450?text=Butterfly+Swimming',
    instructor: {
      name: 'Алексей Петров',
      bio: 'Мастер спорта по плаванию, тренер с 10-летним опытом',
      avatar: 'https://via.placeholder.com/100?text=AP',
    },
  };

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [coursesData, setCoursesData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderPreviewImage = (): JSX.Element => {
    return (
      <div className="container" style={{marginTop: 20, marginBottom: 20, position: 'relative'}}>
        <div style={{
          width: '100%',
          height: 200,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          <img
            src={course.innerPreview}
            alt="preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#f0f0f0',
            }} />
          )}
        </div>
        <div 
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          ⏱️ 45 мин
        </div>
      </div>
    );
  };

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        goBack={true}
        course={course}
        addWishlist={true}
      />
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <div className="container">
        <text.H3 style={{marginBottom: 6, lineHeight: 1.3}}>
          {course.name}
        </text.H3>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
          <img 
            src={course.instructor.avatar} 
            alt={course.instructor.name}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              marginRight: 8,
              objectFit: 'cover',
            }}
          />
          <text.T14 style={{color: theme.colors.secondaryTextColor}}>
            {course.instructor.name}
          </text.T14>
        </div>
      </div>
    );
  };

  const renderRating = (): JSX.Element => {
    return (
      <div style={{...utils.rowCenter({gap: 12}), marginBottom: 20, padding: '12px 0'}} className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 199, 0, 0.1)',
          borderRadius: 20,
          padding: '6px 12px',
        }}>
          <svg.StarSvg />
          <text.T14 style={{...theme.fonts.Lato_700Bold, color: '#FFC700', marginLeft: 4}}>
            4.9
          </text.T14>
        </div>
        <div style={{flex: 1, height: 1, background: '#e0e0e0'}} />
        <text.T14 style={{color: theme.colors.secondaryTextColor}}>
          👥 1,234 учеников
        </text.T14>
      </div>
    );
  };

  const renderTabs = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 12,
          borderBottom: `1px solid #e0e0e0`,
          marginBottom: 16,
        }}
        className="container"
      >
        {tabs.map((item) => (
          <div
            key={item.id}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              ...utils.rowCenter(),
              padding: '12px 0',
              position: 'relative',
            }}
            onClick={() => setSelectedTab(item)}
          >
            <span
              style={{
                color: selectedTab.id === item.id ? theme.colors.mainColor : theme.colors.secondaryTextColor,
                ...theme.fonts.Lato_700Bold,
                fontSize: 14,
              }}
            >
              {item.name}
            </span>
            {selectedTab.id === item.id && (
              <div style={{
                position: 'absolute',
                bottom: -13,
                left: 0,
                right: 0,
                height: 3,
                background: theme.colors.mainColor,
                borderRadius: 3,
              }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLessonItem = (item: any) => {
    return (
      <div 
        key={item.id}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: '#fff',
          marginBottom: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          borderLeft: `4px solid ${item.locked ? theme.colors.secondaryTextColor : theme.colors.mainColor}`,
        }}
      >
        <div style={{...utils.rowCenter(), marginBottom: 10}}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: item.locked ? '#eee' : '#e6f2ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: 12,
          }}>
            {item.locked ? (
              <span style={{fontSize: 12}}>🔒</span>
            ) : (
              <svg.SmallPlaySvg />
            )}
          </div>
          <text.H5 style={{flex: 1}}>{item.title}</text.H5>
          <text.T14 style={{color: theme.colors.secondaryTextColor}}>
            {item.duration}
          </text.T14>
        </div>
        
        {item.description && (
          <div style={{
            marginTop: 8,
            paddingLeft: 36,
          }}>
            <div 
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: '#f8f9fa',
                lineHeight: 1.6,
              }}
              dangerouslySetInnerHTML={{__html: item.description}}
            />
          </div>
        )}

        {item.locked && (
          <div style={{
            ...utils.rowCenter(), 
            justifyContent: 'flex-end',
            marginTop: 8,
            paddingLeft: 36,
          }}>
            <text.T12 style={{
              color: theme.colors.secondaryTextColor,
              background: 'rgba(0,0,0,0.03)',
              padding: '4px 8px',
              borderRadius: 4,
            }}>
              🔒 Доступно после покупки
            </text.T12>
          </div>
        )}
      </div>
    );
  };

  const renderLessons = (): JSX.Element => {
    return (
      <div className="container">
        <Accordion.Root type="single" collapsible>
          {lessons.map((lesson) => (
            <Accordion.Item key={lesson.id} value={lesson.id}>
              <Accordion.Trigger
                className="custom-block"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderRadius: 12,
                  marginBottom: 12,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: `1px solid ${openItem === lesson.id ? '#e6f2ff' : '#e0e0e0'}`,
                }}
                onClick={() => setOpenItem(openItem === lesson.id ? null : lesson.id)}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: '#e6f2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <text.T14 style={{...theme.fonts.Lato_700Bold, color: theme.colors.mainColor}}>
                      {lesson.id}
                    </text.T14>
                  </div>
                  <text.H5>{lesson.title}</text.H5>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <text.T14 style={{color: theme.colors.secondaryTextColor}}>
                    {lesson.lecture} • {lesson.duration}
                  </text.T14>
                  <span style={{
                    display: 'inline-block',
                    transform: openItem === lesson.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}>
                    ▼
                  </span>
                </div>
              </Accordion.Trigger>
              <Accordion.Content style={{
                overflow: 'hidden',
                padding: openItem === lesson.id ? '0 16px 16px' : 0,
                maxHeight: openItem === lesson.id ? '1000px' : 0,
                transition: 'max-height 0.2s ease, padding 0.2s ease',
              }}>
                {openItem === lesson.id && lesson.content.map(renderLessonItem)}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        
        <div style={{margin: '24px 0'}}>
          <components.Button
            title='Начать курс'
            onClick={() => navigate('/checkout')}
            style={{width: '100%'}}
          />
        </div>
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{paddingBottom: 0}}>
        {renderPreviewImage()}
        {renderTitle()}
        {renderRating()}
        {renderTabs()}
        {renderLessons()}
      </main>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};