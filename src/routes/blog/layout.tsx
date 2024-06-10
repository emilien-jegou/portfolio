import { component$, Slot } from '@builder.io/qwik';
import { useContent, useDocumentHead } from '@builder.io/qwik-city';
import { format } from 'date-fns';
import { TableOfContents } from '~/ui/common/table-of-contents';
import { ArrowLeftIcon } from '~/ui/icons/arrow-left';
import { FooterBar } from '~/ui/layout/footer-bar';
import { buildHead } from '~/utils/build-head';
import type { DocumentHead } from '@builder.io/qwik-city';

import './mdx.css';
import './prism-theme-dark.css';

export default component$(() => {
  const {
    frontmatter: { data },
  } = useDocumentHead();

  const { headings } = useContent();

  return (
    <>
      <a
        class="absolute xl:fixed top-4 left-4 gap-1 font-semibold text-default text-sm underline flex items-center"
        href="/"
      >
        <ArrowLeftIcon /> Go back home
      </a>
      <div class="relative mx-auto custom-container">
        <TableOfContents headings={headings ?? []} />
        <main id="intro" class="relative mt-24">
          <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
            {data.title}
          </h1>
          <p class="text-subtler mt-4 sm:mt-6">
            Emilien Jegou, {format(data.createdAt, 'EEE MMMM dd yyyy')}
          </p>
        </main>
        <section class="mdx my-8 mb-32">
          <Slot />
        </section>
      </div>
      <FooterBar />
    </>
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
