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
                    <div className={styles.tag}>Limited Availability</div>
                    <h2 className={styles.headerTitle}>
                        Before you go —<br />
                        your <span>first lesson is free.</span>
                    </h2>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>
                        We match students with elite Tokyo University, UCL, and Keio mentors. Chat with our team in 30 seconds - no commitment, no enrolment fee.
                    </p>

                    <div className={styles.perks}>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>Free 30-min trial lesson included</span>
                        </div>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>No admission or setup fees</span>
                        </div>
                        <div className={styles.perk}>
                            <CheckCircle size={18} />
                            <span>Matched to your schedule & goals</span>
                        </div>
                    </div>

                    <Link to="/inquiry" className={styles.cta} onClick={handleDismiss}>
                        Book My Free Trial →
                    </Link>
                    <button className={styles.dismiss} onClick={handleDismiss}>
                        No thanks, I'll figure it out on my own
                    </button>
                </div>
            </div>
        </div>
    );
}
