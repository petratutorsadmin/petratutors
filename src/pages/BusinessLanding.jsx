import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './BusinessLanding.module.css';

const BusinessLanding = () => {
  const { t } = useTranslation();

  const PAIN_POINTS = [
    t('business.pain_1'),
    t('business.pain_2'),
    t('business.pain_3'),
    t('business.pain_4')
  ];

  const SOLUTIONS = [
    {
      badge: t('business.s_1_badge'),
      title: t('business.s_1_title'),
      desc: t('business.s_1_desc')
    },
    {
      badge: t('business.s_2_badge'),
      title: t('business.s_2_title'),
      desc: t('business.s_2_desc')
    },
    {
      badge: t('business.s_3_badge'),
      title: t('business.s_3_title'),
      desc: t('business.s_3_desc')
    },
    {
      badge: t('business.s_4_badge'),
      title: t('business.s_4_title'),
      desc: t('business.s_4_desc')
    }
  ];

  const RESULTS = [
    { val: t('business.r_1_val'), label: t('business.r_1_label'), note: t('business.r_1_note') },
    { val: t('business.r_2_val'), label: t('business.r_2_label'), note: t('business.r_2_note') },
    { val: t('business.r_3_val'), label: t('business.r_3_label'), note: t('business.r_3_note') }
  ];

  const TESTIMONIALS = [
    { quote: t('business.t_1_quote'), name: t('business.t_1_name'), role: t('business.t_1_role') },
    { quote: t('business.t_2_quote'), name: t('business.t_2_name'), role: t('business.t_2_role') }
  ];

  const WHY = [
    { title: t('business.why_1_title'), desc: t('business.why_1_desc') },
    { title: t('business.why_2_title'), desc: t('business.why_2_desc') },
    { title: t('business.why_3_title'), desc: t('business.why_3_desc') }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t('business.hero_eyebrow')}</span>
          <h1 className={styles.title}>{t('business.hero_title')}</h1>
          <p className={styles.subtitle}>{t('business.hero_sub')}</p>
          
          <div className={styles.ctaGroup}>
            <Link to="/inquiry" className={styles.primaryCta}>
              {t('business.hero_cta')}
            </Link>
            <a href="https://lin.ee/rqf4A0D" className={styles.secondaryCta}>
              {t('business.hero_line')}
            </a>
          </div>

          <div className={styles.trustPills}>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('business.trust_1')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('business.trust_2')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('business.trust_3')}
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
          <span className={styles.sectionEyebrow}>{t('business.pain_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('business.pain_title')}</h2>
          
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className={styles.painCard}>
                <div className={styles.iconX}>✕</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.painInsight}>
            <p>{t('business.pain_note')}</p>
          </div>
        </div>
      </section>

      {/* Solution / Approach */}
      <section className={styles.solutionSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('business.solution_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('business.solution_title')}</h2>
          
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

      {/* Mid-Page CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', backgroundColor: 'rgba(212, 175, 55, 0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div className={styles.wrapper}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '10px', color: 'inherit' }}>
            まずは無料で学習相談をしてみませんか？
          </h2>
          <p style={{ marginBottom: '30px', opacity: 0.8, fontSize: '0.95rem' }}>現状の課題や目標に合わせて、最適なプランをご提案します。</p>
          <Link to="/inquiry" className={styles.primaryCta} style={{ display: 'inline-block' }}>
            無料体験・相談を予約する
          </Link>
        </div>
      </section>

      {/* Trust / Why Petra */}
      <section className={styles.whySection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('business.why_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('business.why_title')}</h2>
          <p className={styles.whySub}>{t('business.why_sub')}</p>
          
          <div className={styles.whyGrid}>
            {WHY.map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.testimonialStrip}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={styles.testimonialItem}>
                <p className={styles.quote}>"{t.quote}"</p>
                <p className={styles.author}>{t.name} <span className={styles.role}>{t.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCtaSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('business.final_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('business.final_title')}</h2>
          <p className={styles.finalSub}>{t('business.final_sub')}</p>
          <Link to="/inquiry" className={styles.hugeCta}>
            {t('business.final_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BusinessLanding;
