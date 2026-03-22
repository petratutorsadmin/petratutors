import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Pricing.module.css';

export default function Pricing() {
    const { t } = useTranslation();

    const plans = [
        {
            title: t('pricing.p_adv_title'),
            badge: t('pricing.p_adv_badge'),
            description: t('pricing.p_adv_desc'),
            price: t('pricing.p_adv_price'),
            reinf: t('pricing.p_adv_reinf'),
            features: [t('pricing.p_adv_f1'), t('pricing.p_adv_f2'), t('pricing.p_adv_f3')],
            cta: t('pricing.p_adv_cta'),
            popular: false
        },
        {
            title: t('pricing.p_acad_title'),
            badge: t('pricing.p_acad_badge'),
            description: t('pricing.p_acad_desc'),
            price: t('pricing.p_acad_price'),
            reinf: t('pricing.p_acad_reinf'),
            features: [t('pricing.p_acad_f1'), t('pricing.p_acad_f2'), t('pricing.p_acad_f3')],
            cta: t('pricing.p_acad_cta'),
            popular: true
        },
        {
            title: t('pricing.p_lang_title'),
            badge: t('pricing.p_lang_badge'),
            description: t('pricing.p_lang_desc'),
            price: t('pricing.p_lang_price'),
            reinf: t('pricing.p_lang_reinf'),
            features: [t('pricing.p_lang_f1'), t('pricing.p_lang_f2'), t('pricing.p_lang_f3')],
            cta: t('pricing.p_lang_cta'),
            popular: false
        },
        {
            title: t('pricing.p_prem_title'),
            badge: t('pricing.p_prem_badge'),
            description: t('pricing.p_prem_desc'),
            price: t('pricing.p_prem_price'),
            reinf: t('pricing.p_prem_reinf'),
            features: [t('pricing.p_prem_f1'), t('pricing.p_prem_f2'), t('pricing.p_prem_f3')],
            cta: t('pricing.p_prem_cta'),
            popular: false
        }
    ];

    return (
        <>
            <div className={`${styles.header} glass-panel`}>
                <div className="container text-center animate-on-scroll">
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('pricing.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                        {t('pricing.subtitle')}
                    </p>
                </div>
            </div>

            <div className="section container">
                <div className={`${styles.benefitsBanner} glass-card animate-on-scroll`} style={{ animationDelay: '0.1s' }}>
                    <div className={styles.benefit}>
                        <Check className={styles.checkIcon} /> {t('pricing.b1')}
                    </div>
                    <div className={styles.benefit}>
                        <Check className={styles.checkIcon} /> {t('pricing.b2')}
                    </div>
                    <div className={styles.benefit}>
                        <Check className={styles.checkIcon} /> {t('pricing.b3')}
                    </div>
                    <div className={styles.benefit}>
                        <Check className={styles.checkIcon} /> {t('pricing.b4')}
                    </div>
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`glass-card ${styles.pricingCard} ${plan.popular ? styles.popular : ''} animate-on-scroll`} style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                            {plan.popular && <div className={styles.popularBadge}>{plan.badge}</div>}
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTier}>{t('pricing.1on1')}</div>
                                <h3 className="text-h3">{plan.title}</h3>
                                <p className={styles.description}>{plan.description}</p>
                            </div>

                            <div className={styles.priceContainer}>
                                {plan.price !== 'Custom Pricing' && plan.price !== '要相談' && <span className={styles.fromLabel}>{t('pricing.from')}</span>}
                                <span className={styles.price}>{plan.price}</span>
                                {plan.price !== 'Custom Pricing' && plan.price !== '要相談' && <span className={styles.perHour}>{t('pricing.per_hour')}</span>}
                            </div>
                            
                            <div className={styles.reinforcement}>{plan.reinf}</div>

                            <ul className={styles.featuresList}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}><Check size={16} className={styles.checkIcon} /> {feature}</li>
                                ))}
                            </ul>

                            <Link to="/inquiry" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} ${styles.btn}`}>
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={`${styles.groupSection} glass-card animate-on-scroll`}>
                    <div className={styles.groupContent}>
                        <div className={styles.groupBadge}>{t('pricing.g_badge')}</div>
                        <h2 className="text-h2" style={{ marginBottom: '0.5rem' }}>{t('pricing.g_title')}</h2>
                        <p className={styles.groupDesc}>{t('pricing.g_desc')}</p>
                        <div className={styles.groupPriceContainer}>
                            <span className={styles.fromLabel}>{t('pricing.from')}</span>
                            <span className={styles.price}>{t('pricing.g_price')}</span>
                            <span className={styles.perHour}>{t('pricing.per_hour_person')}</span>
                        </div>
                    </div>
                    <div className={styles.groupFeatures}>
                        <ul className={styles.featuresList}>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f1')}</li>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f2')}</li>
                            <li><Check size={16} className={styles.checkIcon} /> {t('pricing.g_f3')}</li>
                        </ul>
                        <Link to="/inquiry" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            {t('pricing.g_cta')}
                        </Link>
                    </div>
                </div>

                <div className={`${styles.decisionHelper} animate-on-scroll`}>
                    <h3 className="text-h2 text-center" style={{ marginBottom: '2rem' }}>{t('pricing.dec_title')}</h3>
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

                <div className={`${styles.noticeBox} animate-on-scroll`} style={{ animationDelay: '0.2s', marginTop: '3rem' }}>
                    <Info size={24} className={styles.infoIcon} />
                    <div>
                        <h4 className="text-h4" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{t('pricing.note_title')}</h4>
                        <p style={{ color: 'var(--c-text-light)' }}>
                            {t('pricing.note_desc')}
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <Link to="/no-admission-fee" className="btn btn-secondary">{t('pricing.no_fee_link')}</Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
