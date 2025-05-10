import type { RequestHandler } from '@builder.io/qwik-city';
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
    `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Emilien Jegou, Fullstack engineer blog</title>
  <link>https://emje.dev</link>
  <description>My personal blog, where I talk about the technology I love, explore new areas and share my programming knowledge.</description>
  <language>en-us</language>
  <pubDate>${(new Date(sortedArticles[0].createdAt) as any).toGMTString()}</pubDate>
  <docs>https://emje.dev/rss</docs>
  <generator>emje.dev</generator>

  ${sortedArticles
    .map(
      (article) => `
  <item>
    <title>${article.title}</title>
    <link>https://emje.dev/blog/${article.slug}</link>
    <description>${article.description}</description>
    <pubDate>${(new Date(article.createdAt) as any).toGMTString()}</pubDate>
    <guid>https://emje.dev/blog/${article.slug}</guid>
  </item>
  `,
    )
    .join('\n')}

</channel>
</rss>`,
  );
};
