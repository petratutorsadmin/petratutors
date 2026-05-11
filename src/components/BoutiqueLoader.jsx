import { useState, useEffect } from 'react';
import styles from './BoutiqueLoader.module.css';

export default function BoutiqueLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Minimum display time to establish the brand presence (1.2s)
    // We combine this with window load event if we want, but since this
    // mounts after JS parses, a fixed timeout creates the calmest experience.
    const timer = setTimeout(() => {
      setIsVisible(false); // Triggers the CSS opacity transition (0.8s)
      
      // 2. Unmount component after transition completes to free DOM
      setTimeout(() => setShouldRender(false), 800); 
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.loaderOverlay} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.brandWrapper}>
        <img 
          src="/logo-optimized.webp" 
          alt="Petra Tutors" 
          className={styles.logoImage} 
          width="48"
          height="48"
        />
        <span className={styles.brandText}>Petra Tutors</span>
      </div>
    </div>
  );
}
