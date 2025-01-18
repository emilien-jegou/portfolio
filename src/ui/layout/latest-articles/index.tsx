import { component$ } from '@builder.io/qwik';
import { ArrowRightIcon } from '~/ui/icons/arrow-right';
import { cn } from '~/utils/cn';
import { BlogCard } from '../blog-card';

export type Article = {
  slug: string;
  title: string;
  thumbnailUrl: string;
  coverUrl?: string;
  description: string;
  createdAt: number;
};

export type LatestArticlesProps = {
  class?: string;
  latestArticles: Article[];
};

export const LatestArticles = component$((props: LatestArticlesProps) => {
  return (
    <section
      class={cn(
        'relative rounded-md border border-subtler bg-default h-full py-4 px-6',
        props.class,
      )}
    >
      <div class="flex justify-between">
        <h4 class="text-base font-semibold">Latest posts</h4>
        <a
          href="/posts"
          class="hidden sm:flex gap-2 bg-subtle hover:bg-subtler hover:ring-1 ring-border-default items-center px-5 py-1 text-sm font-medium rounded-full"
        >
          <span>see all my posts</span>
          <ArrowRightIcon class="mt-1" />
        </a>
      </div>
      <div class="flex flex-col mt-6 gap-8 overflow-auto">
        {props.latestArticles.map((data, idx) => (
          <BlogCard
            class={cn(idx === 2 && 'block lg:hidden xl:block')}
            key={idx}
            slug={`/blog/${data.slug}`}
            title={data.title}
            description={data.description}
            thumbnailUrl={data.thumbnailUrl}
            date={new Date(data.createdAt)}
          />
        ))}
      </div>
      <a
        href="/posts"
        class="flex w-full justify-center mt-4 sm:hidden gap-2 bg-subtle hover:bg-subtler hover:ring-1 ring-border-default items-center px-5 py-1 text-sm font-medium rounded-full"
      >
        <span>see all my posts</span>
        <ArrowRightIcon class="mt-1" />
      </a>
    </section>
  );
});
