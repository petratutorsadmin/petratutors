import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane, FileText, RefreshCcw, ArrowRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import AboutTimeline from '../components/AboutTimeline';
import styles from './About.module.css';

export default function About() {
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } },
        viewport: { once: true, margin: "-50px" }
    };

    return (
        <div className={styles.pageRoot}>
            <SEO 
                title={`${t('about.title')} | Petra Tutors`}
                description={t('about.subtitle')}
                path="/about"
            />

            {/* Reading Progress Bar */}
            <motion.div className={styles.progressBar} style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'var(--c-accent)', transformOrigin: '0%', zIndex: 1000 }} />

            {/* Stage 1: Hero & Identity */}
            <div className={styles.header}>
                <div className="container">
                    <motion.h1 
                        className={styles.heroTagline}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {t('about.subtitle')}
                    </motion.h1>
                </div>
            </div>

            <motion.section className={styles.narrativeStage} {...fadeInUp}>
                <div className="container">
                    <div className={styles.stageHero}>
                        <h2 className={styles.stageTitle}>{t('about.stage1_title')}</h2>
                        <p className={styles.pacingParagraph} style={{ fontSize: '1.6rem', fontWeight: 500, color: 'var(--c-navy)', lineHeight: 1.4 }}>
                            {t('about.stage1_p1')}
                        </p>
                    </div>
                </div>
            </motion.section>

            <section className={`${styles.narrativeStage} ${styles.darkSection}`}>
                <div className="container">
                    <motion.div className={styles.pullQuote} {...fadeInUp}>
                        <blockquote className={styles.quoteText}>
                            "{t('about.quote_1')}"
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Stage 2: The Journey */}
            <section className={styles.narrativeStage}>
                <div className="container">
                    <div className={styles.editorialSplit}>
                        <motion.div className={styles.imagePlaceholder} {...fadeInUp}>
                            {/* PLACEHOLDER: Image of 'International Academic Mobility' or 'Travel/Airport' */}
                            <p>[Image: International Academic Mobility]</p>
                        </motion.div>
                        <motion.div className={styles.contentBlock} {...fadeInUp} transition={{ delay: 0.2 }}>
                            <h2 className={styles.stageTitle}>{t('about.stage2_title')}</h2>
                            <p className={styles.pacingParagraph}>{t('about.stage2_p1')}</p>
                            <p className={styles.pacingParagraph}>{t('about.stage2_p2')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <AboutTimeline />

            {/* Stage 3: The Absence (Contrast) */}
            <section className={`${styles.narrativeStage} ${styles.darkSection}`}>
                <div className="container">
                    <div className={`${styles.editorialSplit} ${styles.reverse}`}>
                        <motion.div className={styles.contentBlock} {...fadeInUp}>
                            <h2 className={styles.stageTitle}>{t('about.stage3_title')}</h2>
                            <p className={styles.pacingParagraph} style={{ fontSize: '1.4rem', color: 'var(--c-accent)', marginBottom: '2rem' }}>
                                {t('about.stage3_p1')}
                            </p>
                            <p className={styles.pacingParagraph}>{t('about.stage3_p2')}</p>
                            <p className={styles.pacingParagraph}>{t('about.stage3_p3')}</p>
                        </motion.div>
                        <motion.div className={styles.imagePlaceholder} {...fadeInUp} transition={{ delay: 0.2 }}>
                            {/* PLACEHOLDER: Image of 'Rigorous Academia' or 'Studying Hard/Library' */}
                            <p>[Image: Rigorous Academia]</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Designed for International Education */}
            <section className={styles.designedSection}>
                <div className="container">
                    <motion.div className={styles.designedHeader} {...fadeInUp}>
                        <h2 className="text-h2" style={{ color: 'var(--c-navy)', marginBottom: '1rem' }}>{t('about.designed_title')}</h2>
                        <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '700px' }}>
                            {t('about.designed_subtitle')}
                        </p>
                    </motion.div>

                    <motion.div 
                        className={styles.identityGrid}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        {[
                            { key: 'ib', glyph: 'IB' },
                            { key: 'returnee', glyph: <Plane size={24} strokeWidth={1.5} /> },
                            { key: 'bilingual', glyph: 'あ/A' },
                            { key: 'uni', glyph: <FileText size={24} strokeWidth={1.5} /> },
                            { key: 'system', glyph: <RefreshCcw size={24} strokeWidth={1.5} /> }
                        ].map((item, idx) => (
                            <motion.div 
                                key={item.key} 
                                className={styles.identityItem}
                                variants={fadeInUp}
                                whileHover={{ y: -8, rotateZ: idx % 2 === 0 ? 1 : -1, backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <motion.div 
                                    className={styles.glyph}
                                    whileHover={{ scale: 1.1, backgroundColor: 'var(--c-accent)', color: 'var(--c-navy)' }}
                                >
                                    {item.glyph}
                                </motion.div>
                                <div className={styles.identityContent}>
                                    <h3 className={styles.identityTitle}>{t(`about.cat_${item.key}_title`)}</h3>
                                    <p className={styles.identityDesc}>{t(`about.cat_${item.key}_desc`)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stage 4: Philosophy */}
            <section className={styles.narrativeStage}>
                <div className="container">
                    <div className={styles.editorialSplit}>
                        <motion.div className={styles.imagePlaceholder} {...fadeInUp}>
                            {/* PLACEHOLDER: Image of 'Mentorship Connection' or 'Tutor and Student Smiling' */}
                            <p>[Image: Mentorship Connection]</p>
                        </motion.div>
                        <motion.div className={styles.contentBlock} {...fadeInUp} transition={{ delay: 0.2 }}>
                            <h2 className={styles.stageTitle}>{t('about.stage4_title')}</h2>
                            <p className={styles.anchorLine}>{t('about.stage4_anchor')}</p>
                            <p className={styles.pacingParagraph}>{t('about.stage4_p1')}</p>
                            <p className={styles.pacingParagraph}>{t('about.stage4_p2')}</p>
                            <p className={styles.foundationLine}>{t('about.stage4_foundation')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className={styles.taglineSection}>
                <div className="container">
                    <motion.h2 className={styles.taglineText} {...fadeInUp}>{t('about.stage4_tagline')}</motion.h2>
                    <motion.div className={styles.finalVisualPlaceholder} {...fadeInUp} transition={{ delay: 0.3 }}>
                        {/* PLACEHOLDER: Image of 'Quiet Academic Focus' or 'Premium Wide Aesthetic Shot' */}
                        <p>[Image: Premium Wide Aesthetic Shot / Quiet Academic Focus]</p>
                    </motion.div>
                </div>
            </section>

            {/* Final Conversion Section */}
            <section className={styles.conversionSection}>
                <div className="container">
                    <div className={styles.conversionCard}>
                        <div className={styles.conversionContent}>
                            <h2 className={styles.conversionTitle}>{t('about.cta_title')}</h2>
                            <p className={styles.conversionDesc}>{t('about.cta_desc')}</p>
                            <div className={styles.trustBanner}>
                                {t('about.cta_trust')}
                            </div>
                        </div>
                        <div className={styles.conversionActions}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/inquiry" className={styles.conversionBtn}>
                                    <span>{t('about.cta_btn')}</span>
                                    <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
