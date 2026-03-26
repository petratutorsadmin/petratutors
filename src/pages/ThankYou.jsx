import { CheckCircle, ArrowRight, Users, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './ThankYou.module.css';

export default function ThankYou() {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <div className={`${styles.modal} animate-on-scroll`}>
                <div className={styles.iconWrapper}>
                    <CheckCircle size={40} strokeWidth={2.5} />
                </div>
                
                <h1 className={styles.title}>{t('inquiry.success_title')}</h1>
                <p className={styles.description}>
                    {t('inquiry.success_desc', 'Thank you for reaching out to Petra Tutors. Our admissions team will review your inquiry and reply shortly with the next steps in our matching process.')}
                </p>
                
                <div className={styles.nextStepsGrid}>
                    <Link to="/tutors" className={styles.stepCard}>
                        <Users size={24} className={styles.stepIcon} />
                        <span className={styles.stepTitle}>Meet Our Mentors</span>
                        <span className={styles.stepSub}>View profiles of our expert tutors from top global universities.</span>
                    </Link>
                    
                    <Link to="/programs" className={styles.stepCard}>
                        <BookOpen size={24} className={styles.stepIcon} />
                        <span className={styles.stepTitle}>Explore Programmes</span>
                        <span className={styles.stepSub}>Learn more about our structured curricula and exam preparation.</span>
                    </Link>
                </div>

                <div className={styles.footerNote}>
                    In the meantime, feel free to read more <Link to="/about">About Us</Link> or follow our latest updates on <a href="https://instagram.com/petratutors" target="_blank" rel="noopener noreferrer">Instagram</a>.
                </div>
            </div>
        </div>
    );
}
