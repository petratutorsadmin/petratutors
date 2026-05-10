import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name = 'Petra Tutors', type = 'website', path = '' }) {
  const url = `https://www.petratutors.com${path}`;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Petra Tutors",
    "url": "https://www.petratutors.com",
    "logo": "https://www.petratutors.com/logo.png",
    "description": "Petra Tutors is an online tutoring service specializing in IB, IELTS, and international university admissions."
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
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
