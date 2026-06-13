import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, X, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import styles from './LandingIELTS.module.css';

const LandingEikenPre2 = () => {
  const { t } = useTranslation();
  const ns = 'landing_eiken_pre2';

  const PAIN_POINTS = [1, 2, 3, 4].map(n => t(`${ns}.pain_${n}`));
  const SOLUTIONS = [1, 2, 3, 4].map(n => ({
    badge: t(`${ns}.s_${n}_badge`),
    title: t(`${ns}.s_${n}_title`),
    desc: t(`${ns}.s_${n}_desc`),
  }));
  const RESULTS = [1, 2, 3].map(n => ({
    val: t(`${ns}.r_${n}_val`),
    label: t(`${ns}.r_${n}_label`),
    note: t(`${ns}.r_${n}_note`),
  }));
  const TESTIMONIALS = [1, 2].map(n => ({
    quote: t(`${ns}.t_${n}_quote`),
    name: t(`${ns}.t_${n}_name`),
    role: t(`${ns}.t_${n}_role`),
  }));
  const WHY = [1, 2, 3].map(n => ({
    title: t(`${ns}.why_${n}_title`),
    desc: t(`${ns}.why_${n}_desc`),
  }));

  return (
    <div className={styles.container}>
      <SEO
        title="英検準2級 個別指導 オンライン | 合格特化の1:1対策 | Petra Tutors"
        description="英検準2級に特化した完全1:1個別指導。語彙・リーディング・英作文（Eメール）・面接まで対応。オンライン全国対応。入会金なし。無料30分体験レッスンあり。"
        path="/eiken-pre2"
      />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t(`${ns}.hero_eyebrow`)}</span>
          <h1 className={styles.title}>{t(`${ns}.hero_title`)}</h1>
          <p className={styles.subtitle}>{t(`${ns}.hero_sub`)}</p>
          <div className={styles.groupDiscountContainer}>
            <span className={styles.groupDiscount}>
              <MapPin size={14} /> 笹塚・方南町で対面対応 · オンライン全国
            </span>
          </div>
          <div className={styles.ctaGroup}>
            <Link to="/inquiry" className={styles.primaryCta}>{t(`${ns}.hero_cta`)}</Link>
            <a href="https://lin.ee/rqf4A0D" className={styles.secondaryCta}>{t(`${ns}.hero_line`)}</a>
          </div>
          <div className={styles.trustPills}>
            {[1, 2, 3].map(n => (
              <div key={n} className={styles.pill}>
                <Check className={styles.checkIcon} size={16} />{t(`${ns}.trust_${n}`)}
              </div>
            ))}
          </div>
          <div className={styles.heroResults}>
            {RESULTS.map((r, i) => (
              <div key={i} className={styles.heroResultItem}>
                <span className={styles.resVal}>{r.val}</span>
                <span className={styles.resLabel}>{r.label}</span>
                <span className={styles.resNote}>{r.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.painSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t(`${ns}.pain_eyebrow`)}</span>
          <h2 className={styles.sectionTitle}>{t(`${ns}.pain_title`)}</h2>
          <div className={styles.painGrid}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className={styles.painCard}>
                <X className={styles.iconX} size={16} /><p>{p}</p>
              </div>
            ))}
          </div>
          <div className={styles.painInsight}><p>{t(`${ns}.pain_note`)}</p></div>
        </div>
      </section>

      <section className={styles.solutionSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t(`${ns}.solution_eyebrow`)}</span>
          <h2 className={styles.sectionTitle}>{t(`${ns}.solution_title`)}</h2>
          <div className={styles.solutionGrid}>
            {SOLUTIONS.map((s, i) => (
              <div key={i} className={styles.solutionCard}>
                <span className={styles.badge}>{s.badge}</span>
                <h3>{s.title}</h3><p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
        <div className={styles.wrapper}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '1rem', color: 'inherit' }}>{t('landing.mid_cta_title')}</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.8, fontSize: '0.95rem' }}>{t('landing.mid_cta_desc')}</p>
          <Link to="/inquiry" className={styles.primaryCta} style={{ display: 'inline-block' }}>{t('landing.mid_cta_btn')}</Link>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t(`${ns}.why_eyebrow`)}</span>
          <h2 className={styles.sectionTitle}>{t(`${ns}.why_title`)}</h2>
          <p className={styles.whySub}>{t(`${ns}.why_sub`)}</p>
          <div className={styles.whyGrid}>
            {WHY.map((w, i) => (
              <div key={i} className={styles.whyCard}><h4>{w.title}</h4><p>{w.desc}</p></div>
            ))}
          </div>
          <div className={styles.testimonialStrip}>
            {TESTIMONIALS.map((t_, i) => (
              <div key={i} className={styles.testimonialItem}>
                <p className={styles.quote}>"{t_.quote}"</p>
                <p className={styles.author}>{t_.name} <span className={styles.role}>{t_.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ theme="dark" />

      <section className={styles.finalCtaSection}>
        <div className={styles.wrapper}>
          <span className={styles.sectionEyebrow}>{t(`${ns}.final_eyebrow`)}</span>
          <h2 className={styles.sectionTitle}>{t(`${ns}.final_title`)}</h2>
          <p className={styles.finalSub}>{t(`${ns}.final_sub`)}</p>
          <Link to="/inquiry" className={styles.hugeCta}>{t(`${ns}.final_cta`)}</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingEikenPre2;
