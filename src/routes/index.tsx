import { component$ } from '@builder.io/qwik';
import { subDays } from 'date-fns';
import articles from '~/generated/blog-data';
import { Button } from '~/ui/common/button';
import { ArrowDownIcon } from '~/ui/icons/arrow-down';
import { BlogCard } from '~/ui/layout/blog-card';
import { HeaderBar } from '~/ui/layout/header-bar';
import type { DocumentHead } from '@builder.io/qwik-city';

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
          {Object.entries(articles).map(([slug, { article }]: any, idx) => (
            <BlogCard
              key={idx}
              slug={`/blog/${slug}`}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              date={subDays(new Date(), 5)}
            />
          ))}
        </div>
      </section>
      <footer class="mt-24 mb-4 text-center text-subtler text-sm">
        <p>Copyright (c) Emilien Jegou</p>
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
