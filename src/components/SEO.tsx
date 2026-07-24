import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  /** Absolute or root-relative URL of the LCP-critical image for this page.
   *  Adds <link rel="preload" as="image"> so the browser can fetch it in
   *  parallel with JS. Use sparingly — only for genuine above-the-fold
   *  images that you want to drive LCP. */
  preloadImage?: string;
}

const BASE_URL = 'https://lumifin.io';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/preview/og-wa.jpg`;

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  structuredData,
  preloadImage,
}: SEOProps) {
  const fullTitle = title.includes('Lumifin') ? title : `${title} | Lumifin`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  // Always emit an absolute og:image URL. Blog pages pass a root-relative path
  // (e.g. "/assets/blog/…"); social and crawler previews require absolute URLs.
  const rawImage = ogImage || DEFAULT_OG_IMAGE;
  const image = rawImage.startsWith('http') ? rawImage : `${BASE_URL}${rawImage}`;

  const schemaArray = Array.isArray(structuredData)
    ? structuredData
    : structuredData
    ? [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {preloadImage && <link rel="preload" as="image" href={preloadImage} fetchPriority="high" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Hreflang — same URL structure for both languages.
          NOTE: react-helmet-async does not process Fragments (<>...</>) inside
          <Helmet>. The three <link> tags must be flat children, otherwise
          Helmet silently drops them. */}
      {canonicalUrl && <link rel="alternate" hrefLang="en" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="fr" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />}

      {/* Structured Data */}
      {schemaArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Reusable structured data generators
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lumifin',
  alternateName: 'LumiFin SAS',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'European fintech enabling seamless QR payments for travellers in Southeast Asia.',
  foundingDate: '2025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '50 rue Anatole France',
    addressLocality: 'Chatenay-Malabry',
    postalCode: '92290',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.linkedin.com/company/lumifin1/',
    'https://www.instagram.com/lumifin.io/',
    'https://www.facebook.com/profile.php?id=61590998865526',
    'https://x.com/getlumifin',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lumifin',
  url: BASE_URL,
};

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lumi',
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Mobile Payment',
  operatingSystem: 'iOS, Android',
  description:
    'Mobile payment app for European travellers in Southeast Asia. Pay at any local merchant by scanning their QR code (PromptPay, VietQR, QRIS) directly from a EUR account. A single 2% flat fee, with no FX markup and no other charges. Live in beta in Vietnam, with Thailand and Indonesia coming soon.',
  url: BASE_URL,
  publisher: {
    '@type': 'Organization',
    name: 'Lumifin',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/LimitedAvailability',
    description: 'Free to download. Transactions carry a single 2% flat fee, with no FX markup and no other charges. Currently in beta in Vietnam.',
  },
  inLanguage: ['fr', 'en'],
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  url,
  image,
  author,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}${url}`,
    image: `${BASE_URL}${image}`,
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'Lumifin',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    datePublished,
    dateModified: datePublished,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
