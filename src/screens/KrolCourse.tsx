import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';

import { text } from '../text';
import { utils } from '../utils';
import { svg } from '../assets/svg';
import { theme } from '../constants';
import { components } from '../components';
import { CourseType } from '../types';

// Дополнительный тип для данных курса
interface KrolCourseData extends CourseType {
  innerPreview?: string;
  instructor?: {
    name: string;
    avatar: string;
    bio?: string;
  };
  position?: string;
  author?: string;
  authorImage?: string;
  bigPreview?: string;
  threeDPreview?: string;
  video?: string;
  aboutTeacher?: string;
  isTopRated?: boolean;
  popular?: boolean;
  isSpecial?: boolean;
  status?: boolean;
}

export const KrolCourse: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  // Создаем дефолтный курс для кроля
  const defaultCourse: KrolCourseData = {
    id: 3,
    name: 'Прокачка техники для стиля Кроль',
    price: 1,
    rating: 5,
    image: 'https://amh767.github.io/api-data/assets/vid_gif/krol.gif',
    preview_90x90: 'https://amh767.github.io/api-data/assets/vid_gif/krol.gif',
    innerPreview: 'https://amh767.github.io/api-data/assets/vid_gif/krol.gif',
    duration: '5h 30m',
    instructor: {
      name: 'Elizabeth Parker',
      avatar: 'https://george-fx.github.io/nuton/author.png'
    },
    // Обязательные поля из CourseType
    images: [],
    sizes: [],
    size: '',
    colors: [],
    color: '',
    shortName: 'Wordpress For Beginner',
    description: 'Работааааает',
    categories: 'Design UI/UX',
    isBestseller: false,
    isFeatured: true,
    is_out_of_stock: false,
    reviews: [],
    types: [],
    isNew: true,
    isTop: true,
    audience: [],
    promotion: '',
    tags: ['кроль', 'плавание', 'техника'],
    category: 'Design UI/UX',
    oldPrices: 0,
    categoryId: 0,
    position: 'Professional Software Developer and Educator',
    author: 'Elizabeth Parker',
    authorImage: 'https://george-fx.github.io/nuton/author.png',
    bigPreview: 'https://george-fx.github.io/nuton/courses/03-big.png',
    threeDPreview: 'https://george-fx.github.io/nuton/courses/03-3d.png',
    video: 'https://george-fx.github.io/nuton/video.mp4',
    aboutTeacher: 'I started working as a software developer...',
    isTopRated: true,
    popular: true,
    isSpecial: true,
    status: true
  };

  // Получаем курс из location.state или используем дефолтный
  const course: KrolCourseData = location.state?.course || defaultCourse;

  // Проверяем наличие instructor
  const instructor = course.instructor || {
    name: 'Неизвестный инструктор',
    avatar: 'https://via.placeholder.com/100?text=U'
  };

  const lessons = [
    {
      id: '1',
      title: '01. Основы техники',
      lecture: '5 упражнений',
      duration: '32 мин',
      content: [
        {
          id: '1-1',
          title: '🏊 Положение тела в воде',
          duration: '06:00',
          description: `
            <strong>Цель:</strong> освоение правильного положения тела.<br/><br/>
            <strong>Как выполнять:</strong><br/>
            - Лечь на воду, вытянув тело в линию<br/>
            - Голова опущена в воду, взгляд вниз<br/>
            - Тело параллельно поверхности воды<br/><br/>
            <em>💡 Совет:</em> представьте, что вы скользите как торпеда.
          `,
        },
        {
          id: '1-2',
          title: '🦵 Работа ног с доской',
          duration: '08:00',
          description: `
            <strong>Цель:</strong> развитие силы и техники работы ног.<br/><br/>
            <strong>Как выполнять:</strong><br/>
            - Держите доску перед собой на вытянутых руках<br/>
            - Ноги работают от бедра<br/>
            - Небольшая амплитуда движений<br/><br/>
            <em>🌊 Совет:</em> стопы должны быть расслаблены.
          `,
        },
      ]
    },
  ];

  const tabs = [
    { id: 'lessons', name: 'Упражнения' },
    { id: 'materials', name: 'Материалы' },
    { id: 'reviews', name: 'Отзывы' }
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const toggleExercise = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const renderPreviewImage = () => (
    <div className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <img
        src={course.innerPreview || course.image}
        alt="Превью курса"
        style={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );

  const renderHeader = () => (
    <components.Header
      goBack={true}
      course={course}
      addWishlist={true}
    />
  );

  const renderTitle = () => (
    <div className="container">
      <text.H3 style={{ marginBottom: 8, lineHeight: 1.3 }}>
        {course.name}
      </text.H3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img
          src={instructor.avatar}
          alt={instructor.name}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <text.T14 style={{ color: theme.colors.secondaryTextColor }}>
          {instructor.name}
        </text.T14>
      </div>
    </div>
  );

  const renderRating = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 0',
      marginBottom: 16,
      borderBottom: `1px solid #e0e0e0`
    }} className="container">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 199, 0, 0.1)',
        borderRadius: 20,
        padding: '6px 12px'
      }}>
        <svg.StarSvg />
        <text.T14 style={{ 
          ...theme.fonts.Lato_700Bold, 
          color: '#FFC700', 
          marginLeft: 4 
        }}>
          {course.rating}
        </text.T14>
      </div>
      <text.T14 style={{ color: theme.colors.secondaryTextColor }}>
        {course.reviews?.length || 0} отзывов
      </text.T14>
      <text.T14 style={{ color: theme.colors.secondaryTextColor }}>
        {course.studentsCount || 0} учеников
      </text.T14>
    </div>
  );

  const renderTabs = () => (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid #e0e0e0`,
      marginBottom: 16
    }} className="container">
      {tabs.map(tab => (
        <div
          key={tab.id}
          style={{
            padding: '12px 16px',
            borderBottom: `2px solid ${selectedTab.id === tab.id ? theme.colors.mainColor : 'transparent'}`,
            cursor: 'pointer'
          }}
          onClick={() => setSelectedTab(tab)}
        >
          <text.T14 style={{
            color: selectedTab.id === tab.id ? theme.colors.mainColor : theme.colors.secondaryTextColor,
            fontWeight: '600'
          }}>
            {tab.name}
          </text.T14>
        </div>
      ))}
    </div>
  );

  const renderLessonItem = (item: any) => (
    <div
      key={item.id}
      style={{
        padding: 16,
        borderRadius: 12,
        background: '#fff',
        marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        borderLeft: `4px solid ${item.locked ? theme.colors.secondaryTextColor : theme.colors.mainColor}`,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => toggleExercise(item.id)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: item.locked ? '#eee' : '#e6f2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {item.locked ? '🔒' : <svg.SmallPlaySvg />}
        </div>
        <div style={{ flex: 1 }}>
          <text.H5 style={{ marginBottom: 4 }}>{item.title}</text.H5>
          <text.T12 style={{ color: theme.colors.secondaryTextColor }}>
            {item.duration}
          </text.T12>
        </div>
        <span style={{
          transform: expandedExercise === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </div>

      {expandedExercise === item.id && (
        <div style={{ marginTop: 12, paddingLeft: 36 }}>
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: '#f8f9fa',
              lineHeight: 1.6
            }}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      )}
    </div>
  );

  const renderLessons = () => (
    <div className="container">
      <Accordion.Root type="single" collapsible>
        {lessons.map(lesson => (
          <Accordion.Item key={lesson.id} value={lesson.id}>
            <Accordion.Trigger
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${openItem === lesson.id ? '#e6f2ff' : '#e0e0e0'}`,
                cursor: 'pointer'
              }}
              onClick={() => setOpenItem(openItem === lesson.id ? null : lesson.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#e6f2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <text.T14 style={{ 
                    ...theme.fonts.Lato_700Bold, 
                    color: theme.colors.mainColor 
                  }}>
                    {lesson.id}
                  </text.T14>
                </div>
                <text.H5>{lesson.title}</text.H5>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <text.T14 style={{ color: theme.colors.secondaryTextColor }}>
                  {lesson.lecture} • {lesson.duration}
                </text.T14>
                <span style={{
                  transform: openItem === lesson.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ▼
                </span>
              </div>
            </Accordion.Trigger>

            <Accordion.Content style={{
              overflow: 'hidden',
              maxHeight: openItem === lesson.id ? '1000px' : 0,
              transition: 'max-height 0.3s ease'
            }}>
              {openItem === lesson.id && (
                <div style={{ padding: '0 16px 16px' }}>
                  {lesson.content.map(renderLessonItem)}
                </div>
              )}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <components.Button
        title="Начать курс"
        onClick={() => navigate('/checkout')}
        style={{ 
          width: '100%',
          margin: '24px 0'
        }}
      />
    </div>
  );

  const renderContent = () => (
    <main style={{ paddingBottom: 20 }}>
      {renderPreviewImage()}
      {renderTitle()}
      {renderRating()}
      {renderTabs()}
      {selectedTab.id === 'lessons' && renderLessons()}
    </main>
  );

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};