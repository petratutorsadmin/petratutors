import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './AboutTimeline.module.css';

const AboutTimeline = () => {
    const { t } = useTranslation();

    const timelineData = [
        {
            year: t('about.timeline_step1_year'),
            title: t('about.timeline_step1_title'),
            desc: t('about.timeline_step1_desc')
        },
        {
            year: t('about.timeline_step2_year'),
            title: t('about.timeline_step2_title'),
            desc: t('about.timeline_step2_desc')
        },
        {
            year: t('about.timeline_step3_year'),
            title: t('about.timeline_step3_title'),
            desc: t('about.timeline_step3_desc')
        },
        {
            year: t('about.timeline_step4_year'),
            title: t('about.timeline_step4_title'),
            desc: t('about.timeline_step4_desc')
        },
        {
            year: t('about.timeline_step5_year'),
            title: t('about.timeline_step5_title'),
            desc: t('about.timeline_step5_desc')
        }
    ];

    return (
        <section className={styles.timelineSection}>
            <div className="container">
                <motion.div 
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>{t('about.timeline_title')}</h2>
                </motion.div>

                <div className={styles.timelineContainer}>
                    <div className={styles.verticalLine}>
                        <motion.div 
                            className={styles.progressLine}
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className={styles.timelineItems}>
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 !== 0;
                            return (
                                <div key={index} className={styles.itemWrapper}>
                                    <motion.div 
                                        className={styles.dot}
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                                    />
                                    <motion.div 
                                        className={styles.content}
                                        initial={{ opacity: 0, x: isEven ? 30 : -30, y: 20 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                                    >
                                        <span className={styles.year}>{item.year}</span>
                                        <h3 className={styles.itemTitle}>{item.title}</h3>
                                        <p className={styles.itemDesc}>{item.desc}</p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTimeline;
