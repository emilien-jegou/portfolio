import { $, component$ } from '@builder.io/qwik';
import { useTrack } from '../hooks/use-track';
import { ClientEffect } from './client-effect';

export const colorModeLocalStorageKey = 'website-color-mode';

/*
 * This component set the user colorMode (light or dark) before the first
 * rendering by looking at * the user css preferences settings aswell as it's
 * website preferences.
 *
 * To avoid flickering this component needs to be loaded as the first element
 * of the <body>.
 */
export const InitialColorModeProvider = component$(() => {
  const track$ = useTrack();

  return (
    <ClientEffect
      onMount={async (_, dispatch) => {
        function setTheme(theme: 'light' | 'dark') {
          document.body.dataset['colorMode'] = theme;
          document.documentElement.style.colorScheme = theme;

          if (theme === 'dark') {
            document.body.classList.add('theme-onwo-dark');
            document.body.classList.remove('theme-onwo-light');
          } else {
            document.body.classList.add('theme-onwo-light');
            document.body.classList.remove('theme-onwo-dark');
          }
        }

        // preset before calling localStorage function
        // eslint-disable-next-line sonarjs/no-all-duplicated-branches
        if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
        } else {
          // We ignore the light color mode because
          // the website look better in dark right now
          setTheme('dark');
        }

        // TODO: safe get localStorage
        const colorMode = localStorage.getItem('website-color-mode');

        console.info('in here', colorMode);
        if (colorMode === 'dark') {
          setTheme('dark');
          dispatch('dark');
        } else if (colorMode === 'light') {
          setTheme('light');
          dispatch('light');
        }
      }}
      onEffect$={$(([scheme]) => {
        track$(`successfully setup colorscheme with value: ${scheme}` as const);
      })}
    />
  );
});
