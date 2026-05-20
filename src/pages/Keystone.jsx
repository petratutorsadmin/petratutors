import { Link } from 'react-router-dom';
import { BookOpen, Edit3, Globe, ArrowRight, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Keystone.module.css';

export default function Keystone() {
    const { t } = useTranslation();

    return (
        <>
            {/* Hero Section */}
            <div className={`${styles.hero} glass-panel animate-on-scroll`}>
                <div className="container text-center">
                    <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                        {t('keystone.eyebrow', 'Student Publication')}
                    </span>
                    <h1 className="text-h1" style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                        {t('keystone.title', 'The Keystone')}
                    </h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                        {t('keystone.subtitle', 'A digital newspaper for ambitious young minds. Write, refine, and get published.')}
                    </p>
                    <div className={styles.heroActions}>
                        <a 
                            href="https://readthekeystone.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary"
                            style={{ gap: '0.5rem' }}
                        >
                            {t('keystone.hero_cta_explore', 'Visit The Keystone')}
                            <Globe size={18} />
                        </a>
                        <Link to="/inquiry" className="btn btn-secondary">
                            {t('keystone.hero_cta_start', 'Start Writing with a Mentor')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Vision / What it is */}
            <div className="section container">
                <div className={styles.visionBlock}>
                    <div className={`${styles.visionCard} glass-card animate-on-scroll`}>
                        <div className={styles.iconContainer}>
                            <BookOpen size={36} className={styles.visionIcon} />
                        </div>
                        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>
                            {t('keystone.vision_title', 'A Platform for Young Thinkers')}
                        </h2>
                        <p className="text-large" style={{ marginBottom: '1.5rem', color: 'var(--c-text)' }}>
                            {t('keystone.vision_text_1')}
                        </p>
                        <p className="text-large" style={{ color: 'var(--c-text-light)' }}>
                            {t('keystone.vision_text_2')}
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works (Step-by-Step) */}
            <div className="section" style={{ backgroundColor: 'rgba(239, 232, 221, 0.4)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
                <div className="container">
                    <h2 className="text-h2 text-center animate-on-scroll" style={{ marginBottom: '4rem' }}>
                        {t('keystone.how_title', 'From Draft to Published Article')}
                    </h2>
                    <div className={styles.stepsGrid}>
                        <div className={`${styles.stepCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                            <div className={styles.stepNum}>{t('keystone.step1_num', '01')}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{t('keystone.step1_title', 'Choose Your Topic')}</h3>
                            <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.step1_desc')}</p>
                        </div>
                        <div className={`${styles.stepCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.stepNum}>{t('keystone.step2_num', '02')}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{t('keystone.step2_title', 'Write & Refine')}</h3>
                            <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.step2_desc')}</p>
                        </div>
                        <div className={`${styles.stepCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                            <div className={styles.stepNum}>{t('keystone.step3_num', '03')}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{t('keystone.step3_title', 'Get Published')}</h3>
                            <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.step3_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits section */}
            <div className="section container">
                <h2 className="text-h2 text-center animate-on-scroll" style={{ marginBottom: '4rem' }}>
                    {t('keystone.benefits_title', 'Why Write for The Keystone?')}
                </h2>
                <div className={styles.benefitsGrid}>
                    <div className={`${styles.benefitCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                        <Award size={28} className={styles.benefitIcon} />
                        <h3 className="text-h3" style={{ margin: '1rem 0' }}>{t('keystone.benefit1_title')}</h3>
                        <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.benefit1_desc')}</p>
                    </div>
                    <div className={`${styles.benefitCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                        <Edit3 size={28} className={styles.benefitIcon} />
                        <h3 className="text-h3" style={{ margin: '1rem 0' }}>{t('keystone.benefit2_title')}</h3>
                        <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.benefit2_desc')}</p>
                    </div>
                    <div className={`${styles.benefitCard} glass-card animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                        <Globe size={28} className={styles.benefitIcon} />
                        <h3 className="text-h3" style={{ margin: '1rem 0' }}>{t('keystone.benefit3_title')}</h3>
                        <p style={{ color: 'var(--c-text-light)' }}>{t('keystone.benefit3_desc')}</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="section" style={{ borderTop: '1px solid var(--c-border)' }}>
                <div className="container text-center">
                    <div className={`${styles.ctaBox} glass-panel animate-on-scroll`}>
                        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>
                            {t('keystone.cta_title')}
                        </h2>
                        <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                            {t('keystone.cta_desc')}
                        </p>
                        <div className={styles.ctaActions}>
                            <Link to="/inquiry" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                                {t('keystone.cta_btn_inquiry', 'Consult with a Mentor')}
                                <ArrowRight size={18} />
                            </Link>
                            <a 
                                href="https://readthekeystone.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-secondary"
                            >
                                {t('keystone.hero_cta_explore', 'Visit The Keystone')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
