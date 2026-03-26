import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './LandingUniversity.module.css';

const LandingUniversity = () => {
  const { t } = useTranslation();

  const PAIN_POINTS = [
    t('landing_uni.pain_1'),
    t('landing_uni.pain_2'),
    t('landing_uni.pain_3'),
    t('landing_uni.pain_4')
  ];

  const SOLUTIONS = [
    {
      badge: t('landing_uni.s_1_badge'),
      title: t('landing_uni.s_1_title'),
      desc: t('landing_uni.s_1_desc')
    },
    {
      badge: t('landing_uni.s_2_badge'),
      title: t('landing_uni.s_2_title'),
      desc: t('landing_uni.s_2_desc')
    },
    {
      badge: t('landing_uni.s_3_badge'),
      title: t('landing_uni.s_3_title'),
      desc: t('landing_uni.s_3_desc')
    },
    {
      badge: t('landing_uni.s_4_badge'),
      title: t('landing_uni.s_4_title'),
      desc: t('landing_uni.s_4_desc')
    }
  ];

  const RESULTS = [
    { val: t('landing_uni.r_1_val'), label: t('landing_uni.r_1_label'), note: t('landing_uni.r_1_note') },
    { val: t('landing_uni.r_2_val'), label: t('landing_uni.r_2_label'), note: t('landing_uni.r_2_note') },
    { val: t('landing_uni.r_3_val'), label: t('landing_uni.r_3_label'), note: t('landing_uni.r_3_note') }
  ];

  const TESTIMONIALS = [
    { quote: t('landing_uni.t_1_quote'), name: t('landing_uni.t_1_name'), role: t('landing_uni.t_1_role') },
    { quote: t('landing_uni.t_2_quote'), name: t('landing_uni.t_2_name'), role: t('landing_uni.t_2_role') }
  ];

  const WHY = [
    { title: t('landing_uni.why_1_title'), desc: t('landing_uni.why_1_desc') },
    { title: t('landing_uni.why_2_title'), desc: t('landing_uni.why_2_desc') },
    { title: t('landing_uni.why_3_title'), desc: t('landing_uni.why_3_desc') }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t('landing_uni.hero_eyebrow')}</span>
          <h1 className={styles.title}>{t('landing_uni.hero_title')}</h1>
          <p className={styles.subtitle}>{t('landing_uni.hero_sub')}</p>
          
          <p className={styles.scarcity}>⚡ {t('landing_uni.hero_scarcity')}</p>

          <div className={styles.ctaGroup}>
            <Link to="/inquiry" className={styles.primaryCta}>
              {t('landing_uni.hero_cta')}
            </Link>
            <a href="https://lin.ee/rqf4A0D" className={styles.secondaryCta}>
              {t('landing_uni.hero_line')}
            </a>
          </div>

          <div className={styles.trustPills}>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_uni.trust_1')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_uni.trust_2')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_uni.trust_3')}
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
          <span className={styles.sectionEyebrow}>{t('landing_uni.pain_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_uni.pain_title')}</h2>
          
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className={styles.painCard}>
                <div className={styles.iconX}>✕</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.painInsight}>
            <p>{t('landing_uni.pain_note')}</p>
          </div>
        </div>
      </section>

      {/* Core Value Bridge */}
      <section className={styles.coreValueSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_uni.core_value_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_uni.core_value_title')}</h2>
          <p className={styles.coreValueSub}>{t('landing_uni.core_value_sub')}</p>
        </div>
      </section>

      {/* Solution / Approach */}
      <section className={styles.solutionSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_uni.solution_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_uni.solution_title')}</h2>
          
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
          <span className={styles.sectionEyebrow}>{t('landing_uni.why_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_uni.why_title')}</h2>
          <p className={styles.whySub}>{t('landing_uni.why_sub')}</p>
          
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
          <span className={styles.sectionEyebrow}>{t('landing_uni.final_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_uni.final_title')}</h2>
          <p className={styles.finalSub}>{t('landing_uni.final_sub')}</p>
          <Link to="/inquiry" className={styles.hugeCta}>
            {t('landing_uni.final_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingUniversity;
