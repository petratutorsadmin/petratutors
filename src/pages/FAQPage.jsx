import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function FAQPage() {

    return (
        <div className="page-fade-in" style={{ paddingTop: '80px', minHeight: '100dvh', backgroundColor: 'var(--c-stone)' }}>
            <SEO
                title="FAQ | よくある質問 | Petra Tutors"
                description="Petra Tutors に関するよくある質問と回答。料金・入会金・無料体験・マッチング・オンライン授業・講師変更など。 Common questions about pricing, free trials, tutor matching, and online lessons."
                path="/faq"
            />
            <FAQ standalone={true} />
        </div>
    );
}
