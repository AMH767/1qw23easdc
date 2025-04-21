import React from 'react';

const VideoGallery = () => {
  const videos = [
    {
      id: 1,
      title: 'React Tutorial',
      url: 'https://www.youtube.com/embed/kxDPLxc3QJ8',
      description: 'Полный курс по React для начинающих'
    },
    {
      id: 2,
      title: 'TypeScript Basics',
      url: 'https://www.youtube.com/embed/nyIpDs2DJ_c',
      description: 'Изучение TypeScript с нуля'
    },
    {
      id: 3,
      title: 'Web Development',
      url: 'https://www.youtube.com/embed/ysEN5RaKOlA',
      description: 'Основы веб-разработки'
    }
  ];

  return (
    <div className="video-page">
      <h1 className="page-title">Видео-галерея</h1>
      
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <h2 className="video-title">{video.title}</h2>
            <div className="video-wrapper">
              <iframe
                width="560"
                height="315"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="video-description">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Стили
const styles = `
  .video-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Arial', sans-serif;
  }

  .page-title {
    text-align: center;
    color: #2d3748;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .video-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;
  }

  .video-card:hover {
    transform: translateY(-5px);
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .video-title {
    margin: 1rem;
    color: #2d3748;
    font-size: 1.25rem;
  }

  .video-description {
    margin: 0 1rem 1rem;
    color: #4a5568;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .video-grid {
      grid-template-columns: 1fr;
    }
    
    .page-title {
      font-size: 2rem;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default VideoGallery;