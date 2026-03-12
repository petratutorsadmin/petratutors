import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ja' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className={`${styles.navbar} glass-panel`}>
            <div className={`container ${styles.navContainer}`}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Petra Tutors" className={styles.logoImage} />
                    <span>Petra Tutors</span>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <Link to="/about" className={styles.navLink}>{t('nav.about')}</Link>
                    <Link to="/programs" className={styles.navLink}>{t('nav.programs')}</Link>
                    <Link to="/tutors" className={styles.navLink}>{t('nav.tutors')}</Link>
                    <Link to="/pricing" className={styles.navLink}>{t('nav.pricing')}</Link>
                    <button onClick={toggleLanguage} className={styles.langToggle}>
                        {i18n.language === 'en' ? 'EN | JP' : 'JP | EN'}
                    </button>
                    <Link to="/inquiry" className={`btn btn-primary ${styles.navCta}`}>{t('nav.inquiry')}</Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className={`${styles.mobileNav} glass-panel`}>
                    <div className="container">
                        <Link to="/about" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/programs" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.programs')}</Link>
                        <Link to="/tutors" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.tutors')}</Link>
                        <Link to="/pricing" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
                        <div className={styles.mobileNavLink}>
                            <button onClick={toggleLanguage} className={styles.langToggleMobile}>
                                {i18n.language === 'en' ? 'Switch to Japanese (JP)' : 'Switch to English (EN)'}
                            </button>
                        </div>
                        <Link to="/inquiry" className={`btn btn-primary ${styles.mobileNavCta}`} onClick={() => setIsOpen(false)}>{t('nav.inquiry')}</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
