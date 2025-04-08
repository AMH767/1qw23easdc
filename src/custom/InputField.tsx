import React, {FC} from 'react';

import {utils} from '../utils';
// import {svg} from '../assets/svg';
import {theme} from '../constants';

type Props = {
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  type?: 'text' | 'password';
  clickable?: boolean;
  containerStyle?: React.CSSProperties;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  placeholder?: string;
};

export const InputField: FC<Props> = ({
  placeholder,
  containerStyle,
  autoCapitalize = 'none',
  leftIcon,
  label,
  rightIcon,
  clickable,
  type = 'text',
}) => {
  return (
    <div
      className='custom-block'
      style={{
        height: 60,
        padding: '7px 20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <div style={{width: '100%', marginRight: 20}}>
        <div
          style={{
            fontSize: 12,
            marginBottom: 2,
            color: theme.colors.secondaryTextColor,
            ...theme.fonts.LeagueSpartan_300Light,
          }}
        >
          {label}
        </div>
        <input
          className='input-field'
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          maxLength={50}
          type={type}
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
            margin: 0,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: 16,
            color: theme.colors.mainColor,
            ...theme.fonts.Lato_400Regular,
          }}
        />
      </div>

      {rightIcon && !clickable && <div>{rightIcon}</div>}
      {rightIcon && clickable && <button>{rightIcon}</button>}
    </div>
  );
};
