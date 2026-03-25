import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, BookOpen, GraduationCap, Users, CheckCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.css';
import ComparisonSection from '../components/ComparisonSection';

export default function Home() {
    const { t } = useTranslation();

    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={`container ${styles.heroContainer} animate-on-scroll`}>
                    <h1 className={`text-h1 ${styles.heroTitle}`}>
                        {t('home.hero_title')}
                    </h1>
                    <p className={`text-large ${styles.heroSubtitle}`}>
                        {t('home.hero_subtitle')}
                    </p>
                    <div className={styles.heroCtas}>
                        <Link to="/inquiry" className="btn btn-primary">{t('home.cta_primary')}</Link>
                        <Link to="/programs" className="btn btn-secondary">{t('home.cta_secondary')}</Link>
                    </div>
                    <p className={styles.scarcityNote}>{t('home.scarcity_note')}</p>
                </div>
            </section>

            {/* Match Guarantee Strip */}
            <section className={styles.matchGuarantee}>
                <div className="container">
                    <div className={`${styles.matchGrid} animate-on-scroll`}>
                        <div className={styles.matchIcon}>
                            <CheckCircle size={40} />
                        </div>
                        <div className={styles.matchText}>
                            <h2 className="text-h4" style={{ marginBottom: '0.25rem' }}>{t('home.match_guarantee_title')}</h2>
                            <p style={{ fontSize: '1rem', color: 'var(--c-text-light)' }}>{t('home.match_guarantee_body')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Stats Section */}
            <section className={styles.trustStats}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statItem} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                            <div className={styles.statValue}>95%</div>
                            <div className={styles.statLabel}>{t('home.trust_stats_1')}</div>
                        </div>
                        <div className={`${styles.statItem} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.statValue}>+1.0</div>
                            <div className={styles.statLabel}>{t('home.trust_stats_2')}</div>
                        </div>
                        <div className={`${styles.statItem} animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                            <div className={`${styles.statValue} ${styles.authorityStat}`}>{t('home.trust_stats_3_value')}</div>
                            <div className={styles.statLabel}>{t('home.trust_stats_3')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Value Section (About) */}
            <section className={`section ${styles.about}`}>
                <div className="container">
                    <div className={`${styles.aboutGrid} animate-on-scroll`}>
                        <div className={styles.aboutContent}>
                            <h2 className="text-h2">{t('home.about_title')}</h2>
                            <p className="text-body" style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '500' }}>
                                {t('home.about_p1')}
                            </p>
                            <p className="text-body">
                                {t('home.about_p2')}
                            </p>
                        </div>
                        <div className={styles.aboutVisual}>
                            <img src="/images/home/about.jpg" alt="Tutor and student" className={styles.aboutImage} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Perfect Match Section */}
            <section className={`section ${styles.perfectMatch}`}>
                <div className="container">
                    <h2 className="text-h2 text-center animate-on-scroll" style={{ marginBottom: '3rem' }}>{t('home.support_title')}</h2>
                    <div className={styles.matchCards}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`glass-card ${styles.matchCard} animate-on-scroll`} style={{ animationDelay: `${i * 0.1}s` }}>
                                <CheckCircle className={styles.matchCheck} size={20} />
                                <span>{t(`home.support_${i}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <ComparisonSection />

            {/* Program Highlights */}
            <section className={`section ${styles.programs}`}>
                <div className="container">
                    <div className={`${styles.sectionHeader} animate-on-scroll`}>
                        <h2 className="text-h2">{t('home.programs_title')}</h2>
                        <Link to="/programs" className={styles.linkWithIcon}>{t('home.view_all')} <ArrowRight size={16} /></Link>
                    </div>
                    <div className={styles.programsGrid}>
                        <div className={`glass-card ${styles.programCard} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                            <div className={styles.iconWrapper}>
                                <BookOpen className={styles.programIcon} size={28} />
                            </div>
                            <h3 className="text-h4">{t('home.prog_lang_title')}</h3>
                            <p>{t('home.prog_lang_desc')}</p>
                        </div>
                        <div className={`glass-card ${styles.programCard} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.iconWrapper}>
                                <GraduationCap className={styles.programIcon} size={28} />
                            </div>
                            <h3 className="text-h4">{t('home.prog_exam_title')}</h3>
                            <p>{t('home.prog_exam_desc')}</p>
                        </div>
                        <div className={`glass-card ${styles.programCard} animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                            <div className={styles.iconWrapper}>
                                <Globe2 className={styles.programIcon} size={28} />
                            </div>
                            <h3 className="text-h4">{t('home.prog_intl_title')}</h3>
                            <p>{t('home.prog_intl_desc')}</p>
                        </div>
                    </div>
                    <div className="text-center" style={{ marginTop: '3rem' }}>
                        <Link to="/inquiry" className="btn btn-primary">{t('home.cta_primary')}</Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className={`section ${styles.howItWorks}`}>
                <div className="container">
                    <h2 className="text-h2 text-center animate-on-scroll" style={{ marginBottom: 'var(--space-lg)' }}>{t('home.how_title')}</h2>
                    <div className={styles.stepsGrid}>
                        <div className={`${styles.step} animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                            <div className={styles.stepNumber}>1</div>
                            <h3 className="text-h4">{t('home.step1_title')}</h3>
                            <p>{t('home.step1_desc')}</p>
                        </div>
                        <div className={`${styles.step} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                            <div className={styles.stepNumber}>2</div>
                            <h3 className="text-h4">{t('home.step2_title')}</h3>
                            <p>{t('home.step2_desc')}</p>
                        </div>
                        <div className={`${styles.step} animate-on-scroll`} style={{ animationDelay: '0.3s' }}>
                            <div className={styles.stepNumber}>3</div>
                            <h3 className="text-h4">{t('home.step3_title')}</h3>
                            <p>{t('home.step3_desc')}</p>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--c-text-light)' }}>
                                {t('home.match_guarantee_body')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Snapshot */}
            <section className={`section ${styles.snapshot}`}>
                <div className="container">
                    <div className={styles.snapshotGrid}>
                        <div className={`glass-card ${styles.trustCard} animate-on-scroll`}>
                            <h2 className="text-h3" style={{ marginBottom: '1.5rem' }}>{t('home.match_guarantee_title')}</h2>
                            <p className="text-body" style={{ marginBottom: '2rem' }}>{t('home.match_guarantee_body')}</p>
                            <div className={styles.noFeeBadge}>
                                <Check size={20} /> {t('home.comp_4_petra')}
                            </div>
                        </div>
                        <div className={`glass-card ${styles.pricingCard} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-h3" style={{ marginBottom: '0.5rem' }}>{t('home.pricing_title')}</h2>
                            <p className={styles.pricingSub}>{t('home.pricing_sub')}</p>
                            <div className={styles.priceItems}>
                                <div className={styles.priceItem}>
                                    <span>{t('home.price_lang')}</span>
                                    <div>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.from')}</span>
                                        <strong style={{ fontSize: '1.5rem' }}>3,500</strong>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.per_hr')}</span>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t('home.price_lang_avg')}</div>
                                    </div>
                                </div>
                                <div className={styles.priceItem}>
                                    <span>{t('home.price_acad')}</span>
                                    <div>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.from')}</span>
                                        <strong style={{ fontSize: '1.5rem' }}>7,000</strong>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.per_hr')}</span>
                                    </div>
                                </div>
                                <div className={styles.priceItem}>
                                    <span>{t('home.price_adv')}</span>
                                    <div>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.from')}</span>
                                        <strong style={{ fontSize: '1.5rem' }}>10,000</strong>
                                        <span style={{ fontSize: '0.9rem' }}>{t('home.per_hr')}</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/pricing" className={`btn btn-secondary ${styles.pricingBtn}`}>{t('home.view_pricing')}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.finalCta}>
                <div className={`container text-center animate-on-scroll`}>
                    <h2 className="text-h2" style={{ marginBottom: 'var(--space-sm)' }}>{t('home.final_title')}</h2>
                    <p className="text-large" style={{ marginBottom: 'var(--space-md)', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {t('home.final_desc')}
                    </p>
                    <div className={styles.finalCtas}>
                        <Link to="/inquiry" className="btn btn-primary" style={{ backgroundColor: 'var(--c-sand)', color: 'var(--c-navy)' }}>{t('home.final_cta')}</Link>
                        <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                            {t('nav.line_cta')}
                        </a>
                    </div>
                </div>
            </section>

        </>
    );
}
