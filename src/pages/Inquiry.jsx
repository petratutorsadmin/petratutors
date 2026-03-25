import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@formspree/react';
import { useEffect } from 'react';
import styles from './Inquiry.module.css';

export default function Inquiry() {
    const { t } = useTranslation();
    const [state, handleSubmit] = useForm("mzdjdvqz");

    useEffect(() => {
        if (state.succeeded) {
            window.location.href = '/thank-you';
        }
    }, [state.succeeded]);

    return (
        <div className="section container">
            <div className={styles.layout}>
                {/* Info Column */}
                <div className={`${styles.infoCol} animate-on-scroll`}>
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('inquiry.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', marginBottom: '2rem' }}>
                        {t('inquiry.subtitle')}
                    </p>

                    <div className={`${styles.friendlyNote} glass-panel`}>
                        <p><strong>{t('inquiry.next_title')}</strong></p>
                        <ol>
                            <li>{t('inquiry.n1')}</li>
                            <li>{t('inquiry.n2')}</li>
                            <li>{t('inquiry.n3')}</li>
                        </ol>
                        <p className={styles.reassuranceText} style={{ marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.9 }}>
                            "{t('inquiry.reassurance')}"
                        </p>
                    </div>
                </div>

                {/* Form Column */}
                <div className={`${styles.formCol} animate-on-scroll`} style={{ animationDelay: '0.2s' }}>
                    <div className={styles.formHeader}>
                        <h2 className="text-h3">Free trial — no commitment</h2>
                        <p>Complete this quick form to get started.</p>
                    </div>
                    <form className={`glass-card ${styles.formCard}`} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">{t('inquiry.name')}</label>
                            <input type="text" id="name" name="name" required placeholder={t('inquiry.name_ph')} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="contact">{t('inquiry.contact')}</label>
                            <input type="text" id="contact" name="contact" required placeholder={t('inquiry.contact_ph')} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="subject">{t('inquiry.subject')}</label>
                            <input type="text" id="subject" name="subject" required placeholder={t('inquiry.subject_ph')} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="goal">{t('inquiry.goal')}</label>
                            <textarea
                                id="goal"
                                name="goal"
                                rows="5"
                                required
                                placeholder={t('inquiry.goal_ph')}
                            ></textarea>
                        </div>

                        <button type="submit" disabled={state.submitting} className={`btn btn-primary ${styles.submitBtn}`}>
                            <Send size={18} /> {state.submitting ? 'Sending...' : t('inquiry.submit')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
