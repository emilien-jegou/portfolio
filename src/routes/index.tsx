import { $, component$, useSignal } from '@builder.io/qwik';
import articles from '~/generated/blog-data.json';
import { Button } from '~/ui/common/button';
import { CatButton } from '~/ui/common/cat-button';
import { ReachOutForm } from '~/ui/forms/reach-out-form';
import { BlogCard } from '~/ui/layout/blog-card';
import { FooterBar } from '~/ui/layout/footer-bar';
import { HeaderBar } from '~/ui/layout/header-bar';
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

export default component$(() => {
  const reachOutModalVisible = useSignal(false);

  return (
    <>
      <HeaderBar />
      <main class="mt-24 sm:mt-36 mx-auto custom-container">
        <h1 class="text-3xl sm:text-4xl font-extrabold">Hi There,</h1>
        <p class="text-subtle leading-7 mt-4 sm:mt-6 ">
          My name is Emilien, I'm a French fullstack developer from Brittany france, mainly
          programming in node.js & rust. I love discovering new things, so I started this blog, hope
          you find it interesting!
        </p>
        <div class="flex items-center gap-6 mt-4 sm:mt-6">
          <Button
            onClick$={$((): void => {
              reachOutModalVisible.value = true;
            })}
          >
            <span>Reach out</span>
            <span class="text-[16px]">✉️</span>
          </Button>
          <CatButton />
          <ReachOutForm bind:show={reachOutModalVisible} />
          {/*<a class="flex items-center gap-1 text-sm font-medium hover:underline" href="#blog">
            <span>Discover my blog</span>
            <ArrowDownIcon size="lg" class="mt-[1px]" />
          </a>*/}
        </div>
      </main>
      <section class="custom-container mx-auto mt-24 sm:mt-36" id="blog">
        <h2 class="text-lg text-subtler">Latest posts</h2>
        <div class="flex flex-col gap-12 gap-20 my-12">
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
      </section>
      <FooterBar />
    </>
  );
});

export const head: DocumentHead = buildHead({
  title: 'Emilien Jegou, Fullstack engineer blog',
  description:
    'My personal blog, where I talk about the technology I love, explore new areas and share my programming knowledge.',
  shareImage: '/share.png',
});
