import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './GatewayHome.module.css';

// Routes for each choice - labels/subs come from locale
const CHOICES = [
    { id: 'ielts', to: '/ielts', labelKey: 'gateway.choice_ielts_label', subKey: 'gateway.choice_ielts_sub' },
    { id: 'ib',    to: '/ib',    labelKey: 'gateway.choice_ib_label',    subKey: 'gateway.choice_ib_sub'    },
    { id: 'kids',  to: '/kids',  labelKey: 'gateway.choice_kids_label',  subKey: 'gateway.choice_kids_sub'  },
    { id: 'uni',   to: '/university', labelKey: 'gateway.choice_uni_label', subKey: 'gateway.choice_uni_sub' },
    { id: 'biz',   to: '/business',   labelKey: 'gateway.choice_biz_label', subKey: 'gateway.choice_biz_sub' },
];

const TRUST_KEYS = ['trust_1', 'trust_2', 'trust_3', 'trust_4'];

const PROOF_KEYS = [
    { val: 'proof_1_val', label: 'proof_1_label' },
    { val: 'proof_2_val', label: 'proof_2_label' },
    { val: 'proof_3_val', label: 'proof_3_label' },
];

const TESTIMONIAL_KEYS = [
    { quote: 't_1_quote', name: 't_1_name', role: 't_1_role' },
    { quote: 't_2_quote', name: 't_2_name', role: 't_2_role' },
    { quote: 't_3_quote', name: 't_3_name', role: 't_3_role' },
];

export default function GatewayHome() {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>

            {/* ─── HERO ─── */}
            <section className={styles.hero}>
                <div className={styles.heroGradientOverlay} />
                <div className={`container ${styles.heroInner}`}>

                    <p className={styles.heroEyebrow}>{t('gateway.hero_eyebrow')}</p>
                    <h1 className={styles.heroTitle}>{t('gateway.hero_title')}</h1>
                    <p className={styles.heroSub}>{t('gateway.hero_sub')}</p>

                    {/* ── CHOICE BUTTONS ── */}
                    <p className={styles.choiceLabel}>{t('gateway.choice_label')}</p>
                    <div className={styles.choiceGrid}>
                        {CHOICES.map((c, idx) => (
                            <Link
                                key={c.id}
                                to={c.to}
                                className={styles.choiceBtn}
                                style={{ animationDelay: `${0.05 + idx * 0.07}s` }}
                            >
                                <span className={styles.choiceBtnText}>
                                    <span className={styles.choiceBtnLabel}>{t(c.labelKey)}</span>
                                    <span className={styles.choiceBtnSub}>{t(c.subKey)}</span>
                                </span>
                                <ArrowRight className={styles.choiceBtnArrow} size={18} />
                            </Link>
                        ))}
                    </div>

                    {/* Fallback */}
                    <div className={styles.fallback}>
                        <span className={styles.fallbackLabel}>{t('gateway.fallback_label')}</span>
                        <Link to="/inquiry" className={styles.fallbackCta}>{t('gateway.fallback_cta')}</Link>
                    </div>

                    {/* Trust pills */}
                    <div className={styles.trustPills}>
                        {TRUST_KEYS.map(key => (
                            <span key={key} className={styles.trustPill}>
                                <CheckCircle size={13} />
                                {t(`gateway.${key}`)}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollDot} />
                </div>
            </section>

            {/* ─── PROOF STATS ─── */}
            <section className={styles.proofSection}>
                <div className="container">
                    <div className={styles.proofGrid}>
                        {PROOF_KEYS.map((p, i) => (
                            <div key={i} className={styles.proofStat}>
                                <div className={styles.proofVal}>{t(`gateway.${p.val}`)}</div>
                                <div className={styles.proofLabel}>{t(`gateway.${p.label}`)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className={styles.testimonials}>
                <div className="container">
                    <div className={styles.testimonialsGrid}>
                        {TESTIMONIAL_KEYS.map((t_, i) => (
                            <div key={i} className={styles.testimonialCard}>
                                <p className={styles.testimonialQuote}>「{t(`gateway.${t_.quote}`)}」</p>
                                <div className={styles.testimonialAuthor}>
                                    <span className={styles.testimonialName}>{t(`gateway.${t_.name}`)}</span>
                                    <span className={styles.testimonialRole}>{t(`gateway.${t_.role}`)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className={styles.finalCta}>
                <div className={`container ${styles.finalInner}`}>
                    <h2 className={styles.finalTitle}>{t('gateway.final_title')}</h2>
                    <p className={styles.finalSub}>{t('gateway.final_sub')}</p>
                    <div className={styles.finalButtons}>
                        <Link to="/inquiry" className={`btn btn-gold ${styles.finalBtn}`}>
                            {t('gateway.final_cta')}
                        </Link>
                        <a
                            href={t('nav.line_url')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-ghost-light ${styles.finalBtn}`}
                        >
                            {t('gateway.final_line')}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
