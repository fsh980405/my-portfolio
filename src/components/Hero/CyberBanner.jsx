import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CyberBanner.module.scss';

const messages = [
  "UI·UX Design | Designing for Human-Centric Experiences",
  "AI Powered | Merging Creativity with Machine Intelligence",
  "Cyber Aesthetics | Exploring Future Digital Interfaces",
  "Interactive Motion | Bringing Static Concepts to Life"
];

const CyberBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.bannerWrapper}>
      <motion.div 
        className={styles.cyberContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.textContainer}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.2 }}
          >
            <span className={styles.icon} />
            <span className={styles.glitchText} data-text={messages[index]}>
              {messages[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CyberBanner;
