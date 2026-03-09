import React, { useState, useEffect } from 'react';

const ResponsiveWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Scale down if window is smaller than 1920px
      const newScale = Math.min(windowWidth / 1920, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#060519',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          width: 1920,
          margin: '0 auto',
          zoom: scale,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ResponsiveWrapper;
