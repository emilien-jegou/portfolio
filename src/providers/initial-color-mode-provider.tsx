import { $, component$ } from '@builder.io/qwik';
import { ClientEffect } from './client-effect';
import { useTrack } from '../hooks/use-track';

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
        // preset before calling localStorage function
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.dataset['colorMode'] = 'dark';
          document.documentElement.style.colorScheme = 'dark';
        } else {
          // We ignore the light color mode because
          // the website look better in dark right now
          //document.body.dataset['colorMode'] = 'light';
          //document.documentElement.style.colorScheme = 'light';
          document.body.dataset['colorMode'] = 'dark';
          document.documentElement.style.colorScheme = 'dark';
        }

        // TODO: safe get localStorage
        const colorMode = localStorage.getItem('website-color-mode');

        if (colorMode === 'dark') {
          document.body.dataset['colorMode'] = 'dark';
          document.documentElement.style.colorScheme = 'dark';
          dispatch('dark');
        } else if (colorMode === 'light') {
          document.body.dataset['colorMode'] = 'light';
          document.documentElement.style.colorScheme = 'light';
          dispatch('light');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.dataset['colorMode'] = 'dark';
          document.documentElement.style.colorScheme = 'dark';
          dispatch('dark');
        } else {
          document.body.dataset['colorMode'] = 'dark';
          document.documentElement.style.colorScheme = 'dark';
          //document.body.dataset['colorMode'] = 'light';
          //document.documentElement.style.colorScheme = 'light';
          dispatch('light');
        }
      }}
      onEffect$={$(([scheme]) => {
        track$(`successfully setup colorscheme with value: ${scheme}` as const);
      })}
    />
  );
});
