import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import styles from './TutorDivisions.module.css';

const VALID_CODES = ['petracrew', 'petratutors', 'petradivisions'];

export default function TutorDivisions() {
  const { t } = useTranslation();
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

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

  if (!isAuthorized) {
    return (
      <>
        <SEO 
          title="Tutor Portal | Petra Tutors"
          description="Restricted access tutor portal."
          path="/apply/divisions"
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

  return (
    <>
      <SEO 
        title="Petra Contribution Divisions | Petra Tutors"
        description="Optional internal groups where tutors, mentors, and contributors can help shape Petra beyond individual lessons."
        path="/apply/divisions"
      />

      <div className={styles.portalContainer}>
        {/* Top Control Bar */}
        <div className="container">
          <div className={styles.controlBar}>
            <div className={styles.portalNav}>
              <Link to="/apply/divisions" className={styles.portalNavLinkActive}>
                {t('divisions.tab_divisions', 'Contribution Divisions')}
              </Link>
              <Link to="/apply/progression" className={styles.portalNavLink}>
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
              {t('divisions.page_title', 'Petra Contribution Divisions')}
            </h1>
            <p className={styles.portalSubtitleText}>
              {t('divisions.page_subtitle', 'Collaborative divisions for Petra educators to develop pedagogical methodologies and shape our academic institution.')}
            </p>
          </div>
        </header>

        {/* Narrative Introduction */}
        <section className={styles.introSection}>
          <div className="container">
            <div className={styles.introText}>
              <p className={styles.leadParagraph}>
                {t('divisions.intro_lead', 'At Petra, tutors are not treated simply as lesson providers.')}
              </p>
              <p className={styles.introP}>
                {t('divisions.intro_p1', 'We believe that good education is built by people who think carefully about learning, language, and growth. These optional groups allow tutors to shape Petra beyond individual lessons while building meaningful experience for future careers.')}
              </p>
            </div>
          </div>
        </section>

        {/* Divisions Grid Section */}
        <section className={styles.divisionsSection}>
          <div className="container">
            <div className={styles.divisionsGrid}>
              {[
                'academic_curriculum',
                'student_success',
                'media_comm',
                'social_media',
                'keystone_editorial',
                'academic_rd'
              ].map((key, index) => (
                <div key={key} className={styles.divisionCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardNumber}>0{index + 1}</span>
                    <h3 className={styles.cardTitle}>
                      {t(`divisions.${key}_title`)}
                    </h3>
                  </div>
                  <p className={styles.cardDesc}>
                    {t(`divisions.${key}_desc`)}
                  </p>
                  <ul className={styles.focusList}>
                    <li>{t(`divisions.${key}_f1`)}</li>
                    <li>{t(`divisions.${key}_f2`)}</li>
                    <li>{t(`divisions.${key}_f3`)}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Important Note */}
        <section className={styles.noteSection}>
          <div className="container">
            <div className={styles.noteBox}>
              <h3 className={styles.noteTitle}>{t('divisions.note_title', 'Important Note')}</h3>
              <p>{t('divisions.note_text', 'These divisions are optional spaces for collaboration. Core operations, finance, and administration remain separate to ensure structural clarity.')}</p>
            </div>
          </div>
        </section>

        {/* CTA Panel */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaBox}>
              <h3 className={styles.ctaTitle}>
                {t('divisions.cta_title', 'Interested in Contributing?')}
              </h3>
              <p className={styles.ctaDesc}>
                {t('divisions.cta_desc', 'Tutors are invited to join any division where they want to make an impact. There is no form. Simply reach out to us via Google Chat.')}
              </p>
              <div className={styles.ctaActionHint}>
                <span>{t('divisions.cta_action', 'Message us on Google Chat')}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
