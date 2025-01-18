import { component$, useSignal, useId, useVisibleTask$ } from '@builder.io/qwik';
import type { QRL, JSXOutput } from '@builder.io/qwik';

type TimingFunction =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end';

type Animation = {
  from: Record<string, string>;
  to: Record<string, string>;
  duration: number; // e.g. 0.25 (seconds)
  timing: TimingFunction;
  delay?: string;
};

type AnimationMountProps = {
  class?: string;
  animation: Animation;
  mounted: boolean;
  load$: QRL<() => JSXOutput>;
  // keep the component in the DOM an aditional number of second after animation end
  persistAfterAnimationSec?: number;
};

export const AnimationMount = component$(
  ({
    mounted,
    class: className,
    load$,
    animation,
    persistAfterAnimationSec,
  }: AnimationMountProps) => {
    const id = useId();
    const isVisible = useSignal(mounted);
    const isAnimating = useSignal(false);
    const timeoutId = useSignal<number | null>(null);

    // Generate unique animation names
    const animationInName = `animation-mount--in--${id}`;
    const animationOutName = `animation-mount--out--${id}`;

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      // Create new styles
      const style = document.createElement('style');
      style.textContent = `
        @keyframes ${animationInName} {
          from { ${Object.entries(animation.from)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')} }
          to { ${Object.entries(animation.to)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')} }
        }
        @keyframes ${animationOutName} {
          from { ${Object.entries(animation.to)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')} }
          to { ${Object.entries(animation.from)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')} }
        }
      `;
      document.head.appendChild(style);

      cleanup(() => {
        style.remove();
      });
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track, cleanup }) => {
      track(() => mounted);

      if (timeoutId.value !== null) {
        clearTimeout(timeoutId.value);
      }

      if (mounted) {
        isVisible.value = true;
      } else {
        isAnimating.value = true;
        timeoutId.value = window.setTimeout(
          () => {
            isAnimating.value = false;
            isVisible.value = false;
            timeoutId.value = null;
          },
          // we add 200ms to account for potential javascript induced delays
          animation.duration * 1000 + 200 + (persistAfterAnimationSec ?? 0) * 1000,
        );
      }

      cleanup(() => {
        if (timeoutId.value !== null) {
          clearTimeout(timeoutId.value);
        }
      });
    });

    return (
      <>
        {isVisible.value && (
          <div
            class={className}
            style={{
              animation: `${mounted ? animationInName : animationOutName} ${animation.duration}s ${animation.timing} ${animation.delay || '0s'} forwards`,
            }}
          >
            {load$()}
          </div>
        )}
      </>
    );
  },
);
