import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brandCol}>
                    <Link to="/" className={styles.logo}>
                        <img src="/logo-optimized.webp" alt="Petra Tutors" width="32" height="32" className={styles.logoImage} />
                        <span>{t('nav.petra', 'Petra Tutors')}</span>
                    </Link>
                    <p className={styles.brandText}>
                        {t('footer.tagline')}
                    </p>
                    <p className={styles.screeningNote}>
                        {t('footer.screening')}
                    </p>
                    <div className={styles.brandDetails}>
                        <div className={styles.contactItem}>
                            <MapPin size={14} />
                            <span>{t('footer.address')}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={14} />
                            <span>{t('footer.phone')}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.linksCol}>
                    <h3 className={styles.colTitle}>{t('footer.explore')}</h3>
                    <Link to="/" className={styles.link}>{t('footer.home')}</Link>
                    <Link to="/about" className={styles.link}>{t('footer.about')}</Link>
                    <Link to="/tutors" className={styles.link}>{t('footer.tutors')}</Link>
                    <Link to="/pricing" className={styles.link}>{t('footer.pricing')}</Link>
                    <Link to="/hiring" className={styles.link}>{t('footer.hiring', 'Join Our Team')}</Link>
                    <Link to="/faq" className={styles.link}>{t('nav.faq', 'FAQ')}</Link>
                    <Link to="/no-admission-fee" className={styles.link}>{t('footer.policy_no_fee')}</Link>
                    <Link to="/keystone" className={styles.link}>
                        {t('footer.publication', 'The Keystone')}
                    </Link>
                    <Link to="/ecosystem" className={styles.link}>
                        {t('footer.ecosystem', 'Ecosystem')}
                    </Link>
                </div>

                <div className={styles.linksCol}>
                    <h3 className={styles.colTitle}>{t('footer.services')}</h3>
                    <Link to="/kids" className={styles.link}>{t('footer.service_kids')}</Link>
                    <Link to="/eiken" className={styles.link}>{t('footer.service_eiken', 'EIKEN Prep')}</Link>
                    <Link to="/ielts" className={styles.link}>{t('footer.service_ielts')}</Link>
                    <Link to="/ib" className={styles.link}>{t('footer.service_ib')}</Link>
                    <Link to="/university" className={styles.link}>{t('footer.service_university')}</Link>
                    <Link to="/english" className={styles.link}>{t('footer.service_english', 'English Tutoring')}</Link>
                    <Link to="/foundation" className={styles.link}>{t('footer.service_foundation', 'Foundation / PYP')}</Link>
                    <Link to="/summer" className={styles.link}>{t('footer.service_summer', 'Summer Intensive')}</Link>
                    <Link to="/business" className={styles.link}>{t('footer.service_business')}</Link>
                </div>

                <div className={styles.contactCol}>
                    <h3 className={styles.colTitle}>{t('footer.contact')}</h3>
                    <Link to="/inquiry" className={`${styles.link} ${styles.footerCtaBtn}`}>
                        {t('footer.inquiry', 'Book Free Trial')}
                    </Link>
                    <a href={t('nav.line_url')} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.lineBtn}`}>
                        <MessageCircle size={16} />
                        <span>{t('nav.line_cta', 'Consult on LINE')}</span>
                    </a>
                    <a href="mailto:admin@petratutors.com" className={styles.link}>
                        <Mail size={16} />
                        <span>admin@petratutors.com</span>
                    </a>
                    <p className={styles.responseTime}>{t('footer.response_time')}</p>
                    <a href="https://instagram.com/petratutors" target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="@petratutors on Instagram">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                        <span>@petratutors</span>
                    </a>
                    <a href="https://www.linkedin.com/company/petratutors/" target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={t('footer.linkedin_label', 'Petra Tutors on LinkedIn')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className="container">
                    <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Petra Tutors. All rights reserved.</p>
                    <p className={styles.legalText}>
                        {t('footer.legal_info')}
                        <span className={styles.legalSep}>·</span>
                        <Link to="/privacy" className={styles.legalLink}>{t('footer.privacy')}</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}


