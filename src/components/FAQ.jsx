import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import styles from './FAQ.module.css';

export default function FAQ({ theme = 'light', standalone = false }) {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const isDark = theme === 'dark';

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCount = 14;
    const faqs = Array.from({ length: faqCount }, (_, i) => ({
        question: t(`faq.q${i + 1}.q`),
        answer: t(`faq.q${i + 1}.a`, { returnObjects: true })
    }));

    const generateSchema = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => {
                if (!faq.question) return null;
                
                let answerText = '';
                if (Array.isArray(faq.answer)) {
                    answerText = faq.answer.map(block => {
                        if (block.type === 'p') return `<p>${block.text}</p>`;
                        if (block.type === 'ul') return `<ul>${block.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
                        return '';
                    }).join('');
                } else {
                    answerText = faq.answer;
                }

                return {
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answerText
                    }
                };
            }).filter(Boolean)
        };
        return JSON.stringify(schema);
    };

    return (
        <>
        <Helmet>
            <script type="application/ld+json">
                {generateSchema()}
            </script>
        </Helmet>
        <section 
            className={`${standalone ? '' : 'section'} ${styles.faqSection} ${isDark ? styles.faqSectionDark : ''}`}
            style={standalone ? { borderTop: 'none', padding: '4rem 0 8rem 0' } : {}}
        >
            <div className={`container ${styles.faqContainer} animate-on-scroll`}>
                <div className={styles.faqHeader}>
                    <h2 className={`text-h2 ${isDark ? styles.textDark : ''}`}>{t('faq.title', { defaultValue: 'Frequently Asked Questions' })}</h2>
                </div>
                <div className={styles.accordion}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        // Skip rendering if question is empty (in case we misconfigure JSON)
                        if (!faq.question) return null;
                        
                        return (
                            <div key={index} className={`${styles.faqItem} ${isOpen ? styles.open : ''} ${isDark ? styles.faqItemDark : ''}`}>
                                <button 
                                    className={styles.faqQuestion}
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.question}</span>
                                    <span className={styles.iconWrapper}>
                                        <ChevronDown size={20} />
                                    </span>
                                </button>
                                <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ''}`}>
                                    <div className={styles.faqAnswerInner}>
                                        {Array.isArray(faq.answer) ? (
                                            faq.answer.map((block, bIndex) => {
                                                if (block.type === 'p') {
                                                    return <p key={bIndex}>{block.text}</p>;
                                                }
                                                if (block.type === 'ul') {
                                                    return (
                                                        <ul key={bIndex}>
                                                            {block.items.map((li, liIndex) => (
                                                                <li key={liIndex}>{li}</li>
                                                            ))}
                                                        </ul>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <p>{faq.answer}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        </>
    );
}
