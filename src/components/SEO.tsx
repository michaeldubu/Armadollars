import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogImage }) => (
  <Head>
    <title>{title} | Andy's Armadollars</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="Sabby's Armadollars" />
    {ogImage && <meta property="og:image" content={ogImage} />}
    {canonical && <link rel="canonical" href={canonical} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}
  </Head>
)

export default SEO
