import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { MapPin, Monitor, GraduationCap, X, SlidersHorizontal, Languages, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Tutors.module.css';

// New Dataset
const TUTORS_BASE = [
    { id: 'tutor-5', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-5.png', linkedin: 'https://www.linkedin.com/in/rikuishida' }, // Riku
    { id: 'tutor-4', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-4.png', linkedin: 'https://www.linkedin.com/in/ytakataka/' }, // Yutaka
    { id: 'tutor-michael', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-michael.jpg', linkedin: 'https://www.linkedin.com/in/michael-macnamara-246a41258' },
    { id: 'tutor-gia', format: ['Online'], image: '/images/tutors/tutor-gia.jpg' },
    { id: 'tutor-maegan', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-maegan.jpg' },
    { id: 'tutor-tina', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-tina.jpg' },
    { id: 'tutor-hannah', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-hannah.jpg' },
    { id: 'tutor-melody', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-melody.jpg', linkedin: 'https://www.linkedin.com/in/melodynaito' },
    { id: 'tutor-cian', format: ['Online'], image: '/images/tutors/tutor-cian.jpg', linkedin: 'https://www.linkedin.com/in/cian-forsyth' },
    { id: 'tutor-sara', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-sara.jpg', linkedin: 'https://www.linkedin.com/in/sara-jeshua-55269b276' },
    { id: 'tutor-toru', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-toru.jpg', linkedin: 'https://www.linkedin.com/in/toru-hiiragi' },
    { id: 'tutor-6', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-6.png', linkedin: 'https://www.linkedin.com/in/ulemjbatzorig' },
    { id: 'tutor-hazel', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-hazel.jpg' },
    { id: 'tutor-2', format: ['Online'], image: '/images/tutors/tutor-2.png', linkedin: 'https://www.linkedin.com/in/ronan-daly-inagaki-a2032b231' },
    { id: 'tutor-alice', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-alice.jpg' },
    { id: 'tutor-siya', format: ['Online'], image: '/images/tutors/tutor-siya.jpg', linkedin: 'https://www.linkedin.com/in/siya-ahuja-371617210' },
    { id: 'tutor-dayun', format: ['Online'], image: '/images/tutors/tutor-dayun.jpg' },
    { id: 'tutor-haruka', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-haruka.png' },
    { id: 'tutor-maya', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-maya.png' },
    { id: 'tutor-himiko', format: ['Online', 'In-Person'], image: '/images/tutors/tutor-himiko.png' }
];

export default function Tutors() {
    const { t } = useTranslation();
    const subjectsFilters = [
        { id: 'all', label: t('tutors.f_all') },
        { id: 'english', label: t('tutors.f_english', { defaultValue: 'English' }) },
        { id: 'japanese', label: t('tutors.f_japanese', { defaultValue: 'Japanese' }) },
        { id: 'economics', label: t('tutors.f_economics', { defaultValue: 'Economics' }) },
        { id: 'ib', label: t('tutors.f_ib', { defaultValue: 'IB' }) },
        { id: 'engineering', label: t('tutors.f_engineering', { defaultValue: 'Engineering' }) },
        { id: 'science', label: t('tutors.f_science', { defaultValue: 'Science' }) }
    ];
    const ageFilters = [
        { id: 'all', label: t('tutors.f_all') },
        { id: 'preschool', label: t('tutors.f_preschool'), keywords: ['Preschool', '幼稚園', 'Pre-school', 'preschool'] },
        { id: 'elementary', label: t('tutors.f_elementary'), keywords: ['Elementary', '小学', 'Primary', 'elementary'] },
        { id: 'juniorhigh', label: t('tutors.f_juniorhigh'), keywords: ['Junior High', '中学', 'Middle School', 'junior high'] },
        { id: 'highschool', label: t('tutors.f_highschool'), keywords: ['High School', '高校', 'high school'] },
        { id: 'adults', label: t('tutors.f_adults'), keywords: ['Adult', '大学', '社会人', 'University', 'adult'] },
    ];
    const formatFilters = [
        { id: 'all', label: t('tutors.f_all') },
        { id: 'online', label: t('tutors.f_online'), value: 'Online' },
        { id: 'inperson', label: t('tutors.f_inperson'), value: 'In-Person' },
    ];

    const [activeFilterId, setActiveFilterId] = useState('all');
    const [activeAgeFilterId, setActiveAgeFilterId] = useState('all');
    const [activeFormatFilterId, setActiveFormatFilterId] = useState('all');
    const [selectedTutor, setSelectedTutor] = useState(null);

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

    const matchesSubject = (tutor, filterId) => {
        if (filterId === 'all') return true;
        const f = subjectsFilters.find(sf => sf.id === filterId);
        if (!f) return true;
        const matchString = f.label.toLowerCase();
        const subjects = tutor.subjects || [];
        const university = tutor.university || '';
        return subjects.some(s => s.toLowerCase().includes(matchString)) ||
            university.toLowerCase().includes(matchString);
    };

    const matchesAge = (tutor, filterId) => {
        if (filterId === 'all') return true;
        const f = ageFilters.find(af => af.id === filterId);
        if (!f) return true;
        const ages = (tutor.targetAges || []).join(' ').toLowerCase();
        return f.keywords.some(kw => ages.includes(kw.toLowerCase()));
    };

    const matchesFormat = (tutor, filterId) => {
        if (filterId === 'all') return true;
        const f = formatFilters.find(ff => ff.id === filterId);
        if (!f) return true;
        return (tutor.format || []).includes(f.value);
    };

    const filteredTutors = TUTORS.filter(tutor =>
        matchesSubject(tutor, activeFilterId) &&
        matchesAge(tutor, activeAgeFilterId) &&
        matchesFormat(tutor, activeFormatFilterId)
    );

    const getFilterCount = (f) => {
        if (f.id === 'all') return TUTORS.length;
        return TUTORS.filter(tutor => matchesSubject(tutor, f.id)).length;
    };

    return (
        <>
            <SEO 
                title={`${t('tutors.title')} | Petra Tutors`}
                description={t('tutors.subtitle')}
                path="/tutors"
            />
            <div className={styles.header}>
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

                    <p className={styles.filterGroupLabel}>{t('tutors.filter_subject')}</p>
                    <div className={styles.filterChips}>
                        {subjectsFilters.map(f => (
                            <button
                                key={f.id}
                                className={`${styles.filterChip} ${activeFilterId === f.id ? styles.active : ''}`}
                                onClick={() => setActiveFilterId(f.id)}
                            >
                                {f.label} <span style={{ opacity: 0.7, marginLeft: '0.25rem', fontSize: '0.9em' }}>({getFilterCount(f)})</span>
                            </button>
                        ))}
                    </div>

                    <p className={styles.filterGroupLabel}>{t('tutors.filter_age')}</p>
                    <div className={styles.filterChips}>
                        {ageFilters.map(f => (
                            <button
                                key={f.id}
                                className={`${styles.filterChip} ${activeAgeFilterId === f.id ? styles.active : ''}`}
                                onClick={() => setActiveAgeFilterId(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <p className={styles.filterGroupLabel}>{t('tutors.filter_format')}</p>
                    <div className={styles.filterChips}>
                        {formatFilters.map(f => (
                            <button
                                key={f.id}
                                className={`${styles.filterChip} ${activeFormatFilterId === f.id ? styles.active : ''}`}
                                onClick={() => setActiveFormatFilterId(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tutors Grid */}
                <div className={styles.tutorsGrid}>
                    {filteredTutors.map((tutor, idx) => (
                        <div key={tutor.id} className={`card ${styles.tutorCard} animate-on-scroll`} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className={styles.tutorImage}>
                                <img src={tutor.image} alt={tutor.name} className={styles.avatarImage} />
                            </div>
                            <div className={styles.tutorInfo}>
                                <div className={styles.tutorHeader}>
                                    <h3 className="text-h3" style={{ fontSize: '1.5rem' }}>
                                        {tutor.name}
                                        {tutor.role && <span className={`${styles.roleBadge} ${tutor.role === 'Founder' || tutor.role === '創業者' ? styles.roleBadgeFounder : ''}`}>{tutor.role}</span>}
                                    </h3>
                                    <div className={styles.formatBadges}>
                                        {tutor.format.map(f => (
                                            <span key={f} className={styles.formatBadge}>
                                                {f.includes('Online') ? <Monitor size={14} /> : <MapPin size={14} />}
                                                {f.includes('Online') ? t('tutors.format_online') : t('tutors.format_inperson')}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className={styles.university}>
                                    <GraduationCap size={16} /> {tutor.university}
                                </p>

                                <div className={styles.tutorMatch}>
                                    <span className={styles.matchLabel}>{t('tutors.ideal_match')}</span>
                                    <p className={styles.matchText}>{tutor.idealMatch}</p>
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
                    <div className={`card ${styles.andMoreCard} animate-on-scroll`} style={{ animationDelay: `${filteredTutors.length * 0.1}s` }}>
                        <div className={styles.andMoreIcon}>+</div>
                        <h3 className={styles.andMoreTitle}>{t('tutors.and_more_title')}</h3>
                        <p className={styles.andMoreDesc}>{t('tutors.and_more_desc')}</p>
                        <Link to="/inquiry" className={`btn btn-primary ${styles.andMoreCta}`}>
                            {t('tutors.and_more_cta')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Expanded Profile Modal */}
            {selectedTutor && createPortal(
                <div className={styles.modalOverlay} onClick={() => setSelectedTutor(null)}>
                    <div className={`card ${styles.modalContent}`} onClick={e => e.stopPropagation()}>
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
                                    {selectedTutor.linkedin && (
                                        <a
                                            href={selectedTutor.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.linkedinLink}
                                        >
                                            <ExternalLink size={13} /> LinkedIn
                                        </a>
                                    )}
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
                                    <div className={`${styles.highlightCard} card`}>
                                        <h3 className="text-h5">{t('tutors.ideal_match')}</h3>
                                        <p>{selectedTutor.idealMatch}</p>
                                    </div>
                                    <div className={`${styles.highlightCard} card`}>
                                        <h3 className="text-h5">{t('tutors.success_case')}</h3>
                                        <p>{selectedTutor.successCase}</p>
                                    </div>
                                    <div className={`${styles.highlightCard} card`}>
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

                                <div className={`${styles.modalCta} card`}>
                                    <p className="text-large" style={{ marginBottom: '1rem' }}>{t('tutors.ready', { name: selectedTutor.name.split(' ')[0] })}</p>
                                    <Link to="/inquiry" className="btn btn-primary" style={{ width: '100%' }}>{t('tutors.request')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
