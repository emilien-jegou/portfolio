import { component$, Slot } from '@builder.io/qwik';
import { useContent, useDocumentHead } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { format } from 'date-fns';
import { TableOfContents } from '~/ui/common/table-of-contents';
import { PageLayout } from '~/ui/layout/page-layout';
import { buildHead } from '~/utils/build-head';

import './mdx.css';
import './prism-theme-dark.css';

export default component$(() => {
  const {
    frontmatter: { data },
  } = useDocumentHead();

  const { headings } = useContent();

  return (
    <PageLayout>
      <TableOfContents headings={headings ?? []} />
      <main id="intro" class="custom-container mx-auto relative mt-24">
        <div class="absolute w-[105%] h-[160%] top-0 z-[-1] left-1/2 -translate-x-1/2 -translate-y-[16px] bg-paper opacity-[0.4] pointer-events-none" />
        <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
          {data.title}
        </h1>
        <p class="text-graphite mt-4 sm:mt-6">
          Emilien Jegou, {format(data.createdAt, 'EEE MMMM dd yyyy')}
        </p>
      </main>
      <section class="mdx">
        <Slot />
      </section>
    </PageLayout>
  );
});

export const head: DocumentHead = ({
  head: {
    frontmatter: { data },
  },
}: any) =>
  buildHead({
    title: data.title,
    description: data.description,
    shareImage: data.shareImageUrl,
  });
