import React from 'react';

export const CloudLogo = ({ size = 26, className = '', style = {} }) => {
  return (
    <img
      src="/star-icon.png"
      alt="STARBUX Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain', verticalAlign: 'middle', flexShrink: 0, ...style }}
    />
  );
};

export default CloudLogo;
