import { component$, useComputed$ } from '@builder.io/qwik';
import { Animated } from '@onwo/primitives';
import { cn } from '~/utils/cn';

type WaveProps = {
  class?: string;
  timeSec: number;
};

export const Wave = component$((props: WaveProps) => {
  // eslint-disable-next-line sonarjs/pseudo-random
  const delay = useComputed$(() => -(Math.random() * props.timeSec));

  return (
    <Animated
      in={{
        timingFunction: 'linear',
        iterationCount: 'infinite',
        durationMs: props.timeSec * 1000,
        rotate: 360,
        delay: delay.value * 1000,
      }}
      class={cn('pointer-events-none rounded-[40%] origin-center w-fit', props.class)}
    />
  );
});
