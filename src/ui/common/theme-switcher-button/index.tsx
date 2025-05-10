import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useColorMode, type ColorMode } from '~/hooks/use-color-mode';
import { WheatherMoonIcon } from '~/ui/icons/wheather-moon';
import { WheatherSunnyIcon } from '~/ui/icons/wheather-sunny';

export const ThemeSwitcherButton = component$(() => {
  const currentColorMode = useSignal<ColorMode | undefined>();
  const colorMode = useColorMode();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const disconnect = colorMode.observe((colorMode: ColorMode) => {
      currentColorMode.value = colorMode;
    });

    currentColorMode.value = await colorMode.get();

    return disconnect;
  });

  return (
    <>
      <button
        class="z-40 rounded-full bg-paper border border-line hover:bg-parchment h-[40px] w-[40px] flex items-center justify-center"
        type="button"
        onClick$={() => colorMode.set(currentColorMode.value === 'dark' ? 'light' : 'dark')}
      >
        {currentColorMode.value === 'dark' && <WheatherMoonIcon size="xl" />}
        {currentColorMode.value === 'light' && <WheatherSunnyIcon size="xl" />}
      </button>
    </>
  );
});
