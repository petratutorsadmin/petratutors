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

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, appendFileSync } from 'fs';
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
  '/blog': {
    title: 'Petra Insights | English, IB & IELTS Guides',
    description: 'Expert guides on IELTS, IB, English tutoring, university admissions and kids English — by Petra Tutors, Tokyo.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Petra Insights',
      description: 'Expert guides on IELTS, IB, English tutoring, university admissions and kids English.',
      url: 'https://www.petratutors.com/blog',
      publisher: {
        '@type': 'Organization',
        name: 'Petra Tutors',
        logo: { '@type': 'ImageObject', url: 'https://www.petratutors.com/logo.png' },
      },
      inLanguage: ['en', 'ja'],
    },
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
  '/eiken-pre2': {
    title: '英検準2級 個別指導 オンライン | 合格特化の1:1対策 | Petra Tutors',
    description: '英検準2級に特化した完全1:1個別指導。語彙・リーディング・英作文（Eメール）・面接まで対応。オンライン全国対応。入会金なし。無料30分体験レッスンあり。',
  },
  '/eiken-interview': {
    title: '英検2級 面接対策 オンライン | 個別指導で二次試験を突破 | Petra Tutors',
    description: '英検2級の二次試験（スピーキング）に特化した個別指導。バイリンガル講師と模擬面接を繰り返し、本番で自信を持って話せるように仕上げます。オンライン全国対応。入会金なし。',
  },
  '/ielts-writing': {
    title: 'IELTS Writing 個別指導 | Task 1・Task 2 バンドスコアアップ | Petra Tutors',
    description: 'IELTSライティング（Task 1・Task 2）に特化した完全1:1個別指導。バイリンガル講師が毎回フルエッセイを添削。バンド6.0→7.0以上を目指す実践コース。オンライン全国対応。入会金なし。',
  },
  '/ib-ia-ee-tok': {
    title: 'IB IA・EE・TOK 個別サポート 東京 | インター校生向け | Petra Tutors',
    description: 'IB内部評価（IA）・課題論文（EE）・TOK（知識の理論）エッセイに特化した個別指導。東京・全国オンライン対応。IB DP経験のバイリンガル講師がRQ設定から最終提出まで伴走。入会金なし。',
  },
  '/international-school-tutor': {
    title: 'インターナショナルスクール 家庭教師 東京 | IB・英語科目 個別指導 | Petra Tutors',
    description: '東京のインターナショナルスクール生向けの家庭教師サービス。IB DP/MYP/PYP・英語で学ぶ数学・科学・英語科目を個別サポート。バイリンガル講師が全科目に対応。入会金なし。',
  },
  '/returnee-english': {
    title: '帰国子女 英語 家庭教師 東京 | 英語力維持・帰国受験対策 | Petra Tutors',
    description: '帰国子女の英語力維持・強化・帰国受験対策に特化した個別指導。海外在住経験のあるバイリンガル講師が担当。英語を忘れさせない継続学習プランを提案。東京・全国オンライン対応。入会金なし。',
  },
  '/kids-english-primary': {
    title: '小学生 英語 苦手 個別指導 | 楽しく学べる1:1英語レッスン | Petra Tutors',
    description: '英語が苦手な小学生向けの完全1:1個別指導。フォニックス・基礎英語・英会話を楽しく丁寧に指導。嫌いにならない学び方を優先。東京・全国オンライン対応。入会金なし。無料体験あり。',
  },
  '/setagaya-english': {
    title: '世田谷区 英語家庭教師 | 英検・IELTS・IB対応 個別指導 | Petra Tutors',
    description: '世田谷区の英語個別指導。英検・IELTS・IB・小学生英語まで対応のバイリンガル1:1家庭教師。入会金なし。オンラインまたは出張対応。無料30分体験レッスンあり。',
  },
  '/shibuya-english': {
    title: '渋谷区 英語家庭教師 | 英検・IELTS・IB対応 個別指導 | Petra Tutors',
    description: '渋谷区・代官山・恵比寿エリアの英語個別指導。英検・IELTS・IB対応のバイリンガル1:1家庭教師。入会金なし。オンライン対応。無料30分体験レッスンあり。',
  },
  '/suginami-english': {
    title: '杉並区 英語家庭教師 | 笹塚・方南町 対面・オンライン個別指導 | Petra Tutors',
    description: '杉並区・笹塚・方南町の英語個別指導。対面授業あり。英検・IELTS・IB・小学生英語対応のバイリンガル1:1家庭教師。入会金なし。無料30分体験レッスンあり。',
  },
};

// ── Fetch published blog posts and add pre-render routes ──────────────────
{
  const token = process.env.VITE_AIRTABLE_TOKEN;
  if (token) {
    try {
      const res = await fetch(
        'https://api.airtable.com/v0/appAdxLhXqRtaq618/tbl7H4ONJWNAPqOP0?' +
        'fields[]=Slug&fields[]=Title%20EN&fields[]=Excerpt%20EN' +
        '&fields[]=Published%20At&fields[]=Author&fields[]=Category',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { records } = await res.json();
      // Collect new blog post URLs to inject into the sitemap
      const newSitemapEntries = [];
      let added = 0;
      for (const { fields: f } of (records || [])) {
        if (!f['Slug'] || !f['Title EN']) continue;
        const slug = f['Slug'];
        const postUrl = `https://www.petratutors.com/blog/${slug}`;
        const lastmod = f['Published At'] ? f['Published At'].slice(0, 10) : '2026-06-14';
        newSitemapEntries.push(
          `  <url>\n    <loc>${postUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
        );
        ROUTES[`/blog/${slug}`] = {
          title: `${f['Title EN']} | Petra Insights`,
          description: f['Excerpt EN'] || '',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: f['Title EN'],
            description: f['Excerpt EN'] || '',
            author: { '@type': 'Person', name: f['Author'] || 'Petra Tutors' },
            publisher: {
              '@type': 'Organization',
              name: 'Petra Tutors',
              logo: { '@type': 'ImageObject', url: 'https://www.petratutors.com/logo.png' },
            },
            datePublished: f['Published At'],
            url: postUrl,
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
            articleSection: f['Category'],
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.petratutors.com' },
                { '@type': 'ListItem', position: 2, name: 'Petra Insights', item: 'https://www.petratutors.com/blog' },
                { '@type': 'ListItem', position: 3, name: f['Title EN'], item: postUrl },
              ],
            },
          },
        };
        added++;
      }
      // Inject blog post URLs into dist/sitemap.xml
      const sitemapPath = join(dist, 'sitemap.xml');
      if (existsSync(sitemapPath) && newSitemapEntries.length > 0) {
        let sitemap = readFileSync(sitemapPath, 'utf-8');
        // Only inject entries not already present
        const toInject = newSitemapEntries.filter(e => !sitemap.includes(e.match(/<loc>(.*?)<\/loc>/)?.[1] ?? ''));
        if (toInject.length > 0) {
          sitemap = sitemap.replace('</urlset>', `${toInject.join('\n')}\n</urlset>`);
          writeFileSync(sitemapPath, sitemap, 'utf-8');
          console.log(`  Injected ${toInject.length} blog post URL(s) into sitemap.xml.\n`);
        }
      }
      console.log(`  Pre-rendering ${added} blog post(s) from Airtable.\n`);
    } catch (err) {
      console.warn(`  Blog post fetch failed (skipping post pre-render): ${err.message}\n`);
    }
  } else {
    console.warn('  VITE_AIRTABLE_TOKEN not set — blog posts will not be pre-rendered.\n');
  }
}

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
