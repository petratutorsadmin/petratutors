import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const COPY = {
    ja: {
        title: 'ページが見つかりません',
        sub: 'お探しのページは存在しないか、移動した可能性があります。',
        home: 'トップページに戻る',
        tutors: '講師一覧を見る',
        inquiry: '無料体験を予約する',
    },
    en: {
        title: 'Page Not Found',
        sub: 'The page you are looking for does not exist or may have moved.',
        home: 'Back to Home',
        tutors: 'Browse Tutors',
        inquiry: 'Book a Free Trial',
    },
};

export default function NotFound() {
    const { i18n } = useTranslation();
    const c = i18n.language === 'ja' ? COPY.ja : COPY.en;

    return (
        <>
            <Helmet>
                <title>404 | Petra Tutors</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '4rem 2rem',
                gap: '1.5rem',
            }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-gold)', margin: 0 }}>
                    404
                </p>
                <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: 'var(--c-navy)', margin: 0 }}>
                    {c.title}
                </h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--c-text-light)', maxWidth: '400px', lineHeight: 1.7, margin: 0 }}>
                    {c.sub}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <Link to="/" className="btn btn-navy">{c.home}</Link>
                    <Link to="/tutors" className="btn btn-ghost">{c.tutors}</Link>
                    <Link to="/inquiry" className="btn btn-gold">{c.inquiry}</Link>
                </div>
            </div>
        </>
    );
}
