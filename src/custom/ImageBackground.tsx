import React, {ReactNode} from 'react';

type Props = {
  src?: string;
  onClick?: () => void;
  children?: ReactNode;
  imageStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

export const ImageBackground: React.FC<Props> = ({
  src,
  onClick,
  children,
  imageStyle,
  containerStyle,
}) => {
  return (
    <div
      onClick={onClick}
      style={{position: 'relative', userSelect: 'none', ...containerStyle}}
    >
      <img
        src={src}
        alt='Image Background'
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...imageStyle,
        }}
      />
      {children}
    </div>
  );
};
