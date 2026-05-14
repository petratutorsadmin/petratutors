import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './ExitIntentPopup.module.css';

const SESSION_KEY = 'petra_exit_popup_shown';

export default function ExitIntentPopup() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Don't show if already shown this session
        if (sessionStorage.getItem(SESSION_KEY)) return;

        const handleMouseLeave = (e) => {
            // Trigger when mouse moves to the very top of the viewport (tab-close intent)
            if (e.clientY <= 10) {
                setVisible(true);
                sessionStorage.setItem(SESSION_KEY, 'true');
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
        };

        // Small delay so it doesn't fire immediately on page load
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 3000);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleDismiss = () => setVisible(false);

    if (!visible) return null;

    return (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Close">✕</button>
                    <div className={styles.tag}>{t('exit.tag')}</div>
                    <h2 className={styles.headerTitle} dangerouslySetInnerHTML={{ __html: t('exit.title') }}></h2>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>
                        {t('exit.desc')}
                    </p>

                    <div className={styles.perks}>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>{t('exit.p1')}</span>
                        </div>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>{t('exit.p2')}</span>
                        </div>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>{t('exit.p3')}</span>
                        </div>
                    </div>

                    <Link to="/inquiry" className={styles.cta} onClick={handleDismiss}>
                        {t('exit.cta')}
                    </Link>
                    <button className={styles.dismiss} onClick={handleDismiss}>
                        {t('exit.dismiss')}
                    </button>
                </div>
            </div>
        </div>
    );
}
