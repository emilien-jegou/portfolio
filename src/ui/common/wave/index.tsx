import { component$, useComputed$ } from '@builder.io/qwik';
import { cn } from '~/utils/cn';

import './wave.css';

type WaveProps = {
  class?: string;
  timeSec: number;
};

export const Wave = component$((props: WaveProps) => {
  const delay = useComputed$(() => -(Math.random() * props.timeSec));
  return (
    <div
      class={cn('wave w-full pointer-events-none h-full', props.class)}
      style={{
        animation: `wave ${props.timeSec}s infinite reverse linear`,
        animationDelay: `${delay.value}s`,
      }}
    />
  );
});
