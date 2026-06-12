import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
    const { t } = useTranslation();

    return (
        <Link
            to="/inquiry"
            className={styles.floatingButton}
        >
            <div className={styles.iconWrapper}>
                <Calendar size={20} />
            </div>
            <span className={styles.ctaText}>{t('nav.inquiry', 'Free Consultation')}</span>
        </Link>
    );
}
