import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

export const LazyImage: React.FC<LazyImageProps> = ({src, alt, style}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <>
      {!loaded && <div className='spinner'>Loading...</div>}
      {loaded && (
        <img
          src={src}
          alt={alt}
          style={style}
        />
      )}
    </>
  );
};
