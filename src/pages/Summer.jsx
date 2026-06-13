import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Calendar, Users, Star, ChevronDown, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import SummerHero3D from '../components/SummerHero3D';
import styles from './Summer.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CONTENT = {
    en: {
        seoTitle: 'Summer Intensive 2026 | Petra Tutors 夏期講習',
        seoDesc: 'Petra Tutors Summer Intensive 2026: July 21 – August 29. 5 programs, fully 1:1 individual tutoring. English, Eiken, IB, SAT. From ¥14,000. Free trial lesson available.',
        heroTitle: 'Summer Intensive',
        heroYear: '2026',
        heroSub: 'Online & In-Person Individual Tutoring',
        heroDate: 'July 21 – August 29, 2026',
        stat1Lbl: 'Programs',
        stat2Lbl: 'Starting from',
        stat3Lbl: 'Maximum',
        stat4Lbl: 'Fully individual',
        ctaPrimary: 'Book Free Trial Lesson (30 min)',
        ctaSecondary: 'Get in Touch',
        heroNote: 'Limited spots available. Program plan shared the day after your trial.',
        strengthsTitle: 'Why Petra',
        strengths: [
            'Primarily 1:1, or bring a friend, sibling, or classmate for groups of 2 to 5 (unlike forced group classes at large cram schools)',
            'Bilingual tutors, English specialist expertise: a level of specialization general tutoring centers cannot match',
            'Fully transparent pricing published online. No hidden fees or opaque rate cards',
            'Written feedback report sent after every lesson',
            'A fraction of the cost of major cram schools, with fully individual attention',
        ],
        programsTitle: 'Programs',
        programsSub: 'Primarily 1:1. In-person or Zoom, your choice.',
        groupNote: 'Bring a friend, sibling, or someone you know and split the lesson (up to 1:5).',
        formatNote: {
            online: 'Online (Zoom): Study from home, fits around activities and travel plans, no commute.',
            inperson: 'In-Person: Tutor can see your child directly, great for students who need closer supervision or have trouble focusing.',
        },
        programs: [
            {
                num: '01',
                name: 'Mini English Intensive',
                nameJa: 'ミニ英語集中コース',
                target: 'Elementary school students (Grades 1–6) · English beginners',
                color: '#F59E0B',
                plans: [{ label: '4 sessions × 45 min', total: '¥14,000', per: '¥3,500/session' }],
                bullets: [
                    'Never studied English before, or finds it difficult',
                    'Wants to try something this summer without a big commitment',
                    'In-person or Zoom',
                ],
                msg: '"4 days to fall in love with English this summer."',
                periods: ['July 21–Aug 1 (early block)', 'Aug 18–29 (late block)'],
            },
            {
                num: '02',
                name: 'English & Study Support',
                nameJa: '英語・学習サポートコース',
                target: 'Grades 3–8 · Catching up · Preparing for Semester 2',
                color: '#60A5FA',
                plans: [
                    { label: '8 sessions × 60 min', total: '¥36,000', per: '¥4,500/session' },
                    { label: '12 sessions × 60 min', total: '¥52,000', per: '¥4,333/session' },
                ],
                bullets: [
                    'Struggling to keep up in English class',
                    'Wants to get summer homework done',
                    'Wants to start Semester 2 with confidence',
                ],
                msg: '"Sort out the weak spots over summer and walk into Semester 2 ready."',
                periods: ['July 21–Aug 1 (early, 8-session plan)', 'Aug 18–29 (late, 12-session plan)'],
            },
            {
                num: '03',
                name: 'Eiken Intensive',
                nameJa: '英検集中コース',
                target: 'Elementary to junior high students aiming for Eiken Grade 5 to Pre-2',
                color: '#34D399',
                plans: [
                    { label: '8 sessions × 60 min', total: '¥38,000', per: '¥4,750/session' },
                    { label: '12 sessions × 60 min', total: '¥54,000', per: '¥4,500/session' },
                ],
                bullets: [
                    'Aiming for Eiken Grade 5, 4, 3, or Pre-2 in the autumn sitting (October)',
                    'All 4 skills: reading, listening, writing, speaking',
                    'Speaking practice, only possible 1:1',
                ],
                msg: '"Short, intensive preparation to hit your target grade this summer."',
                periods: ['July 21–Aug 1 (early, 8-session plan)', 'Aug 18–29 (late, final push)', 'October Eiken autumn sitting'],
            },
            {
                num: '04',
                name: 'International School & Returnee Support',
                nameJa: 'インター・帰国子女サポート',
                target: 'International school students · Returnees · Bilingual learners',
                color: '#A78BFA',
                plans: [
                    { label: '5 sessions × 60 min', total: '¥30,000', per: '¥6,000/session' },
                    { label: '10 sessions × 60 min', total: '¥58,000', per: '¥5,800/session' },
                ],
                bullets: [
                    'English, math, science, social studies, essays: all subjects',
                    'Semester 2 prep, IB Prep, MAP test support',
                    'Sessions available in English or Japanese',
                ],
                msg: '"Solid academic support across all subjects, taught in English."',
                periods: ['From late June (aligned with international school summer break)', 'July 21–Aug 29 (core period)'],
            },
            {
                num: '05',
                name: 'SAT / IB / AP & Essay Premium',
                nameJa: 'SAT/IB/AP・エッセイ プレミアム',
                target: 'High school students · University applications · Overseas & returnee entrance exams',
                color: '#C9A84C',
                plans: [
                    { label: '5 sessions × 60 min', total: '¥42,000', per: '¥8,400/session' },
                    { label: '5 sessions × 90 min', total: '¥60,000', per: '¥12,000/session' },
                ],
                bullets: [
                    'SAT, TOEFL, IELTS preparation',
                    'IB, AP, A-Level coursework and essays',
                    'Personal essays for overseas universities and returnee entrance exams',
                ],
                msg: '"Intensive targeted preparation: essays, interview practice, and full support."',
                periods: ['July–August (university applications, IB summer assignments)', 'Mid-August (SAT intensive, 10–15 hrs)'],
            },
        ],
        pricingTitle: 'Pricing Overview',
        pricingIntro: 'Petra Tutors publishes all pricing clearly. The right number of sessions depends on your child\'s goals and current level. After the free trial lesson we\'ll recommend a plan that fits without pressure.',
        tableHeaders: ['Program', 'Best for', 'Total', 'Sessions', 'Per session'],
        tableRows: [
            { name: 'Mini English Intensive', bestFor: 'First introduction to English, or wanting to try', total: '¥14,000', sessions: '4 × 45 min', per: '¥3,500', premium: false },
            { name: 'English & Study Support', bestFor: 'Catching up, summer homework, building foundations', total: '¥36,000', sessions: '8 × 60 min', per: '¥4,500', premium: false },
            { name: '', bestFor: 'Full-summer review and Semester 2 preparation', total: '¥52,000', sessions: '12 × 60 min', per: '¥4,333', premium: false },
            { name: 'Eiken Intensive', bestFor: 'Focused Eiken prep for the autumn sitting', total: '¥38,000', sessions: '8 × 60 min', per: '¥4,750', premium: false },
            { name: '', bestFor: 'Comprehensive Eiken preparation with buffer', total: '¥54,000', sessions: '12 × 60 min', per: '¥4,500', premium: false },
            { name: 'International / Returnee', bestFor: 'Targeted subject support', total: '¥30,000', sessions: '5 × 60 min', per: '¥6,000', premium: false },
            { name: '', bestFor: 'Full Semester 2 preparation across all subjects', total: '¥58,000', sessions: '10 × 60 min', per: '¥5,800', premium: false },
            { name: 'SAT / IB / AP & Essay', bestFor: 'University applications, essays, overseas entrance exams', total: '¥42,000', sessions: '5 × 60 min', per: '¥8,400', premium: true },
            { name: '', bestFor: 'Deep-dive sessions for complex subjects', total: '¥60,000', sessions: '5 × 90 min', per: '¥12,000', premium: true },
        ],
        tableNote: 'Monthly students receive ¥3,000 off all programs.',
        pricingOnline: 'Prices shown are the standard rate for online lessons. In-person lessons may incur additional fees depending on location and travel. We will confirm all costs before you commit.',
        pricingHelp: 'Not sure which plan is right?',
        pricingHelpBody: 'The free trial lesson is there for exactly this reason. We assess your child\'s level, goals, and learning style, then suggest the plan that fits. We won\'t push a higher plan than needed.',
        scheduleTitle: 'Summer 2026 Schedule',
        scheduleSub: 'July 21 – August 29 / 3 blocks',
        schedule: [
            { phase: 'Early block', period: 'Tue Jul 21 – Fri Aug 1', label: 'All programs', desc: '12 days. Ideal for families who want to finish before summer travel.', accent: '#60A5FA' },
            { phase: 'Mid-break (flexible)', period: 'Sat Aug 2 – Sun Aug 17', label: 'International & Premium only', desc: 'Obon holidays and family trips. Flexible scheduling available.', accent: '#A78BFA' },
            { phase: 'Late block', period: 'Tue Aug 18 – Fri Aug 29', label: 'Eiken & Support especially recommended', desc: '12 days. Final push before Semester 2 and the autumn Eiken sitting.', accent: '#34D399' },
        ],
        ctaTitle: 'Apply for Summer 2026',
        ctaDesc: 'Tell us your name, email, and which program you are interested in. We will follow up within 24 hours with next steps.',
        formName: 'Your name',
        formEmail: 'Email address',
        formProgram: 'Program',
        formProgramDefault: 'Select a program',
        formProgramOptions: [
            'Mini English Intensive',
            'English & Study Support',
            'Eiken Intensive',
            'International School & Returnee Support',
            'SAT / IB / AP & Essay Premium',
            'Not sure yet',
        ],
        formSubmit: 'Send Inquiry',
        formSent: 'Sent. We will be in touch shortly.',
    },
    ja: {
        seoTitle: 'Petra Tutors 夏期講習 2026 | 個別集中レッスン',
        seoDesc: 'Petra Tutors（ペトラチューターズ）の夏期講習2026。7月21日〜8月29日。英語・英検・IB・SAT対応。完全1:1マンツーマン。¥14,000〜。無料体験レッスンあり。',
        heroTitle: '夏期講習',
        heroYear: '2026',
        heroSub: 'オンライン・対面対応 個別集中レッスン',
        heroDate: '2026年7月21日 – 8月29日',
        stat1Lbl: 'プログラム',
        stat2Lbl: '最低総額',
        stat3Lbl: '最高総額',
        stat4Lbl: '完全個別',
        ctaPrimary: '無料体験レッスン（30分）を予約',
        ctaSecondary: 'まずは相談する',
        heroNote: '先着枠あり・体験翌日にプランをご案内します',
        strengthsTitle: 'Petraの強み · 大手塾との違い',
        strengths: [
            '基本は完全1:1マンツーマン。友人・兄弟・知人と一緒なら1:2〜1:5にも対応（大手塾の強制グループとは異なります）',
            'バイリンガル対応・英語専門特化（汎用塾にはできない専門性）',
            '料金をウェブに完全公開（大手塾は非公開が多い）',
            '毎回のレッスン後にフィードバックレポートを送付',
            '大手塾の1/5以下の費用で完全個別対応を提供',
        ],
        programsTitle: 'プログラム詳細',
        programsSub: '基本は完全1:1マンツーマン。オンライン・対面どちらでも対応可能。',
        groupNote: '友人・兄弟・知人と一緒に受けることもできます（最大1:5まで対応可）',
        formatNote: {
            online: 'オンライン（Zoom）：ご自宅から受講。部活・旅行などのご予定に合わせやすく、移動なしで学習できます。',
            inperson: '対面：講師が直接様子を見ながら進められるため、集中しにくいお子様にも安心です。',
        },
        programs: [
            {
                num: '01',
                name: 'ミニ英語集中コース',
                nameJa: 'Mini English Intensive',
                target: '小学1〜6年生・英語初心者',
                color: '#F59E0B',
                plans: [{ label: '4回×45分', total: '¥14,000', per: '¥3,500/回' }],
                bullets: ['英語が初めて・苦手な小学生', '夏休みだけ試してみたい', '対面またはZoom'],
                msg: 'この夏に英語を好きになる4日間',
                periods: ['7/21〜8/1（前期）', '8/18〜8/29（後期）'],
            },
            {
                num: '02',
                name: '英語・学習サポートコース',
                nameJa: 'English & Study Support',
                target: '小3〜中2・苦手克服・2学期準備',
                color: '#60A5FA',
                plans: [
                    { label: '8回×60分', total: '¥36,000', per: '¥4,500/回' },
                    { label: '12回×60分', total: '¥52,000', per: '¥4,333/回' },
                ],
                bullets: ['英語の授業についていけない', '夏休みの宿題を終わらせたい', '2学期を安心して迎えたい'],
                msg: '夏のうちに苦手を整理して、2学期を安心して迎える',
                periods: ['7/21〜8/1（前期・8回コース）', '8/18〜8/29（後期・12回コース）'],
            },
            {
                num: '03',
                name: '英検集中コース',
                nameJa: 'Eiken Intensive',
                target: '英検5〜準2級を目指す小〜中学生',
                color: '#34D399',
                plans: [
                    { label: '8回×60分', total: '¥38,000', per: '¥4,750/回' },
                    { label: '12回×60分', total: '¥54,000', per: '¥4,500/回' },
                ],
                bullets: ['英検5〜準2級を秋（10月）に受けたい', '4技能（読む・聞く・書く・話す）全対応', 'スピーキング練習相手になれるのは1:1だけ'],
                msg: '目標の級に向けて、この夏に短期集中で仕上げる',
                periods: ['7/21〜8/1（前期）', '8/18〜8/29（後期仕上げ）', '10月英検秋試験'],
            },
            {
                num: '04',
                name: 'インター・帰国子女サポート',
                nameJa: 'International School & Returnee Support',
                target: 'インター在校生・帰国子女・バイリンガル生',
                color: '#A78BFA',
                plans: [
                    { label: '5回×60分', total: '¥30,000', per: '¥6,000/回' },
                    { label: '10回×60分', total: '¥58,000', per: '¥5,800/回' },
                ],
                bullets: ['英語・数学・理科・社会・エッセイ全科目', '2学期準備・IB Prep・MAP対策', '英語または日本語で対応可'],
                msg: '学校の授業・課題・テストを、英語でしっかりサポート',
                periods: ['6月下旬〜（インター校の夏休みに合わせて）', '7/21〜8/29（コア期間）'],
            },
            {
                num: '05',
                name: 'SAT/IB/AP・エッセイ プレミアム',
                nameJa: 'University Prep Premium',
                target: '高校生・大学受験・海外大・帰国生入試',
                color: '#C9A84C',
                plans: [
                    { label: '5回×60分', total: '¥42,000', per: '¥8,400/回' },
                    { label: '5回×90分', total: '¥60,000', per: '¥12,000/回' },
                ],
                bullets: ['SAT・TOEFL・IELTS対策', 'IB・AP・A-Levelの課題・エッセイ', '海外大・帰国生入試のパーソナルエッセイ'],
                msg: '本番に向けた集中特訓。エッセイから面接まで全面サポート',
                periods: ['7月〜8月（大学出願・IB夏季課題対応）', '8月中（SAT集中10〜15時間）'],
            },
        ],
        pricingTitle: '料金一覧',
        pricingIntro: 'Petra Tutorsでは、夏期講習の料金をできるだけ分かりやすく公開しています。お子様の目的や科目により最適な回数・内容は異なりますが、無料体験レッスン後に無理のないプランをご提案いたします。',
        tableHeaders: ['プログラム', 'こんな方におすすめ', '合計', '回数', '1回単価'],
        tableRows: [
            { name: 'ミニ英語集中', bestFor: '英語に触れる機会を増やしたい方', total: '¥14,000', sessions: '4回×45分', per: '¥3,500', premium: false },
            { name: '英語・学習サポート', bestFor: '復習・宿題・基礎固めをしたい方', total: '¥36,000', sessions: '8回×60分', per: '¥4,500', premium: false },
            { name: '', bestFor: '夏休みをフル活用して準備したい方', total: '¥52,000', sessions: '12回×60分', per: '¥4,333', premium: false },
            { name: '英検集中', bestFor: '英検対策を短期集中で進めたい方', total: '¥38,000', sessions: '8回×60分', per: '¥4,750', premium: false },
            { name: '', bestFor: 'しっかり時間をかけて準備したい方', total: '¥54,000', sessions: '12回×60分', per: '¥4,500', premium: false },
            { name: 'インター・帰国子女', bestFor: '特定科目・単元のサポートが必要な方', total: '¥30,000', sessions: '5回×60分', per: '¥6,000', premium: false },
            { name: '', bestFor: '2学期に向けた全科目の総合準備', total: '¥58,000', sessions: '10回×60分', per: '¥5,800', premium: false },
            { name: 'SAT/IB/AP・エッセイ', bestFor: '海外大学・高度な英語ライティング', total: '¥42,000', sessions: '5回×60分', per: '¥8,400', premium: true },
            { name: '', bestFor: '集中的にじっくり進めたい方', total: '¥60,000', sessions: '5回×90分', per: '¥12,000', premium: true },
        ],
        tableNote: '月謝生は全コース¥3,000引き優待価格。',
        pricingOnline: '表示料金はオンラインレッスンの基準料金です。対面レッスンをご希望の場合は、エリアや講師の移動時間により料金が変わる場合があるため、事前に個別でご案内いたします。',
        pricingHelp: 'どのプランが合うか分からない場合',
        pricingHelpBody: 'まずは無料体験レッスンで現在の理解度・目標・学習スタイルを確認し、お子様に合う回数や内容をご提案いたします。無理に高いプランをご案内するのではなく、必要な内容に合わせてご相談いたします。',
        scheduleTitle: '2026年夏 実施スケジュール',
        scheduleSub: '7月21日 – 8月29日 / 3フェーズ',
        schedule: [
            { phase: '前期', period: '7/21（火）– 8/1（金）', label: '全プログラム対応', desc: '12日間。早め開始・旅行前に終わらせたい家庭に最適。', accent: '#60A5FA' },
            { phase: '中間（自由期間）', period: '8/2（土）– 8/17（日）', label: 'インター・プレミアムのみ推奨', desc: 'お盆・旅行が多い時期。フレキシブル対応。', accent: '#A78BFA' },
            { phase: '後期', period: '8/18（火）– 8/29（金）', label: '英検・サポート特に推奨', desc: '12日間。2学期直前・英検秋受験前の仕上げ。緊急性が最も高い。', accent: '#34D399' },
        ],
        ctaTitle: '夏期講習 2026 に申し込む',
        ctaDesc: 'お名前・メールアドレス・ご希望のプログラムをお送りください。24時間以内にご連絡いたします。',
        formName: 'お名前',
        formEmail: 'メールアドレス',
        formProgram: 'プログラム',
        formProgramDefault: 'プログラムを選択',
        formProgramOptions: [
            'ミニ英語集中コース',
            '英語・学習サポートコース',
            '英検集中コース',
            'インター・帰国子女サポート',
            'SAT/IB/AP・エッセイ プレミアム',
            'まだ決まっていない',
        ],
        formSubmit: '送信する',
        formSent: '送信が完了しました。まもなくご連絡いたします。',
    },
};

export default function Summer() {
    const { i18n } = useTranslation();
    const c = i18n.language === 'ja' ? CONTENT.ja : CONTENT.en;
    const [formData, setFormData] = useState({ name: '', email: '', program: '' });
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [expandedProgram, setExpandedProgram] = useState(null);
    const containerRef = useRef();

    useGSAP(() => {
        // Hero Animations
        const tl = gsap.timeline();
        
        tl.from(`.${styles.eyebrow}`, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
          .from(`.${styles.heroTitle}`, { y: 40, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.6')
          .from(`.${styles.heroSub}`, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
          .from(`.${styles.heroDates}`, { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.6')
          .from(`.${styles.statBox}`, { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
          .from(`.${styles.heroCtas}`, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
          .from(`.${styles.heroNote}`, { opacity: 0, duration: 1 }, '-=0.4');

        // Scroll Animations: Strengths
        gsap.from(`.${styles.strengthItem}`, {
            scrollTrigger: {
                trigger: `.${styles.strengthsSection}`,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });

        // Scroll Animations: Programs
        gsap.from(`.${styles.programCard}`, {
            scrollTrigger: {
                trigger: `.${styles.programsSection}`,
                start: 'top 75%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Scroll Animations: Pricing
        gsap.from(`.${styles.pricingSection} .${styles.container} > *`, {
            scrollTrigger: {
                trigger: `.${styles.pricingSection}`,
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

    }, { scope: containerRef });

    const pricingGroups = [];
    c.tableRows.forEach(row => {
        if (row.name) {
            pricingGroups.push({ name: row.name, premium: row.premium, plans: [row] });
        } else {
            pricingGroups[pricingGroups.length - 1].plans.push(row);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'ba24b4f1-ef91-4086-a582-bd56e703a316',
                    subject: `Summer 2026 Inquiry: ${formData.program}`,
                    name: formData.name,
                    email: formData.email,
                    program: formData.program,
                }),
            });
            if (res.ok) setSent(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={c.seoTitle}
                description={c.seoDesc}
                path="/summer"
                keywords="Petra Tutors summer, Petra Tutors summer program, Petra Tutors summer intensive, Petra Tutors 夏期講習, ペトラチューターズ 夏期講習, ペトラ 夏, 夏期講習 個別指導, 夏期講習 英語, 夏期講習 英検, 夏期講習 IB, 夏期講習 オンライン, summer intensive Japan, summer tutoring Tokyo, summer English program Japan, Eiken summer prep, IB summer tutoring"
                jsonLdExtra={{
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": "Petra Tutors Summer Intensive 2026 / 夏期講習 2026",
                    "description": "Individual tutoring programs for summer 2026. English, Eiken, IB, SAT, and more. Online and in-person. July 21 – August 29.",
                    "provider": {
                        "@type": "EducationalOrganization",
                        "name": "Petra Tutors",
                        "url": "https://www.petratutors.com"
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "JPY",
                        "lowPrice": "14000",
                        "highPrice": "60000",
                        "offerCount": "5"
                    },
                    "startDate": "2026-07-21",
                    "endDate": "2026-08-29",
                    "url": "https://www.petratutors.com/summer",
                    "inLanguage": ["en", "ja"],
                    "educationalCredentialAwarded": "Certificate of Completion"
                }}
            />
            <div className={styles.page} ref={containerRef}>

                {/* Hero */}
                <section className={styles.hero}>
                    <SummerHero3D />
                    <div className={styles.heroInner}>
                        <p className={styles.eyebrow}>PETRA TUTORS</p>
                        <h1 className={styles.heroTitle}>
                            {c.heroTitle} <span className={styles.heroYear}>{c.heroYear}</span>
                        </h1>
                        <p className={styles.heroSub}>{c.heroSub}</p>
                        <p className={styles.heroDates}>
                            <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
                            {c.heroDate}
                        </p>

                        <div className={styles.heroStats}>
                            <div className={styles.statBox}>
                                <span className={styles.statVal}>5</span>
                                <span className={styles.statLbl}>{c.stat1Lbl}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statVal}>¥14,000–</span>
                                <span className={styles.statLbl}>{c.stat2Lbl}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statVal}>¥60,000</span>
                                <span className={styles.statLbl}>{c.stat3Lbl}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statVal}>1:1</span>
                                <span className={styles.statLbl}>{c.stat4Lbl}</span>
                            </div>
                        </div>

                        <div id="hero-ctas" className={styles.heroCtas}>
                            <a href="#summer-form" className={styles.ctaPrimary}>{c.ctaPrimary}</a>
                            <a href="#summer-form" className={styles.ctaSecondary}>{c.ctaSecondary}</a>
                        </div>
                        <p className={styles.heroNote}>{c.heroNote}</p>
                    </div>
                </section>

                {/* Strengths */}
                <section className={styles.strengthsSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionLabel}>{c.strengthsTitle}</h2>
                        <ul className={styles.strengthsList}>
                            {c.strengths.map((s, i) => (
                                <li key={i} className={styles.strengthItem}>
                                    <Check size={18} className={styles.checkIcon} />
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Programs */}
                <section className={styles.programsSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{c.programsTitle}</h2>
                        <p className={styles.sectionSub}>{c.programsSub}</p>
                        <p className={styles.groupNote}>{c.groupNote}</p>

                        <div className={styles.formatCards}>
                            <div className={styles.formatCard}>
                                <span className={styles.formatCardLabel}>Online</span>
                                <p>{c.formatNote.online}</p>
                            </div>
                            <div className={styles.formatCard}>
                                <span className={styles.formatCardLabel}>{i18n.language === 'ja' ? '対面' : 'In-Person'}</span>
                                <p>{c.formatNote.inperson}</p>
                            </div>
                        </div>

                        <div className={styles.programGrid}>
                            {c.programs.map((p) => {
                                const isExpanded = expandedProgram === p.num;
                                return (
                                <div key={p.num} className={`${styles.programCard} ${isExpanded ? styles.programCardExpanded : ''}`}>
                                    <button
                                        className={styles.programAccordionToggle}
                                        onClick={() => setExpandedProgram(isExpanded ? null : p.num)}
                                        aria-expanded={isExpanded}
                                    >
                                        <div className={styles.programTop}>
                                            <span className={styles.programNum} style={{ color: p.color }}>{p.num}</span>
                                            <div className={styles.programTopText}>
                                                <h3 className={styles.programName}>{p.name}</h3>
                                                <span className={styles.programAccordionPrice}>{p.plans[0].total}〜</span>
                                            </div>
                                        </div>
                                        <ChevronDown size={20} className={`${styles.accordionChevron} ${isExpanded ? styles.accordionChevronOpen : ''}`} />
                                    </button>

                                    {/* Always visible on desktop, toggled on mobile */}
                                    <div className={styles.programCardBody}>
                                        <p className={styles.programNameSub}>{p.nameJa}</p>
                                        <p className={styles.programTarget}>
                                            <Users size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem', opacity: 0.7 }} />
                                            {p.target}
                                        </p>

                                        <ul className={styles.programBullets}>
                                            {p.bullets.map((b, i) => (
                                                <li key={i}>
                                                    <span className={styles.bullet} style={{ background: p.color }} />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className={styles.programPlans}>
                                            {p.plans.map((plan, i) => (
                                                <div key={i} className={styles.planRow}>
                                                    <span className={styles.planLabel}>{plan.label}</span>
                                                    <div className={styles.planBottom}>
                                                        <span className={styles.planPer}>{plan.per}</span>
                                                        <span className={styles.planTotal} style={{ color: p.color }}>{plan.total}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <blockquote className={styles.programMsg}>{p.msg}</blockquote>

                                        <div className={styles.programPeriods}>
                                            {p.periods.map((period, i) => (
                                                <span key={i} className={styles.periodTag}>{period}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Pricing Table */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{c.pricingTitle}</h2>
                        <p className={styles.pricingIntro}>{c.pricingIntro}</p>
                        <div className={styles.tableWrap}>
                            <table className={styles.priceTable}>
                                <thead>
                                    <tr>{c.tableHeaders.map((h, i) => <th key={i}>{h}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {c.tableRows.map((row, i) => (
                                        <tr key={i} className={row.premium ? styles.premiumRow : ''}>
                                            <td className={styles.programNameCell}>{row.name}</td>
                                            <td className={styles.bestForCell}>{row.bestFor}</td>
                                            <td className={styles.totalCell}>{row.total}</td>
                                            <td>{row.sessions}</td>
                                            <td>{row.per}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.mobilePricingCards}>
                            {pricingGroups.map((group, i) => (
                                <div key={i} className={`${styles.pricingCard} ${group.premium ? styles.premiumPricingCard : ''}`}>
                                    <h3 className={styles.pricingCardName}>{group.name}</h3>
                                    <div className={styles.pricingCardPlans}>
                                        {group.plans.map((plan, j) => (
                                            <div key={j} className={styles.pricingCardPlan}>
                                                <div className={styles.pricingCardPlanTop}>
                                                    <span className={styles.pricingCardBestFor}>{plan.bestFor}</span>
                                                </div>
                                                <div className={styles.pricingCardPlanDetails}>
                                                    <div className={styles.pricingCardPlanInfo}>
                                                        <span className={styles.pricingCardSessions}>{plan.sessions}</span>
                                                        <span className={styles.pricingCardPer}>{plan.per}</span>
                                                    </div>
                                                    <span className={styles.pricingCardTotal}>{plan.total}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className={styles.tableNote}>{c.tableNote}</p>
                        <p className={styles.tableOnlineNote}>{c.pricingOnline}</p>
                        <div className={styles.pricingHelp}>
                            <p className={styles.pricingHelpTitle}>{c.pricingHelp}</p>
                            <p className={styles.pricingHelpBody}>{c.pricingHelpBody}</p>
                            <Link to="/inquiry" className={styles.ctaPrimary} style={{ display: 'inline-block', marginTop: '1rem' }}>
                                {c.ctaPrimary}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Schedule */}
                <section className={styles.scheduleSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{c.scheduleTitle}</h2>
                        <p className={styles.sectionSub}>{c.scheduleSub}</p>
                        <div className={styles.timeline}>
                            {c.schedule.map((s, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineDot} style={{ background: s.accent }} />
                                    {i < c.schedule.length - 1 && <div className={styles.timelineLine} />}
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineHeader}>
                                            <span className={styles.timelinePhase} style={{ color: s.accent }}>{s.phase}</span>
                                            <span className={styles.timelinePeriod}>{s.period}</span>
                                        </div>
                                        <span className={styles.timelineTag}>{s.label}</span>
                                        <p className={styles.timelineDesc}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Inquiry Form */}
                <section className={styles.ctaSection} id="summer-form">
                    <div className={styles.container}>
                        <div className={styles.ctaBox}>
                            <Star size={28} className={styles.ctaStar} />
                            <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
                            <p className={styles.ctaDesc}>{c.ctaDesc}</p>

                            {sent ? (
                                <p className={styles.formSent}>{c.formSent}</p>
                            ) : (
                                <form className={styles.inquiryForm} onSubmit={handleSubmit}>
                                    <input
                                        className={styles.formField}
                                        type="text"
                                        placeholder={c.formName}
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                                    />
                                    <input
                                        className={styles.formField}
                                        type="email"
                                        placeholder={c.formEmail}
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                                    />
                                    <select
                                        className={styles.formField}
                                        required
                                        value={formData.program}
                                        onChange={e => setFormData(f => ({ ...f, program: e.target.value }))}
                                    >
                                        <option value="" disabled>{c.formProgramDefault}</option>
                                        {c.formProgramOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className={styles.ctaPrimaryLarge} disabled={submitting}>
                                        {submitting ? '...' : c.formSubmit}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Back to top */}
                <div className={styles.backToTop}>
                    <a href="#" className={styles.backToTopLink} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <ArrowUp size={16} />
                        <span>Top</span>
                    </a>
                </div>

            </div>
        </>
    );
}
