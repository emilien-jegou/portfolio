import { component$, useId } from '@builder.io/qwik';
import type { PropFunction, QwikFocusEvent } from '@builder.io/qwik';
import type { FieldElement } from '@modular-forms/qwik';
import { cn } from '~/utils/cn';

export type InputType = 'text' | 'password';

export type InputAutocomplete = 'email' | 'new-password' | 'current-password';

export type InputProps = {
  autoFocus?: boolean;
  autocomplete?: InputAutocomplete;
  disabled?: boolean;
  name: string;
  onBlur$?: PropFunction<(event: QwikFocusEvent<FieldElement>, element: FieldElement) => void>;
  onChange$?: PropFunction<(value: string) => void>;
  onInput$?: PropFunction<(value: string) => void>;
  ref?: PropFunction<(element: Element) => void>;
  placeholder?: string;
  type?: InputType;
  value?: string;
  error?: boolean;
  class?: string;
};

export const Input = component$(
  ({ disabled, class: className, error, onBlur$, onChange$, onInput$, ...props }: InputProps) => {
    const id = useId();

    return (
      <input
        id={id}
        disabled={disabled}
        onInput$={(e: any) => onInput$?.(e.target.value)}
        onChange$={(e: any) => onChange$?.(e.target.value)}
        onBlur$={(...args) => {
          onBlur$?.(...args);
        }}
        class={cn(
          'field border transition-outline rounded-onwo-s-sm p-2 w-full focus-visible:field-focused',
          disabled &&
            'cursor-not-allowed shadow-xs outline-0 border-transparent bg-parchment text-lead',
          error && 'border-error',
          className,
        )}
        {...props}
      />
    );
  },
);
