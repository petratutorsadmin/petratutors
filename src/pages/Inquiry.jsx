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
                    <form className={`glass-card ${styles.formCard}`} onSubmit={handleSubmit}>
                        <h3 className="text-h3" style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">{t('inquiry.name')}</label>
                                <input type="text" id="name" name="name" required placeholder={t('inquiry.name_ph')} />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="contact">{t('inquiry.contact')}</label>
                                <input type="text" id="contact" name="contact" required placeholder={t('inquiry.contact_ph')} />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="location">{t('inquiry.location')}</label>
                                <input type="text" id="location" name="location" required placeholder={t('inquiry.location_ph')} />
                            </div>
                        </div>

                        <h3 className="text-h3" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Learning Needs</h3>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="ageGroup">{t('inquiry.age')}</label>
                                <select id="ageGroup" name="ageGroup" required defaultValue="">
                                    <option value="" disabled>{t('inquiry.age_ph')}</option>
                                    <option value="children">{t('inquiry.a1')}</option>
                                    <option value="teens">{t('inquiry.a2')}</option>
                                    <option value="university">{t('inquiry.a3')}</option>
                                    <option value="adults">{t('inquiry.a4')}</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="frequency">{t('inquiry.freq')}</label>
                                <select id="frequency" name="frequency" required defaultValue="">
                                    <option value="" disabled>{t('inquiry.freq_ph')}</option>
                                    <option value="1x">{t('inquiry.f1')}</option>
                                    <option value="2x">{t('inquiry.f2')}</option>
                                    <option value="intensive">{t('inquiry.f3')}</option>
                                    <option value="flexible">{t('inquiry.f4')}</option>
                                </select>
                            </div>
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
                                rows="4"
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
