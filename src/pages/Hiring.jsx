import { useTranslation } from 'react-i18next';
import { Globe, Clock, HeartHandshake, BookOpen, Users, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import styles from './Hiring.module.css';

export default function Hiring() {
    const { t } = useTranslation();

    return (
        <>
            <SEO 
                title={`${t('hiring.title', 'Join Our Team')} | Petra Tutors`}
                description={t('hiring.subtitle_1', 'Petra Tutors is looking for thoughtful, academically strong mentors.')}
                path="/hiring"
            />
            
            <div className={styles.header}>
                <div className="container text-center animate-on-scroll">
                    <h1 className="text-h1" style={{ marginBottom: '1.5rem', color: 'var(--c-white)' }}>
                        {t('hiring.title', 'Join Our Educator Network')}
                    </h1>
                    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p className="text-large" style={{ color: 'rgba(255,255,255,0.9)' }}>
                            {t('hiring.subtitle_1')}
                        </p>
                        <p className="text-large" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {t('hiring.subtitle_2')}
                        </p>
                        <p className="text-large" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                            {t('hiring.subtitle_3')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className={styles.hiringLayout}>
                    {/* Left Side: Benefits & Info */}
                    <div className={`${styles.benefitsSection} animate-on-scroll`}>
                        <h2 className={styles.benefitsTitle}>{t('hiring.benefits_title', 'Why Teach With Us?')}</h2>
                        
                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <Globe size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b1_title')}</h3>
                                <p>{t('hiring.b1_desc')}</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <Clock size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b2_title')}</h3>
                                <p>{t('hiring.b2_desc')}</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <HeartHandshake size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b3_title')}</h3>
                                <p>{t('hiring.b3_desc')}</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <BookOpen size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b4_title')}</h3>
                                <p>{t('hiring.b4_desc')}</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem}>
                            <div className={styles.benefitIcon}>
                                <Users size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b5_title')}</h3>
                                <p>{t('hiring.b5_desc')}</p>
                            </div>
                        </div>

                        <div className={styles.benefitItem} style={{ marginBottom: 0 }}>
                            <div className={styles.benefitIcon}>
                                <TrendingUp size={24} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{t('hiring.b6_title')}</h3>
                                <p>{t('hiring.b6_desc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Google Form Iframe */}
                    <div className={`glass-card ${styles.iframeContainer} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                        <iframe 
                            src="https://docs.google.com/forms/d/e/1FAIpQLScJRwhDIO90013z6_dX9fOOVXay9V5iXdd_OrFHKp7CIEM_-g/viewform?embedded=true"
                            width="100%"
                            height="1500"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                            style={{ border: 'none', maxWidth: '100%' }}
                            title="Petra Tutors Hiring Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    );
}
