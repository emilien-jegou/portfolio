import { twMerge } from 'tailwind-merge';
import type { JSXChildren, PropFunction } from '@builder.io/qwik';

export type ButtonProps = {
  disabled?: boolean;
  class?: string;
  type?: 'button' | 'submit';
  children: JSXChildren;
  onClick$?: PropFunction<() => void>;
};

export const Button = ({ onClick$, ...props }: ButtonProps) => (
  <button
    class={twMerge(
      'flex flex-row justify-center items-center whitespace-nowrap rounded-[10px] gap-2 h-10 font-medium bg-contrast text-contrast border border-[0.5px] border-border-subtler hover:drop-shadow-sm text-sm px-5',
      props.disabled && 'cursor-hand opacity-[85]',
      props.class,
    )}
    disabled={props.disabled}
    type={props.type ?? 'button'}
    onClick$={onClick$}
  >
    {props.children}
  </button>
);
