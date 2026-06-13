import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import SEO from '../components/SEO';
import styles from './LandingIELTS.module.css';

const CONTENT = {
    en: {
        eyebrow: 'ENGLISH TUTORING · BILINGUAL · TOKYO & ONLINE',
        title: 'Your bilingual English tutor, matched to your goal.',
        sub: 'Conversation, writing, exam prep, or business English. Bilingual mentors who understand both languages and cultures -- fully online or in-person in Tokyo.',
        cta: 'Book Free Trial',
        line: 'Consult on LINE',
        trust1: 'No enrollment fee',
        trust2: 'Free first lesson',
        trust3: 'Online & Tokyo in-person',
        stats: [
            { val: '1:1', label: 'Individual only', note: 'No group classes' },
            { val: '¥3,500', label: 'Starting from', note: 'Per hour' },
            { val: '100%', label: 'Bilingual tutors', note: 'EN + JP' },
        ],
        painEyebrow: 'DOES THIS SOUND FAMILIAR?',
        painTitle: 'Why does English feel so hard to actually use?',
        pains: [
            "I've studied for years but still freeze in real conversations",
            'My reading is fine but speaking feels impossible under pressure',
            'I need academic or business English, not just basic conversation',
            'Language schools are too slow and never fit my schedule',
        ],
        painNote: 'Most learners plateau not because of effort, but because of method.',
        solutionEyebrow: 'THE PETRA APPROACH',
        solutionTitle: 'Individual, bilingual, and goal-focused.',
        solutions: [
            { badge: '01', title: 'Matched to your goal, not your level', desc: 'Conversation, IELTS, academic writing, business English -- your tutor is selected for exactly what you need, not placed into a fixed track.' },
            { badge: '02', title: 'Bilingual mentors who get it', desc: 'Our tutors understand Japanese and English equally. They know exactly where Japanese learners get stuck and how to break through it.' },
            { badge: '03', title: 'Tokyo in-person or fully online', desc: 'All lessons are available fully online, nationwide. In-person sessions available in the Tokyo area.' },
            { badge: '04', title: 'Monthly plan, tracked every lesson', desc: 'A written learning plan updated each month so both you and your tutor can see real progress.' },
        ],
        whyEyebrow: 'WHY PETRA',
        whyTitle: 'Not a language school.',
        whySub: 'No group classes. No fixed curriculum. Individual mentorship from tutors at Keio, Todai, UCL, and top global universities.',
        why: [
            { title: 'Bilingual, not just fluent', desc: 'Many of our tutors grew up between English and Japanese. They understand what it feels like to learn this language as a native Japanese speaker.' },
            { title: 'No enrollment fee', desc: 'Start with a free trial lesson. No registration fee, no contract. Pay only for the lessons you take.' },
            { title: 'Tutors from leading universities', desc: 'Every Petra tutor is recruited from top universities in Japan and abroad. Your mentor has real academic depth, not just conversational English.' },
        ],
        testimonials: [
            { quote: 'After a month I noticed my English coming out more naturally in meetings. My tutor found exactly where I was stuck.', name: 'Aiko S.', role: 'Keio University student' },
            { quote: 'Writing business emails in English used to take 30 minutes. Now I do it in five.', name: 'Hiroshi T.', role: 'Finance professional, Tokyo' },
        ],
        finalEyebrow: 'START TODAY',
        finalTitle: 'Your first lesson is free.',
        finalSub: 'No commitment, no enrollment fee. Meet your tutor first.',
        finalCta: 'Book Free Trial Lesson',
    },
    ja: {
        eyebrow: '英語個別指導 · バイリンガル · 東京・全国オンライン',
        title: 'あなたの目標に合った、バイリンガルの英語家庭教師。',
        sub: '英会話・ライティング・IELTS・ビジネス英語まで。日本語も堪能なバイリンガル講師が目標に合わせて完全1:1でサポート。東京対面または全国オンライン対応。',
        cta: '無料体験を予約（30秒）',
        line: 'LINEで相談する',
        trust1: '入会金なし',
        trust2: '初回体験無料',
        trust3: 'オンライン・東京対面',
        stats: [
            { val: '完全1:1', label: '個別指導', note: 'グループなし' },
            { val: '¥3,500', label: '〜/時間', note: 'シンプルな料金' },
            { val: '100%', label: 'バイリンガル講師', note: '英語・日本語対応' },
        ],
        painEyebrow: 'こんなお悩みありませんか？',
        painTitle: 'なぜ英語はわかるのに使えないのか。',
        pains: [
            '長年勉強しているのに、実際の会話になると言葉が出てこない',
            '読み書きはできるが、スピーキングになるとプレッシャーで固まる',
            '大学・仕事で使えるアカデミック英語やビジネス英語が必要',
            '語学学校はペースが遅すぎて、スケジュールも合わない',
        ],
        painNote: '英語が伸び悩む原因のほとんどは、努力量ではなく方法にあります。',
        solutionEyebrow: 'Petra のアプローチ',
        solutionTitle: '完全個別、バイリンガル、目標直結。',
        solutions: [
            { badge: '01', title: 'レベルではなく目標でマッチング', desc: '英会話・ライティング・IELTS・ビジネス英語・アカデミック英語など、あなたの目標に合った講師を1:1でマッチングします。固定カリキュラムはありません。' },
            { badge: '02', title: 'バイリンガル講師だからわかる詰まりポイント', desc: '日本語と英語の両方を熟知した講師が、日本語話者が英語でつまずく場所を正確に理解してサポートします。' },
            { badge: '03', title: '東京対面・全国オンライン対応', desc: 'オンラインで全国どこからでも受講可能。東京エリアでは対面レッスンも対応しています。' },
            { badge: '04', title: '毎月の学習計画で進捗を見える化', desc: '月次の学習プランを毎月更新し、毎レッスン後にフィードバック。目標に向けた進捗を一緒に確認します。' },
        ],
        whyEyebrow: 'Petra を選ぶ理由',
        whyTitle: '語学学校とは違う、本物の個別指導。',
        whySub: 'グループ授業なし、ノルマなし。世界トップ大学出身の講師による完全1:1メンタリング。',
        why: [
            { title: 'バイリンガルだから言語の壁を理解している', desc: '日本語と英語の両方で育った講師が多く、日本人学習者が英語でつまずく理由を体感として知っています。' },
            { title: '入会金なし・初回無料', desc: '無料体験レッスンからスタート。入会金・登録費一切なし。レッスン料のみ。' },
            { title: '慶應・東大・UCL・LSEなど国内外トップ大学出身', desc: 'Petra 講師は全員、国内外の一流大学から厳選採用。確かな学力と指導力を兼ね備えた講師だけをご紹介します。' },
        ],
        testimonials: [
            { quote: '1ヶ月で英語が会議で自然に出てくるようになりました。先生が自分のつまずきポイントをすぐ見つけてくれる。', name: 'A. S.', role: '慶應大学 学部生' },
            { quote: '英語でのビジネスメールに30分かかっていたのが、5分で書けるようになりました。', name: 'H. T.', role: '東京 金融業界' },
        ],
        finalEyebrow: '今すぐ始める',
        finalTitle: '初回レッスンは無料です。',
        finalSub: 'コミットメント不要、入会金なし。まず無料体験で講師に会ってみてください。',
        finalCta: '無料体験レッスンを予約',
    },
};

const LandingEnglish = () => {
    const { i18n } = useTranslation();
    const c = i18n.language === 'ja' ? CONTENT.ja : CONTENT.en;

    return (
        <div className={styles.container}>
            <SEO
                title="English Tutor Tokyo | 英語家庭教師・英会話個別指導 | Petra Tutors"
                description="Bilingual English tutoring in Tokyo & online Japan. Conversation, writing, IELTS & business English. 1:1 lessons. No enrollment fee. 英会話・英語個別指導。入会金なし。"
                path="/english"
                keywords="英語 家庭教師, 英語 家庭教師 東京, バイリンガル 家庭教師, 英会話 個別指導, 英語 個別指導 東京, private tutor Japan, private tutor Tokyo, English tutor Japan, bilingual tutor Tokyo, English tutoring Japan, 英語 家庭教師 オンライン"
            />

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>{c.eyebrow}</span>
                    <h1 className={styles.title}>{c.title}</h1>
                    <p className={styles.subtitle}>{c.sub}</p>

                    <div className={styles.ctaGroup}>
                        <Link to="/inquiry" className={styles.primaryCta}>{c.cta}</Link>
                        <a href="https://lin.ee/rqf4A0D" className={styles.secondaryCta}>{c.line}</a>
                    </div>

                    <div className={styles.trustPills}>
                        <div className={styles.pill}><Check className={styles.checkIcon} size={16} />{c.trust1}</div>
                        <div className={styles.pill}><Check className={styles.checkIcon} size={16} />{c.trust2}</div>
                        <div className={styles.pill}><Check className={styles.checkIcon} size={16} />{c.trust3}</div>
                    </div>

                    <div className={styles.heroResults}>
                        {c.stats.map((s, i) => (
                            <div key={i} className={styles.heroResultItem}>
                                <span className={styles.resVal}>{s.val}</span>
                                <span className={styles.resLabel}>{s.label}</span>
                                <span className={styles.resNote}>{s.note}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pain Points */}
            <section className={styles.painSection}>
                <div className={styles.wrapper}>
                    <span className={styles.sectionEyebrow}>{c.painEyebrow}</span>
                    <h2 className={styles.sectionTitle}>{c.painTitle}</h2>
                    <div className={styles.painGrid}>
                        {c.pains.map((p, i) => (
                            <div key={i} className={styles.painCard}>
                                <X className={styles.iconX} size={16} />
                                <p>{p}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.painInsight}><p>{c.painNote}</p></div>
                </div>
            </section>

            {/* Solution */}
            <section className={styles.solutionSection}>
                <div className={styles.wrapper}>
                    <span className={styles.sectionEyebrow}>{c.solutionEyebrow}</span>
                    <h2 className={styles.sectionTitle}>{c.solutionTitle}</h2>
                    <div className={styles.solutionGrid}>
                        {c.solutions.map((s, i) => (
                            <div key={i} className={styles.solutionCard}>
                                <span className={styles.badge}>{s.badge}</span>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mid CTA */}
            <section style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                <div className={styles.wrapper}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '1rem' }}>
                        {i18n.language === 'ja' ? '初回レッスンは無料です。' : 'Your first lesson is free.'}
                    </h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.8, fontSize: '0.95rem' }}>
                        {i18n.language === 'ja' ? '入会金なし。まず無料体験で講師に会ってみてください。' : 'No enrollment fee. Meet your tutor before you commit.'}
                    </p>
                    <Link to="/inquiry" className={styles.primaryCta} style={{ display: 'inline-block' }}>{c.cta}</Link>
                </div>
            </section>

            {/* Why Petra */}
            <section className={styles.whySection}>
                <div className={styles.wrapper}>
                    <span className={styles.sectionEyebrow}>{c.whyEyebrow}</span>
                    <h2 className={styles.sectionTitle}>{c.whyTitle}</h2>
                    <p className={styles.whySub}>{c.whySub}</p>
                    <div className={styles.whyGrid}>
                        {c.why.map((item, i) => (
                            <div key={i} className={styles.whyCard}>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.testimonialStrip}>
                        {c.testimonials.map((item, i) => (
                            <div key={i} className={styles.testimonialItem}>
                                <p className={styles.quote}>"{item.quote}"</p>
                                <p className={styles.author}>{item.name} <span className={styles.role}>{item.role}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.finalCtaSection}>
                <div className={styles.wrapper}>
                    <span className={styles.sectionEyebrow}>{c.finalEyebrow}</span>
                    <h2 className={styles.sectionTitle}>{c.finalTitle}</h2>
                    <p className={styles.finalSub}>{c.finalSub}</p>
                    <Link to="/inquiry" className={styles.hugeCta}>{c.finalCta}</Link>
                </div>
            </section>
        </div>
    );
};

export default LandingEnglish;
