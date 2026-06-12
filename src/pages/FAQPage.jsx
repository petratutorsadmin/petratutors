import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function FAQPage() {
    const { t } = useTranslation();

    return (
        <div className="page-fade-in" style={{ paddingTop: '80px', minHeight: '100dvh', backgroundColor: 'var(--c-stone)' }}>
            <SEO 
                title={`${t('nav.faq', 'FAQ')} | Petra Tutors`}
                description={t('faq.title', 'Frequently Asked Questions')}
                path="/faq"
            />
            <FAQ standalone={true} />
        </div>
    );
}
