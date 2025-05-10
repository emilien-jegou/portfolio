import type { JSXChildren, PropFunction } from '@builder.io/qwik';
import { CheckmarkFilledIcon } from '~/ui/icons/checkmark';
import { LoadingIcon } from '~/ui/icons/loading';
import { cn } from '~/utils/cn';

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
    class={cn(
      'select-none flex flex-row justify-center items-center whitespace-nowrap rounded-onwo-s-sm gap-2 h-10 font-medium hover:drop-shadow-xs text-sm px-5',
      variant === 'fill' &&
        cn(
          'border bg-bgr-contrast hover:bg-bgr-contrast/70 text-text-contrast dark:bg-papyrus dark:text-ink dark:hover:bg-[purple] border-line',
          props.state?.success && 'bg-success',
        ),
      variant === 'transparent' && 'bg-transparent hover:bg-parchment',
      variant === 'outline' && 'border border-line bg-transparent hover:bg-parchment',
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
