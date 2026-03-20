import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brandCol}>
                    <Link to="/" className={styles.logo}>
                        <img src="/logo.png" alt="Petra Tutors" className={styles.logoImage} />
                        <span>Petra Tutors</span>
                    </Link>
                    <p className={styles.brandText}>
                        {t('footer.tagline')}
                    </p>
                </div>

                <div className={styles.linksCol}>
                    <h4 className={styles.colTitle}>{t('footer.explore')}</h4>
                    <Link to="/" className={styles.link}>{t('footer.home')}</Link>
                    <Link to="/about" className={styles.link}>{t('footer.about')}</Link>
                    <Link to="/programs" className={styles.link}>{t('footer.programs')}</Link>
                    <Link to="/tutors" className={styles.link}>{t('footer.tutors')}</Link>
                    <Link to="/pricing" className={styles.link}>{t('footer.pricing')}</Link>
                </div>

                <div className={styles.contactCol}>
                    <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
                    <Link to="/inquiry" className={styles.link}>{t('footer.inquiry')}</Link>
                    <a href="mailto:admin@petratutors.com" className={styles.link}><Mail size={16} /> admin@petratutors.com</a>
                    <div className={styles.social}>
                        <a href="https://instagram.com/petratutors" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Petra Tutors. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
