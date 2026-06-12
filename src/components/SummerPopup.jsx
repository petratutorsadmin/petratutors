import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './SummerPopup.module.css';

const COPY = {
    en: {
        eyebrow: 'Now enrolling',
        title: 'Summer Intensive 2026',
        dates: 'July 21 – August 29',
        desc: '5 programs, fully individual tutoring. From ¥14,000. Free trial lesson included.',
        cta: 'View Programs',
        dismiss: 'Maybe later',
    },
    ja: {
        eyebrow: '受付中',
        title: '夏期講習 2026',
        dates: '7月21日 – 8月29日',
        desc: '5つのプログラム・完全個別指導。¥14,000〜。無料体験レッスンあり。',
        cta: 'プログラムを見る',
        dismiss: '後で見る',
    },
};

const NO_POPUP_PATHS = new Set(['/team', '/about', '/hiring', '/privacy', '/thank-you', '/tutors']);

export default function SummerPopup() {
    const { i18n } = useTranslation();
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);
    const c = i18n.language === 'ja' ? COPY.ja : COPY.en;

    useEffect(() => {
        if (NO_POPUP_PATHS.has(pathname)) return;
        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
    }, [pathname]);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
                    <X size={18} />
                </button>

                <p className={styles.eyebrow}>{c.eyebrow}</p>
                <h2 className={styles.title}>{c.title}</h2>
                <p className={styles.dates}>{c.dates}</p>
                <p className={styles.desc}>{c.desc}</p>

                <Link to="/summer" className={styles.cta} onClick={handleClose}>
                    {c.cta}
                </Link>
                <button className={styles.dismiss} onClick={handleClose}>
                    {c.dismiss}
                </button>
            </div>
        </div>
    );
}
