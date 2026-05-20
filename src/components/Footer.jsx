import { Link } from 'react-router-dom';
import { Mail, Instagram, MapPin, Phone } from 'lucide-react';
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
                    <h4 className={styles.colTitle}>{t('footer.explore')}</h4>
                    <Link to="/" className={styles.link}>{t('footer.home')}</Link>
                    <Link to="/about" className={styles.link}>{t('footer.about')}</Link>
                    <Link to="/tutors" className={styles.link}>{t('footer.tutors')}</Link>
                    <Link to="/pricing" className={styles.link}>{t('footer.pricing')}</Link>
                    <Link to="/hiring" className={styles.link}>{t('footer.hiring', 'Join Our Team')}</Link>
                    <Link to="/no-admission-fee" className={styles.link}>{t('footer.policy_no_fee')}</Link>
                    <Link to="/keystone" className={styles.link}>
                        {t('footer.publication', 'The Keystone')}
                    </Link>
                    <Link to="/ecosystem" className={styles.link}>
                        {t('footer.ecosystem', 'Ecosystem')}
                    </Link>
                </div>

                <div className={styles.linksCol}>
                    <h4 className={styles.colTitle}>{t('footer.services')}</h4>
                    <Link to="/ib" className={styles.link}>{t('footer.service_ib')}</Link>
                    <Link to="/ielts" className={styles.link}>{t('footer.service_ielts')}</Link>
                    <Link to="/university" className={styles.link}>{t('footer.service_university')}</Link>
                    <Link to="/business" className={styles.link}>{t('footer.service_business')}</Link>
                    <Link to="/kids" className={styles.link}>{t('footer.service_kids')}</Link>
                </div>

                <div className={styles.contactCol}>
                    <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
                    <a href="mailto:admin@petratutors.com" className={styles.link}>
                        <Mail size={16} /> 
                        <span>admin@petratutors.com</span>
                    </a>
                    <a href="https://instagram.com/petratutors" target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="Instagram">
                        <Instagram size={16} /> 
                        <span>petratutors</span>
                    </a>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Petra Tutors. All rights reserved.</p>
                    <p className={styles.legalText}>
                        {t('footer.legal_info')}
                    </p>
                </div>
            </div>
        </footer>
    );
}


