import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePopup.module.css';

export default function WelcomePopup() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('popup_dismissed');
        if (!dismissed) {
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        sessionStorage.setItem('popup_dismissed', 'true');
    };

    if (!visible) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={handleClose}>
                    <X size={20} />
                </button>
                <div className={styles.iconRow}>
                    <Sparkles size={28} className={styles.sparkle} />
                </div>
                <h2 className={`text-h3 ${styles.title}`}>{t('popup.title')}</h2>
                <p className={styles.desc}>{t('popup.desc')}</p>
                <Link to="/inquiry" className={`btn btn-primary ${styles.cta}`} onClick={handleClose}>
                    {t('popup.cta')}
                </Link>
                <p className={styles.dismiss} onClick={handleClose}>{t('popup.dismiss')}</p>
            </div>
        </div>
    );
}
