import { Link } from 'react-router-dom';
import { BookOpen, Globe2, PenTool, Briefcase, ArrowRight, Sparkles, GraduationCap, LayoutDashboard, LineChart, Target, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import styles from './ThePetraSystem.module.css';
import InteractiveSystemDemo from '../components/InteractiveSystemDemo';

export default function ThePetraSystem() {
    const { t } = useTranslation();

    const PATHWAYS = [
        {
            id: 'ielts',
            to: '/ielts',
            icon: <PenTool size={28} />,
            labelKey: 'gateway.choice_ielts_label',
            subKey: 'gateway.choice_ielts_sub'
        },
        {
            id: 'ib',
            to: '/ib',
            icon: <Globe2 size={28} />,
            labelKey: 'gateway.choice_ib_label',
            subKey: 'gateway.choice_ib_sub'
        },
        {
            id: 'foundation',
            to: '/foundation',
            icon: <BookOpen size={28} />,
            labelKey: 'gateway.choice_foundation_label',
            subKey: 'gateway.choice_foundation_sub'
        },
        {
            id: 'kids',
            to: '/kids',
            icon: <Sparkles size={28} />,
            labelKey: 'gateway.choice_kids_label',
            subKey: 'gateway.choice_kids_sub'
        },
        {
            id: 'uni',
            to: '/university',
            icon: <GraduationCap size={28} />,
            labelKey: 'gateway.choice_uni_label',
            subKey: 'gateway.choice_uni_sub'
        },
        {
            id: 'biz',
            to: '/business',
            icon: <Briefcase size={28} />,
            labelKey: 'gateway.choice_biz_label',
            subKey: 'gateway.choice_biz_sub'
        }
    ];

    const FEATURES = [
        {
            icon: <Compass size={24} />,
            title: t('system.feat_1_title', 'Expert Mentorship'),
            desc: t('system.feat_1_desc', '1:1 guidance from mentors who have successfully navigated international curricula.')
        },
        {
            icon: <Target size={24} />,
            title: t('system.feat_2_title', 'Strategic Roadmaps'),
            desc: t('system.feat_2_desc', 'Custom learning pathways designed backwards from your ultimate academic goal.')
        },
        {
            icon: <LayoutDashboard size={24} />,
            title: t('system.feat_3_title', 'Detailed Reporting'),
            desc: t('system.feat_3_desc', 'Post-lesson insights and measurable progress delivered directly to your dashboard.')
        }
    ];

    return (
        <>
            <Helmet>
                <title>{t('nav.programs', 'How Petra Works')} | Petra Tutors</title>
                <meta name="description" content={t('programs.subtitle', 'Structured academic mentorship designed around long-term growth.')} />
            </Helmet>

            {/* HERO */}
            <div className={styles.header}>
                <div className="container animate-on-scroll" style={{ position: 'relative' }}>
                    <h1 className={styles.title}>{t('programs.title', 'The Petra Learning System')}</h1>
                    <p className={styles.subtitle}>
                        {t('programs.subtitle', 'Structured academic mentorship designed around long-term growth.')}
                    </p>
                </div>
            </div>

            {/* CORE PHILOSOPHY */}
            <section className={styles.sectionLight}>
                <div className="container animate-on-scroll">
                    <div className={styles.philosophyGrid}>
                        <div className={styles.textContent}>
                            <h2 className={styles.sectionTitle}>{t('system.philosophy_title', 'More Than Just Tutoring')}</h2>
                            <p className={styles.bodyText}>
                                {t('system.philosophy_desc', 'Traditional tutoring focuses purely on homework help. Petra is built as a complete academic ecosystem. We combine high-level human mentorship with structured tracking to ensure confidence and long-term growth.')}
                            </p>
                        </div>
                        <div className={styles.featuresList}>
                            {FEATURES.map((feat, idx) => (
                                <div key={idx} className={styles.featureItem}>
                                    <div className={styles.featureIcon}>{feat.icon}</div>
                                    <div>
                                        <h3 className={styles.featureTitle}>{feat.title}</h3>
                                        <p className={styles.featureDesc}>{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* LMS / PORTAL VISIBILITY */}
            <section className={styles.sectionDark}>
                <div className="container animate-on-scroll">
                    <div className={styles.lmsGrid}>
                        <div className={styles.lmsVisual}>
                            <InteractiveSystemDemo />
                        </div>
                        <div className={styles.textContent}>
                            <span className={styles.eyebrow}>{t('system.lms_eyebrow', 'VISIBLE PROGRESS')}</span>
                            <h2 className={styles.sectionTitleLight}>{t('system.lms_title', 'Progress you can see and understand')}</h2>
                            <p className={styles.bodyTextLight}>
                                {t('system.lms_desc', 'Education shouldn\'t be a black box. Our dedicated portal gives parents and students clear visibility into lesson reports, skill progression, and upcoming academic milestones. Trust is built on transparency.')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ONGOING GUIDANCE */}
            <section className={styles.sectionCream}>
                <div className="container animate-on-scroll" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <span className={styles.eyebrowDark}>{t('system.guidance_eyebrow', 'BEYOND THE LESSON')}</span>
                    <h2 className={styles.sectionTitle}>{t('system.guidance_title', 'Ongoing Guidance & Support')}</h2>
                    <p className={styles.bodyText} style={{ margin: '0 auto 3rem' }}>
                        {t('system.guidance_desc', 'We support our students beyond scheduled hours. From curated academic libraries to parent consultations and strategy adjustments, our team ensures your educational roadmap is constantly optimized.')}
                    </p>
                </div>
            </section>

            {/* PATHWAYS GRID */}
            <section className={styles.sectionLight}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className={styles.sectionTitle}>{t('system.pathways_title', 'Educational Pathways')}</h2>
                        <p className={styles.bodyText} style={{ margin: '0 auto', maxWidth: '600px' }}>
                            {t('system.pathways_desc', 'Explore how the Petra System applies to your specific academic goals.')}
                        </p>
                    </div>

                    <div className={styles.programsGrid}>
                        {PATHWAYS.map((prog, idx) => (
                            <Link 
                                key={prog.id} 
                                to={prog.to} 
                                className={`${styles.programCard} animate-on-scroll`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className={styles.iconWrapper}>
                                    {prog.icon}
                                </div>
                                <h2 className={styles.cardTitle}>{t(prog.labelKey)}</h2>
                                <p className={styles.cardDesc}>{t(prog.subKey)}</p>
                                <div className={styles.cardActionWrapper}>
                                    <div className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', pointerEvents: 'none' }}>
                                        {t('programs.view_details', 'View Details')} <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container animate-on-scroll">
                    <h2 className={styles.ctaTitle}>
                        {t('programs.custom_title', 'Don\'t see exactly what you need?')}
                    </h2>
                    <p className={styles.ctaDesc}>
                        {t('programs.custom_desc', 'We can customise a learning plan specifically for your unique goals.')}
                    </p>
                    <Link to="/inquiry" className="btn btn-gold">
                        {t('gateway.final_cta', 'Request Consultation')}
                    </Link>
                </div>
            </section>
        </>
    );
}
