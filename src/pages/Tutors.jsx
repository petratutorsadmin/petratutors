import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Monitor, GraduationCap, X, SlidersHorizontal, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Tutors.module.css';

// New Dataset
const TUTORS = [
    {
        id: 'tutor-4',
        name: 'Yutaka Takaku',
        university: 'Keio University, Economics',
        subjects: ['English', 'Economics', 'Academic writing', 'International school support', 'Interview preparation'],
        targetAges: ['High school', 'University', 'Adults'],
        languages: ['English', 'Japanese'],
        intro: 'I specialize in guiding international and returnee students through the complex transitions of cross-cultural education. My teaching style focuses on building long-term academic confidence rather than short-term memorization, preparing students for rigorous university environments.',
        strengths: ['Cross-cultural Mentorship', 'Interview & Application Strategy', 'Critical Thinking & Writing'],
        idealMatch: 'Ambitious students targeting top-tier universities who need holistic mentorship beyond just subject knowledge.',
        successCase: 'Mentored a returnee student from the US to successfully admit into Keio PEARL with a refined statement of purpose and interview strategy.',
        lessonStyle: 'Interactive and strategic, focusing on the "Why" behind the content to develop lifelong academic skills.',
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
        intro: 'Having navigated the British, Irish, and Japanese education systems, I understand the immense pressure students face. I have successfully mentored over 70 students, focusing on strategic exam preparation (IELTS, Eiken) and personalized academic coaching that unlocks each student\'s unique potential.',
        strengths: ['Strategic Exam Coaching (IELTS/Eiken)', 'International Curricula Navigation', 'University Admissions Mentoring'],
        idealMatch: 'Students feeling overwhelmed by IELTS/Eiken or international school transitions who need a compassionate and strategic coach.',
        successCase: 'Improved a junior high student\'s IELTS score from 5.5 to 7.0 in 4 months through targeted speaking and writing drills.',
        lessonStyle: 'Encouraging and result-oriented, breaking down large goals into manageable, high-impact milestones.',
        format: ['Online', 'In-Person'],
        role: 'Founder',
        image: '/images/tutors/tutor-5.png'
    },
    {
        id: 'tutor-2',
        name: 'Ronan Daly Inagaki',
        university: 'Eindhoven University of Technology, Mechanical Engineering',
        subjects: ['GCSE subjects', 'Japanese language', 'A-Level subjects'],
        targetAges: ['Junior high', 'High school'],
        languages: ['English', 'Japanese'],
        intro: 'As a mechanical engineering student in Europe, I bring an analytical and structured approach to STEM tutoring. I break down complex mathematical and scientific concepts into digestible, relatable steps, making challenging international curricula (GCSE, A-Level) highly accessible for my students.',
        strengths: ['Analytical Problem Solving', 'GCSE/A-Level Math & Science', 'Structured Conceptual Learning'],
        idealMatch: 'STEM students struggling with complex GCSE/A-Level concepts who value a clear, logical, and engineering-minded approach.',
        successCase: 'Helping several students transition from failing grades to passing A-Level Mathematics with a focus on problem-solving frameworks.',
        lessonStyle: 'Logical and step-by-step, ensuring foundational understanding before moving to advanced applications.',
        format: ['Online'],
        image: '/images/tutors/tutor-2.png'
    },
    {
        id: 'tutor-6',
        name: 'Ulemj Batzorig',
        university: 'Keio University, PEARL (Economics)',
        subjects: ['English Conversation', 'Academic English', 'University preparation', 'IELTS', 'Eiken', 'TOEIC', 'TOEFL'],
        targetAges: ['Preschool', 'Elementary', 'Junior high', 'High school'],
        languages: ['English'],
        intro: 'Holding a TESOL certification, I combine professional language pedagogy with a deeply empathetic mentoring style. My goal is to transform English from a daunting hurdle into a natural tool for expression, helping students excel in TOEIC, TOEFL, and IELTS while building genuine conversational confidence.',
        strengths: ['Empathetic Language Coaching', 'TESOL-Certified Pedagogy', 'Confidence Building in Speaking'],
        idealMatch: 'Younger learners or students with "English anxiety" who need a supportive environment to build base confidence and testing skills.',
        successCase: 'Increased a student\'s TOEIC score by 150 points while simultaneously improving their willingness to speak up in class.',
        lessonStyle: 'Dynamic and communicative, using professional TESOL techniques to make learning engaging and low-stress.',
        format: ['Online', 'In-Person'],
        image: '/images/tutors/tutor-6.png'
    }
];

export default function Tutors() {
    const { t } = useTranslation();
    const subjectsFilters = [t('tutors.f_all'), 'English', 'Japanese', 'Economics', 'IB', 'Engineering', 'Science'];
    const [filter, setFilter] = useState(subjectsFilters[0]);
    const [selectedTutor, setSelectedTutor] = useState(null);

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
