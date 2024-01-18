import { component$, Slot } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';
import { format } from 'date-fns';
import { FooterBar } from '~/ui/layout/footer-bar';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';

import './mdx.css';

export default component$(() => {
  const {
    frontmatter: { data },
  } = useDocumentHead();

  return (
    <>
      <main class="mt-24 mx-auto custom-container">
        <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
          {data.title}
        </h1>
        <p class="text-subtler mt-4 sm:mt-6">
          Emilien Jegou, {format(data.createdAt, 'EEE MMMM dd yyyy')}
        </p>
        <p class="text-subtle leading-7 mt-4 sm:mt-6 ">{data.description}</p>
        <img
          alt="article cover"
          class="block w-full rounded-lg mt-6 shadow-sm h-[160px] object-cover"
          src={data.imageUrl}
          width={640}
          height={142}
        />
      </main>
      <section class="mdx custom-container mx-auto">
        <Slot />
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
