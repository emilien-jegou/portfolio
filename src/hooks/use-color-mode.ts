import { $ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';
import { colorModeLocalStorageKey } from '../providers/initial-color-mode-provider';

export type ColorMode = 'light' | 'dark';

type UseColorModeRet = {
  get: QRL<() => ColorMode>;
  set: QRL<(newColorMode: ColorMode) => void>;

  // Observe the change in color mode
  // /!\ Returns a callback which disconnect the observer
  observe: QRL<(cb: (newColorMode: ColorMode) => void) => () => void>;
};

export const useColorMode = (): UseColorModeRet => ({
  get: $((): ColorMode => document.body.dataset['colorMode'] as ColorMode),
  observe: $((cb: (newColorMode: ColorMode) => void): (() => void) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-color-mode') {
          cb(document.body.dataset.colorMode as ColorMode);
        }
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['data-color-mode'] });

    return () => observer.disconnect();
  }),
  set: $((newColorMode: ColorMode) => {
    localStorage.setItem(colorModeLocalStorageKey, newColorMode);
    document.body.dataset['colorMode'] = newColorMode;
    if (newColorMode === 'light') {
      document.body.classList.add('theme-onwo-light');
      document.body.classList.remove('theme-onwo-dark');
    } else {
      document.body.classList.add('theme-onwo-dark');
      document.body.classList.remove('theme-onwo-light');
    }
  }),
});
