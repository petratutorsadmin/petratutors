import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import styles from './TutorProgression.module.css';

const VALID_CODES = ['petracrew', 'petratutors', 'petradivisions'];

export default function TutorProgression() {
  const { t } = useTranslation();
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const auth = sessionStorage.getItem('tutor_access_authorized');
    if (auth === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthorized(true);
    }
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    const cleanCode = passcode.trim().toLowerCase();
    if (VALID_CODES.includes(cleanCode)) {
      sessionStorage.setItem('tutor_access_authorized', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError(t('divisions.portal_invalid', 'Invalid access code. Please try again.'));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tutor_access_authorized');
    setIsAuthorized(false);
    setPasscode('');
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (!isAuthorized) {
    return (
      <>
        <SEO 
          title="Tutor Portal | Petra Tutors"
          description="Restricted access tutor portal."
          path="/apply/progression"
        />
        <div className={styles.gateWrapper}>
          <div className={styles.gateCard}>
            <h1 className={styles.gateTitle}>{t('divisions.portal_title', 'Petra Tutor Portal')}</h1>
            <p className={styles.gateSubtitle}>
              {t('divisions.portal_subtitle', 'Please enter the access code to view the Contribution Divisions.')}
            </p>
            <form onSubmit={handleVerify} className={styles.gateForm}>
              <input 
                type="password" 
                placeholder={t('divisions.portal_placeholder', 'Access Code')}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={styles.gateInput}
                autoFocus
              />
              <button type="submit" className={styles.gateButton}>
                {t('divisions.portal_verify', 'Verify')}
              </button>
            </form>
            {error && <p className={styles.gateError}>{error}</p>}
          </div>
        </div>
      </>
    );
  }

  const roles = [
    { key: 'associate', defaultTitle: 'Associate Tutor', defaultHours: '0-49 hrs', defaultIncrease: 'Base Rate' },
    { key: 'tutor', defaultTitle: 'Tutor', defaultHours: '50+ hrs', defaultIncrease: '+¥100/hr' },
    { key: 'senior', defaultTitle: 'Senior Tutor', defaultHours: '200+ hrs', defaultIncrease: '+¥250/hr' },
    { key: 'lead', defaultTitle: 'Lead Tutor', defaultHours: '500+ hrs', defaultIncrease: '+¥500/hr' },
    { key: 'mentor', defaultTitle: 'Academic Mentor / Subject Specialist', defaultHours: 'Expertise-based', defaultIncrease: '+¥700/hr' },
    { key: 'director', defaultTitle: 'Head Tutor / Director of Studies', defaultHours: 'Leadership role', defaultIncrease: 'Individually Determined' }
  ];

  return (
    <>
      <SEO 
        title="Petra Tutor Progression System | Petra Tutors"
        description="An institutional framework recognizing teaching experience, educational quality, and dedication to the Petra academic community."
        path="/apply/progression"
      />

      <div className={styles.portalContainer}>
        {/* Top Control Bar */}
        <div className="container">
          <div className={styles.controlBar}>
            <div className={styles.portalNav}>
              <Link to="/apply/divisions" className={styles.portalNavLink}>
                {t('divisions.tab_divisions', 'Contribution Divisions')}
              </Link>
              <Link to="/apply/progression" className={styles.portalNavLinkActive}>
                {t('divisions.tab_progression', 'Progression System')}
              </Link>
            </div>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Editorial Header */}
        <header className={styles.portalHeader}>
          <div className="container">
            <h1 className={styles.portalTitleText}>
              {t('progression.page_title', 'Petra Tutor Progression System')}
            </h1>
            <p className={styles.portalSubtitleText}>
              {t('progression.page_subtitle', 'An institutional framework recognizing teaching experience, educational quality, and dedication to the Petra academic community.')}
            </p>
          </div>
        </header>

        {/* Narrative Introduction */}
        <section className={styles.introSection}>
          <div className="container">
            <div className={styles.introText}>
              <p className={styles.leadParagraph}>
                {t('progression.intro_lead', 'Education is not a transaction. It is a long-term commitment to human growth, language development, and intellectual mentorship.')}
              </p>
              <p className={styles.introP}>
                {t('progression.intro_p1', 'At Petra, we do not view our educators through the lens of startup metrics or corporate performance indicators. Instead, we progress through a structured, academic tier system designed to recognize teaching experience, instructional quality, and active contribution to our educational culture.')}
              </p>
              <p className={styles.introP} style={{ marginTop: '0.75rem' }}>
                {t('progression.intro_p2', 'Advancement within Petra represents a deepening of educational trust, academic responsibility, and mentorship. Tutors progress through tiers based on cumulative teaching hours, professional reliability, communication, teaching quality, and long-term support for their students.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Progression Ledger */}
        <section className={styles.ledgerSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {t('progression.ledger_title', 'Progression Ledger')}
              </h2>
              <p className={styles.sectionSubtitle}>
                {t('progression.ledger_subtitle', 'Institutional hours thresholds and corresponding hourly rate increases.')}
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.ledgerTable}>
                <thead>
                  <tr>
                    <th>{t('progression.ledger_th_role', 'Role')}</th>
                    <th>{t('progression.ledger_th_hours', 'Petra Hours')}</th>
                    <th>{t('progression.ledger_th_increase', 'Progression Increase')}</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.key}>
                      <td className={styles.roleCol}>
                        {t(`progression.role_${role.key}`, role.defaultTitle)}
                      </td>
                      <td className={styles.hoursCol}>
                        {t(`progression.hours_${role.key}`, role.defaultHours)}
                      </td>
                      <td className={styles.increaseCol}>
                        {t(`progression.rate_${role.key}`, role.defaultIncrease)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Role Explanations (Accordion) */}
        <section className={styles.rolesSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {t('progression.roles_section_title', 'Role Expectations & Educational Trust')}
              </h2>
            </div>

            <div className={styles.accordionContainer}>
              {roles.map((role, idx) => {
                const isOpen = activeAccordion === idx;
                return (
                  <div key={role.key} className={`${styles.accordionCard} ${isOpen ? styles.cardOpen : ''}`}>
                    <button 
                      className={styles.accordionHeader} 
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.headerInfo}>
                        <h3 className={styles.accordionRoleTitle}>
                          {t(`progression.role_${role.key}`, role.defaultTitle)}
                        </h3>
                        <span className={styles.accordionRoleMeta}>
                          {t(`progression.hours_${role.key}`, role.defaultHours)} &bull; {t(`progression.rate_${role.key}`, role.defaultIncrease)}
                        </span>
                      </div>
                      <div className={styles.accordionIcon}>
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5"
                          className={styles.chevron}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    <div className={styles.accordionBodyWrapper} style={{ maxHeight: isOpen ? '1000px' : '0' }}>
                      <div className={styles.accordionBody}>
                        <div className={styles.roleGrid}>
                          <div className={styles.roleColumn}>
                            <div className={styles.detailBlock}>
                              <h4 className={styles.detailTitle}>{t('progression.expectations_profile', 'Profile & Autonomy')}</h4>
                              <p className={styles.detailText}>
                                <strong>{t('progression.label_role', 'Role')}:</strong> {t(`progression.role_${role.key}_expectations.represents`)}
                              </p>
                              <p className={styles.detailText}>
                                <strong>{t('progression.label_trust', 'Trust Level')}:</strong> {t(`progression.role_${role.key}_expectations.trust`)}
                              </p>
                            </div>
                          </div>
                          <div className={styles.roleColumn}>
                            <div className={styles.detailBlock}>
                              <h4 className={styles.detailTitle}>{t('progression.expectations_edu', 'Educational Expectations')}</h4>
                              <p className={styles.detailText}>
                                <strong>{t('progression.label_pedagogy', 'Pedagogy')}:</strong> {t(`progression.role_${role.key}_expectations.expectations`)}
                              </p>
                              <p className={styles.detailText}>
                                <strong>{t('progression.label_mentorship', 'Mentorship')}:</strong> {t(`progression.role_${role.key}_expectations.mentorship`)}
                              </p>
                            </div>
                          </div>
                          <div className={styles.roleColumn}>
                            <div className={styles.detailBlock}>
                              <h4 className={styles.detailTitle}>{t('progression.expectations_contrib', 'Institutional Contribution')}</h4>
                              <p className={styles.detailText}>
                                <strong>{t('progression.label_focus', 'Focus')}:</strong> {t(`progression.role_${role.key}_expectations.contribution`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Honorary Titles */}
        <section className={styles.honorarySection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {t('progression.honorary_title', 'Honorary Titles')}
              </h2>
              <p className={styles.sectionSubtitle}>
                {t('progression.honorary_subtitle', 'Special academic and culture recognitions awarded by the Director of Studies.')}
              </p>
            </div>

            <div className={styles.honoraryGrid}>
              <div className={styles.honoraryCard}>
                <h3 className={styles.honoraryTitleText}>
                  {t('progression.founding_tutor_title', 'Founding Tutor')}
                </h3>
                <p className={styles.honoraryDesc}>
                  {t('progression.founding_tutor_desc', 'An honorary distinction awarded to early contributors who joined Petra during its initial establishment, helping shape our foundational pedagogy.')}
                </p>
              </div>

              <div className={styles.honoraryCard}>
                <h3 className={styles.honoraryTitleText}>
                  {t('progression.petra_fellow_title', 'Petra Fellow')}
                </h3>
                <p className={styles.honoraryDesc}>
                  {t('progression.petra_fellow_desc', 'The highest academic honor for long-term distinguished contribution to Petra\'s academic culture, helping steer our educational philosophy.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Important Notes */}
        <section className={styles.noteSection}>
          <div className="container">
            <div className={styles.noteBox}>
              <h3 className={styles.noteTitle}>
                {t('progression.notes_title', 'Important Notes on Advancement')}
              </h3>
              <p>{t('progression.notes_p1', 'Hours indicate when a tutor becomes eligible for consideration; promotion is not automatic.')}</p>
              <p>{t('progression.notes_p2', 'Advancement is based on a holistic review of teaching quality, reliability, and contribution to Petra culture.')}</p>
              <p>{t('progression.notes_p3', 'Active involvement in the Contribution Divisions or writing for The Keystone is highly valued.')}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
