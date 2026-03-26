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
                <p className="text-large" style={{ color: 'var(--c-text-light)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                    {t('inquiry.success_desc')}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/tutors" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontWeight: 600 }}>
                        {t('nav.tutors')}
                    </Link>
                    <Link to="/programs" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontWeight: 600 }}>
                        {t('nav.programs')}
                    </Link>
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '0.95rem', color: 'var(--c-text-light)' }}>
                        In the meantime, feel free to read more <Link to="/about" style={{ color: 'var(--c-gold)', fontWeight: 600, textDecoration: 'none' }}>{t('nav.about')}</Link> or follow our latest updates.
                    </p>
                </div>
            </div>
        </div>
    );
}
