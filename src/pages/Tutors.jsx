import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Monitor, GraduationCap, X, SlidersHorizontal, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Tutors.module.css';

// New Dataset
const TUTORS = [
    {
        id: 'tutor-1',
        name: 'Frandonna Kegan Yongparte',
        university: 'Keio University, Economics',
        subjects: ['English Conversation', 'Academic English', 'University preparation', 'IELTS', 'Eiken', 'TOEIC', 'TOEFL', 'Interview preparation'],
        targetAges: ['Preschool', 'Elementary', 'Junior high', 'High school'],
        languages: ['English'],
        intro: 'Economics student at Keio University with experience helping professionals improve English communication for work.',
        strengths: ['Exam Prep', 'Interviewing'],
        format: ['Online', 'In-Person'],
        image: null
    },
    {
        id: 'tutor-2',
        name: 'Ronan Daly Inagaki',
        university: 'Eindhoven University of Technology, Mechanical Engineering',
        subjects: ['GCSE subjects', 'Japanese language', 'A-Level subjects'],
        targetAges: ['Junior high', 'High school'],
        languages: ['English', 'Japanese'],
        intro: 'Mechanical engineering student at TU Eindhoven with experience mentoring mathematics and international curriculum subjects.',
        strengths: ['Mathematics', 'Science'],
        format: ['Online'],
        image: '/images/tutors/tutor-2.png'
    },
    {
        id: 'tutor-3',
        name: 'Cian Alexander Forsyth',
        university: 'The University of Hong Kong, Economics and Finance',
        subjects: ['English conversation', 'Academic English', 'IB subjects', 'Essay writing'],
        targetAges: ['Elementary', 'Junior high', 'High school'],
        languages: ['English'],
        intro: 'Economics and finance student at HKU supporting IB students and academic writing development.',
        strengths: ['Academic Writing', 'IB Curriculum'],
        format: ['Online'],
        image: null
    },
    {
        id: 'tutor-4',
        name: 'Yutaka Takaku',
        university: 'Keio University, Economics',
        subjects: ['English', 'Economics', 'Academic writing', 'International school support', 'Interview preparation'],
        targetAges: ['High school', 'University', 'Adults'],
        languages: ['English', 'Japanese'],
        intro: 'Co-Founder & COO/CFO of Petra Tutors focusing on international academic tutoring and cross-cultural education.',
        strengths: ['Cross-cultural Education', 'Mentorship'],
        format: ['Online', 'In-Person'],
        role: 'Founder',
        image: '/images/tutors/tutor-4.png'
    },
    {
        id: 'tutor-5',
        name: 'Riku Ishida',
        university: 'Keio University, PEARL (Economics)',
        subjects: ['English', 'Japanese', 'IELTS', 'Eiken', 'Academic Writing', 'Speaking & Presentation', 'University preparation', 'Language tutoring for children'],
        targetAges: ['Children', 'Elementary', 'Junior high', 'High school', 'University', 'Adults'],
        languages: ['English', 'Japanese'],
        intro: 'Co-Founder & CEO/CMO of Petra Tutors. Educated at international schools in London and Dublin, with 5+ years overseas. Experienced in tutoring 70+ students across English exams (IELTS 7.0, Eiken Pre-1), academic English, Japanese language, and group instruction.',
        strengths: ['Exam Prep (IELTS/Eiken)', 'International Curricula', 'College Consulting'],
        format: ['Online', 'In-Person'],
        role: 'Founder',
        image: '/images/tutors/tutor-5.png'
    },
    {
        id: 'tutor-6',
        name: 'Ulemj Batzorig',
        university: 'Keio University, PEARL (Economics)',
        subjects: ['English Conversation', 'Academic English', 'University preparation', 'IELTS', 'Eiken', 'TOEIC', 'TOEFL'],
        targetAges: ['Preschool', 'Elementary', 'Junior high', 'High school'],
        languages: ['English'],
        intro: 'TESOL-certified economics student at Keio University with a passion for helping students build confidence and excel in English examinations.',
        strengths: ['Exam Prep', 'TESOL Certified'],
        format: ['Online', 'In-Person'],
        image: '/images/tutors/tutor-6.png'
    },
    {
        id: 'tutor-7',
        name: 'Michael MacNamara',
        university: 'University of Tokyo, PEAK (East Asian Studies)',
        subjects: ['English Conversation', 'IB subjects', 'GCSE subjects', 'A-Level subjects', 'University preparation', 'IELTS', 'TOEFL', 'Interview preparation'],
        targetAges: ['Preschool', 'Elementary', 'Junior high', 'High school', 'University'],
        languages: ['English'],
        intro: 'East Asian Studies student at the University of Tokyo with nearly 4 years of teaching experience, specialising in IB, GCSE, and A-Level curricula.',
        strengths: ['IB & A-Level', 'Interview Prep'],
        format: ['Online', 'In-Person'],
        image: null
    },
    {
        id: 'tutor-8',
        name: 'Minh To',
        university: 'Keio University, PEARL (Economics)',
        subjects: ['English Conversation', 'Academic English', 'University preparation', 'Essay writing', 'IELTS', 'TOEIC', 'TOEFL', 'Interview preparation', 'College consulting'],
        targetAges: ['Preschool', 'Elementary', 'Junior high', 'High school'],
        languages: ['English'],
        intro: 'Economics student at Keio with extensive college consulting experience, guiding students through applications to top universities abroad.',
        strengths: ['College Consulting', 'Essay Writing'],
        format: ['Online', 'In-Person'],
        image: null
    }
];

export default function Tutors() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');
    const [selectedTutor, setSelectedTutor] = useState(null);

    const subjectsFilters = [t('tutors.f_all'), 'English', 'Japanese', 'Economics', 'IB', 'Engineering', 'Science'];

    // Map "All" translated string back to actual matching logic
    const isAll = filter === t('tutors.f_all');

    const filteredTutors = TUTORS.filter(tutor => {
        if (isAll) return true;
        return tutor.subjects.some(s => s.toLowerCase().includes(filter.toLowerCase())) ||
            tutor.university.toLowerCase().includes(filter.toLowerCase());
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
                                {tutor.image ? (
                                    <img src={tutor.image} alt={tutor.name} className={styles.avatarImage} />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>
                                        {tutor.name.charAt(0)}
                                    </div>
                                )}
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
                                {selectedTutor.image ? (
                                    <img src={selectedTutor.image} alt={selectedTutor.name} className={styles.modalAvatarImage} />
                                ) : (
                                    <div className={styles.modalAvatarPlaceholder}>
                                        {selectedTutor.name.charAt(0)}
                                    </div>
                                )}
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

                            <div className={styles.modalBody}>
                                <div className={styles.modalSection}>
                                    <h3 className="text-h4">{t('tutors.about_me')}</h3>
                                    <p>{selectedTutor.intro}</p>
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
