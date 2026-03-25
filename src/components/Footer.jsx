import { Link } from 'react-router-dom';
import { Mail, Instagram } from 'lucide-react';
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
                    <Link to="/tutors" className={styles.link}>{t('footer.tutors')}</Link>
                    <Link to="/pricing" className={styles.link}>{t('footer.pricing')}</Link>
                    <Link to="/no-admission-fee" className={styles.link}>入会金なし ポリシー</Link>
                </div>

                <div className={styles.linksCol}>
                    <h4 className={styles.colTitle}>サービス</h4>
                    <Link to="/ib" className={styles.link}>IB・インター校</Link>
                    <Link to="/ielts" className={styles.link}>IELTS・英検対策</Link>
                    <Link to="/university" className={styles.link}>海外大学進学</Link>
                    <Link to="/business" className={styles.link}>社会人英語</Link>
                    <Link to="/kids" className={styles.link}>小学生・基礎英語</Link>
                </div>

                <div className={styles.contactCol}>
                    <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
                    <a href="mailto:admin@petratutors.com" className={styles.link}><Mail size={16} /> admin@petratutors.com</a>
                    <div className={styles.social}>
                        <a href="https://instagram.com/petratutors" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
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


