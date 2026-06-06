/**
 * JSON-LD Structured Data helpers
 * Generates schema.org structured data objects for SEO.
 */

import { SITE_NAME, SITE_URL } from "./constants";

/* ------------------------------------------------------------------ */
/*  WebSite schema                                                     */
/* ------------------------------------------------------------------ */

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/kb/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  TechArticle schema                                                 */
/* ------------------------------------------------------------------ */

interface ArticleInput {
  title: string;
  description?: string;
  date?: string;
  permalink: string;
}

export function generateArticleSchema(post: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description ?? "",
    datePublished: post.date ?? "",
    url: `${SITE_URL}${post.permalink}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList schema                                              */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
