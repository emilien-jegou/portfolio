import { $ } from '@builder.io/qwik';

const DEBUG_ENABLED = false as boolean;

export const useTrack = (namespace?: Capitalize<string>) =>
  $((name: Uncapitalize<string>, data?: unknown) => {
    if (DEBUG_ENABLED === true) {
      return console.debug(['[EMJE]', namespace ?? 'default', '-', name].join(' '), data);
    }
  });
