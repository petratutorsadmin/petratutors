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
    title: '英語・IB・海外進学のバイリンガル家庭教師 | 東京・全国オンライン | Petra Tutors',
    description: '東京・全国オンライン対応。英語・IB・IELTS・帰国子女・海外進学に強いバイリンガル個別指導。完全1:1、入会金なし。無料体験レッスンあり。',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Petra Tutors',
      alternateName: ['ペトラエデュケーション合同会社', 'Petra Education LLC'],
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
      ],
      priceRange: '¥3,500〜',
      description: '東京・全国オンライン対応のバイリンガル個別指導。英語・IB・IELTS・帰国子女・海外進学対応。',
      sameAs: [
        'https://www.instagram.com/petratutors',
        'https://www.linkedin.com/company/petra-education-llc',
      ],
    },
  },
  '/home': {
    title: '英語・IB・海外進学のバイリンガル家庭教師 | 東京・全国オンライン | Petra Tutors',
    description: '東京・全国オンライン対応。英語・IB・IELTS・帰国子女・海外進学に強いバイリンガル個別指導。完全1:1、入会金なし。無料体験レッスンあり。',
    robots: 'noindex, follow',
  },
  '/summer': {
    title: 'Petra Tutors 夏期講習 2026 | 個別集中レッスン',
    description: 'Petra Tutors の夏期講習 2026。7月21日〜8月29日。英語・英検・IB・SAT 対応。完全 1:1 マンツーマン。¥14,000〜。無料体験レッスンあり。',
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
  },
  '/ielts': {
    title: 'IELTS・英検・TOEIC 個別指導 | 東京・全国オンライン | Petra Tutors',
    description: '東京・全国オンライン対応のIELTS・英検・TOEIC対策。スコアが伸び悩む原因を特定し、目標スコア達成への最短ルートを完全1:1で設計。入会金なし。',
  },
  '/ib': {
    title: 'IB・インター校 個別指導 | IA・EE・TOK対応 | Petra Tutors',
    description: '東京・全国オンライン対応のIB・インター校サポート。DP・MYP・PYPに対応。IA・EE・TOK・全科目をバイリンガルメンターが完全1:1で指導。入会金なし。',
  },
  '/university': {
    title: '海外大学・帰国子女入試サポート | Petra Tutors',
    description: '海外大学への出願戦略・Personal Statement・面接対策から帰国子女入試まで。志望校合格に向けた完全個別コンサルティング。',
  },
  '/kids': {
    title: '子供英語・英会話 個別指導 | Petra Tutors',
    description: '楽しく英語の基礎を作る。英会話・読み書き・発音まで、お子様のペースに合わせた完全個別レッスン。入会金なし。',
  },
  '/foundation': {
    title: 'インター校・早期学習サポート | Petra Tutors',
    description: 'IB PYP・キーステージ・早期 MYP に対応。インター校の基礎学力を確実に定着させる完全個別指導。入会金なし。',
  },
  '/business': {
    title: 'ビジネス英語 個別コーチング | Petra Tutors',
    description: '会議・メール・プレゼン・商談対応のビジネス英語。実務直結の完全個別コーチングで、英語を仕事の武器に変える。',
  },
  '/tutors': {
    title: '講師一覧 | Petra Tutors',
    description: '東大・UCL・慶應など国内外トップ大学出身の講師陣。専門分野・指導スタイル・対応年齢を公開中。',
  },
  '/pricing': {
    title: '料金プラン | Petra Tutors',
    description: '入会金なし・完全公開の料金体系。¥3,500〜の完全個別指導。追加費用なし。',
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
  '/thank-you': {
    title: 'ありがとうございます | Petra Tutors',
    description: 'お問い合わせありがとうございます。担当者より2営業日以内にご連絡いたします。',
    robots: 'noindex, nofollow',
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
    .replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${meta.description}" />`)
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
