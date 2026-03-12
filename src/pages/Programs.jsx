import { Link } from 'react-router-dom';
import { BookOpen, Languages, GraduationCap, Globe2, PenTool, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Programs.module.css';

export default function Programs() {
    const { t } = useTranslation();

    const programs = [
        {
            id: 'japanese',
            icon: <Languages size={32} />,
            title_key: 'prog_lang_title',
            desc_key: 'prog_lang_desc'
        },
        {
            id: 'exam',
            icon: <GraduationCap size={32} />,
            title_key: 'prog_exam_title',
            desc_key: 'prog_exam_desc'
        },
        {
            id: 'international',
            icon: <Globe2 size={32} />,
            title_key: 'prog_intl_title',
            desc_key: 'prog_intl_desc'
        }
    ];

    return (
        <>
            <div className={`${styles.header} glass-panel`}>
                <div className="container text-center animate-on-scroll">
                    <h1 className="text-h1" style={{ marginBottom: '1rem', color: 'var(--c-navy)' }}>{t('programs.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        {t('programs.subtitle')}
                    </p>
                </div>
            </div>

            <div className="section container">
                <div className={styles.programsList}>

                    {/* We simplify the programs list using translation strings from the Home section which already exist,
              Or we could add more specific ones. Since the original strings are broad, let's render manually or use a refined list. */}
                    {/* Manually recreating the sections with new glass styling */}

                    <div className={`${styles.programRow} animate-on-scroll`}>
                        <div className={styles.programContent}>
                            <div className={styles.iconWrapper}>
                                <Languages size={32} />
                            </div>
                            <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>{t('home.prog_lang_title')}</h2>
                            <div className={styles.programDetails}>
                                <p style={{ color: 'var(--c-text-light)' }}>{t('home.prog_lang_desc')}</p>
                            </div>
                            <Link to="/inquiry" className="btn btn-secondary" style={{ marginTop: '2rem' }}>{t('programs.inquire')}</Link>
                        </div>
                        <div className={styles.programVisual}>
                            <div className={`${styles.visualPlaceholder} glass-card`} />
                        </div>
                    </div>

                    <div className={`${styles.programRow} ${styles.reverse} animate-on-scroll`}>
                        <div className={styles.programContent}>
                            <div className={styles.iconWrapper}>
                                <GraduationCap size={32} />
                            </div>
                            <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>{t('home.prog_exam_title')}</h2>
                            <div className={styles.programDetails}>
                                <p style={{ color: 'var(--c-text-light)' }}>{t('home.prog_exam_desc')}</p>
                            </div>
                            <Link to="/inquiry" className="btn btn-secondary" style={{ marginTop: '2rem' }}>{t('programs.inquire')}</Link>
                        </div>
                        <div className={styles.programVisual}>
                            <div className={`${styles.visualPlaceholder} glass-card`} />
                        </div>
                    </div>

                    <div className={`${styles.programRow} animate-on-scroll`}>
                        <div className={styles.programContent}>
                            <div className={styles.iconWrapper}>
                                <Globe2 size={32} />
                            </div>
                            <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>{t('home.prog_intl_title')}</h2>
                            <div className={styles.programDetails}>
                                <p style={{ color: 'var(--c-text-light)' }}>{t('home.prog_intl_desc')}</p>
                            </div>
                            <Link to="/inquiry" className="btn btn-secondary" style={{ marginTop: '2rem' }}>{t('programs.inquire')}</Link>
                        </div>
                        <div className={styles.programVisual}>
                            <div className={`${styles.visualPlaceholder} glass-card`} />
                        </div>
                    </div>

                </div>
            </div>

            <section className={styles.ctaSection}>
                <div className="container text-center animate-on-scroll">
                    <h2 className="text-h2" style={{ color: 'var(--c-white)', marginBottom: '1rem' }}>
                        {t('programs.custom_title')}
                    </h2>
                    <p className="text-large" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                        {t('programs.custom_desc')}
                    </p>
                    <Link to="/inquiry" className="btn" style={{ backgroundColor: 'var(--c-sand)', color: 'var(--c-navy)' }}>
                        {t('programs.contact')}
                    </Link>
                </div>
            </section>
        </>
    );
}
