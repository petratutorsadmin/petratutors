import { Send, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@formspree/react';
import { useState, useEffect } from 'react';
import styles from './Inquiry.module.css';

export default function Inquiry() {
    const { t } = useTranslation();
    const [state, handleSubmit] = useForm("mzdjdvqz");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        purpose: '',
        grade: '',
        frequency: '',
        name: '',
        contact: '',
        subject: '',
        goal: ''
    });

    useEffect(() => {
        if (state.succeeded) {
            window.location.href = '/thank-you';
        }
    }, [state.succeeded]);

    const handleSelect = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field !== 'goal') setStep(prev => prev + 1);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <h2 className="text-h3">{t('inquiry.q_purpose_title')}</h2>
                        <div className={styles.optionGrid}>
                            {[1, 2, 3, 4, 5].map(id => (
                                <button 
                                    key={id}
                                    type="button"
                                    className={`${styles.optionBtn} ${formData.purpose === t(`inquiry.q_purpose_${id}`) ? styles.selected : ''}`}
                                    onClick={() => handleSelect('purpose', t(`inquiry.q_purpose_${id}`))}
                                >
                                    {t(`inquiry.q_purpose_${id}`)}
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--c-text-light)', margin: '1.25rem 0 0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {t('inquiry.business_section_label', 'ビジネス英語')}
                        </p>
                        <div className={styles.optionGrid}>
                            {[1, 2, 3, 4].map(id => (
                                <button 
                                    key={`biz-${id}`}
                                    type="button"
                                    className={`${styles.optionBtn} ${formData.purpose === t(`business.inquiry_purpose_${id}`) ? styles.selected : ''}`}
                                    onClick={() => handleSelect('purpose', t(`business.inquiry_purpose_${id}`))}
                                >
                                    {t(`business.inquiry_purpose_${id}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.stepContent}>
                        <h2 className="text-h3">{t('inquiry.q_grade_title')}</h2>
                        <div className={styles.optionGrid}>
                            {['a1', 'a2', 'a3', 'a4'].map(id => (
                                <button 
                                    key={id}
                                    type="button"
                                    className={`${styles.optionBtn} ${formData.grade === t(`inquiry.${id}`) ? styles.selected : ''}`}
                                    onClick={() => handleSelect('grade', t(`inquiry.${id}`))}
                                >
                                    {t(`inquiry.${id}`)}
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className={styles.backBtn}><ArrowLeft size={16}/> {t('inquiry.back')}</button>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.stepContent}>
                        <h2 className="text-h3">{t('inquiry.q_freq_title')}</h2>
                        <div className={styles.optionGrid}>
                            {[1, 2, 3, 4].map(id => (
                                <button 
                                    key={id}
                                    type="button"
                                    className={`${styles.optionBtn} ${formData.frequency === t(`inquiry.q_freq_${id}`) ? styles.selected : ''}`}
                                    onClick={() => handleSelect('frequency', t(`inquiry.q_freq_${id}`))}
                                >
                                    {t(`inquiry.q_freq_${id}`)}
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className={styles.backBtn}><ArrowLeft size={16}/> {t('inquiry.back')}</button>
                    </div>
                );
            case 4:
                return (
                    <div className={styles.stepContent}>
                        <h2 className="text-h3">{t('inquiry.final_title')}</h2>
                        <div className={styles.finalForm}>
                            <input type="hidden" name="purpose" value={formData.purpose} />
                            <input type="hidden" name="grade" value={formData.grade} />
                            <input type="hidden" name="frequency" value={formData.frequency} />
                            
                            <div className={styles.formGroup}>
                                <label>{t('inquiry.name')}</label>
                                <input type="text" name="name" required placeholder={t('inquiry.name_ph')} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{t('inquiry.contact')}</label>
                                <input type="text" name="contact" required placeholder={t('inquiry.contact_ph')} onChange={e => setFormData({...formData, contact: e.target.value})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{t('inquiry.subject')}</label>
                                <input type="text" name="subject" required placeholder={t('inquiry.subject_ph')} onChange={e => setFormData({...formData, subject: e.target.value})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>{t('inquiry.goal')}</label>
                                <textarea name="goal" rows="3" placeholder={t('inquiry.goal_ph')} onChange={e => setFormData({...formData, goal: e.target.value})}></textarea>
                            </div>
                            
                            <div className={styles.formActions}>
                                <button type="button" onClick={prevStep} className={styles.backLink}>{t('inquiry.back')}</button>
                                <button type="submit" disabled={state.submitting} className={`btn btn-primary ${styles.submitBtn}`}>
                                    <Send size={18} /> {state.submitting ? 'Sending...' : t('inquiry.submit')}
                                </button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="section container">
            <div className={styles.layout}>
                <div className={`${styles.infoCol} animate-on-scroll`}>
                    <h1 className={`text-h1 ${styles.pageTitle}`}>{t('inquiry.title')}</h1>
                    <p className={`text-large ${styles.pageSubtitle}`}>
                        {t('inquiry.subtitle')}
                    </p>

                    <div className={`${styles.progressTracker} glass-panel`}>
                        <div className={styles.progressHeader}>
                            <span>{t('inquiry.step_indicator', { current: step, total: 4 })}</span>
                            <div className={styles.bar}>
                                <div className={styles.fill} style={{ width: `${(step/4)*100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.trustBubbles}>
                        <div className={styles.bubble}>
                            <CheckCircle size={18} /> <span>100% Match Guarantee</span>
                        </div>
                        <div className={styles.bubble}>
                            <CheckCircle size={18} /> <span>No Admission Fees</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.formCol} animate-on-scroll`}>
                    <form className={`glass-card ${styles.funnelCard}`} onSubmit={handleSubmit}>
                        {renderStep()}
                    </form>
                </div>
            </div>
        </div>
    );
}
