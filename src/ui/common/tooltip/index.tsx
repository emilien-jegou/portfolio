import type { JSXChildren } from '@builder.io/qwik';
import { match } from 'ts-pattern';
import { cn } from '~/utils/cn';

import type { Classes } from '~/utils/types';
import styles from './Tooltip.module.css';

export type TooltipProps = {
  info: JSXChildren;
  children: JSXChildren;
  position?: 'right' | 'top';
  hidden?: boolean;
  classes?: Classes<'root' | 'tooltip'>;
};

// TODO: remove tailwind styles
export const Tooltip = (props: TooltipProps) => (
  <div class={cn('relative w-fit h-fit', styles.TooltipContainer, props.classes?.root)}>
    {!props.hidden && (
      <div
        class={cn(
          'absolute px-2 py-0.5 transition-opacity delay-200 duration-500 opacity-0 rounded-onwo-s-xs bg-base-black text-base-white pointer-events-none',

          match(props.position ?? 'right')
            .with('right', () => 'left-full top-1/2 -translate-y-1/2')
            .with('top', () => 'bottom-full left-1/2 -translate-x-1/2')
            .exhaustive(),
          styles.Tooltip,
        )}
      >
        <div class={cn('text-xs tracking-wide font-medium w-max', props.classes?.tooltip)}>
          {props.info}
        </div>
      </div>
    )}
    {props.children}
  </div>
);
