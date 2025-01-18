import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';

type WindowSize = { width: number; height: number };

export const useWindowSize = (): Signal<WindowSize | undefined> => {
  const sizes = useSignal<WindowSize>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const onResize = () => {
      sizes.value = { width: window.innerWidth, height: window.innerHeight };
    };
    onResize();
    window.addEventListener('resize', onResize);
    cleanup(() => window.removeEventListener('resize', onResize));
  });

  return sizes;
};
