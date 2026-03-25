import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const lastScrollY = useRef(0);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const currentY = window.scrollY;
                if (currentY > lastScrollY.current && currentY > 80 && !isOpen) {
                    setShowNav(false);
                } else if (currentY < lastScrollY.current || currentY <= 80) {
                    setShowNav(true);
                }
                lastScrollY.current = currentY;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ja' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className={`${styles.navbarWrapper} ${!showNav ? styles.navbarHidden : ''}`}>
            <div className={styles.urgencyBar}>
                <div className="container">
                    {t('home.urgency_bar')}
                </div>
            </div>
            <div className={`${styles.navbar} glass-panel`}>
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
                    <div className={styles.langSwitcher}>
                        <Globe size={18} className={styles.globeIcon} />
                        <div className={styles.pill}>
                            <button 
                                onClick={() => i18n.changeLanguage('en')} 
                                className={`${styles.langBtn} ${i18n.language === 'en' ? styles.activeLang : ''}`}
                            >
                                EN
                            </button>
                            <button 
                                onClick={() => i18n.changeLanguage('ja')} 
                                className={`${styles.langBtn} ${i18n.language === 'ja' ? styles.activeLang : ''}`}
                            >
                                JP
                            </button>
                        </div>
                    </div>
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

            {/* Mobile Nav Overlay */}
            <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
                <div className={styles.mobileNavContainer}>
                    <div className={styles.mobileNavLinks}>
                        <Link to="/about" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/programs" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.programs')}</Link>
                        <Link to="/tutors" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.tutors')}</Link>
                        <Link to="/pricing" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
                    </div>
                    
                    <div className={styles.mobileExtraSection}>
                        <div className={styles.mobileLangSection}>
                            <Globe size={20} />
                            <div className={styles.pill}>
                                <button 
                                    onClick={() => { i18n.changeLanguage('en'); setIsOpen(false); }} 
                                    className={`${styles.langBtn} ${i18n.language === 'en' ? styles.activeLang : ''}`}
                                >
                                    English (EN)
                                </button>
                                <button 
                                    onClick={() => { i18n.changeLanguage('ja'); setIsOpen(false); }} 
                                    className={`${styles.langBtn} ${i18n.language === 'ja' ? styles.activeLang : ''}`}
                                >
                                    日本語 (JP)
                                </button>
                            </div>
                        </div>
                        <Link to="/inquiry" className={`btn btn-primary ${styles.mobileNavCta}`} onClick={() => setIsOpen(false)}>{t('nav.inquiry')}</Link>
                    </div>
                </div>
            </div>
            </div>
        </header>
    );
}
