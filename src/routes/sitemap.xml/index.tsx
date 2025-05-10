import type { RequestHandler } from '@builder.io/qwik-city';
import { differenceInMonths } from 'date-fns';
import articles from '~/generated/blog-data.json';

type Article = {
  slug: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  createdAt: number;
};

const sortedArticles: Article[] = Object.entries(articles)
  .map(([slug, { data }]: any) => ({ slug, ...data }))
  .sort((a: any, b: any) => b.createdAt - a.createdAt);

export const onGet: RequestHandler = async (e) => {
  e.send(
    200,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://emje.dev/</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://emje.dev/rss.xml</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
   </url>
  ${sortedArticles.map(
    (article) => `
   <url>
      <loc>https://emje.dev/blog/${article.slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>${Math.max(0.6, 1 - differenceInMonths(new Date(), new Date(article.createdAt)) / 10)}</priority>
   </url>`,
  )}
</urlset>`,
  );
};
