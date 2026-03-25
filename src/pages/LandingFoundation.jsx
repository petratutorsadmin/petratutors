import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './LandingFoundation.module.css';

const LandingFoundation = () => {
  const { t } = useTranslation();

  const PAIN_POINTS = [
    t('landing_foundation.pain_1'),
    t('landing_foundation.pain_2'),
    t('landing_foundation.pain_3'),
    t('landing_foundation.pain_4')
  ];

  const SOLUTIONS = [
    {
      badge: t('landing_foundation.s_1_badge'),
      title: t('landing_foundation.s_1_title'),
      desc: t('landing_foundation.s_1_desc')
    },
    {
      badge: t('landing_foundation.s_2_badge'),
      title: t('landing_foundation.s_2_title'),
      desc: t('landing_foundation.s_2_desc')
    },
    {
      badge: t('landing_foundation.s_3_badge'),
      title: t('landing_foundation.s_3_title'),
      desc: t('landing_foundation.s_3_desc')
    },
    {
      badge: t('landing_foundation.s_4_badge'),
      title: t('landing_foundation.s_4_title'),
      desc: t('landing_foundation.s_4_desc')
    }
  ];

  const COVERAGE = [
    { title: t('landing_foundation.c_1_title'), desc: t('landing_foundation.c_1_desc') },
    { title: t('landing_foundation.c_2_title'), desc: t('landing_foundation.c_2_desc') },
    { title: t('landing_foundation.c_3_title'), desc: t('landing_foundation.c_3_desc') },
    { title: t('landing_foundation.c_4_title'), desc: t('landing_foundation.c_4_desc') }
  ];

  const RESULTS = [
    { val: t('landing_foundation.r_1_val'), label: t('landing_foundation.r_1_label'), note: t('landing_foundation.r_1_note') },
    { val: t('landing_foundation.r_2_val'), label: t('landing_foundation.r_2_label'), note: t('landing_foundation.r_2_note') },
    { val: t('landing_foundation.r_3_val'), label: t('landing_foundation.r_3_label'), note: t('landing_foundation.r_3_note') }
  ];

  const WHY = [
    { title: t('landing_foundation.why_1_title'), desc: t('landing_foundation.why_1_desc') },
    { title: t('landing_foundation.why_2_title'), desc: t('landing_foundation.why_2_desc') },
    { title: t('landing_foundation.why_3_title'), desc: t('landing_foundation.why_3_desc') }
  ];

  const TESTIMONIALS = [
    { quote: t('landing_foundation.t_1_quote'), name: t('landing_foundation.t_1_name'), role: t('landing_foundation.t_1_role') },
    { quote: t('landing_foundation.t_2_quote'), name: t('landing_foundation.t_2_name'), role: t('landing_foundation.t_2_role') }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t('landing_foundation.hero_eyebrow')}</span>
          <h1 className={styles.title}>{t('landing_foundation.hero_title')}</h1>
          <p className={styles.subtitle}>{t('landing_foundation.hero_sub')}</p>
          
          <div className={styles.ctaGroup}>
            <Link to="/inquiry" className={styles.primaryCta}>
              {t('landing_foundation.hero_cta')}
            </Link>
            <a href={t('nav.line_url')} target="_blank" rel="noopener noreferrer" className={styles.secondaryCta}>
              {t('landing_foundation.hero_line')}
            </a>
          </div>

          <div className={styles.trustPills}>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_foundation.trust_1')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_foundation.trust_2')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_foundation.trust_3')}
            </div>
          </div>

          {/* Results Strip */}
          <div className={styles.heroResults}>
            {RESULTS.map((res, i) => (
              <div key={i} className={styles.heroResultItem}>
                <span className={styles.resVal}>{res.val}</span>
                <span className={styles.resLabel}>{res.label}</span>
                <span className={styles.resNote}>{res.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className={styles.painSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_foundation.pain_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_foundation.pain_title')}</h2>
          
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className={styles.painCard}>
                <div className={styles.iconX}>✕</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.painInsight}>
            <p>{t('landing_foundation.pain_note')}</p>
          </div>
        </div>
      </section>

      {/* Solution / Approach */}
      <section className={styles.solutionSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_foundation.solution_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_foundation.solution_title')}</h2>
          
          <div className={styles.solutionGrid}>
            {SOLUTIONS.map((s, i) => (
              <div key={i} className={styles.solutionCard}>
                <span className={styles.badge}>{s.badge}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className={styles.coverageSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_foundation.coverage_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_foundation.coverage_title')}</h2>
          <p className={styles.whySub}>{t('landing_foundation.coverage_sub')}</p>
          
          <div className={styles.solutionGrid}>
            {COVERAGE.map((item, i) => (
              <div key={i} className={styles.solutionCard}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why Petra */}
      <section className={styles.whySection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_foundation.why_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_foundation.why_title')}</h2>
          <p className={styles.whySub}>{t('landing_foundation.why_sub')}</p>
          
          <div className={styles.whyGrid}>
            {WHY.map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.testimonialStrip}>
            {TESTIMONIALS.map((tItem, i) => (
              <div key={i} className={styles.testimonialItem}>
                <p className={styles.quote}>"{tItem.quote}"</p>
                <p className={styles.author}>{tItem.name} <span className={styles.role}>{tItem.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className={styles.wrapper}>
          <div className={styles.pricingCard}>
            <h2 className={styles.pricingTitle}>{t('pricing.note_title', '料金目安')}</h2>
            <div className={styles.pricingAmount}>
              ¥4,000<span className={styles.pricingPer}>〜 / 時間</span>
            </div>
            <p className={styles.pricingNote}>レベル・目標に応じて最適なプランをご提案します</p>
            <Link to="/pricing" className={styles.secondaryCta} style={{ display: 'inline-block' }}>
              料金の詳細を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCtaSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_foundation.final_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_foundation.final_title')}</h2>
          <p className={styles.finalSub}>{t('landing_foundation.final_sub')}</p>
          <Link to="/inquiry" className={styles.hugeCta}>
            {t('landing_foundation.final_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingFoundation;
