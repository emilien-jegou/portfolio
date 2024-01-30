import { twMerge } from 'tailwind-merge';
import type { JSXChildren, PropFunction } from '@builder.io/qwik';

export type ButtonProps = {
  disabled?: boolean;
  class?: string;
  type?: 'button' | 'submit';
  children: JSXChildren;
  onClick$?: PropFunction<() => void>;
  variant?: 'fill' | 'transparent' | 'outline';
};

export const Button = ({ variant = 'fill', onClick$, ...props }: ButtonProps) => (
  <button
    class={twMerge(
      'flex flex-row justify-center items-center whitespace-nowrap rounded-[10px] gap-2 h-10 font-medium hover:drop-shadow-sm text-sm px-5',
      variant === 'fill' &&
        'border border-[0.5px] text-contrast bg-contrast hover:opacity-95 border-border-subtler',
      variant === 'transparent' && 'bg-transparent hover:bg-subtle',
      variant === 'outline' && 'border bg-transparent hover:bg-subtle',
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
