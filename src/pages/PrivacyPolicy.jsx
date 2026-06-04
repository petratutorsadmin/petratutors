import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '740px' }}>
                {isJa ? <JA /> : <EN />}
            </div>
        </div>
    );
}

function EN() {
    return (
        <>
            <h1 className="text-h2" style={{ marginBottom: '0.5rem' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--c-text-light)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                Petra Education LLC · Last updated: June 2026
            </p>

            <Section title="What we collect">
                <p>When you submit an inquiry, we collect your name, email address, and any details you provide about your learning goals. We may also collect basic usage data through analytics tools (Vercel Analytics) to understand how the site is used.</p>
            </Section>

            <Section title="How we use it">
                <p>We use your information solely to respond to your inquiry, match you with a suitable tutor, and communicate about your lessons. We do not sell, share, or rent your personal information to third parties.</p>
            </Section>

            <Section title="Data retention">
                <p>Inquiry and contact details are retained for as long as necessary to provide our service. You may request deletion of your data at any time by emailing us.</p>
            </Section>

            <Section title="Cookies and analytics">
                <p>This site uses Vercel Analytics to collect anonymised usage statistics. No personally identifiable information is stored in cookies. You can disable JavaScript to opt out of analytics collection.</p>
            </Section>

            <Section title="Contact">
                <p>
                    For any questions about this policy or to request deletion of your data, contact us at{' '}
                    <a href="mailto:admin@petratutors.com" style={{ color: 'var(--c-navy)' }}>admin@petratutors.com</a>.
                </p>
            </Section>
        </>
    );
}

function JA() {
    return (
        <>
            <h1 className="text-h2" style={{ marginBottom: '0.5rem' }}>プライバシーポリシー</h1>
            <p style={{ color: 'var(--c-text-light)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                ペトラエデュケーション合同会社 · 最終更新：2026年6月
            </p>

            <Section title="収集する情報">
                <p>お問い合わせの際に、お名前・メールアドレス・学習目標などの情報をご提供いただきます。また、Vercel Analyticsを通じてサイトの利用状況に関する匿名の統計情報を収集する場合があります。</p>
            </Section>

            <Section title="利用目的">
                <p>いただいた情報は、お問い合わせへの返信・講師のマッチング・レッスンに関する連絡のみに使用します。第三者への販売・提供・貸し出しは一切行いません。</p>
            </Section>

            <Section title="データの保持">
                <p>お問い合わせ情報はサービス提供に必要な期間のみ保持します。データの削除をご希望の場合は、下記メールアドレスまでご連絡ください。</p>
            </Section>

            <Section title="クッキーと解析ツール">
                <p>当サイトはVercel Analyticsを使用して匿名の利用統計を収集しています。クッキーに個人情報は保存されません。JavaScriptを無効にすることで解析の対象外にすることができます。</p>
            </Section>

            <Section title="お問い合わせ">
                <p>
                    本ポリシーに関するご質問やデータ削除のご依頼は、
                    <a href="mailto:admin@petratutors.com" style={{ color: 'var(--c-navy)' }}>admin@petratutors.com</a>
                    までご連絡ください。
                </p>
            </Section>
        </>
    );
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--c-navy)', marginBottom: '0.6rem' }}>{title}</h2>
            <div style={{ color: 'var(--c-text)', lineHeight: '1.75', fontSize: '0.95rem' }}>{children}</div>
        </div>
    );
}
