/**
 * Static pre-rendering — injects route-specific <head> tags into the Vite build output.
 *
 * Run after `vite build`. Creates dist/<route>/index.html for each route so
 * Google and other crawlers see the correct title, description, and OG tags
 * instead of the generic fallback from index.html.
 *
 * Vercel serves static files before applying the catch-all rewrite, so
 * dist/summer/index.html is served directly for /summer without any config changes.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(__dirname, 'dist');

// ── Route definitions ──────────────────────────────────────────────────────
// title / description are Japanese (primary audience).
// Google will pick up the client-updated English tags on return visits.
const ROUTES = {
  '/': {
    title: 'Petra Tutors | 東京・全国オンライン対応の英語・IB・海外進学バイリンガル家庭教師',
    description: '東京・全国オンライン対応。英語・IB・IELTS・帰国子女・海外進学に強いバイリンガル個別指導。完全1:1、入会金なし。無料体験レッスンあり。',
    keywords: '英語 家庭教師 東京, バイリンガル 家庭教師, 帰国子女 家庭教師, IB 家庭教師, IELTS 家庭教師, 海外進学 サポート, オンライン 家庭教師 東京, bilingual tutor Tokyo, private tutor Japan, international school tutor',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Petra Tutors',
      alternateName: ['ペトラエデュケーション合同会社', 'Petra Education LLC'],
      url: 'https://www.petratutors.com',
      logo: 'https://www.petratutors.com/logo.png',
      image: 'https://www.petratutors.com/og-image.png',
      email: 'admin@petratutors.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tokyo',
        addressRegion: 'Tokyo',
        addressCountry: 'JP',
      },
      areaServed: [
        { '@type': 'Country', name: 'Japan' },
        { '@type': 'City', name: 'Tokyo' },
      ],
      priceRange: '¥3,500〜',
      description: '東京・全国オンライン対応のバイリンガル個別指導。英語・IB・IELTS・帰国子女・海外進学対応。',
      sameAs: [
        'https://www.instagram.com/petratutors',
        'https://www.linkedin.com/company/petra-education-llc',
      ],
    },
  },
  '/summer': {
    title: 'Petra Tutors 夏期講習 2026 | 個別集中レッスン',
    description: 'Petra Tutors の夏期講習 2026。7月21日〜8月29日。英語・英検・IB・SAT 対応。完全 1:1 マンツーマン。¥14,000〜。無料体験レッスンあり。',
    keywords: 'Petra Tutors summer, Petra Tutors summer intensive, Petra Tutors 夏期講習, ペトラチューターズ 夏期講習, 夏期講習 英語, 夏期講習 英検, 夏期講習 IB, 夏期講習 オンライン',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Petra Tutors Summer Intensive 2026 / 夏期講習 2026',
      description: '5 programs, 1:1 individual tutoring. Online and in-person. July 21 – August 29, 2026.',
      provider: { '@type': 'EducationalOrganization', name: 'Petra Tutors', url: 'https://www.petratutors.com' },
      offers: { '@type': 'AggregateOffer', priceCurrency: 'JPY', lowPrice: '14000', highPrice: '60000' },
      startDate: '2026-07-21',
      endDate: '2026-08-29',
      url: 'https://www.petratutors.com/summer',
    },
  },
  '/english': {
    title: '英語家庭教師・英会話個別指導 | 東京・全国オンライン | Petra Tutors',
    description: '東京・全国オンライン対応。バイリンガル英語家庭教師が英会話・ライティング・IELTS・ビジネス英語を完全1:1でサポート。入会金なし、初回無料。',
    keywords: '英語 家庭教師, 英語 家庭教師 東京, バイリンガル 家庭教師, 英会話 個別指導, 英語 個別指導 東京, private tutor Japan, private tutor Tokyo, English tutor Japan, bilingual tutor Tokyo, English tutoring Japan, 英語 家庭教師 オンライン',
  },
  '/ielts': {
    title: 'IELTS・英検・TOEIC 個別指導 | 東京・全国オンライン | Petra Tutors',
    description: '東京・全国オンライン対応のIELTS・英検・TOEIC対策。スコアが伸び悩む原因を特定し、目標スコア達成への最短ルートを完全1:1で設計。入会金なし。',
    keywords: 'IELTS 家庭教師, IELTS 対策 東京, IELTS スコアアップ, IELTS 個別指導, 英検 個別指導, TOEIC 家庭教師, IELTS tutor Tokyo, IELTS tutoring Japan, IELTS coach Japan',
  },
  '/ib': {
    title: 'IB・インター校 個別指導 | IA・EE・TOK対応 | Petra Tutors',
    description: '東京・全国オンライン対応のIB・インター校サポート。DP・MYP・PYPに対応。IA・EE・TOK・全科目をバイリンガルメンターが完全1:1で指導。入会金なし。',
    keywords: 'IB 塾, IB 家庭教師, IB DP サポート, インター校 塾, インター 家庭教師 東京, IB tutor Tokyo, International Baccalaureate tutoring Japan, IB IA サポート, IB EE サポート',
  },
  '/university': {
    title: '海外大学・帰国子女入試サポート | Petra Tutors',
    description: '海外大学への出願戦略・Personal Statement・面接対策から帰国子女入試まで。志望校合格に向けた完全個別コンサルティング。',
    keywords: '海外大学 塾, 帰国子女 大学受験, 帰国子女入試, Personal Statement 添削, 海外進学 サポート',
  },
  '/kids': {
    title: '子供英語・英会話 個別指導 | Petra Tutors',
    description: '楽しく英語の基礎を作る。英会話・読み書き・発音まで、お子様のペースに合わせた完全個別レッスン。入会金なし。',
    keywords: '子供 英語 個別指導, 英会話 家庭教師, 子供 英語 オンライン, 小学生 英語 家庭教師',
  },
  '/foundation': {
    title: 'インター校・早期学習サポート | Petra Tutors',
    description: 'IB PYP・キーステージ・早期 MYP に対応。インター校の基礎学力を確実に定着させる完全個別指導。入会金なし。',
    keywords: 'インター校 塾, IB PYP サポート, キーステージ 家庭教師, インター 家庭教師 東京',
  },
  '/business': {
    title: 'ビジネス英語 個別コーチング | Petra Tutors',
    description: '会議・メール・プレゼン・商談対応のビジネス英語。実務直結の完全個別コーチングで、英語を仕事の武器に変える。',
    keywords: 'ビジネス英語 個別指導, ビジネス英語 家庭教師, 英語 会議 対策, Business English Japan',
  },
  '/tutors': {
    title: '講師一覧 | Petra Tutors',
    description: '東大・UCL・慶應など国内外トップ大学出身の講師陣。専門分野・指導スタイル・対応年齢を公開中。',
    keywords: '家庭教師 一覧, Petra Tutors 講師, 帰国子女 家庭教師, 東大 家庭教師',
  },
  '/pricing': {
    title: '料金プラン | Petra Tutors',
    description: '入会金なし・完全公開の料金体系。¥3,500〜の完全個別指導。追加費用なし。',
    keywords: '家庭教師 料金, IELTS 個別指導 料金, IB 塾 料金, 入会金なし 家庭教師',
  },
  '/about': {
    title: 'Petra Tutors について | ペトラチューターズ',
    description: 'Petra Tutors のミッション・ビジョン・創業背景。帰国子女・国際教育専門のプレミアム個別指導塾。',
  },
  '/team': {
    title: 'チーム紹介 | Petra Tutors',
    description: 'Petra Tutors の創業者・チームメンバーをご紹介。国際教育への想いと専門性をお伝えします。',
  },
  '/faq': {
    title: 'よくある質問 | Petra Tutors',
    description: '料金・無料体験・マッチング・授業形式など、Petra Tutors に関するよくある質問と回答。',
  },
  '/inquiry': {
    title: 'お問い合わせ・無料体験予約 | Petra Tutors',
    description: '無料体験レッスンのご予約・資料請求・お問い合わせはこちら。入会金なし、最短翌日マッチング。',
  },
  '/no-admission-fee': {
    title: '入会金なし | Petra Tutors',
    description: 'Petra Tutors は入会金・登録料が一切かかりません。まずは無料体験レッスンからお気軽にどうぞ。',
  },
  '/hiring': {
    title: 'Join Petra Tutors | Tutor Applications',
    description: 'We are looking for passionate tutors from top universities worldwide. Apply to join the Petra Tutors team.',
  },
  '/keystone': {
    title: 'The Keystone | Petra Tutors',
    description: 'A digital publication for ambitious young writers. Publish essays and research under expert editorial mentorship.',
  },
  '/system': {
    title: 'The Petra Ecosystem | Petra Tutors',
    description: 'How Petra Tutors works: tutor matching, monthly learning plans, and written feedback after every lesson.',
  },
  '/privacy': {
    title: 'プライバシーポリシー | Petra Tutors',
    description: 'Petra Tutors の個人情報取り扱い方針。',
  },
};

// ── Shared base keywords (appended to every page) ─────────────────────────
const BASE_KEYWORDS =
  'ペトラエデュケーション合同会社, ペトラエデュケーション, Petra Education LLC, Petra Tutors, ' +
  'Petra Education, International Tutoring, IB Tutoring, IELTS Coaching, ' +
  'プレミアム家庭教師, 国際教育, 進学コンサルティング, 帰国子女, オンライン家庭教師';

// ── Build ──────────────────────────────────────────────────────────────────
const template = readFileSync(join(dist, 'index.html'), 'utf-8');

for (const [route, meta] of Object.entries(ROUTES)) {
  const keywords = meta.keywords ? `${meta.keywords}, ${BASE_KEYWORDS}` : BASE_KEYWORDS;
  const canonicalUrl = `https://www.petratutors.com${route}`;
  const ogType = route === '/' ? 'website' : 'article';

  const headTags = [
    `  <meta property="og:title" content="${meta.title}" />`,
    `  <meta property="og:description" content="${meta.description}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:type" content="${ogType}" />`,
    `  <meta property="og:site_name" content="Petra Tutors" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${meta.title}" />`,
    `  <meta name="twitter:description" content="${meta.description}" />`,
    `  <meta property="og:image" content="https://www.petratutors.com/og-image.png" />`,
    `  <meta name="twitter:image" content="https://www.petratutors.com/og-image.png" />`,
    `  <link rel="canonical" href="${canonicalUrl}" />`,
  ];

  if (meta.jsonLd) {
    headTags.push(
      `  <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    );
  }

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta name="keywords"[^>]*\/?>/, `<meta name="keywords" content="${keywords}" />`)
    .replace('</head>', `${headTags.join('\n')}\n</head>`);

  const routeSegment = route === '/' ? '' : route.replace(/^\//, '');
  const dir = routeSegment ? join(dist, routeSegment) : dist;

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf-8');

  console.log(`  prerendered: ${route}`);
}

console.log(`\nDone — ${Object.keys(ROUTES).length} routes pre-rendered.`);
