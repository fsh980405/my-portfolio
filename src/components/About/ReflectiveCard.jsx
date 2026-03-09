import React, { useId, useState, useRef } from 'react';

const ReflectiveCard = ({
  children,
  className,
  style,
  overlayColor = "rgba(0, 0, 0, 0.2)",
  blurStrength = 0, // Default 0 to keep image visible, user passed 12 which is strong
  glassDistortion = 10,
  metalness = 1,
  roughness = 0.75,
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 5,
  grayscale = 0,
  color = "#ffffff"
}) => {
  const id = useId();
  const filterId = `reflective-filter-${id.replace(/:/g, '')}`;
  const containerRef = useRef(null);
  const [lightPos, setLightPos] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLightPos({ x, y });
  };

  const handleMouseLeave = () => {
    // Optional: reset or keep last position
    // setLightPos({ x: 100, y: 100 });
  };

  return (
    <div 
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        ...style 
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency={noiseScale * 0.01} 
              numOctaves="3" 
              result="noise" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={displacementStrength} 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="distorted" 
            />
            <feSpecularLighting 
              in="distorted" 
              specularConstant={specularConstant} 
              specularExponent={roughness * 20} 
              lightingColor={color} 
              result="specular"
            >
              <fePointLight x={lightPos.x} y={lightPos.y} z="200" />
            </feSpecularLighting>
            <feComposite 
              in="specular" 
              in2="distorted" 
              operator="in" 
              result="specularComposite" 
            />
            <feComposite 
              in="SourceGraphic" 
              in2="specularComposite" 
              operator="arithmetic" 
              k1="0" 
              k2="1" 
              k3={metalness} 
              k4="0" 
            />
          </filter>
        </defs>
      </svg>

      <div 
        style={{ 
          filter: `url(#${filterId}) grayscale(${grayscale}) blur(${blurStrength}px)`,
          width: '100%',
          height: '100%',
          transition: 'filter 0.3s ease'
        }}
      >
        {children}
      </div>
      
      {overlayColor && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            zIndex: 2,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
};

export default ReflectiveCard;
