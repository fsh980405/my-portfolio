
import React, { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  children,
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  const drawSparks = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    sparksRef.current = sparksRef.current.filter((spark) => now - spark.startTime < duration);

    sparksRef.current.forEach((spark) => {
      const elapsed = now - spark.startTime;
      const progress = elapsed / duration;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const distance = sparkRadius * easeOut * 2;
      const opacity = 1 - progress;
      const size = sparkSize * (1 - progress);

      ctx.fillStyle = sparkColor;
      ctx.globalAlpha = opacity;

      for (let i = 0; i < sparkCount; i++) {
        const angle = (i * 2 * Math.PI) / sparkCount + spark.rotation;
        const x = spark.x + Math.cos(angle) * distance;
        const y = spark.y + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    if (sparksRef.current.length > 0) {
      requestAnimationFrame(drawSparks);
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sparksRef.current.push({
      x,
      y,
      startTime: Date.now(),
      rotation: Math.random() * Math.PI,
    });

    if (sparksRef.current.length === 1) {
      requestAnimationFrame(drawSparks);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
