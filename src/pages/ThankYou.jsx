import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Inquiry.module.css';

export default function ThankYou() {
    const { t } = useTranslation();

    return (
        <div className={`section container ${styles.successContainer}`}>
            <div className={`glass-card ${styles.successCard} animate-on-scroll`}>
                <CheckCircle size={64} className={styles.successIcon} />
                <h1 className="text-h2" style={{ marginBottom: '1rem', color: 'var(--c-navy)' }}>{t('inquiry.success_title')}</h1>
                <p className="text-large" style={{ color: 'var(--c-text-light)', marginBottom: '2rem' }}>
                    {t('inquiry.success_desc')}
                </p>
                <Link to="/inquiry" className="btn btn-primary">{t('inquiry.another')}</Link>
            </div>
        </div>
    );
}
