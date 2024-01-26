import { component$, Slot } from '@builder.io/qwik';
import { Link, useDocumentHead } from '@builder.io/qwik-city';
import { format } from 'date-fns';
import { ArrowLeftIcon } from '~/ui/icons/arrow-left';
import { FooterBar } from '~/ui/layout/footer-bar';
import type { DocumentHead } from '@builder.io/qwik-city';

import './mdx.css';
import './prism-theme-dark.css';
import { BlogSeparator } from '~/ui/common/blog-separator';

export default component$(() => {
  const {
    frontmatter: { data },
  } = useDocumentHead();

  return (
    <>
      <Link
        class="absolute xl:fixed top-4 left-4 gap-1 font-semibold text-default text-sm underline flex items-center"
        href="/"
      >
        <ArrowLeftIcon /> Go back home
      </Link>
      <main class="relative mt-24 mx-auto custom-container">
        <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
          {data.title}
        </h1>
        <p class="text-subtler mt-4 sm:mt-6">
          Emilien Jegou, {format(data.createdAt, 'EEE MMMM dd yyyy')}
        </p>
      </main>
      <section class="mdx mt-8 custom-container mx-auto">
        <Slot />
        <BlogSeparator />
      </section>
      <FooterBar />
    </>
  );
});

export const head: DocumentHead = ({
  head: {
    frontmatter: { data },
  },
}: any) => ({
  title: `${data.title} - emje.dev`,
  description: data.description,
  og: {
    title: `${data.title} - emje.dev`,
    description: data.description,
    image: data.imageUrl,
  },
});
