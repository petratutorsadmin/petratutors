import { Link } from 'react-router-dom';
import { BookOpen, Languages, GraduationCap, Globe2, PenTool, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Programs.module.css';

export default function Programs() {
    const { t } = useTranslation();

    const PROGRAMS = [
        {
            id: 'ielts',
            to: '/ielts',
            icon: <PenTool size={28} />,
            labelKey: 'gateway.choice_ielts_label',
            subKey: 'gateway.choice_ielts_sub'
        },
        {
            id: 'ib',
            to: '/ib',
            icon: <Globe2 size={28} />,
            labelKey: 'gateway.choice_ib_label',
            subKey: 'gateway.choice_ib_sub'
        },
        {
            id: 'foundation',
            to: '/foundation',
            icon: <BookOpen size={28} />,
            labelKey: 'gateway.choice_foundation_label',
            subKey: 'gateway.choice_foundation_sub'
        },
        {
            id: 'kids',
            to: '/kids',
            icon: <Sparkles size={28} />,
            labelKey: 'gateway.choice_kids_label',
            subKey: 'gateway.choice_kids_sub'
        },
        {
            id: 'uni',
            to: '/university',
            icon: <GraduationCap size={28} />,
            labelKey: 'gateway.choice_uni_label',
            subKey: 'gateway.choice_uni_sub'
        },
        {
            id: 'biz',
            to: '/business',
            icon: <Briefcase size={28} />,
            labelKey: 'gateway.choice_biz_label',
            subKey: 'gateway.choice_biz_sub'
        }
    ];

    return (
        <>
            <div className={styles.header}>
                <div className="container animate-on-scroll">
                    <h1 className={styles.title}>{t('programs.title')}</h1>
                    <p className={styles.subtitle}>
                        {t('programs.subtitle')}
                    </p>
                </div>
            </div>

            <div className={styles.gridSection}>
                <div className="container">
                    <div className={styles.programsGrid}>
                        {PROGRAMS.map((prog, idx) => (
                            <Link 
                                key={prog.id} 
                                to={prog.to} 
                                className={`${styles.programCard} animate-on-scroll`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className={styles.iconWrapper}>
                                    {prog.icon}
                                </div>
                                <h2 className={styles.cardTitle}>{t(prog.labelKey)}</h2>
                                <p className={styles.cardDesc}>{t(prog.subKey)}</p>
                                <div className={styles.cardAction}>
                                    詳細を見る <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <section className={styles.ctaSection}>
                <div className="container animate-on-scroll">
                    <h2 className={styles.ctaTitle}>
                        {t('programs.custom_title')}
                    </h2>
                    <p className={styles.ctaDesc}>
                        {t('programs.custom_desc')}
                    </p>
                    <Link to="/inquiry" className="btn btn-gold">
                        {t('programs.contact')}
                    </Link>
                </div>
            </section>
        </>
    );
}
