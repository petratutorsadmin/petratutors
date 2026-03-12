import { Link } from 'react-router-dom';
import { XCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './NoAdmissionFee.module.css';

export default function NoAdmissionFee() {
    const { t } = useTranslation();

    return (
        <>
            <div className={`${styles.header} glass-panel animate-on-scroll`}>
                <div className="container text-center">
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('no_fee.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        {t('no_fee.subtitle')}
                    </p>
                </div>
            </div>

            <div className="section container">
                <div className={styles.introBlock}>
                    <p className="text-large text-center animate-on-scroll">
                        {t('no_fee.explanation')}
                    </p>
                </div>

                <div className={styles.comparisonGrid}>
                    {/* Competitor Card */}
                    <div className={`glass-card ${styles.competitorCard} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-h3" style={{ color: 'var(--c-text-light)', marginBottom: '1.5rem' }}>
                            {t('no_fee.card1_title')}
                        </h2>
                        <ul className={styles.badList}>
                            <li><XCircle size={20} className={styles.badIcon} /> {t('no_fee.c1_1')}</li>
                            <li><XCircle size={20} className={styles.badIcon} /> {t('no_fee.c1_2')}</li>
                            <li><XCircle size={20} className={styles.badIcon} /> {t('no_fee.c1_3')}</li>
                        </ul>
                    </div>

                    {/* Petra Card */}
                    <div className={`glass-card ${styles.petraCard} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                        <h2 className="text-h3" style={{ color: 'var(--c-navy)', marginBottom: '1.5rem' }}>
                            {t('no_fee.card2_title')}
                        </h2>
                        <ul className={styles.goodList}>
                            <li><CheckCircle size={20} className={styles.goodIcon} /> {t('no_fee.c2_1')}</li>
                            <li><CheckCircle size={20} className={styles.goodIcon} /> {t('no_fee.c2_2')}</li>
                            <li><CheckCircle size={20} className={styles.goodIcon} /> {t('no_fee.c2_3')}</li>
                        </ul>
                    </div>
                </div>

                <div className={`${styles.benefitsSection} animate-on-scroll`}>
                    <h3 className="text-h2 text-center" style={{ marginBottom: '2rem' }}>{t('no_fee.benefits_title')}</h3>
                    <div className={styles.benefitsGrid}>
                        <div className={`glass-card ${styles.benefitItem}`}>
                            <CheckCircle size={28} className={styles.goodIcon} style={{ marginBottom: '1rem' }} />
                            <p className="text-large" style={{ fontWeight: 500 }}>{t('no_fee.b1')}</p>
                        </div>
                        <div className={`glass-card ${styles.benefitItem}`}>
                            <CheckCircle size={28} className={styles.goodIcon} style={{ marginBottom: '1rem' }} />
                            <p className="text-large" style={{ fontWeight: 500 }}>{t('no_fee.b2')}</p>
                        </div>
                        <div className={`glass-card ${styles.benefitItem}`}>
                            <CheckCircle size={28} className={styles.goodIcon} style={{ marginBottom: '1rem' }} />
                            <p className="text-large" style={{ fontWeight: 500 }}>{t('no_fee.b3')}</p>
                        </div>
                    </div>
                </div>

                <div className="text-center animate-on-scroll" style={{ marginTop: 'var(--space-xl)' }}>
                    <Link to="/tutors" className="btn btn-primary">{t('no_fee.cta')}</Link>
                </div>
            </div>
        </>
    );
}
