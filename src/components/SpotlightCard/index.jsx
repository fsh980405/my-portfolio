
import React, { useRef } from 'react';
import { playMechanicalSound } from '../../utils/audio';
import styles from './index.module.scss';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.15)', onClick }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`card-spotlight ${styles.cardSpotlight} ${className}`}
    >
      <div className={styles.viewOverlay}>
        <div className={styles.buttonContainer}>
          <div className={styles.autoWrapperGrid}>
            <div className={styles.frame19}>
              {[...Array(6)].map((_, i) => <div key={i} className={styles.rectangle12} />)}
            </div>
            <div className={styles.frame21}>
              {[...Array(6)].map((_, i) => <div key={i} className={styles.rectangle12} />)}
            </div>
            <div className={styles.frame20}>
              {[...Array(16)].map((_, i) => <div key={i} className={styles.rectangle12} />)}
            </div>
            <div className={styles.frame22}>
              {[...Array(16)].map((_, i) => <div key={i} className={styles.rectangle12} />)}
            </div>
          </div>
          <div className={styles.frame7} onMouseEnter={() => playMechanicalSound()}>
            <div className={styles.overlay}>
              <div className={`${styles.corner} ${styles.topLeft}`}>
                <div className={styles.focusLineH} />
                <div className={styles.focusLineV} />
                <div className={styles.accentLineH} />
                <div className={styles.accentLineV} />
              </div>
              <div className={`${styles.corner} ${styles.bottomLeft}`}>
                <div className={styles.focusLineH} />
                <div className={styles.focusLineV} />
                <div className={styles.accentLineH} />
                <div className={styles.accentLineV} />
              </div>
              <div className={`${styles.corner} ${styles.topRight}`}>
                <div className={styles.focusLineH} />
                <div className={styles.focusLineV} />
                <div className={styles.accentLineH} />
                <div className={styles.accentLineV} />
              </div>
              <div className={`${styles.corner} ${styles.bottomRight}`}>
                <div className={styles.focusLineH} />
                <div className={styles.focusLineV} />
                <div className={styles.accentLineH} />
                <div className={styles.accentLineV} />
              </div>
            </div>
            <p className={styles.buttonText}>查看项目</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SpotlightCard;
