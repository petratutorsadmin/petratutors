import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './ComparisonSection.module.css';

export default function ComparisonSection() {
    const { t } = useTranslation();

    const comparisons = [
        {
            label: t('home.comp_1_label', 'Tutors'),
            petra: t('home.comp_1_petra', 'Top University Mentors (Keio/Todai/HKU)'),
            others: t('home.comp_1_others', 'Part-time students / Generic teachers'),
            highlight: true
        },
        {
            label: t('home.comp_2_label', 'Curriculum'),
            petra: t('home.comp_2_petra', '100% Personalised for IB/AP/IELTS'),
            others: t('home.comp_2_others', 'Rigid, one-size-fits-all material'),
            highlight: true
        },
        {
            label: t('home.comp_3_label', 'Approach'),
            petra: t('home.comp_3_petra', 'Real-world Academic Mentorship'),
            others: t('home.comp_3_others', 'Rote memorization focus'),
            highlight: true
        },
        {
            label: t('home.comp_4_label', '初期費用'),
            petra: t('home.comp_4_petra', '入会金・月会費なし'),
            others: t('home.comp_4_others', '高額な初期費用'),
            highlight: true
        }
    ];

    return (
        <section className={`section ${styles.comparison}`}>
            <div className="container">
                <h2 className="text-h2 text-center animate-on-scroll" style={{ marginBottom: '3rem' }}>
                    {t('home.comp_title', 'Why Families Choose Petra')}
                </h2>
                
                <div className={`${styles.tableWrapper} animate-on-scroll`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.featureCol}></th>
                                <th className={styles.petraCol}>Petra Tutors</th>
                                <th className={styles.othersCol}>{t('home.comp_others_title', 'Traditional Schools')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((item, idx) => (
                                <tr key={idx}>
                                    <td className={styles.featureLabel}>{item.label}</td>
                                    <td className={styles.petraValue}>
                                        <div className={styles.valueContent}>
                                            <Check size={18} className={styles.checkIcon} />
                                            <span>{item.petra}</span>
                                        </div>
                                    </td>
                                    <td className={styles.othersValue}>
                                        <div className={styles.valueContent}>
                                            <X size={18} className={styles.xIcon} />
                                            <span>{item.others}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
