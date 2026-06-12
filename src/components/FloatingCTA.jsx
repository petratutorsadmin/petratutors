import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const shouldHide = entries.some(entry => entry.isIntersecting);
            setHidden(shouldHide);
        }, { rootMargin: '0px' });

        const observeTargets = () => {
            const targets = document.querySelectorAll('#hero-ctas, [id$="-form"], footer');
            targets.forEach(el => observer.observe(el));
        };

        observeTargets();
        const timeout = setTimeout(observeTargets, 500);

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [pathname]);

    return (
        <Link
            to="/inquiry"
            className={`${styles.floatingButton} ${hidden ? styles.hidden : ''}`}
        >
            <div className={styles.iconWrapper}>
                <Calendar size={20} />
            </div>
            <span className={styles.ctaText}>{t('nav.inquiry', 'Free Consultation')}</span>
        </Link>
    );
}
