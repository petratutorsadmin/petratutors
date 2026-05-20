import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import styles from './Keystone.module.css';

export default function Keystone() {
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
        whileInView: { transition: { staggerChildren: 0.15 } },
        viewport: { once: true, margin: "-50px" }
    };

    return (
        <div className={styles.pageRoot}>
            <SEO 
                title={`The Keystone | ${t('nav.petra', 'Petra Tutors')}`}
                description={t('keystone.subtitle')}
                path="/keystone"
            />

            {/* Reading Progress Bar */}
            <motion.div 
                className={styles.progressBar} 
                style={{ scaleX }} 
            />

            {/* Stage 1: Hero & Identity */}
            <div className={styles.header}>
                <div className="container text-center">
                    <motion.span 
                        className="eyebrow" 
                        style={{ marginBottom: '1.5rem', display: 'inline-block' }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                        {t('keystone.eyebrow', 'Official Publication')}
                    </motion.span>
                    <motion.h1 
                        className={styles.heroTagline}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
                    >
                        {t('keystone.title', 'The Keystone')}
                    </motion.h1>
                    <motion.p 
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                    >
                        {t('keystone.subtitle')}
                    </motion.p>
                    <motion.div 
                        className={styles.heroActions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                            <a 
                                href="https://readthekeystone.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary"
                                style={{ gap: '0.6rem' }}
                            >
                                <span>{t('keystone.hero_cta_explore', 'Visit The Keystone')}</span>
                                <Globe size={18} />
                            </a>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                            <Link to="/inquiry" className="btn btn-secondary">
                                {t('keystone.hero_cta_start', 'Start Writing with a Mentor')}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Stage 2: The Vision (Editorial Split with Live Interactive Demo) */}
            <motion.section className={styles.narrativeStage} {...fadeInUp}>
                <div className="container">
                    <div className={styles.editorialSplit}>
                        {/* Interactive Digital Frontpage Demo */}
                        <div className={styles.browserFrame}>
                            <div className={styles.browserHeader}>
                                <div className={styles.windowButtons}>
                                    <span className={styles.dotRed}></span>
                                    <span className={styles.dotYellow}></span>
                                    <span className={styles.dotGreen}></span>
                                </div>
                                <div className={styles.urlBar}>readthekeystone.com</div>
                            </div>
                            <div className={styles.browserContent}>
                                <div className={styles.newspaperContainer}>
                                    <div className={styles.newspaperHeader}>
                                        <span className={styles.npMenu}>
                                            <span className={styles.menuIcon}>☰</span> MENU
                                        </span>
                                        <span className={styles.npLogo}>Keystone</span>
                                        <div className={styles.npUser}>
                                            <button className={styles.npLogoutBtn}>LOG IN</button>
                                        </div>
                                    </div>
                                    <div className={styles.newspaperDateBar}>
                                        WEDNESDAY, MAY 20, 2026 • TOKYO
                                    </div>
                                    <div className={styles.newspaperBody}>
                                        <div className={styles.mainColumn}>
                                            <span className={styles.articleEyebrow}>FOUNDERS' NOTE</span>
                                            <h2 className={styles.articleTitle}>WHY WE BUILT THE KEYSTONE</h2>
                                            <span className={styles.articleByline}>PUBLISHED MAY 2026 • TOKYO, JAPAN</span>
                                            
                                            <div className={styles.articleText}>
                                                <p>
                                                    <span className={styles.dropCap}>K</span>eystone was not created because we believed that the world needed another media platform.
                                                </p>
                                                <p>
                                                    It was created because we increasingly felt that most modern institutions, whether that was corporations or universities or media organisations or even education systems, have lost the ability to speak about people as human beings. The new trend, or the new fad, is to look at people as the relations of relationships they have with other people or what they are relative to some abstract ideal.
                                                </p>
                                                <p>
                                                    The larger an institution becomes, the more human life can be transformed into abstractions. Abstractions of metrics, of performance, demographics, efficiency, profitability, outcomes and engagement, labor and content. Students tend to become numbers and workers turn into replaceable units. Culture no longer becomes something practiced by people, but something for branding and politics.
                                                </p>
                                            </div>
                                            
                                            <div className={styles.pullQuote}>
                                                "Make Education Human Again."
                                            </div>
                                        </div>
                                        
                                        <div className={styles.sidebarColumn}>
                                            <div className={styles.printBox}>
                                                <span className={styles.sidebarEyebrow}>PRINT EDITIONS</span>
                                                <h4 className={styles.printTitle}>KEYSTONE ISSUE 001</h4>
                                                <p className={styles.printDesc}>Our foundational essays and dispatches in a printed, archival format.</p>
                                                <span className={styles.comingSoonBtn}>COMING SOON</span>
                                            </div>
                                            
                                            <div className={styles.notesBox}>
                                                <span className={styles.sidebarEyebrow}>WEEKLY NOTES</span>
                                                <div className={styles.noteItem}>
                                                    <span className={styles.noteTag}>BOOK</span>
                                                    <h5 className={styles.noteTitle}>Purple Hibiscus</h5>
                                                    <span className={styles.noteAuthor}>Chimamanda Ngozi Adichie</span>
                                                    <p className={styles.noteExcerpt}>
                                                        Purple Hibiscus is the 2003 debut novel by the Nigerian writer Chimamanda Ngozi Adichie. It follows Kambili Achike, a 15-year-old Nigerian teenage girl who struggles in the shadow of her father, Eugene. Eugene is a successful businessman, a beloved philanthropist, and a devout Catholic, who nevertheless violently abuses his family.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contentBlock}>
                            <span className={styles.stageTitle}>
                                {t('keystone.vision_title', 'A Platform for Young Thinkers')}
                            </span>
                            <p className={styles.anchorLine}>
                                {t('keystone.vision_text_1')}
                            </p>
                            <p className={styles.pacingParagraph}>
                                {t('keystone.vision_text_2')}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Stage 3: How It Works (Line-Anchored Progression) */}
            <section className={styles.progressionSection}>
                <div className="container">
                    <motion.h2 
                        className={styles.sectionHeading}
                        {...fadeInUp}
                    >
                        {t('keystone.how_title', 'From Draft to Published Article')}
                    </motion.h2>
                    <motion.div 
                        className={styles.stepsGrid}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        <motion.div className={styles.stepItem} variants={fadeInUp}>
                            <div className={styles.stepNum}>{t('keystone.step1_num', '01')}</div>
                            <h3 className={styles.stepTitle}>{t('keystone.step1_title', 'Choose Your Topic')}</h3>
                            <p className={styles.stepDesc}>{t('keystone.step1_desc')}</p>
                        </motion.div>
                        <motion.div className={styles.stepItem} variants={fadeInUp}>
                            <div className={styles.stepNum}>{t('keystone.step2_num', '02')}</div>
                            <h3 className={styles.stepTitle}>{t('keystone.step2_title', 'Write & Refine')}</h3>
                            <p className={styles.stepDesc}>{t('keystone.step2_desc')}</p>
                        </motion.div>
                        <motion.div className={styles.stepItem} variants={fadeInUp}>
                            <div className={styles.stepNum}>{t('keystone.step3_num', '03')}</div>
                            <h3 className={styles.stepTitle}>{t('keystone.step3_title', 'Get Published')}</h3>
                            <p className={styles.stepDesc}>{t('keystone.step3_desc')}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stage 4: Benefits (Line-Anchored Minimalist Grid) */}
            <section className={styles.benefitsSection}>
                <div className="container">
                    <motion.h2 
                        className={styles.sectionHeading}
                        {...fadeInUp}
                    >
                        {t('keystone.benefits_title', 'Why Write for The Keystone?')}
                    </motion.h2>
                    <motion.div 
                        className={styles.benefitsGrid}
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                    >
                        <motion.div className={styles.benefitItem} variants={fadeInUp}>
                            <h3 className={styles.benefitTitle}>{t('keystone.benefit1_title')}</h3>
                            <p className={styles.benefitDesc}>{t('keystone.benefit1_desc')}</p>
                        </motion.div>
                        <motion.div className={styles.benefitItem} variants={fadeInUp}>
                            <h3 className={styles.benefitTitle}>{t('keystone.benefit2_title')}</h3>
                            <p className={styles.benefitDesc}>{t('keystone.benefit2_desc')}</p>
                        </motion.div>
                        <motion.div className={styles.benefitItem} variants={fadeInUp}>
                            <h3 className={styles.benefitTitle}>{t('keystone.benefit3_title')}</h3>
                            <p className={styles.benefitDesc}>{t('keystone.benefit3_desc')}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stage 5: Final Conversion Section */}
            <section className={styles.conversionSection}>
                <div className="container">
                    <motion.div className={styles.conversionCard} {...fadeInUp}>
                        <div className={styles.conversionContent}>
                            <h2 className={styles.conversionTitle}>{t('keystone.cta_title')}</h2>
                            <p className={styles.conversionDesc}>{t('keystone.cta_desc')}</p>
                        </div>
                        <div className={styles.conversionActions}>
                            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Link to="/inquiry" className={styles.conversionBtn}>
                                    <span>{t('keystone.cta_btn_inquiry', 'Consult with a Mentor')}</span>
                                    <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
