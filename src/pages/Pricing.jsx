import { Link } from 'react-router-dom';
import { Check, Info, ArrowRight, ShieldCheck, Clock, Zap, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Pricing.module.css';

export default function Pricing() {
    const { t } = useTranslation();

    const plans = [
        {
            key: 'p_lang',
            popular: false
        },
        {
            key: 'p_exam',
            popular: false
        },
        {
            key: 'p_acad',
            popular: true
        },
        {
            key: 'p_adv',
            popular: false
        }
    ];

    return (
        <>
            {/* 1. HERO Section */}
            <div className={`${styles.header} glass-panel`}>
                <div className="container text-center animate-on-scroll">
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('pricing.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        {t('pricing.subtitle')}
                    </p>
                </div>
            </div>

            <div className="section container">
                {/* 2. TRUST BAR */}
                <div className={`${styles.trustBar} animate-on-scroll`}>
                    <div className={styles.trustItem}><ShieldCheck size={20} /> {t('pricing.b1')}</div>
                    <div className={styles.trustItem}><Check size={20} /> {t('pricing.b2')}</div>
                    <div className={styles.trustItem}><Zap size={20} /> {t('pricing.b3')}</div>
                    <div className={styles.trustItem}><Clock size={20} /> {t('pricing.b4')}</div>
                </div>

                {/* SCROLL DOWN PROMPT: Designed as a highly visible primary button so it's not missed */}
                <div className="text-center animate-on-scroll" style={{ marginBottom: '4rem', marginTop: '1rem' }}>
                    <a href="#one-on-one-plans" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px', 
                        padding: '16px 36px', borderRadius: '100px', 
                        background: 'var(--c-navy)', color: 'white', 
                        textDecoration: 'none', fontWeight: '700', 
                        boxShadow: '0 8px 24px rgba(32, 42, 68, 0.25)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        fontSize: '1.05rem', letterSpacing: '0.5px'
                    }}>
                        {t('pricing.scroll_down')} <ChevronDown size={20} />
                    </a>
                </div>

                {/* 3. GROUP SECTION — moved up for affordability signal */}
                <div className={`${styles.groupSection} animate-on-scroll`}>
                    <div className={styles.groupContent}>
                        <div className={styles.groupBadge}>{t('pricing.g_badge')}</div>
                        <h2 className="text-h2" style={{ marginBottom: '0.75rem', color: 'var(--c-white)' }}>{t('pricing.g_title')}</h2>
                        <div className={styles.groupPriceContainer} style={{ marginBottom: '1.25rem' }}>
                            <span className={styles.fromLabel}>{t('pricing.from')}</span>
                            <span className={styles.price} style={{ fontSize: '2.5rem', fontWeight: '700' }}>{t('pricing.g_price')}</span>
                            <span className={styles.perHour}>{t('pricing.per_hour_person')}</span>
                        </div>
                        <p className={styles.groupDesc} style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>{t('pricing.g_desc')}</p>
                    </div>
                    <div className={styles.groupFeatures}>
                        <ul className={styles.featuresList}>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f1')}</li>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f2')}</li>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f3')}</li>
                        </ul>
                        <Link to="/inquiry" className="btn" style={{ marginTop: '1rem', backgroundColor: 'var(--c-sand)', color: 'var(--c-navy)' }}>
                            {t('pricing.g_cta')}
                        </Link>
                    </div>
                </div>

                {/* 4. MAIN PRICING CARDS — 1-on-1 */}
                <div className={styles.pricingGrid} id="one-on-one-plans">
                    {plans.map((plan, index) => (
                        <div key={index} className={`glass-card ${styles.pricingCard} ${plan.popular ? styles.popular : ''} animate-on-scroll`} style={{ animationDelay: `${index * 0.1}s` }}>
                            {plan.popular && <div className={styles.popularBadge}>{t(`pricing.${plan.key}_badge`)}</div>}
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTier}>{t('pricing.1on1')}</div>
                                <h3 className="text-h3">{t(`pricing.${plan.key}_title`)}</h3>
                                <div className={styles.nudge}>{t(`pricing.${plan.key}_nudge`)}</div>
                                <p className={styles.description}>{t(`pricing.${plan.key}_desc`)}</p>
                            </div>

                            <div className={styles.priceContainer}>
                                <span className={styles.fromLabel}>{t('pricing.from')}</span>
                                <span className={styles.price}>{t(`pricing.${plan.key}_price`)}</span>
                                <span className={styles.perHour}>{t('pricing.per_hour')}</span>
                            </div>

                            <ul className={styles.featuresList}>
                                <li><Check size={16} className={styles.checkIcon} /> {t(`pricing.${plan.key}_f1`)}</li>
                                <li><Check size={16} className={styles.checkIcon} /> {t(`pricing.${plan.key}_f2`)}</li>
                                <li><Check size={16} className={styles.checkIcon} /> {t(`pricing.${plan.key}_f3`)}</li>
                            </ul>

                            <div className={styles.ctaWrapper}>
                                {t(`pricing.${plan.key}_note`) && t(`pricing.${plan.key}_note`) !== `pricing.${plan.key}_note` && (
                                    <div className={styles.safetyNote}>{t(`pricing.${plan.key}_note`)}</div>
                                )}
                                <Link to="/inquiry" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} ${styles.btn}`}>
                                    {t(`pricing.${plan.key}_cta`)}
                                </Link>
                                <div className={styles.frictionReduction}>{t('pricing.friction_reduction')}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. MICRO COPY */}
                <div className={`${styles.microCopy} text-center animate-on-scroll`}>
                    <p>{t('pricing.micro_copy_1')}</p>
                    <p className={styles.microHighlight}>{t('pricing.micro_copy_2')}</p>
                </div>

                {/* 6. CONTINUITY / MONTHLY LOGIC */}
                <div className={`${styles.continuitySection} glass-card animate-on-scroll`}>
                    <div className={styles.continuityContent}>
                        <h2 className="text-h2">{t('pricing.continuity_title')}</h2>
                        <p className={styles.continuityText}>{t('pricing.continuity_body')}</p>
                    </div>
                    <div className={styles.continuityGrid}>
                        <div className={styles.continuityItem}>
                            <div className={styles.cDot}></div>
                            <span>{t('pricing.continuity_item_1')}</span>
                        </div>
                        <div className={styles.continuityItem}>
                            <div className={styles.cDot}></div>
                            <span>{t('pricing.continuity_item_2')}</span>
                        </div>
                        <div className={`${styles.continuityItem} ${styles.cHighlight}`}>
                            <div className={styles.cDot}></div>
                            <strong>{t('pricing.continuity_item_3')}</strong>
                        </div>
                    </div>
                </div>

                {/* 7. DECISION SUPPORT */}
                <div className={`${styles.decisionHelper} animate-on-scroll text-center`}>
                    <h3 className="text-h2" style={{ marginBottom: '1rem' }}>{t('pricing.dec_title')}</h3>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', marginBottom: '2rem' }}>
                        {t('pricing.dec_subtitle')}
                    </p>
                    <div className={styles.decisionGrid}>
                        <div className={`glass-card ${styles.decisionCard}`}>
                            <h4 className="text-h4" style={{ color: 'var(--c-navy)', marginBottom: '0.5rem' }}>{t('pricing.dec_l_title')}</h4>
                            <p style={{ color: 'var(--c-text-light)' }}>{t('pricing.dec_l_desc')}</p>
                        </div>
                        <div className={`glass-card ${styles.decisionCard}`}>
                            <h4 className="text-h4" style={{ color: 'var(--c-navy)', marginBottom: '0.5rem' }}>{t('pricing.dec_r_title')}</h4>
                            <p style={{ color: 'var(--c-text-light)' }}>{t('pricing.dec_r_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* 8. NOTICE BOX */}
                <div className={`${styles.noticeBox} animate-on-scroll`} style={{ animationDelay: '0.2s', marginTop: '4rem' }}>
                    <Info size={24} className={styles.infoIcon} />
                    <div>
                        <h4 className="text-h4" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{t('pricing.note_title')}</h4>
                        <p style={{ color: 'var(--c-text-light)' }}>
                            {t('pricing.note_desc')}
                        </p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <Link to="/inquiry" className="btn btn-primary">{t('home.final_cta', 'Reserve in 30s')}</Link>
                        </div>
                    </div>
                </div>

                {/* 9. FINAL CTA (URGENCY) */}
                <div className={`${styles.finalUrgency} text-center animate-on-scroll`}>
                    <h2 className="text-h2">{t('home.final_title')}</h2>
                    <div className={styles.finalCtas}>
                        <Link to="/inquiry" className="btn btn-primary">{t('home.cta_primary')}</Link>
                        <a href={t('nav.line_url')} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            {t('nav.line_cta')}
                        </a>
                    </div>
                </div>

            </div>
        </>
    );
}
