import { BUSINESS_INFO } from "../data/businessInfo";

/**
 * SEO head for a page — rendered inside the page component; React 19 hoists
 * <title>, <meta> and <link> into the document head. Includes Open Graph,
 * Twitter and Organization JSON-LD (verified details only).
 */
export default function SEO({ title, description, canonical, ogImage }) {
  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="author" content="Hi-Fi Diagnostic" />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index,follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Hi-Fi Diagnostic" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: BUSINESS_INFO.companyName,
            url: canonical,
            description: BUSINESS_INFO.businessCategory,
          }),
        }}
      />
    </>
  );
}
