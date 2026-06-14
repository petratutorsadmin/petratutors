import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SEO({ title, description, name = 'Petra Tutors', type = 'website', path = '', jsonLdExtra = null, suppressDefaultJsonLd = false, articleMeta = null }) {
  const { t } = useTranslation();
  const url = `https://www.petratutors.com${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Petra Tutors",
    "alternateName": ["ペトラエデュケーション", "ペトラエデュケーション合同会社", "Petra Education LLC"],
    "legalName": "ペトラエデュケーション合同会社",
    "url": "https://www.petratutors.com",
    "logo": "https://www.petratutors.com/logo.png",
    "description": description || t('seo.jsonld_desc', 'Petra Tutors is an online tutoring service specialising in IB, IELTS, and international university admissions.')
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags for social media sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content="https://www.petratutors.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && articleMeta?.publishedTime && (
        <meta property="article:published_time" content={articleMeta.publishedTime} />
      )}
      {type === 'article' && articleMeta?.author && (
        <meta property="article:author" content={articleMeta.author} />
      )}
      {type === 'article' && articleMeta?.section && (
        <meta property="article:section" content={articleMeta.section} />
      )}

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.petratutors.com/og-image.png" />

      {/* JSON-LD Structured Data */}
      {!suppressDefaultJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* Page-specific JSON-LD (e.g. Course, Event) */}
      {jsonLdExtra && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLdExtra)}
        </script>
      )}
    </Helmet>
  );
}
