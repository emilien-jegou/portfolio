import type { QRL } from '@builder.io/qwik';

type ClientEffectProps<T> = {
  state?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMount: (state: T, dispatch: (...args: any[]) => void) => Promise<void> | void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEffect$?: QRL<(args: any[]) => void>;
};

export function ClientEffect<T>({ state = undefined, onMount, onEffect$ }: ClientEffectProps<T>) {
  const rawScript = `const self = document.currentScript;
    const state = ${JSON.stringify(state)};
    (${onMount})(state, (...args) => setTimeout(() => {
        self.dispatchEvent(new CustomEvent('effect', { detail: args }))
    }));`;

  return (
    <script
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onEffect$={(args: any) => onEffect$?.(args.detail)}
      dangerouslySetInnerHTML={rawScript}
    />
  );
}
