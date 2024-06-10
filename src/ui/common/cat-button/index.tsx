import { $, useSignal, useVisibleTask$, component$, noSerialize } from '@builder.io/qwik';
import { Button } from '~/ui/common/button';
import { CatLauncher } from './cat-launcher';
import catImage from './cat.png';
import type { NoSerialize } from '@builder.io/qwik';

export const CatButton = component$(() => {
  const launcher = useSignal<NoSerialize<CatLauncher> | undefined>();
  const catArea = useSignal<HTMLElement | undefined>();

  useVisibleTask$(({ track }) => {
    track(() => catArea.value);
    if (!catArea.value) return () => {};
    const catLauncher = new CatLauncher(catArea.value);
    launcher.value = noSerialize(catLauncher);
    return () => catLauncher.cleanup();
  });

  return (
    <>
      <div
        ref={catArea}
        class="z-[4000] pointer-events-none select-none fixed top-0 left-0 w-screen h-screen"
      />
      <Button
        class="group overflow-hidden w-24"
        variant="outline"
        onClick$={$(() => {
          launcher.value?.launchCat();
        })}
      >
        <img
          width="48" height="48"
          class="transition-all w-auto mt-[10%] h-[90%] group-hover:mt-0 group-hover:h-[100%]"
          src={catImage}
        />
      </Button>
    </>
  );
});
