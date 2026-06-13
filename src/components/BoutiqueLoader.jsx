import { useState, useEffect } from 'react';
import styles from './BoutiqueLoader.module.css';

export default function BoutiqueLoader() {
  // Start as false so SSR and the initial hydration both render null.
  // useEffect only runs on the client, so the loader activates after
  // React has successfully hydrated — no server/client mismatch.
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setShouldRender(true);
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
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
