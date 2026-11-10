import React from 'react';

export const RobuxIcon = ({
  size = 18,
  className = '',
  style = {},
  color = 'currentColor',
}) => {
  return (
    <span
      className={`robux-icon ${className}`}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        backgroundColor: color,
        WebkitMaskImage: 'url(/robux-icon.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/robux-icon.png)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      aria-label="Robux"
      role="img"
    />
  );
};

export default RobuxIcon;
