import {
  Slot,
  createContextId,
  useContext,
  useContextProvider,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useColorMode } from '~/hooks/use-color-mode';
import type { Signal } from '@builder.io/qwik';
import type { ColorMode } from '~/hooks/use-color-mode';

export type ThemeContextData = {
  colorMode: Signal<ColorMode | undefined>;
};

const taskContext = createContextId<ThemeContextData>('ThemeContext');

export const useThemeContext = () => useContext(taskContext);

export const ThemeContextProvider = component$(() => {
  const colorMode = useColorModeSignal();
  useContextProvider(taskContext, { colorMode });
  return <Slot />;
});

export const useColorModeSignal = (): Signal<undefined | ColorMode> => {
  const cm = useColorMode();
  const colorMode = useSignal<ColorMode | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const obs = cm.observe((newColor: ColorMode) => {
      colorMode.value = newColor;
    });
    colorMode.value = await cm.get();
    return obs;
  });

  return colorMode;
};
