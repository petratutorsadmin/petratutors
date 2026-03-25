import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './LandingKids.module.css';

const LandingKids = () => {
  const { t } = useTranslation();

  const PAIN_POINTS = [
    t('landing_kids.pain_1'),
    t('landing_kids.pain_2'),
    t('landing_kids.pain_3'),
    t('landing_kids.pain_4')
  ];

  const SOLUTIONS = [
    {
      badge: t('landing_kids.s_1_badge'),
      title: t('landing_kids.s_1_title'),
      desc: t('landing_kids.s_1_desc')
    },
    {
      badge: t('landing_kids.s_2_badge'),
      title: t('landing_kids.s_2_title'),
      desc: t('landing_kids.s_2_desc')
    },
    {
      badge: t('landing_kids.s_3_badge'),
      title: t('landing_kids.s_3_title'),
      desc: t('landing_kids.s_3_desc')
    },
    {
      badge: t('landing_kids.s_4_badge'),
      title: t('landing_kids.s_4_title'),
      desc: t('landing_kids.s_4_desc')
    }
  ];

  const RESULTS = [
    { val: t('landing_kids.r_1_val'), label: t('landing_kids.r_1_label'), note: t('landing_kids.r_1_note') },
    { val: t('landing_kids.r_2_val'), label: t('landing_kids.r_2_label'), note: t('landing_kids.r_2_note') },
    { val: t('landing_kids.r_3_val'), label: t('landing_kids.r_3_label'), note: t('landing_kids.r_3_note') }
  ];

  const TESTIMONIALS = [
    { quote: t('landing_kids.t_1_quote'), name: t('landing_kids.t_1_name'), role: t('landing_kids.t_1_role') },
    { quote: t('landing_kids.t_2_quote'), name: t('landing_kids.t_2_name'), role: t('landing_kids.t_2_role') }
  ];

  const WHY = [
    { title: t('landing_kids.why_1_title'), desc: t('landing_kids.why_1_desc') },
    { title: t('landing_kids.why_2_title'), desc: t('landing_kids.why_2_desc') },
    { title: t('landing_kids.why_3_title'), desc: t('landing_kids.why_3_desc') }
  ];

  const KIDS_TUTOR = {
    name: 'Ulemj Batzorig',
    university: 'Keio University PEARL (TESOL Certified)',
    intro: t('landing_kids.why_1_desc'),
    image: '/images/tutors/tutor-6.png',
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t('landing_kids.hero_eyebrow')}</span>
          <h1 className={styles.title}>{t('landing_kids.hero_title')}</h1>
          <p className={styles.subtitle}>{t('landing_kids.hero_sub')}</p>
          
          <div className={styles.ctaGroup}>
            <Link to="/inquiry" className={styles.primaryCta}>
              {t('landing_kids.hero_cta')}
            </Link>
            <a href="https://lin.ee/rqf4A0D" className={styles.secondaryCta}>
              {t('landing_kids.hero_line')}
            </a>
          </div>

          <div className={styles.trustPills}>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_kids.trust_1')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_kids.trust_2')}
            </div>
            <div className={styles.pill}>
              <span className={styles.checkIcon}>✓</span>
              {t('landing_kids.trust_3')}
            </div>
          </div>

          {/* Results Strip Integrated into Hero */}
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
          <span className={styles.sectionEyebrow}>{t('landing_kids.pain_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_kids.pain_title')}</h2>
          
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((point, i) => (
              <div key={i} className={styles.painCard}>
                <div className={styles.iconX}>✕</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.painInsight}>
            <p>{t('landing_kids.pain_note')}</p>
          </div>
        </div>
      </section>

      {/* Solution / Approach */}
      <section className={styles.solutionSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_kids.solution_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_kids.solution_title')}</h2>
          
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

      {/* Why Section */}
      <section className={styles.whySection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t('landing_kids.why_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_kids.why_title')}</h2>
          <p className={styles.whySub}>{t('landing_kids.why_sub')}</p>

          <div className={styles.tutorSpotlight}>
            <img src={KIDS_TUTOR.image} alt={KIDS_TUTOR.name} className={styles.tutorImg} />
            <div className={styles.tutorInfo}>
              <h5>{KIDS_TUTOR.name}</h5>
              <span className={styles.tutorUni}>{KIDS_TUTOR.university}</span>
              <p>{KIDS_TUTOR.intro}</p>
            </div>
          </div>
          
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
          <span className={styles.sectionEyebrow}>{t('landing_kids.final_eyebrow')}</span>
          <h2 className={styles.sectionTitle}>{t('landing_kids.final_title')}</h2>
          <p className={styles.finalSub}>{t('landing_kids.final_sub')}</p>
          <Link to="/inquiry" className={styles.hugeCta}>
            {t('landing_kids.final_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingKids;
