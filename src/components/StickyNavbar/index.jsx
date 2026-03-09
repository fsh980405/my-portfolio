import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

const StickyNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky navbar when user scrolls past 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Update active section based on scroll position
      const sections = ['hero', 'works', 'experience', 'visual', 'about', 'contact'];
      let currentSection = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section;
          }
        }
      }
      
      // If we're in experience or visual, highlight 'works'
      if (currentSection === 'experience' || currentSection === 'visual') {
        setActiveSection('works');
      } else {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: '首页' },
    { id: 'works', label: '项目' },
    { id: 'about', label: '关于我' },
    { id: 'contact', label: '联系我' }
  ];

  return (
    <div className={`${styles.stickyNavbar} ${isVisible ? styles.visible : ''}`}>
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
      
      <div className={styles.navContent}>
        <div className={styles.logoWrapper}>
          <img src="/image/mmbrxp12-60rzd06.svg" className={styles.atomIcon} alt="Logo" />
          <div className={styles.logoText}>
            <span className={styles.fSh}>FSH&nbsp;</span>
            <span className={styles.fSh}>X</span>
            <span className={styles.fSh}>Vibe</span>
          </div>
        </div>
        <div className={styles.navItemsWrapper}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyNavbar;
