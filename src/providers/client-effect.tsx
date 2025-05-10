import type { QRL } from '@builder.io/qwik';

type ClientEffectProps<T> = {
  state?: T;

  onMount: (state: T, dispatch: (...args: any[]) => void) => Promise<void> | void;

  onEffect$?: QRL<(args: any[]) => void>;
};

// eslint-disable-next-line sonarjs/prefer-read-only-props
export function ClientEffect<T>({ state, onMount, onEffect$ }: ClientEffectProps<T>) {
  const rawScript = `const self = document.currentScript;
    const state = ${JSON.stringify(state)};
    (${onMount})(state, (...args) => setTimeout(() => {
        self.dispatchEvent(new CustomEvent('effect', { detail: args }))
    }));`;

  return (
    <script
      onEffect$={(args: any) => onEffect$?.(args.detail)}
      dangerouslySetInnerHTML={rawScript}
    />
  );
}
