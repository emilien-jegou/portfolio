import { component$ } from '@builder.io/qwik';
import articles from '~/generated/blog-data.json';
import { Button } from '~/ui/common/button';
import { ArrowDownIcon } from '~/ui/icons/arrow-down';
import { BlogCard } from '~/ui/layout/blog-card';
import { FooterBar } from '~/ui/layout/footer-bar';
import { HeaderBar } from '~/ui/layout/header-bar';
import type { DocumentHead } from '@builder.io/qwik-city';

type Article = {
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: number;
};

const sortedArticles: Article[] = Object.entries(articles)
  .map(([slug, { data }]: any) => ({ slug, ...data }))
  .sort((a: any, b: any) => b.createdAt - a.createdAt);

export default component$(() => {
  return (
    <>
      <HeaderBar />
      <main class="mt-24 sm:mt-36 mx-auto custom-container">
        <h1 class="text-3xl sm:text-4xl font-extrabold">Hi There,</h1>
        <p class="text-subtle leading-7 mt-4 sm:mt-6 ">
          I'm a French software engineer with over 3 years in full-stack development and an IT
          Master's from Epitech. I love discovering new things, so I started this blog, hope you
          find it interesting!
        </p>
        <div class="flex items-center gap-6 mt-4 sm:mt-6">
          <Button>
            <span>Reach out</span>
            <span class="text-[16px]">✉️</span>
          </Button>
          <a class="flex items-center gap-1 text-sm font-medium hover:underline" href="#blog">
            <span>Discover my blog</span>
            <ArrowDownIcon size="lg" class="mt-[1px]" />
          </a>
        </div>
      </main>
      <section class="custom-container mx-auto mt-24 sm:mt-36" id="blog">
        <h2 class="text-lg text-subtler">Latest posts</h2>
        <div class="flex flex-col gap-20 my-12">
          {sortedArticles.map((data, idx) => (
            <BlogCard
              key={idx}
              slug={`/blog/${data.slug}`}
              title={data.title}
              description={data.description}
              imageUrl={data.imageUrl}
              date={new Date(data.createdAt)}
            />
          ))}
        </div>
      </section>
      <FooterBar />
    </>
  );
});

export const head: DocumentHead = {
  title: 'emje.dev',
  meta: [
    {
      name: 'description',
      content:
        'Welcome to my personal programming blog where you can explore the web technologies that power my site. Dive into my setup, journey through my development experiences.',
    },
  ],
};
