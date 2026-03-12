import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Pricing.module.css';

export default function Pricing() {
    const { t } = useTranslation();

    const plans = [
        {
            title: t('pricing.p1_title'),
            price: '3,500',
            description: t('pricing.p1_desc'),
            features: [t('pricing.p1_f1'), t('pricing.p1_f2'), t('pricing.p1_f3')]
        },
        {
            title: t('pricing.p2_title'),
            price: '5,000',
            description: t('pricing.p2_desc'),
            features: [t('pricing.p2_f1'), t('pricing.p2_f2'), t('pricing.p2_f3')],
            popular: true
        },
        {
            title: t('pricing.p3_title'),
            price: '7,000+',
            description: t('pricing.p3_desc'),
            features: [t('pricing.p3_f1'), t('pricing.p3_f2'), t('pricing.p3_f3')]
        },
        {
            title: t('pricing.p4_title'),
            price: '10,000+',
            description: t('pricing.p4_desc'),
            features: [t('pricing.p4_f1'), t('pricing.p4_f2'), t('pricing.p4_f3')]
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
                </div>

                <div className={styles.pricingGrid}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`glass-card ${styles.pricingCard} ${plan.popular ? styles.popular : ''} animate-on-scroll`} style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                            {plan.popular && <div className={styles.popularBadge}>{t('pricing.popular')}</div>}
                            <div className={styles.cardHeader}>
                                <h3 className="text-h3">{plan.title}</h3>
                                <p className={styles.description}>{plan.description}</p>
                            </div>

                            <div className={styles.priceContainer}>
                                <span className={styles.fromLabel}>{t('pricing.from')}</span>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.perHour}>{t('pricing.per_hour')}</span>
                            </div>

                            <ul className={styles.featuresList}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}><Check size={16} className={styles.checkIcon} /> {feature}</li>
                                ))}
                            </ul>

                            <Link to="/inquiry" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} ${styles.btn}`}>
                                {t('pricing.get_started')}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className={`${styles.noticeBox} animate-on-scroll`} style={{ animationDelay: '0.6s' }}>
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
