import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useColorMode, type ColorMode } from '~/hooks/use-color-mode';
import { WheatherMoonIcon } from '~/ui/icons/wheather-moon';
import { WheatherSunnyIcon } from '~/ui/icons/wheather-sunny';

export const ThemeSwitcherButton = component$(() => {
  const currentColorMode = useSignal<ColorMode | undefined>(undefined);
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
        class="p-1 rounded-full hover:bg-subtle w-[24px]"
        type="button"
        onClick$={() => colorMode.set(currentColorMode.value === 'dark' ? 'light' : 'dark')}
      >
        {currentColorMode.value === 'dark' && <WheatherMoonIcon />}
        {currentColorMode.value === 'light' && <WheatherSunnyIcon />}
      </button>
    </>
  );
});
