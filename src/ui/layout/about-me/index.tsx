import { $, component$, useSignal } from '@builder.io/qwik';
import { Button } from '~/ui/common/button';
import { CatButton } from '~/ui/common/cat-button';
import { ReachOutForm } from '~/ui/forms/reach-out-form';
import { cn } from '~/utils/cn';

import ImgProfile from './profile.webp?jsx';

export type AboutMeProps = {
  class?: string;
};

export const AboutMe = component$((props: AboutMeProps) => {
  const reachOutModalVisible = useSignal(false);
  return (
    <main class={cn('relative', props.class)}>
      <div class="absolute w-[110%] h-[120%] top-1/2 z-[-1] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-default opacity-[0.5] pointer-events-none" />
      <div class="flex items-center gap-2">
        <ImgProfile class="rounded-full shadow-sm bg-subtle w-6 h-6" />
        <h4 class="text-xs font-medium">Emilien Jegou</h4>
      </div>
      <p class="mt-2 text-xl font-semibold">Developping websites, apps, and servers.</p>
      <p class="text-base mt-2 text-sm">
        My name is Emilien, I'm a French fullstack developer from Brittany france, mainly
        programming in node.js & rust. I love discovering new things, so I started this blog, hope
        you find it interesting!{' '}
      </p>
      <div class="flex items-center gap-4 mt-4 sm:mt-6">
        <CatButton />
        <Button
          onClick$={$((): void => {
            reachOutModalVisible.value = true;
          })}
        >
          <span>Reach out</span>
          <span class="text-[16px]">✉️</span>
        </Button>
        <ReachOutForm bind:show={reachOutModalVisible} />
      </div>
    </main>
  );
});
