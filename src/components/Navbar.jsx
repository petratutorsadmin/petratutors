import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export default function Navbar({ top = '12px' }) {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const update = () => {
            const p = Math.min(window.scrollY / 180, 1);
            const el = navbarRef.current;
            if (!el) return;
            el.style.background = `rgba(249, 246, 240, ${(p * 0.52).toFixed(3)})`;
            el.style.backdropFilter = `blur(${(p * 14).toFixed(1)}px)`;
            el.style.webkitBackdropFilter = `blur(${(p * 14).toFixed(1)}px)`;
            el.style.boxShadow = p > 0.05
                ? `0 4px 24px rgba(48,27,71,${(p * 0.10).toFixed(3)}), 0 1px 4px rgba(48,27,71,${(p * 0.06).toFixed(3)})`
                : 'none';
            el.style.borderColor = `rgba(255,255,255,${(p * 0.55).toFixed(3)})`;
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    // Toggle body class so FloatingCTA and other fixed elements can hide via CSS
    useEffect(() => {
        document.body.classList.toggle('mobile-menu-open', isOpen);
        return () => document.body.classList.remove('mobile-menu-open');
    }, [isOpen]);

    return (
        <header className={`${styles.navbarWrapper} ${isOpen ? styles.navbarMenuOpen : ''}`} style={{ top }}>
            {/* navbarRef gets backdrop-filter on scroll — mobile nav must live OUTSIDE it
                so backdrop-filter doesn't create a containing block that clips position:fixed */}
            <div ref={navbarRef} className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link to="/" className={styles.logo}>
                        <img src="/logo-optimized.webp" alt="Petra Tutors" width="32" height="32" className={styles.logoImage} />
                        <span>{t('nav.petra', 'Petra Tutors')}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={styles.desktopNav}>
                        <Link to="/about" className={styles.navLink}>{t('nav.about')}</Link>
                        <Link to="/team" className={styles.navLink}>{t('nav.team')}</Link>
                        <Link to="/ecosystem" className={styles.navLink}>{t('nav.programs')}</Link>
                        <Link to="/tutors" className={styles.navLink}>{t('nav.tutors')}</Link>
                        <Link to="/pricing" className={styles.navLink}>{t('nav.pricing')}</Link>
                        <Link to="/keystone" className={styles.navLink}>
                            {t('nav.publication', 'The Keystone')}
                        </Link>
                        <div className={styles.langSwitcher}>
                            <Globe size={18} className={styles.globeIcon} aria-hidden="true" />
                            <div className={styles.pill}>
                                <button
                                    onClick={() => i18n.changeLanguage('en')}
                                    className={`${styles.langBtn} ${i18n.language === 'en' ? styles.activeLang : ''}`}
                                >EN</button>
                                <button
                                    onClick={() => i18n.changeLanguage('ja')}
                                    className={`${styles.langBtn} ${i18n.language === 'ja' ? styles.activeLang : ''}`}
                                >JP</button>
                            </div>
                        </div>
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
            </div>

            {/* Mobile Nav Overlay — sibling of navbarRef, not a child.
                position:fixed here is relative to the viewport, not the blur container. */}
            <div className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ''}`}>
                <div className={styles.mobileNavTop}>
                    <Link to="/" className={styles.mobileNavBrand} onClick={() => setIsOpen(false)}>
                        <img src="/logo-optimized.webp" alt="Petra Tutors" width="28" height="28" />
                    </Link>
                    <button className={styles.mobileNavClose} onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X size={20} />
                    </button>
                </div>

                <nav className={styles.mobileNavLinks}>
                    <Link to="/about" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
                    <Link to="/team" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.team')}</Link>
                    <Link to="/ecosystem" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.programs')}</Link>
                    <Link to="/tutors" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.tutors')}</Link>
                    <Link to="/pricing" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>{t('nav.pricing')}</Link>
                    <Link to="/keystone" className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
                        {t('nav.publication', 'The Keystone')}
                    </Link>
                </nav>

                <div className={styles.mobileNavBottom}>
                    <Link to="/inquiry" className={styles.mobileNavCta} onClick={() => setIsOpen(false)}>
                        {t('nav.bookTrial', 'Book a Trial')}
                    </Link>
                    <div className={styles.mobileLangRow}>
                        <button
                            onClick={() => i18n.changeLanguage('en')}
                            className={`${styles.mobileLangBtn} ${i18n.language === 'en' ? styles.mobileLangActive : ''}`}
                        >EN</button>
                        <span className={styles.mobileLangDot} aria-hidden="true">·</span>
                        <button
                            onClick={() => i18n.changeLanguage('ja')}
                            className={`${styles.mobileLangBtn} ${i18n.language === 'ja' ? styles.mobileLangActive : ''}`}
                        >JP</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
