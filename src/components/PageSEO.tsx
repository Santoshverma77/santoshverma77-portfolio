import { Helmet } from "react-helmet-async";

const SITE_URL = "https://santoshverma.online";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
}

/**
 * Per-route head metadata. Googlebot executes JS, so Helmet-set
 * title/description/canonical are picked up per page.
 */
const PageSEO = ({ title, description, path }: PageSEOProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageSEO;
