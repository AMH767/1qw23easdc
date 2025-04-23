import React, { useState } from 'react';

interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
}

const VideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Все');
  
  const videos: Video[] = [
    {
      id: 1,
      title: 'Техника иделаьного старта от Дрессла',
      url: 'https://www.youtube.com/embed/wzZxkCCPWG0?si=76ybxZkkVL3GrTtW',
      description: 'Привет, ребята, это Каелеб! 👋 Каждый день я вижу, как пловцы испытывают трудности со стартом, и я хочу помочь это исправить. В этом видео я делюсь всем, что знаю о том, как правильно стартовать с колодок.',
      tags: ['Старт']
    },
    {
      id: 2,
      title: 'Поворот сальто в плавании | Подробный разбор + упражнения',
      url: 'https://www.youtube.com/embed/7lR_Zr3K56I?si=JFu7YAWONe2RFoCY',
      description: 'В этом видео я расскажу вам о том, как делать поворот сальто в кроле! Я покажу подводящие упражнения, расскажу о технике выполнения поворота в кроле, и дам все необходимы объяснения, которые позволят вам самостоятельно научиться делать сальто в кроле! Приятного просмотра! Другие обучающие видео с различными стилями плавания вы сможете найти у нас на канале. На данный момент у нас есть видео по плаванию кролем, брассом, баттерфляем и на спине, а также по стартам с тумбочки, стартам для новичков и всем видам поворотов в плавании.',
      tags: ['Кувирок', 'Сальто']
    },
    {
      id: 3,
      title: 'Тренировка гребка на суше, чтобы вы плавали техничнее и быстрее',
      url: 'https://www.youtube.com/embed/6nBcjHIsihs?si=huuskrkvtBtCCl7p',
      description: 'Сегодня наш тренер Александр Бубнов покажет самые лучшие упражнения на суше для проработки мощного гребка в кроле. Сухое плавание очень эффективно отражается на технике плавания , силе и выносливости пловца, поэтому не избегайте тренировок на суше.',
      tags: ['Сухое плавание', 'Гребок']
    },
    {
      id: 4,
      title: '5 советов от Чемпиона Мира | Спринт кролем',
      url: 'https://www.youtube.com/embed/s3ZJb2zJ5x0?si=nBdEyadKgW5lyPUd',
      description: 'В этом видео я расскажу вам про упражнения, которые помогут вам плавать как настоящий спринтер! Мы разберем все ключевые особенности техники спринтерского плавания.  Я расскажу вам, что нужно делать, как тренироваться, какие упражнения плавать, покажу 5 своих любимых упражнений для того, чтобы научиться ускоряться кролем и плыть быстрее! Совершенствуйтесь вместе с нами! Приятного просмотра! ',
      tags: ['Спринт', 'Кроль']
    },
    {
      id: 5,
      title: 'Сухое плавание. Работа на резине',
      url: 'https://www.youtube.com/embed/m-DgoY2F62g?si=r7BFx9oegZVAUJ24',
      description: 'Это сухое плавание. Работа на резине для пловца.Третья тренировка уже самая что ни на есть "плавательная", Рабочие серии на резине для пловцов, Отрабатываем траекторию гребка, Прокачиваем наши скоростно-силовые качества.',
      tags: ['Сухое плавание']
    },
    {
      id: 6,
      title: 'Анализ спринта кролем 50 метров',
      url: 'https://www.youtube.com/embed/CoWdC-yueVE?si=wxTfg9DvU7wHKFEX',
      description: 'Это видео было снято во время тренировочного лагеря прямо перед чемпионатом мира.',
      tags: ['Спринт', 'Кроль', 'Анализ']
    }
  ];

  // Исправление ошибки с Set и downlevelIteration
  const allTags = ['Все', ...Array.from(new Set(videos.flatMap(video => video.tags)))];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'Все' || video.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Добавлен тип для videoId
  const handleVideoClick = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId);
  };

  return (
    <div className="video-page">
      <h1 className="page-title">Видео-галерея</h1>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск видео..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        
        <div className="tag-filter">
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}
            className="tag-select"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredVideos.length === 0 ? (
        <div className="no-results">
          <svg className="no-results-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <p>Ничего не найдено. Попробуйте изменить параметры поиска.</p>
        </div>
      ) : (
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className={`video-card ${activeVideo === video.id ? 'active' : ''}`}
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="video-thumbnail">
              <a 
    href={video.url.replace('embed/', 'watch?v=')} 
    target="_blank" 
    rel="noopener noreferrer"

    className="thumbnail-link"
  >
                <div className="video-wrapper">
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="play-overlay">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                </a>
              </div>
              







              <div className="video-info">
                <h2 className="video-title">{video.title}</h2>
                <p className="video-description">
                  {activeVideo === video.id ? video.description : `${video.description.substring(0, 60)}...`}
                </p>
                <div className="video-tags">
                  {video.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <button className="expand-button">
                  {activeVideo === video.id ? 'Свернуть' : 'Подробнее'}
                </button>
              </div>
              
            </div>
            
          ))}
        </div>
      )}
      
    </div>
  );
};

// Стили
const styles = `
  .video-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    color: #333;
  }

  .page-title {
    text-align: center;
    color: #2d3748;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 600;
    background: black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }



  .controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-container {
    position: relative;
    flex-grow: 1;
    max-width: 500px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  .search-input:focus {
    outline: none;
    border-color: #46d6e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    fill: #94a3b8;
  }

  .tag-filter {
    min-width: 200px;
  }

  .tag-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
  }

  .tag-select:focus {
    outline: none;
    border-color: #46d6e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .video-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .video-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .video-card.active {
    box-shadow: 0 0 0 2px #46d6e5, 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .video-thumbnail {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    background-color: #f1f5f9;
  }

  .video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .play-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .video-card:hover .play-overlay {
    opacity: 1;
  }

  .play-overlay svg {
    width: 60px;
    height: 60px;
    fill: white;
    filter: drop-shadow(0 0 4px rgba(0,0,0,0.3));
  }

  .video-info {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .video-title {
    margin: 0 0 0.75rem 0;
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .video-description {
    margin: 0 0 1rem 0;
    color: #64748b;
    line-height: 1.5;
    flex-grow: 1;
  }

  .video-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    background-color: #e2e8f0;
    color: #334155;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .expand-button {
    align-self: flex-start;
    background: none;
    border: none;
    color: #46d6e5;
    font-weight: 600;
    padding: 0.25rem 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .expand-button:hover {
    text-decoration: underline;
  }

  .expand-button::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s;
  }

  .video-card.active .expand-button::after {
    transform: rotate(180deg);
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #64748b;
  }

  .no-results-icon {
    width: 64px;
    height: 64px;
    fill: #cbd5e1;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }
    
    .controls {
      flex-direction: column;
    }
    
    .search-container, .tag-filter {
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .video-grid {
      grid-template-columns: 1fr;
    }
    
    .page-title {
      font-size: 1.75rem;
    }
  }
`;
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default VideoGallery;