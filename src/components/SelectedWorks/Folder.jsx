import React, { useState } from 'react';
import styles from '../About/index.module.scss'; // Import About styles for button overlay
import './Folder.css';
import { playMechanicalSound } from '../../utils/audio';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color 
      .split('') 
      .map(c => c + c) 
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const maxItems = 3;
  // Ensure we have exactly 2 items for resume and portfolio as requested, but keep logic generic
  const papers = items.slice(0, maxItems);
  
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const handleFolderMouseLeave = () => {
    if (open) {
      setOpen(false);
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  };

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  const playHoverSound = () => {
    playMechanicalSound();
  };

  return (
    <div style={scaleStyle} className={className} onMouseLeave={handleFolderMouseLeave}>
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>
        <div className="folder__back">
          {papers.map((item, i) => (
            <div 
              key={i} 
              className={`paper paper-${i + 1}`} 
              onMouseMove={e => handlePaperMouseMove(e, i)} 
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              onMouseEnter={playHoverSound}
              style={ 
                open 
                  ? { 
                      '--magnet-x': `${paperOffsets[i]?.x || 0}px`, 
                      '--magnet-y': `${paperOffsets[i]?.y || 0}px` 
                    } 
                  : {} 
              } 
            >
              {/* Overlay for paper style to match button */}
              <div className={styles.overlay} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                <div className={`${styles.corner} ${styles.topLeft}`}>
                  <div className={styles.focusLineH} style={{ width: '15px', height: '1px', background: '#4c4a75' }} />
                  <div className={styles.focusLineV} style={{ width: '1px', height: '8px', background: '#4c4a75' }} />
                  <div className={styles.accentLineH} style={{ width: '4px', height: '1px', background: '#ffffff' }} />
                  <div className={styles.accentLineV} style={{ width: '1px', height: '4px', background: '#ffffff' }} />
                </div>
                <div className={`${styles.corner} ${styles.bottomLeft}`}>
                  <div className={styles.focusLineH} style={{ width: '15px', height: '1px', background: '#4c4a75' }} />
                  <div className={styles.focusLineV} style={{ width: '1px', height: '8px', background: '#4c4a75' }} />
                  <div className={styles.accentLineH} style={{ width: '4px', height: '1px', background: '#ffffff' }} />
                  <div className={styles.accentLineV} style={{ width: '1px', height: '4px', background: '#ffffff' }} />
                </div>
                <div className={`${styles.corner} ${styles.topRight}`}>
                  <div className={styles.focusLineH} style={{ width: '15px', height: '1px', background: '#4c4a75' }} />
                  <div className={styles.focusLineV} style={{ width: '1px', height: '8px', background: '#4c4a75' }} />
                  <div className={styles.accentLineH} style={{ width: '4px', height: '1px', background: '#ffffff' }} />
                  <div className={styles.accentLineV} style={{ width: '1px', height: '4px', background: '#ffffff' }} />
                </div>
                <div className={`${styles.corner} ${styles.bottomRight}`}>
                  <div className={styles.focusLineH} style={{ width: '15px', height: '1px', background: '#4c4a75' }} />
                  <div className={styles.focusLineV} style={{ width: '1px', height: '8px', background: '#4c4a75' }} />
                  <div className={styles.accentLineH} style={{ width: '4px', height: '1px', background: '#ffffff' }} />
                  <div className={styles.accentLineV} style={{ width: '1px', height: '4px', background: '#ffffff' }} />
                </div>
              </div>
              
              {item} 
            </div> 
          ))} 
          <div className="folder__front"></div> 
          <div className="folder__front right"></div> 
        </div> 
      </div> 
    </div> 
  );
};

export default Folder;
