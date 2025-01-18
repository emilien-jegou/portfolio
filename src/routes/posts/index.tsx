import articles from '~/generated/blog-data.json';
import { BlogCard } from '~/ui/layout/blog-card';
import { PageLayout } from '~/ui/layout/page-layout';
import { buildHead } from '~/utils/build-head';
import type { DocumentHead } from '@builder.io/qwik-city';

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

export default () => (
  <PageLayout>
    <main id="intro" class="relative mt-24 mb-12">
      <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
        All my posts
      </h1>
    </main>
    <div class="flex flex-col gap-12 gap-20">
      {sortedArticles.map((data, idx) => (
        <BlogCard
          key={idx}
          slug={`/blog/${data.slug}`}
          title={data.title}
          description={data.description}
          thumbnailUrl={data.thumbnailUrl}
          date={new Date(data.createdAt)}
        />
      ))}
    </div>
  </PageLayout>
);

export const head: DocumentHead = buildHead({
  title: 'Emilien Jegou, Fullstack engineer blog',
  description:
    'My personal blog, where I talk about the technology I love, explore new areas and share my programming knowledge.',
  shareImage: '/share.png',
});
