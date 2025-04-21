import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { text } from '../text';
import { components } from '../components';

interface Track {
  id: number;
  name: string;
  url: string;
  artist?: string;
  duration?: number;
  cover?: string;
}

interface MusicCategory {
  id: number;
  name: string;
  tracks: Track[];
  cover?: string;
}

const musicCategories: MusicCategory[] = [
  {
    id: 1,
    name: "Энергичная музыка",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    tracks: [
      { id: 1, name: "Lions", artist: "Electro Beats", duration: 213, url: "https://amh767.github.io/api-data/assets/Music/Lions.mp3" },
      { id: 2, name: "Summer Vibes", artist: "Tropical Sounds", duration: 187, url: "https://amh767.github.io/api-data/assets/Music/SummerVibes.mp3" },
      { id: 3, name: "Dreamland", artist: "Chill Wave", duration: 231, url: "https://amh767.github.io/api-data/assets/Music/Dreamland.mp3" },
      { id: 4, name: "Electric Dreams", artist: "Synth Masters", duration: 198, url: "https://amh767.github.io/api-data/assets/Music/ElectricDreams.mp3" },
      { id: 5, name: "Ocean Waves", artist: "Nature Sounds", duration: 245, url: "https://amh767.github.io/api-data/assets/Music/OceanWaves.mp3" },
    ]
  },
  {
    id: 2,
    name: "Классическая музыка",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    tracks: [
      { id: 6, name: "Moonlight Sonata", artist: "Beethoven", duration: 356, url: "https://amh767.github.io/api-data/assets/Music/MoonlightSonata.mp3" },
      { id: 7, name: "Four Seasons", artist: "Vivaldi", duration: 412, url: "https://amh767.github.io/api-data/assets/Music/FourSeasons.mp3" },
      { id: 8, name: "Symphony No.5", artist: "Mozart", duration: 287, url: "https://amh767.github.io/api-data/assets/Music/SymphonyNo5.mp3" },
      { id: 9, name: "Clair de Lune", artist: "Debussy", duration: 321, url: "https://amh767.github.io/api-data/assets/Music/ClairDeLune.mp3" },
      { id: 10, name: "Für Elise", artist: "Beethoven", duration: 198, url: "https://amh767.github.io/api-data/assets/Music/FurElise.mp3" },
    ]
  },
  {
    id: 3,
    name: "Медитативная музыка",
    cover: "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    tracks: [
      { id: 11, name: "Zen Garden", artist: "Peaceful Sounds", duration: 453, url: "https://amh767.github.io/api-data/assets/Music/ZenGarden.mp3" },
      { id: 12, name: "Meditation", artist: "Mindful Melodies", duration: 512, url: "https://amh767.github.io/api-data/assets/Music/Meditation.mp3" },
      { id: 13, name: "Peaceful Mind", artist: "Tranquil Tunes", duration: 387, url: "https://amh767.github.io/api-data/assets/Music/PeacefulMind.mp3" },
      { id: 14, name: "Tranquil Waters", artist: "Nature Harmony", duration: 421, url: "https://amh767.github.io/api-data/assets/Music/TranquilWaters.mp3" },
      { id: 15, name: "Morning Dew", artist: "Calm Collective", duration: 356, url: "https://amh767.github.io/api-data/assets/Music/MorningDew.mp3" },
    ]
  }
];

export const MusicPlayer: React.FC = () => {
  const { pathname } = useLocation();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, []);

  // Handle track end
  const handleTrackEnd = () => {
    if (repeat) {
      audioRef.current?.play();
    } else {
      playNextTrack();
    }
  };

  // Play next track
  const playNextTrack = () => {
    const allTracks = musicCategories.flatMap(c => c.tracks);
    const currentIndex = allTracks.findIndex(t => t.id === currentPlaying);

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * allTracks.length);
      playTrack(allTracks[randomIndex].id);
    } else if (currentIndex < allTracks.length - 1) {
      playTrack(allTracks[currentIndex + 1].id);
    } else {
      setCurrentPlaying(null);
      setIsPlaying(false);
    }
  };

  // Play previous track
  const playPreviousTrack = () => {
    const allTracks = musicCategories.flatMap(c => c.tracks);
    const currentIndex = allTracks.findIndex(t => t.id === currentPlaying);

    if (currentIndex > 0) {
      playTrack(allTracks[currentIndex - 1].id);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * audioRef.current.duration;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = audioRef.current.volume > 0 ? 0 : volume;
      setVolume(audioRef.current.volume);
    }
  };

  // Filter tracks based on search query
  const filteredCategories = musicCategories.map(category => ({
    ...category,
    tracks: category.tracks.filter(track =>
      track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (track.artist && track.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.tracks.length > 0);

  // Play/pause track
  const playTrack = (trackId: number) => {
    const track = musicCategories
      .flatMap(c => c.tracks)
      .find(t => t.id === trackId);

    if (!track) return;

    if (audioRef.current) {
      if (currentPlaying === trackId) {
        // Toggle play/pause for current track
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        // Play new track
        audioRef.current.pause();
        audioRef.current.src = track.url;
        audioRef.current.volume = volume;
        audioRef.current.play()
          .then(() => {
            setCurrentPlaying(trackId);
            setIsPlaying(true);
          })
          .catch(e => console.error('Play error:', e));
      }
    }
  };

  // Player controls component
  const PlayerControls = () => {
    const currentTrack = musicCategories
      .flatMap(c => c.tracks)
      .find(t => t.id === currentPlaying);

    if (!currentTrack) return null;

    return (
      <div className="player-controls">
        <div className="player-track-info">
          <div className="track-cover" style={{ backgroundImage: `url(${currentTrack.cover || 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa'})` }} />
          <div className="track-details">
            <div className="track-name">{currentTrack.name}</div>
            <div className="track-artist">{currentTrack.artist || 'Unknown Artist'}</div>
          </div>
        </div>

        <div className="player-main-controls">
          <button className={`control-button ${shuffle ? 'active' : ''}`} onClick={() => setShuffle(!shuffle)}>
            <i className="icon-shuffle"></i>
          </button>

          <button className="control-button" onClick={playPreviousTrack}>
            <i className="icon-previous"></i>
          </button>

          <button className="play-button" onClick={() => currentPlaying !== null && playTrack(currentPlaying)}>
            <i className={`icon-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>

          <button className="control-button" onClick={playNextTrack}>
            <i className="icon-next"></i>
          </button>

          <button className={`control-button ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)}>
            <i className="icon-repeat"></i>
          </button>
        </div>

        <div className="player-progress">
          <span className="time-current">{formatTime(currentTime)}</span>

          <div
            ref={progressRef}
            className="progress-bar"
            onClick={handleProgressClick}
          >
            <div
              className="progress-filled"
              style={{ width: `${progress}%` }}
            />
            <div
              className="progress-thumb"
              style={{ left: `${progress}%` }}
            />
          </div>

          <span className="time-total">{formatTime(currentTrack.duration || 0)}</span>
        </div>

        <div className="player-volume">
          <button className="volume-button" onClick={toggleMute}>
            <i className={`icon-volume-${volume === 0 ? 'mute' : volume > 0.5 ? 'high' : 'low'}`}></i>
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            ref={volumeSliderRef}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="music-app">
      {/* Background */}
      <div className="background-overlay"></div>

      {/* Header */}
      <header className="music-header">
        <h1>Музыкальная библиотека</h1>
        <p>Найдите идеальный саундтрек для вашей тренировки</p>
      </header>

      {/* Search */}
      <div className="music-search">
        <div className="search-container">
          <i className="icon-search"></i>
          <input
            type="text"
            placeholder="Поиск треков или исполнителей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              <i className="icon-close"></i>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="music-content">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div key={category.id} className="music-category">
              <div
                className="category-header"
                onClick={() => toggleCategory(category.id)}
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${category.cover})` }}
              >
                <h2>{category.name}</h2>
                <span className="track-count">{category.tracks.length} треков</span>
                <i className={`expand-icon ${expandedCategory === category.id ? 'expanded' : ''}`}></i>
              </div>

              {expandedCategory === category.id && (
                <div className="track-list">
                  {category.tracks.map(track => (
                    <div
                      key={track.id}
                      className={`track-item ${currentPlaying === track.id ? 'active' : ''}`}
                      onClick={() => playTrack(track.id)}
                    >
                      <div className="track-cover" style={{ backgroundImage: `url(${track.cover || category.cover})` }} />

                      <div className="track-info">
                        <div className="track-name">{track.name}</div>
                        <div className="track-artist">{track.artist || 'Unknown Artist'}</div>
                      </div>

                      <div className="track-duration">
                        {formatTime(track.duration || 0)}
                      </div>

                      <div className="track-play-icon">
                        {currentPlaying === track.id ? (
                          <div className={`playing-animation ${isPlaying ? 'playing' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        ) : (
                          <i className="icon-play"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <i className="icon-music-off"></i>
            <p>Ничего не найдено</p>
            <button onClick={() => setSearchQuery('')}>Сбросить поиск</button>
          </div>
        )}
      </main>

      {/* Player Controls */}
      {currentPlaying && <PlayerControls />}

      {/* Audio Element */}
      <audio ref={audioRef} />

      {/* Styles */}
      <style>{`
        .music-app {
          position: relative;
          min-height: 100vh;
          padding-bottom: 100px;
          color: #fff;
        }

        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          z-index: -1;
        }

        .music-header {
          padding: 2rem 1.5rem 1rem;
          text-align: center;
        }

        .music-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .music-header p {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
        }

        .music-search {
          padding: 0 1.5rem 1.5rem;
        }

        .search-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255,255,255,0.1);
          border-radius: 50px;
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          transition: all 0.3s;
        }

        .search-container:focus-within {
          background: rgba(255,255,255,0.15);
        }

        .search-container i {
          margin-right: 0.5rem;
          color: rgba(255,255,255,0.7);
        }

        .search-container input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          padding: 0.5rem 0;
          font-size: 1rem;
        }

        .search-container input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .search-container input:focus {
          outline: none;
        }

        .clear-search {
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          padding: 0.25rem;
        }

        .music-content {
          padding: 0 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .music-category {
          margin-bottom: 1.5rem;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .category-header {
          padding: 1.5rem;
          position: relative;
          cursor: pointer;
          background-size: cover;
          background-position: center;
        }

        .category-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .track-count {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.8);
        }

        .expand-icon {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          transition: all 0.3s;
        }

        .expand-icon:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          width: 10px;
          height: 10px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transition: all 0.3s;
        }

        .expand-icon.expanded:before {
          transform: translate(-50%, -50%) rotate(135deg);
        }

        .track-list {
          padding: 0.5rem 0;
        }

        .track-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .track-item:hover {
          background: rgba(255,255,255,0.1);
        }

        .track-item.active {
          background: rgba(74, 108, 247, 0.2);
        }

        .track-cover {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          background-size: cover;
          background-position: center;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .track-info {
          flex: 1;
          min-width: 0;
        }

        .track-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-artist {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-duration {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          margin: 0 1rem;
        }

        .track-play-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .playing-animation {
          display: flex;
          align-items: flex-end;
          height: 16px;
          gap: 2px;
        }

        .playing-animation span {
          display: inline-block;
          width: 3px;
          background: #4a6cf7;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .playing-animation.playing span:nth-child(1) {
          height: 6px;
          animation: equalize 1.5s infinite 0s;
        }

        .playing-animation.playing span:nth-child(2) {
          height: 10px;
          animation: equalize 1.5s infinite 0.2s;
        }

        .playing-animation.playing span:nth-child(3) {
          height: 8px;
          animation: equalize 1.5s infinite 0.4s;
        }

        @keyframes equalize {
          0% { height: 6px; }
          50% { height: 14px; }
          100% { height: 6px; }
        }

        .no-results {
          text-align: center;
          padding: 3rem 0;
          color: rgba(255,255,255,0.7);
        }

        .no-results i {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .no-results p {
          margin-bottom: 1.5rem;
        }

        .no-results button {
          background: rgba(255,255,255,0.1);
          border: none;
          color: #fff;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .no-results button:hover {
          background: rgba(255,255,255,0.2);
        }

        .player-controls {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to right, #4a6cf7, #6a11cb);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 1000;
        }

        .player-track-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .player-track-info .track-cover {
          width: 50px;
          height: 50px;
          border-radius: 8px;
        }

        .track-details {
          flex: 1;
          min-width: 0;
        }

        .track-details .track-name {
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-details .track-artist {
          font-size: 0.875rem;
          opacity: 0.8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-main-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }

        .control-button {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s;
          padding: 0.5rem;
        }

        .control-button:hover {
          opacity: 1;
        }

        .control-button.active {
          opacity: 1;
          color: #ffeb3b;
        }

        .play-button {
          background: #fff;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #4a6cf7;
          font-size: 1.5rem;
        }

        .play-button:hover {
          transform: scale(1.05);
        }

        .player-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .time-current, .time-total {
          font-size: 0.75rem;
          opacity: 0.7;
          min-width: 40px;
        }

        .progress-bar {
          flex: 1;
          height: 4px;
          background: rgba(255,255,255,0.3);
          border-radius: 2px;
          cursor: pointer;
          position: relative;
        }

        .progress-filled {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #fff;
          border-radius: 2px;
        }

        .progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .progress-bar:hover .progress-thumb {
          opacity: 1;
        }

        .player-volume {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: absolute;
          right: 1rem;
          top: 1rem;
        }

        .volume-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 1.25rem;
          opacity: 0.7;
        }

        .volume-button:hover {
          opacity: 1;
        }

        .volume-slider {
          width: 80px;
          opacity: 0;
          transition: all 0.2s;
        }

        .player-volume:hover .volume-slider {
          opacity: 1;
        }

        /* Icons (using Unicode or you can replace with actual icon font) */
        .icon-search:before { content: "🔍"; }
        .icon-close:before { content: "✕"; }
        .icon-music-off:before { content: "🎵"; }
        .icon-shuffle:before { content: "🔀"; }
        .icon-previous:before { content: "⏮"; }
        .icon-play:before { content: "▶"; }
        .icon-pause:before { content: "⏸"; }
        .icon-next:before { content: "⏭"; }
        .icon-repeat:before { content: "🔁"; }
        .icon-volume-high:before { content: "🔊"; }
        .icon-volume-low:before { content: "🔉"; }
        .icon-volume-mute:before { content: "🔇"; }
      `}</style>
    </div>
  );
};
