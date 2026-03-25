import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Briefcase, BarChart2, Mail, Globe, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './BusinessLanding.module.css';

export default function BusinessLanding() {
    const { t } = useTranslation();

    const painPoints = [
        t('business.pain_1'),
        t('business.pain_2'),
        t('business.pain_3'),
        t('business.pain_4'),
    ];

    const pricingPlans = [
        {
            label: t('business.plan_1_label'),
            price: '5,000',
            description: t('business.plan_1_desc'),
            features: [
                t('business.plan_1_f1'),
                t('business.plan_1_f2'),
                t('business.plan_1_f3'),
            ],
            cta: t('business.cta_trial'),
            isPopular: false,
        },
        {
            label: t('business.plan_2_label'),
            price: '7,000',
            description: t('business.plan_2_desc'),
            features: [
                t('business.plan_2_f1'),
                t('business.plan_2_f2'),
                t('business.plan_2_f3'),
            ],
            badge: t('business.plan_2_badge'),
            cta: t('business.cta_trial'),
            isPopular: true,
        },
        {
            label: t('business.plan_3_label'),
            price: '10,000',
            description: t('business.plan_3_desc'),
            features: [
                t('business.plan_3_f1'),
                t('business.plan_3_f2'),
                t('business.plan_3_f3'),
            ],
            cta: t('business.cta_trial'),
            isPopular: false,
        },
    ];

    return (
        <div className={styles.page}>
            {/* Urgency Bar */}
            <div className={styles.urgencyBar}>
                {t('business.urgency_bar')}
            </div>

            {/* ── 1. HERO ── */}
            <section className={styles.hero}>
                <div className={`container ${styles.heroInner}`}>
                    <div className={styles.heroPill}>{t('business.hero_pill')}</div>
                    <h1 className={styles.heroTitle}>{t('business.hero_title')}</h1>
                    <p className={styles.heroSub}>{t('business.hero_sub')}</p>
                    <div className={styles.heroCtas}>
                        <Link to="/inquiry" className={`btn ${styles.btnPrimary}`} id="biz-hero-cta-trial">
                            {t('business.cta_trial')}
                        </Link>
                        <a
                            href={t('nav.line_url')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn ${styles.btnLine}`}
                            id="biz-hero-cta-line"
                        >
                            {t('business.cta_line')}
                        </a>
                    </div>
                    <p className={styles.scarcity}>{t('business.hero_scarcity')}</p>
                </div>
            </section>

            {/* ── 2. PAIN POINTS ── */}
            <section className={styles.painSection}>
                <div className="container">
                    <p className={styles.sectionEyebrow}>{t('business.pain_eyebrow')}</p>
                    <h2 className={styles.sectionTitle}>{t('business.pain_title')}</h2>
                    <div className={styles.painGrid}>
                        {painPoints.map((point, i) => (
                            <div key={i} className={styles.painCard}>
                                <CheckCircle size={20} className={styles.checkIcon} />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. OUTCOME ── */}
            <section className={styles.outcomeSection}>
                <div className="container">
                    <div className={styles.outcomeInner}>
                        <div className={styles.outcomeStat}>
                            <span className={styles.statNum}>2〜3</span>
                            <span className={styles.statUnit}>{t('business.outcome_stat_unit')}</span>
                        </div>
                        <div className={styles.outcomeText}>
                            <h2 className={styles.outcomeTitle}>{t('business.outcome_title')}</h2>
                            <p className={styles.outcomeSub}>{t('business.outcome_sub')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. AUTHORITY / TRUST ── */}
            <section className={styles.trustSection}>
                <div className="container">
                    <p className={styles.sectionEyebrow}>{t('business.trust_eyebrow')}</p>
                    <h2 className={styles.sectionTitle}>{t('business.trust_title')}</h2>
                    <div className={styles.trustGrid}>
                        <div className={styles.trustCard}>
                            <div className={styles.trustValue}>慶應・東大</div>
                            <div className={styles.trustLabel}>{t('business.trust_1')}</div>
                        </div>
                        <div className={styles.trustCard}>
                            <div className={styles.trustValue}>95%</div>
                            <div className={styles.trustLabel}>{t('business.trust_2')}</div>
                        </div>
                        <div className={styles.trustCard}>
                            <div className={styles.trustValue}>+1.0</div>
                            <div className={styles.trustLabel}>{t('business.trust_3')}</div>
                        </div>
                    </div>
                    <p className={styles.trustNote}>{t('business.trust_note')}</p>
                </div>
            </section>

            {/* ── 5. PRICING ── */}
            <section className={styles.pricingSection}>
                <div className="container">
                    <p className={styles.sectionEyebrow}>{t('business.pricing_eyebrow')}</p>
                    <h2 className={styles.sectionTitle}>{t('business.pricing_title')}</h2>
                    <p className={styles.pricingSub}>{t('business.pricing_sub')}</p>
                    <div className={styles.pricingGrid}>
                        {pricingPlans.map((plan, i) => (
                            <div
                                key={i}
                                className={`${styles.planCard} ${plan.isPopular ? styles.planPopular : ''}`}
                            >
                                {plan.badge && (
                                    <div className={styles.planBadge}>{plan.badge}</div>
                                )}
                                <div className={styles.planTier}>{plan.label}</div>
                                <div className={styles.planPrice}>
                                    <span className={styles.planFrom}>¥</span>
                                    {plan.price}
                                    <span className={styles.planUnit}> / hr</span>
                                </div>
                                <p className={styles.planDesc}>{plan.description}</p>
                                <ul className={styles.planFeatures}>
                                    {plan.features.map((f, j) => (
                                        <li key={j}>
                                            <CheckCircle size={14} className={styles.featureCheck} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/inquiry"
                                    className={`btn ${plan.isPopular ? styles.btnPrimary : styles.btnSecondary}`}
                                    id={`biz-plan-cta-${i}`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className={styles.pricingNote}>{t('business.pricing_note')}</p>
                </div>
            </section>

            {/* ── 6. TESTIMONIAL ── */}
            <section className={styles.testimonialSection}>
                <div className="container">
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialQuote}>
                            "{t('business.testimonial_quote')}"
                        </p>
                        <div className={styles.testimonialAuthor}>
                            — {t('business.testimonial_author')}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. FINAL CTA ── */}
            <section className={styles.finalCta}>
                <div className={`container ${styles.finalCtaInner}`}>
                    <div className={styles.finalScarcity}>{t('business.final_scarcity')}</div>
                    <h2 className={styles.finalTitle}>{t('business.final_title')}</h2>
                    <p className={styles.finalSub}>{t('business.final_sub')}</p>
                    <div className={styles.finalButtons}>
                        <Link
                            to="/inquiry"
                            className={`btn ${styles.btnPrimary}`}
                            id="biz-final-cta-trial"
                        >
                            {t('business.cta_trial')}
                        </Link>
                        <a
                            href={t('nav.line_url')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn ${styles.btnLine}`}
                            id="biz-final-cta-line"
                        >
                            {t('business.cta_line')}
                        </a>
                    </div>
                    <p className={styles.finalNote}>{t('business.final_note')}</p>
                </div>
            </section>
        </div>
    );
}
