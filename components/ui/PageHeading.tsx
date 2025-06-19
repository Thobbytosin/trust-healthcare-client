import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
}

const PageHeading: FC<HeadProps> = ({
  title = "Trust HealthCare",
  description,
  keywords = "default, keywords, here",
  author = "Falode Tobi",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = "summary_large_image",
}) => {
  return (
    <>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Open Graph (OG) - For Facebook & LinkedIn */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || "/logo.png"} />
      <meta property="og:url" content={ogUrl || window.location.href} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || "/logo.png"} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/logo.png" />
    </>
  );
};

export default PageHeading;
