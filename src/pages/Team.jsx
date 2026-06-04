import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import styles from './Team.module.css';

const LEADERSHIP = [
    {
        id: 'riku',
        name: 'Riku Ishida',
        roleKey: 'team.role_riku',
        descKey: 'team.riku_desc',
        image: '/images/tutors/tutor-5.png'
    },
    {
        id: 'yutaka',
        name: 'Yutaka Takaku',
        roleKey: 'team.role_yutaka',
        descKey: 'team.yutaka_desc',
        image: '/images/tutors/tutor-4.png'
    }
];

const DIRECTORS = [
    {
        id: 'mannat',
        name: 'Mannat Sharma',
        roleKey: 'team.role_gc',
        descKey: 'team.mannat_desc',
        image: '/images/tutors/tutor-mannat.jpg',
        objectPosition: 'center 20%',
        initials: 'MS'
    },
    {
        id: 'toshie',
        name: 'Toshie Wakamiya',
        roleKey: 'team.role_her',
        descKey: 'team.toshie_desc',
        image: '/images/tutors/tutor-toshie.jpg',
        objectPosition: 'center 20%',
        initials: 'TW'
    },
    {
        id: 'shinto',
        name: 'Shinto Tanaka',
        roleKey: 'team.role_hr',
        descKey: 'team.shinto_desc',
        image: '/images/tutors/tutor-shinto.jpg',
        objectPosition: 'center 55%',
        initials: 'ST'
    },
    {
        id: 'melody',
        name: 'Melody Naito',
        roleKey: 'team.role_marketing_intern',
        descKey: 'team.melody_desc',
        image: '/images/tutors/tutor-melody.jpg',
        objectPosition: 'center 20%',
        initials: 'MN'
    },
    {
        id: 'gia',
        name: 'Giatri Maritza Drajat',
        roleKey: 'team.role_marketing_intern',
        descKey: 'team.gia_desc',
        image: '/images/tutors/tutor-gia.jpg',
        objectPosition: 'center 20%',
        initials: 'GD'
    }
];

export default function Team() {
    const { t } = useTranslation();

    return (
        <div className={styles.pageContainer}>
            <SEO 
                title={`${t('team.title')} | Petra Tutors`}
                description={t('team.subtitle')}
                path="/team"
            />
            
            {/* HERO */}
            <div className={styles.header}>
                <div className="container animate-on-scroll">
                    <h1 className={styles.title}>{t('team.title')}</h1>
                    <p className={styles.subtitle}>
                        {t('team.subtitle')}
                    </p>
                </div>
            </div>

            <div className={styles.teamPage}>
                <div className="container">
                
                {/* FOUNDERS SECTION */}
                <div className={styles.foundersSection}>
                    <div className={styles.foundersGrid}>
                        {LEADERSHIP.map((member, idx) => (
                            <div key={member.id} className={`${styles.founderCard} animate-on-scroll`} style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className={styles.founderImageWrapper}>
                                    <img src={member.image} alt={member.name} className={styles.founderImage} />
                                </div>
                                <div className={styles.founderContent}>
                                    <h3 className={styles.founderName}>{member.name}</h3>
                                    <p className={styles.founderRole}>{t(member.roleKey)}</p>
                                    <div className={styles.goldLine} />
                                    <p className={styles.founderDesc}>{t(member.descKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DIRECTORS SECTION (Minimal with portraits) */}
                <div className={styles.directorsSection}>
                    <div className={styles.directorsGrid}>
                        {DIRECTORS.map((member, idx) => (
                            <div key={member.id} className={`${styles.directorCard} animate-on-scroll`} style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                                <div className={styles.directorAvatarWrapper}>
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className={styles.directorImage} style={{ objectPosition: member.objectPosition || 'center 20%' }} />
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>{member.initials}</div>
                                    )}
                                </div>
                                <h4 className={styles.directorName}>{member.name}</h4>
                                <p className={styles.directorRole}>{t(member.roleKey)}</p>
                                <p className={styles.directorDesc}>{t(member.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                </div>
            </div>

            <section className={styles.finalCta}>
                <div className="container text-center animate-on-scroll">
                    <h2 className="text-h2" style={{ marginBottom: '1.5rem', color: '#fff' }}>{t('team.final_title')}</h2>
                    <Link to="/inquiry" className="btn btn-gold">{t('team.final_cta')}</Link>
                </div>
            </section>
        </div>
    );
}
