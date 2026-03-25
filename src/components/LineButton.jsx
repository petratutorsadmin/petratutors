import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './LineButton.module.css';

export default function LineButton() {
    const { t } = useTranslation();
    
    // Placeholder URL - change to actual LINE account link
    const lineUrl = t('nav.line_url');

    return (
        <a 
            href={lineUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.lineButton}
            aria-label="Contact on LINE"
        >
            <div className={styles.iconWrapper}>
                <MessageCircle size={24} fill="currentColor" />
            </div>
            <span className={styles.ctaText}>{t('nav.line_cta')}</span>
        </a>
    );
}
