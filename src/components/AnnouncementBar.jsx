import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AnnouncementBar.module.css';

const COPY = {
    en: {
        text: 'Summer Intensive 2026 | Now Enrolling · July 21 – Aug 29 · From ¥14,000',
        textShort: 'Summer Intensive 2026 · Now Enrolling',
        cta: 'View Programs',
    },
    ja: {
        text: '夏期講習 2026 受付中 · 7月21日〜8月29日 · ¥14,000〜',
        textShort: '夏期講習 2026 受付中',
        cta: 'プログラムを見る',
    },
};

const HIDDEN_PATHS = new Set(['/summer', '/thank-you', '/privacy']);

export default function AnnouncementBar() {
    const { i18n } = useTranslation();
    const { pathname } = useLocation();
    const c = i18n.language === 'ja' ? COPY.ja : COPY.en;

    if (HIDDEN_PATHS.has(pathname)) return null;

    return (
        <div className={styles.bar}>
            <span className={styles.text}>{c.text}</span>
            <span className={styles.textShort}>{c.textShort}</span>
            <Link to="/summer" className={styles.cta}>{c.cta}</Link>
        </div>
    );
}
