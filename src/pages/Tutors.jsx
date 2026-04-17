import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Monitor, GraduationCap, X, SlidersHorizontal, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Tutors.module.css';

// New Dataset
const TUTORS_BASE = [
    { id: 'tutor-4', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-4.png' },
    { id: 'tutor-5', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-5.png' },
    { id: 'tutor-tina', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-tina.jpg' },
    { id: 'tutor-2', format: ['Online'], image: '/images/tutors/tutor-2.png' },
    { id: 'tutor-6', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-6.png' },
    { id: 'tutor-hannah', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-hannah.jpg' },
    { id: 'tutor-sara', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-sara.jpg' },
    { id: 'tutor-cian', format: ['Online'], image: '/images/tutors/tutor-cian.jpg' },
    { id: 'tutor-toru', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-toru.jpg' },
    { id: 'tutor-maegan', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-maegan.jpg' },
    { id: 'tutor-michael', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-michael.jpg' }
];

export default function Tutors() {
    const { t } = useTranslation();
    const subjectsFilters = [
        t('tutors.f_all'),
        t('tutors.f_english', { defaultValue: 'English' }),
        t('tutors.f_japanese', { defaultValue: 'Japanese' }),
        t('tutors.f_economics', { defaultValue: 'Economics' }),
        t('tutors.f_ib', { defaultValue: 'IB' }),
        t('tutors.f_engineering', { defaultValue: 'Engineering' }),
        t('tutors.f_science', { defaultValue: 'Science' })
    ];
    const [filter, setFilter] = useState(subjectsFilters[0]);
    const [selectedTutor, setSelectedTutor] = useState(null);

    // Map "All" translated string back to actual matching logic
    const isAll = filter === t('tutors.f_all');

    const TUTORS = TUTORS_BASE.map(base => {
        const profile = t(`tutors.profiles.${base.id}`, { returnObjects: true });
        const profileObj = typeof profile === 'object' && profile !== null ? profile : {};
        return { 
            ...base, 
            ...profileObj,
            subjects: profileObj.subjects || [],
            strengths: profileObj.strengths || [],
            languages: profileObj.languages || [],
            targetAges: profileObj.targetAges || [],
            name: profileObj.name || ''
        };
    });

    const filteredTutors = TUTORS.filter(tutor => {
        if (isAll) return true;
        const subjects = tutor.subjects || [];
        const university = tutor.university || '';
        return subjects.some(s => s.toLowerCase().includes(filter.toLowerCase())) ||
            university.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <>
            <div className={`${styles.header} glass-panel`}>
                <div className="container animate-on-scroll">
                    <h1 className="text-h1" style={{ marginBottom: '1rem' }}>{t('tutors.title')}</h1>
                    <p className="text-large" style={{ color: 'var(--c-text-light)', maxWidth: '600px' }}>
                        {t('tutors.subtitle')}
                    </p>
                </div>
            </div>

            <div className={`section container ${styles.directoryPage}`}>
                {/* Filters */}
                <div className={`${styles.filters} animate-on-scroll`}>
                    <div className={styles.filterHeader}>
                        <SlidersHorizontal size={20} />
                        <span className="text-h4">{t('tutors.filter')}</span>
                    </div>
                    <div className={styles.filterChips}>
                        {subjectsFilters.map(s => (
                            <button
                                key={s}
                                className={`${styles.filterChip} ${filter === s ? styles.active : ''}`}
                                onClick={() => setFilter(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tutors Grid */}
                <div className={styles.tutorsGrid}>
                    {filteredTutors.map((tutor, idx) => (
                        <div key={tutor.id} className={`glass-card ${styles.tutorCard} animate-on-scroll`} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className={styles.tutorImage}>
                                <img src={tutor.image} alt={tutor.name} className={styles.avatarImage} />
                            </div>
                            <div className={styles.tutorInfo}>
                                <div className={styles.tutorHeader}>
                                    <h3 className="text-h3" style={{ fontSize: '1.5rem' }}>
                                        {tutor.name}
                                        {tutor.role && <span className={styles.roleBadge}>{tutor.role}</span>}
                                    </h3>
                                    <div className={styles.formatBadges}>
                                        {tutor.format.map(f => (
                                            <span key={f} className={styles.formatBadge}>
                                                {f.includes('Online') ? <Monitor size={14} /> : <MapPin size={14} />}
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className={styles.university}>
                                    <GraduationCap size={16} /> {tutor.university}
                                </p>

                                <p className={styles.tutorIntro}>{tutor.intro}</p>

                                <div className={styles.tutorTags}>
                                    {tutor.subjects.slice(0, 3).map(s => <span key={s} className={styles.tag}>{s}</span>)}
                                    {tutor.subjects.length > 3 && <span className={styles.tag}>+{tutor.subjects.length - 3}</span>}
                                </div>

                                <button
                                    className={`btn btn-secondary ${styles.viewProfileBtn}`}
                                    onClick={() => setSelectedTutor(tutor)}
                                >
                                    {t('tutors.view_profile')}
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* "And More" Call to Action Card */}
                    <div className={`glass-card ${styles.tutorCard} animate-on-scroll`} style={{ animationDelay: `${filteredTutors.length * 0.1}s`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem', border: '1px dashed var(--c-gold)', background: 'rgba(212, 175, 55, 0.03)' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--c-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--c-navy)', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1' }}>+</span>
                        </div>
                        <h3 className="text-h3" style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--c-gold)' }}>
                            {t('tutors.and_more_title')}
                        </h3>
                        <p style={{ color: 'var(--c-text-light)', marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                            {t('tutors.and_more_desc')}
                        </p>
                        <Link to="/inquiry" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                            {t('tutors.and_more_cta')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Expanded Profile Modal */}
            {selectedTutor && (
                <div className={styles.modalOverlay} onClick={() => setSelectedTutor(null)}>
                    <div className={`glass-card ${styles.modalContent}`} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedTutor(null)}>
                            <X size={24} />
                        </button>

                        <div className={styles.modalScroll}>
                            <div className={styles.modalHeader}>
                                <img src={selectedTutor.image} alt={selectedTutor.name} className={styles.modalAvatarImage} />
                                <div>
                                    <h2 className="text-h2">
                                        {selectedTutor.name}
                                        {selectedTutor.role && <span className={styles.roleBadge} style={{ marginLeft: '1rem', verticalAlign: 'middle' }}>{selectedTutor.role}</span>}
                                    </h2>
                                    <p className={styles.university} style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                                        <GraduationCap size={18} /> {selectedTutor.university}
                                    </p>
                                </div>
                            </div>

                            <p className={styles.scarcityDisclaimer}>
                                {t('tutors.scarcity_disclaimer')}
                            </p>

                            <div className={styles.modalBody}>
                                <div className={styles.modalSection}>
                                    <h3 className="text-h4">{t('tutors.about_me')}</h3>
                                    <p>{selectedTutor.intro}</p>
                                </div>

                                <div className={styles.highlightSections}>
                                    <div className={`${styles.highlightCard} glass-panel`}>
                                        <h3 className="text-h5">{t('tutors.ideal_match')}</h3>
                                        <p>{selectedTutor.idealMatch}</p>
                                    </div>
                                    <div className={`${styles.highlightCard} glass-panel`}>
                                        <h3 className="text-h5">{t('tutors.success_case')}</h3>
                                        <p>{selectedTutor.successCase}</p>
                                    </div>
                                    <div className={`${styles.highlightCard} glass-panel`}>
                                        <h3 className="text-h5">{t('tutors.lesson_style')}</h3>
                                        <p>{selectedTutor.lessonStyle}</p>
                                    </div>
                                </div>

                                <div className={styles.modalGrid}>
                                    <div className={styles.modalSection}>
                                        <h3 className="text-h4">{t('tutors.subjects')}</h3>
                                        <ul className={styles.bulletList}>
                                            {selectedTutor.subjects.map(s => <li key={s}>{s}</li>)}
                                        </ul>
                                    </div>

                                    <div className={styles.modalSection}>
                                        <h3 className="text-h4">{t('tutors.strengths')}</h3>
                                        <ul className={styles.bulletList}>
                                            {selectedTutor.strengths.map(s => <li key={s}>{s}</li>)}
                                        </ul>
                                    </div>

                                    <div className={styles.modalSection}>
                                        <h3 className="text-h4">{t('tutors.languages')}</h3>
                                        <p className={styles.iconText}>
                                            <Languages size={18} /> {selectedTutor.languages.join(' • ')}
                                        </p>
                                    </div>

                                    <div className={styles.modalSection}>
                                        <h3 className="text-h4">{t('tutors.ages')}</h3>
                                        <p>{selectedTutor.targetAges.join(', ')}</p>
                                    </div>
                                </div>

                                <div className={`${styles.modalCta} glass-panel`}>
                                    <p className="text-large" style={{ marginBottom: '1rem' }}>{t('tutors.ready', { name: selectedTutor.name.split(' ')[0] })}</p>
                                    <Link to="/inquiry" className="btn btn-primary" style={{ width: '100%' }}>{t('tutors.request')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
