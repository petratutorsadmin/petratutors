import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import styles from './StickyCTA.module.css';

export default function StickyCTA() {
    const { t } = useTranslation();

    return (
        <div className={styles.stickyWrapper}>
            <div className={styles.stickyContainer}>
                <a 
                    href={t('nav.line_url')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.lineLink}
                >
                    <MessageCircle size={20} />
                    <span>LINE</span>
                </a>
                <Link to="/inquiry" className={`btn btn-primary ${styles.mainBtn}`}>
                    {t('nav.inquiry')}
                </Link>
            </div>
        </div>
    );
}
