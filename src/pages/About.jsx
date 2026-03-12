import { useTranslation } from 'react-i18next';
import { Star, Target, CheckCircle, Globe2 } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
    const { t } = useTranslation();

    return (
        <>
            <div className={`${styles.header} glass-panel animate-on-scroll`}>
                <div className="container text-center">
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('about.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        {t('about.subtitle')}
                    </p>
                </div>
            </div>

            <div className="section container">
                <div className={styles.grid}>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                        <div className={styles.iconWrapper}>
                            <Globe2 size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.s1_title')}</h2>
                        <p className="text-body mt-2">{t('about.s1_desc')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                        <div className={styles.iconWrapper}>
                            <Target size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.s2_title')}</h2>
                        <p className="text-body mt-2">{t('about.s2_desc')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                        <div className={styles.iconWrapper}>
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.s4_title')}</h2>
                        <p className="text-body mt-2">{t('about.s4_desc')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.4s' }}>
                        <div className={styles.iconWrapper}>
                            <Star size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.s3_title')}</h2>
                        <ul className={styles.diffList}>
                            <li>{t('about.s3_1')}</li>
                            <li>{t('about.s3_2')}</li>
                            <li>{t('about.s3_3')}</li>
                            <li>{t('about.s3_4')}</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}
