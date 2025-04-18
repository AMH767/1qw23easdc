import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {text} from '../text';
import {components} from '../components';

interface Track {
  id: number;
  name: string;
  url: string;
}

interface MusicCategory {
  id: number;
  name: string;
  tracks: Track[];
}

const musicCategories: MusicCategory[] = [
  {
    id: 1,
    name: "Музыка перед тренировкой",
    tracks: [
      { id: 1, name: "Lions", url: "https://amh767.github.io/api-data/assets/Music/Lions.mp3" },
      { id: 2, name: "Summer Vibes", url: "https://amh767.github.io/api-data/assets/Music/SummerVibes.mp3" },
      { id: 3, name: "Dreamland", url: "https://amh767.github.io/api-data/assets/Music/Dreamland.mp3" },
      { id: 4, name: "Electric Dreams", url: "https://amh767.github.io/api-data/assets/Music/ElectricDreams.mp3" },
      { id: 5, name: "Ocean Waves", url: "https://amh767.github.io/api-data/assets/Music/OceanWaves.mp3" },
      { id: 6, name: "Sunset Boulevard", url: "https://amh767.github.io/api-data/assets/Music/SunsetBoulevard.mp3" },
      { id: 7, name: "Midnight City", url: "https://amh767.github.io/api-data/assets/Music/MidnightCity.mp3" },
      { id: 8, name: "Starlight", url: "https://amh767.github.io/api-data/assets/Music/Starlight.mp3" },
      { id: 9, name: "Golden Hour", url: "https://amh767.github.io/api-data/assets/Music/GoldenHour.mp3" },
      { id: 10, name: "Urban Jungle", url: "https://amh767.github.io/api-data/assets/Music/UrbanJungle.mp3" }
    ]
  },
  {
    id: 2,
    name: "Музыка перед стартом",
    tracks: [
      { id: 11, name: "Moonlight Sonata", url: "https://amh767.github.io/api-data/assets/Music/MoonlightSonata.mp3" },
      { id: 12, name: "Four Seasons", url: "https://amh767.github.io/api-data/assets/Music/FourSeasons.mp3" },
      { id: 13, name: "Symphony No.5", url: "https://amh767.github.io/api-data/assets/Music/SymphonyNo5.mp3" },
      { id: 14, name: "Air on G String", url: "https://amh767.github.io/api-data/assets/Music/AirOnGString.mp3" },
      { id: 15, name: "Canon in D", url: "https://amh767.github.io/api-data/assets/Music/CanonInD.mp3" },
      { id: 16, name: "Clair de Lune", url: "https://amh767.github.io/api-data/assets/Music/ClairDeLune.mp3" },
      { id: 17, name: "Für Elise", url: "https://amh767.github.io/api-data/assets/Music/FurElise.mp3" },
      { id: 18, name: "Nocturne Op.9", url: "https://amh767.github.io/api-data/assets/Music/NocturneOp9.mp3" },
      { id: 19, name: "The Swan", url: "https://amh767.github.io/api-data/assets/Music/TheSwan.mp3" },
      { id: 20, name: "Waltz of Flowers", url: "https://amh767.github.io/api-data/assets/Music/WaltzOfFlowers.mp3" }
    ]
  },
  {
    id: 3,
    name: "Спокойная музыка для стайеров",
    tracks: [
      { id: 21, name: "Zen Garden", url: "https://amh767.github.io/api-data/assets/Music/ZenGarden.mp3" },
      { id: 22, name: "Meditation", url: "https://amh767.github.io/api-data/assets/Music/Meditation.mp3" },
      { id: 23, name: "Peaceful Mind", url: "https://amh767.github.io/api-data/assets/Music/PeacefulMind.mp3" },
      { id: 24, name: "Tranquil Waters", url: "https://amh767.github.io/api-data/assets/Music/TranquilWaters.mp3" },
      { id: 25, name: "Morning Dew", url: "https://amh767.github.io/api-data/assets/Music/MorningDew.mp3" },
      { id: 26, name: "Forest Whisper", url: "https://amh767.github.io/api-data/assets/Music/ForestWhisper.mp3" },
      { id: 27, name: "Mountain Breeze", url: "https://amh767.github.io/api-data/assets/Music/MountainBreeze.mp3" },
      { id: 28, name: "Desert Mirage", url: "https://amh767.github.io/api-data/assets/Music/DesertMirage.mp3" },
      { id: 29, name: "Celestial Harmony", url: "https://amh767.github.io/api-data/assets/Music/CelestialHarmony.mp3" },
      { id: 30, name: "Deep Relaxation", url: "https://amh767.github.io/api-data/assets/Music/DeepRelaxation.mp3" }
    ]
  }
];

interface HeaderProps {
  title: string;
  goBack: boolean;
  rightElement?: React.ReactNode;
}

const CustomHeader: React.FC<HeaderProps> = ({ title, goBack, rightElement }) => {
  return (
    <components.Header
      title={title}
      goBack={goBack}
      // Добавляем rightElement как children или через дополнительный пропс,
      // в зависимости от реализации вашего компонента Header
    />
  );
};

export const PrivacyMusic: React.FC = () => {
  const {pathname} = useLocation();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    };
    scrollToTop();
  }, [pathname]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const filteredCategories = musicCategories.map(category => ({
    ...category,
    tracks: category.tracks.filter(track => 
      track.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tracks.length > 0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setCurrentPlaying(null);
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', () => {
        setCurrentPlaying(null);
        setIsPlaying(false);
      });
    };
  }, []);

  const playTrack = (trackId: number) => {
    const track = musicCategories
      .flatMap(c => c.tracks)
      .find(t => t.id === trackId);

    if (!track) return;

    if (audioRef.current) {
      if (currentPlaying === trackId) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
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

  const renderPlayerControls = () => {
    const currentTrack = musicCategories
      .flatMap(c => c.tracks)
      .find(t => t.id === currentPlaying);

    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <button
            onClick={() => currentPlaying && playTrack(currentPlaying)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <div style={{flexGrow: 1}}>
            <div ref={progressRef} 
              onClick={handleProgressClick}
              style={{
                height: '4px',
                backgroundColor: '#eee',
                borderRadius: '2px',
                cursor: 'pointer',
                margin: '5px 0'
              }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#339af0',
                borderRadius: '2px'
              }}/>
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '0.9em'}}>
                {currentTrack?.name || 'Выберите трек'}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{width: '100px'}}
              />
              <span>🔊</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImageBackground = (): JSX.Element => {
    return <components.Background version={1} />;
  };
  const renderHeader = (): JSX.Element => {
    return (
      <div style={{
        padding: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <components.Header
          title='Музыкальная библиотека'
          goBack={true}
        />
      </div>
    );
  };
  
  const renderSearch = (): JSX.Element => {
    return (
      <div style={{
        padding: '16px',
      }}>
        <div style={{
          position: 'relative',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Поиск треков..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="music-search-input"
          />
          <span style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </span>
        </div>
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main className='container' style={{paddingBottom: '100px'}}>
        <div style={{marginTop: '10%', marginBottom: 20}}>
          {filteredCategories.map(category => (
            <div 
              key={category.id}
              style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '15px',
                transition: '0.3s all'
              }}
            >
              <div 
                onClick={() => toggleCategory(category.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <text.H5 style={{color: '#339af0'}}>
                  {category.name} ({category.tracks.length})
                </text.H5>
                <span>{expandedCategory === category.id ? '▼' : '▶'}</span>
              </div>
              
              {expandedCategory === category.id && (
                <div style={{marginTop: '15px'}}>
                  {category.tracks.map(track => (
                    <div 
                      key={track.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: currentPlaying === track.id ? '#e3f2fd' : 'transparent',
                        borderRadius: '5px',
                        marginBottom: '5px',
                        cursor: 'pointer',
                        transition: '0.2s background-color'
                      }}
                      onClick={() => playTrack(track.id)}
                    >
                      <text.T14>{track.name}</text.T14>
                      {currentPlaying === track.id ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          <span style={{color: '#339af0'}}>
                            {isPlaying ? '⏸' : '▶'}
                          </span>
                          <span style={{fontSize: '0.8em', color: '#666'}}>
                            {Math.floor(audioRef.current?.duration || 0)}s
                          </span>
                        </div>
                      ) : (
                        <span>▶</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    );
  };

  return (
    <>
      {renderImageBackground()}
      {renderHeader()}
      {renderSearch()}
      {renderContent()}
      {currentPlaying && renderPlayerControls()}
      <audio ref={audioRef} />
    </>
  );
};