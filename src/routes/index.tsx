import { component$ } from '@builder.io/qwik';
import { HeaderBar } from '~/ui/layout/header-bar';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <HeaderBar />
      <main class="mt-24 sm:mt-36 mx-auto custom-container">
        <h1 class="text-4xl font-extrabold">Hi There,</h1>
        <p class="text-subtle leading-7 mt-6">
          I'm a French software engineer with over 3 years in full-stack development and an IT
          Master's from Epitech. I love discovering new things, so I started this blog, hope you
          find it interesting!
        </p>
      </main>
      <p></p>
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
