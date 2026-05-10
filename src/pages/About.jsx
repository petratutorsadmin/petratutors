import { Link } from 'react-router-dom';
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
                <div className={`${styles.founderBlock} animate-on-scroll`}>
                    <div className={styles.founderContent}>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p1')}</p>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p2')}</p>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p3')}</p>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p4')}</p>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p5')}</p>
                        <p className="text-body" style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{t('about.sec1_p6')}</p>
                        <p className="text-body" style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--c-accent)' }}>{t('about.sec1_p7')}</p>
                    </div>
                </div>

                <div className={styles.grid} style={{ marginTop: 'var(--space-xl)' }}>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                        <div className={styles.iconWrapper}>
                            <Target size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.sec2_title')}</h2>
                        <p className="text-body mt-2">{t('about.sec2_p1')}</p>
                        <p className="text-body mt-2">{t('about.sec2_p2')}</p>
                        <p className="text-body mt-2">{t('about.sec2_p3')}</p>
                        <p className="text-body mt-2">{t('about.sec2_p4')}</p>
                        <p className="text-body mt-2">{t('about.sec2_p5')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                        <div className={styles.iconWrapper}>
                            <Star size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.sec3_title')}</h2>
                        <p className="text-body mt-2">{t('about.sec3_p1')}</p>
                        <p className="text-body mt-2">{t('about.sec3_p2')}</p>
                        <ul className={styles.diffList}>
                            <li>{t('about.sec3_l1')}</li>
                            <li>{t('about.sec3_l2')}</li>
                            <li>{t('about.sec3_l3')}</li>
                            <li>{t('about.sec3_l4')}</li>
                            <li>{t('about.sec3_l5')}</li>
                            <li>{t('about.sec3_l6')}</li>
                        </ul>
                        <p className="text-body mt-2">{t('about.sec3_p3')}</p>
                        <ul className={styles.diffList}>
                            <li>{t('about.sec3_l7')}</li>
                            <li>{t('about.sec3_l8')}</li>
                            <li>{t('about.sec3_l9')}</li>
                            <li>{t('about.sec3_l10')}</li>
                        </ul>
                        <p className="text-body mt-2">{t('about.sec3_p4')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                        <div className={styles.iconWrapper}>
                            <Globe2 size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.sec4_title')}</h2>
                        <p className="text-body mt-2">{t('about.sec4_p1')}</p>
                        <ul className={styles.diffList}>
                            <li>{t('about.sec4_l1')}</li>
                            <li>{t('about.sec4_l2')}</li>
                            <li>{t('about.sec4_l3')}</li>
                            <li>{t('about.sec4_l4')}</li>
                            <li>{t('about.sec4_l5')}</li>
                            <li>{t('about.sec4_l6')}</li>
                            <li>{t('about.sec4_l7')}</li>
                        </ul>
                        <p className="text-body mt-2">{t('about.sec4_p2')}</p>
                    </div>

                    <div className={`glass-card ${styles.card} animate-on-scroll`} style={{ animationDelay: '0.4s' }}>
                        <div className={styles.iconWrapper}>
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-h3">{t('about.sec5_title')}</h2>
                        <p className="text-body mt-2">{t('about.sec5_p1')}</p>
                        <p className="text-body mt-2">{t('about.sec5_p2')}</p>
                        <p className="text-body mt-2">{t('about.sec5_p3')}</p>
                        <p className="text-body mt-2" style={{ fontWeight: 500, color: 'var(--c-accent)' }}>{t('about.sec5_p4')}</p>
                    </div>

                </div>
            </div>

            <section className={styles.finalCta}>
                <div className="container text-center animate-on-scroll">
                    <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>{t('home.final_title')}</h2>
                    <Link to="/inquiry" className="btn btn-primary">{t('home.cta_primary')}</Link>
                </div>
            </section>
        </>
    );
}
