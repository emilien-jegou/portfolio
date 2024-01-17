import { component$, Slot } from '@builder.io/qwik';
import { HeaderBar } from '~/ui/layout/header-bar';
import type { RequestHandler } from '@builder.io/qwik-city';

import './mdx.css';
import { FooterBar } from '~/ui/layout/footer-bar';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <HeaderBar />
      <main class="mt-24 mx-auto custom-container">
        <h1 class="text-3xl sm:text-4xl sm:leading-[46px] font-extrabold max-w-[580px]">
          Building up a native carousel for the web
        </h1>
        <p class="text-subtle leading-7 mt-4 sm:mt-6 ">
          This is an introduction This is an introduction This is an introduction This is an
          introduction This is an introduction This is an introduction This is an introduction This
          is an introduction This is an introduction
        </p>
      </main>
      <section class="mdx custom-container mx-auto">
        <Slot />
      </section>
      <FooterBar />
    </>
  );
});
