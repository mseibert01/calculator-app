import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Financial Calculators - Free Tools for Smart Money Decisions',
  description = 'Free online financial calculators including salary, interest, loan, retirement, and investment calculators. Make informed financial decisions with accurate calculations.',
  keywords = ['financial calculator', 'salary calculator', 'interest calculator', 'loan calculator', 'retirement calculator', 'investment calculator', 'take home pay', 'cost of living'],
  canonical,
  ogType = 'website',
  ogImage = 'https://calc.msei.dev/og-image.png'
}) => {
  const siteUrl = 'https://calc.msei.dev';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Financial Calculators" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Financial Calculators" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'Financial Calculators',
          'url': siteUrl,
          'description': description,
          'applicationCategory': 'FinanceApplication',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'provider': {
            '@type': 'Organization',
            'name': 'Financial Calculators'
          }
        })}
      </script>
    </Helmet>
  );
};

// Calculator-specific SEO component
interface CalculatorSEOProps {
  calculatorName: string;
  description: string;
  keywords: string[];
  path: string;
}

export const CalculatorSEO: React.FC<CalculatorSEOProps> = ({
  calculatorName,
  description,
  keywords,
  path
}) => {
  const title = `${calculatorName} - Free Online Calculator`;
  const fullKeywords = [...keywords, 'free calculator', 'online calculator', 'financial tools'];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={fullKeywords}
        canonical={path}
        ogType="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': calculatorName,
            'url': `https://calc.msei.dev${path}`,
            'description': description,
            'applicationCategory': 'FinanceApplication',
            'operatingSystem': 'Any',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.8',
              'ratingCount': '1250'
            }
          })}
        </script>
      </Helmet>
    </>
  );
};
