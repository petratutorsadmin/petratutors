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

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dist = resolve(__dirname, 'dist');
const distSSR = resolve(__dirname, 'dist-ssr');

// ── Route definitions ──────────────────────────────────────────────────────
// title / description are Japanese (primary audience).
// Google will pick up the client-updated English tags on return visits.
// robots: 'noindex, nofollow' prevents indexing of non-public pages.
const ROUTES = {
  '/': {
    title: '英語・IB・海外進学のバイリンガル家庭教師 | 東京・オンライン | Petra Tutors',
    description: '東京・全国オンライン対応のバイリンガル個別指導。英語・IB・IELTS・英検・帰国子女・海外進学に強い完全1:1家庭教師。入会金なし。無料30分体験レッスンあり。笹塚・方南町・杉並区で対面対応。',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Petra Tutors',
      alternateName: ['ペトラチューターズ', 'ペトラ', 'ペトラエデュケーション', 'ペトラエデュケーション合同会社', 'Petra Education', 'Petra Education LLC', 'Petra English', 'Petra Tutoring', 'Petra'],
      url: 'https://www.petratutors.com',
      logo: 'https://www.petratutors.com/logo.png',
      image: 'https://www.petratutors.com/og-image.png',
      email: 'admin@petratutors.com',
      telephone: '+81-80-7884-7224',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '方南1丁目46番17号 さくらスイート笹塚B棟105',
        addressLocality: 'Suginami City',
        addressRegion: 'Tokyo',
        postalCode: '168-0062',
        addressCountry: 'JP',
      },
      areaServed: [
        { '@type': 'Country', name: 'Japan' },
        { '@type': 'City', name: 'Tokyo' },
        { '@type': 'AdministrativeArea', name: 'Suginami-ku' },
        { '@type': 'Place', name: 'Sasazuka' },
        { '@type': 'Place', name: 'Honancho' },
        { '@type': 'AdministrativeArea', name: 'Shibuya-ku' },
      ],
      priceRange: '¥3,500〜',
      description: '東京・全国オンライン対応のバイリンガル個別指導。英語・IB・IELTS・英検・帰国子女・海外進学対応。笹塚・方南町・杉並区で対面指導。',
      sameAs: [
        'https://www.instagram.com/petratutors',
        'https://www.linkedin.com/company/petra-education-llc',
      ],
    },
  },
  '/home': {
    title: '英語・IB・海外進学のバイリンガル家庭教師 | 東京・オンライン | Petra Tutors',
    description: '東京・全国オンライン対応。英語・IB・IELTS・帰国子女・海外進学に強いバイリンガル個別指導。完全1:1、入会金なし。無料体験レッスンあり。',
    robots: 'noindex, follow',
  },
  '/summer': {
    title: 'Summer Intensive 2026 | 夏期集中講習 Tokyo | Petra Tutors',
    description: 'Petra Tutors 夏期講習 2026。7/21〜8/29。英語・英検・IB・SAT 対応の完全1:1個別指導。¥14,000〜。入会金なし。Bilingual summer tutoring in Tokyo & online. From ¥14,000.',
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
  '/eiken': {
    title: 'EIKEN Prep in Sasazuka & Suginami | 英検対策 個別指導 | Petra Tutors',
    description: '1-on-1 EIKEN prep in Sasazuka, Suginami & online. Bilingual tutors for Grades Pre-2 to Grade 1. Free trial. No enrollment fee. 英検対策・個別指導・入会金なし。',
  },
  '/english': {
    title: 'English Tutor Tokyo | 英語家庭教師・英会話個別指導 | Petra Tutors',
    description: 'Bilingual English tutoring in Tokyo & online Japan. Conversation, writing, IELTS & business English. 1:1 lessons. No enrollment fee. 英会話・英語個別指導。入会金なし。',
  },
  '/ielts': {
    title: 'IELTS Tutor Tokyo | IELTS・英検・TOEIC 個別指導 | Petra Tutors',
    description: 'Expert 1-on-1 IELTS tutoring in Tokyo & online Japan. Bilingual tutors, avg +1.0 band improvement. No enrollment fee. IELTS・英検・TOEIC対策。入会金なし。',
  },
  '/ib': {
    title: 'IB Tutor Tokyo | IB・インター校 個別指導 | Petra Tutors',
    description: '1-on-1 IB tutoring in Tokyo & online Japan. IA, EE, TOK & all subjects. Bilingual mentors. No enrollment fee. IB・インター校サポート。DP・MYP・PYP対応。',
  },
  '/university': {
    title: 'University Admissions Tutor Japan | 海外大学・帰国子女入試サポート | Petra Tutors',
    description: 'Expert help with US/UK university applications from Japan. Personal Statement & interviews. Bilingual tutors. 海外大学受験・帰国子女入試サポート。東京・全国オンライン。',
  },
  '/kids': {
    title: 'Kids English Tutor Tokyo | 子供英語・英会話 個別指導 | Petra Tutors',
    description: 'Fun 1-on-1 English lessons for children in Tokyo & online Japan. Speaking, reading & writing. Bilingual tutors. No enrollment fee. 子供英語・英会話個別指導。入会金なし。',
  },
  '/foundation': {
    title: 'International School Tutor Tokyo | インター校・早期学習サポート | Petra Tutors',
    description: 'Foundation support for IB PYP, Key Stage & early MYP in Tokyo & online Japan. Bilingual tutors. インター校の基礎学力定着。入会金なし。東京対面・全国オンライン。',
  },
  '/business': {
    title: 'Business English Tutor Tokyo | ビジネス英語 個別コーチング | Petra Tutors',
    description: '1-on-1 business English coaching in Tokyo & online Japan. Meetings, presentations & emails. Results-driven. ビジネス英語個別コーチング。入会金なし。',
  },
  '/tutors': {
    title: 'Find a Bilingual Tutor | 講師一覧 | Petra Tutors',
    description: 'Meet our bilingual tutors from UTokyo, UCL, Keio & top universities worldwide. Specialists in IB, IELTS, EIKEN & university admissions. 東大・UCL・慶應など出身の精鋭講師陣。',
  },
  '/pricing': {
    title: 'Tutoring Prices | 入会金なし 料金プラン | Petra Tutors',
    description: '入会金なし・完全公開の料金体系。¥3,500〜の完全1:1個別指導。追加費用なし。No enrollment fee. Transparent pricing from ¥3,500. No hidden costs.',
  },
  '/about': {
    title: 'About Petra Tutors | バイリンガル個別指導 | 東京・オンライン',
    description: 'Petra Tutors のミッション・ビジョン・創業背景。帰国子女・国際教育・海外進学に特化したプレミアム個別指導。東京・全国オンライン対応。Premium bilingual tutoring in Tokyo & online.',
  },
  '/team': {
    title: 'Our Team | チーム紹介 | Petra Tutors',
    description: 'Petra Tutors の創業者・チームメンバーをご紹介。国際教育への想いと専門性をお伝えします。Meet the founders and team behind Petra Tutors.',
  },
  '/faq': {
    title: 'FAQ | よくある質問 | Petra Tutors',
    description: 'Petra Tutors に関するよくある質問と回答。料金・入会金・無料体験・マッチング・オンライン授業・講師変更など。Common questions about pricing, free trials, tutor matching, and online lessons.',
  },
  '/inquiry': {
    title: 'お問い合わせ・無料体験予約 | Petra Tutors',
    description: '無料体験レッスンのご予約・資料請求・お問い合わせはこちら。入会金なし、最短翌日マッチング。',
  },
  '/thank-you': {
    title: 'ありがとうございます | Petra Tutors',
    description: 'お問い合わせありがとうございます。担当者より2営業日以内にご連絡いたします。',
    robots: 'noindex, nofollow',
  },
  '/no-admission-fee': {
    title: 'No Enrollment Fee | 入会金なし・追加費用なし | Petra Tutors',
    description: 'Petra Tutors は入会金・登録料が一切かかりません。¥3,500〜の完全個別指導。追加費用なし、透明な料金体系。No enrollment fee, no hidden costs. Start with a free trial lesson.',
  },
  '/hiring': {
    title: 'Join Petra Tutors | Tutor Applications | 講師募集',
    description: 'We are looking for passionate bilingual tutors from top universities worldwide. Apply to join the Petra Tutors team. 東大・早慶・海外大出身の講師を募集中。',
  },
  '/keystone': {
    title: 'The Keystone | Petra Tutors',
    description: 'A digital publication for ambitious young writers. Publish essays and research under expert editorial mentorship.',
  },
  '/system': {
    title: 'The Petra Ecosystem | Petra Tutors',
    description: '長期的な成長、知的好奇心の探求、そしてグローバルな挑戦のために設計された、有機的につながる教育の世界。',
  },
  '/ecosystem': {
    title: 'The Petra Ecosystem | Petra Tutors',
    description: '長期的な成長、知的好奇心の探求、そしてグローバルな挑戦のために設計された、有機的につながる教育の世界。',
    robots: 'noindex, follow',
  },
  '/privacy': {
    title: 'プライバシーポリシー | Petra Tutors',
    description: 'Petra Tutors の個人情報取り扱い方針。',
  },
  '/apply/divisions': {
    title: 'Tutor Portal | Petra Tutors',
    description: 'Restricted access tutor portal.',
    robots: 'noindex, nofollow',
  },
  '/apply/progression': {
    title: 'Tutor Portal | Petra Tutors',
    description: 'Restricted access tutor portal.',
    robots: 'noindex, nofollow',
  },
};

// ── SSR render function (body content for non-JS crawlers) ────────────────
let ssrRender = null;
const ssrEntry = join(distSSR, 'entry-server.js');
if (existsSync(ssrEntry)) {
  try {
    const mod = await import(ssrEntry);
    ssrRender = mod.render;
    console.log('SSR bundle loaded — body content will be pre-rendered.\n');
  } catch (err) {
    console.warn(`SSR bundle import failed (head-only pre-render): ${err.message}\n`);
  }
} else {
  console.warn('dist-ssr/entry-server.js not found — head-only pre-render.\n');
}

// ── Build ──────────────────────────────────────────────────────────────────
const template = readFileSync(join(dist, 'index.html'), 'utf-8');

for (const [route, meta] of Object.entries(ROUTES)) {
  const canonicalUrl = `https://www.petratutors.com${route}`;
  const ogType = route === '/' ? 'website' : 'article';

  const headTags = [
    `  <meta name="description" content="${meta.description}" data-rh="true" />`,
    `  <meta property="og:title" content="${meta.title}" />`,
    `  <meta property="og:description" content="${meta.description}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:type" content="${ogType}" />`,
    `  <meta property="og:site_name" content="Petra Tutors" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${meta.title}" />`,
    `  <meta name="twitter:description" content="${meta.description}" />`,
    `  <meta property="og:image" content="https://www.petratutors.com/og-image.png" />`,
    `  <meta property="og:image:width" content="1200" />`,
    `  <meta property="og:image:height" content="630" />`,
    `  <meta name="twitter:image" content="https://www.petratutors.com/og-image.png" />`,
    `  <link rel="canonical" href="${canonicalUrl}" data-rh="true" />`,
  ];

  if (meta.robots) {
    headTags.push(`  <meta name="robots" content="${meta.robots}" />`);
  }

  if (meta.jsonLd) {
    headTags.push(
      `  <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    );
  }

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace('</head>', `${headTags.join('\n')}\n</head>`);

  // Inject SSR body content into the React root
  if (ssrRender) {
    try {
      const { html: bodyHtml } = ssrRender(route);
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
    } catch (err) {
      console.warn(`  SSR render failed for ${route}: ${err.message}`);
    }
  }

  const routeSegment = route === '/' ? '' : route.replace(/^\//, '');
  const dir = routeSegment ? join(dist, routeSegment) : dist;

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf-8');

  console.log(`  prerendered: ${route}`);
}

// Clean up SSR build artefacts
if (existsSync(distSSR)) rmSync(distSSR, { recursive: true, force: true });

console.log(`\nDone — ${Object.keys(ROUTES).length} routes pre-rendered.`);
