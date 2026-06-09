import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const BASE_KEYWORDS = 'ペトラエデュケーション合同会社, ペトラエデュケーション, Petra Education LLC, Petra Tutors, Petra Education, International Tutoring, IB Tutoring, IELTS Coaching, Academic Mentorship, Top University Admissions, プレミアム家庭教師, 国際教育, 進学コンサルティング, オンライン家庭教師';

export default function SEO({ title, description, name = 'Petra Tutors', type = 'website', path = '', keywords = '', jsonLdExtra = null }) {
  const { t } = useTranslation();
  const url = `https://www.petratutors.com${path}`;
  const allKeywords = keywords ? `${keywords}, ${BASE_KEYWORDS}` : BASE_KEYWORDS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Petra Tutors",
    "alternateName": ["ペトラエデュケーション", "ペトラエデュケーション合同会社", "Petra Education LLC"],
    "legalName": "ペトラエデュケーション合同会社",
    "url": "https://www.petratutors.com",
    "logo": "https://www.petratutors.com/logo.png",
    "description": t('seo.jsonld_desc', 'Petra Tutors is an online tutoring service specialising in IB, IELTS, and international university admissions.')
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags for social media sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Page-specific JSON-LD (e.g. Course, Event) */}
      {jsonLdExtra && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLdExtra)}
        </script>
      )}
    </Helmet>
  );
}
