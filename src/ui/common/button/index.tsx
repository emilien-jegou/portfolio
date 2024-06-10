import { twMerge } from 'tailwind-merge';
import { CheckmarkFilledIcon } from '~/ui/icons/checkmark';
import { LoadingIcon } from '~/ui/icons/loading';
import type { JSXChildren, PropFunction } from '@builder.io/qwik';

import './button.css';

export type ButtonProps = {
  state?: Partial<Record<'disabled' | 'loading' | 'success', boolean>>;
  class?: string;
  type?: 'button' | 'submit';
  children: JSXChildren;
  onClick$?: PropFunction<(event: PointerEvent) => void>;
  variant?: 'fill' | 'transparent' | 'outline';
};

export const Button = ({ variant = 'fill', onClick$, ...props }: ButtonProps) => (
  <button
    class={twMerge(
      'flex flex-row justify-center items-center whitespace-nowrap rounded-[10px] gap-2 h-10 font-medium hover:drop-shadow-sm text-sm px-5',
      variant === 'fill' &&
      twMerge(
        'border button-fill hover:opacity-95 border-border-subtler',
        props.state?.success && 'bg-success',
      ),
      variant === 'transparent' && 'bg-transparent hover:bg-subtle',
      variant === 'outline' && 'border bg-transparent hover:bg-subtle',
      (props.state?.loading || props.state?.disabled) && 'cursor-hand opacity-80 hover:opacity-80',
      props.class,
    )}
    disabled={props.state?.loading || props.state?.disabled}
    type={props.type ?? 'button'}
    onClick$={onClick$}
  >
    {props.state?.loading && (
      <>
        <LoadingIcon /> <span class="text-xs">Please wait...</span>
      </>
    )}
    {props.state?.success && <CheckmarkFilledIcon />}
    {!props.state?.loading && props.children}
  </button>
);
