import { $, component$, useId, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { PropFunction, QwikFocusEvent } from '@builder.io/qwik';
import type { FieldElement } from '@modular-forms/qwik';
import { cn } from '~/utils/cn';

export type TextareaProps = {
  name: string;
  autoFocus?: boolean;
  onBlur$?: PropFunction<(event: QwikFocusEvent<FieldElement>, element: FieldElement) => void>;
  onInput$?: PropFunction<(value: string) => void>;
  placeholder?: string;
  value?: string;
  class?: string;
  disabled?: boolean;
  error?: boolean;
  rows?: number;
};

export const Textarea = component$(
  ({
    class: className,
    onBlur$,
    onInput$,
    value,
    name,
    error,
    disabled,
    ...props
  }: TextareaProps) => {
    const focused = useSignal(false);
    const id = useId();
    const containerRef = useSignal<HTMLDivElement>();

    const focusInput = $(() => {
      setTimeout(() => {
        // eslint-disable-next-line unicorn/prefer-query-selector
        document.getElementById(id)?.focus();
      });
    });

    // Grow the textarea smoothly
    const resizeTextarea$ = $((textarea: HTMLTextAreaElement) => {
      if (containerRef.value === undefined) return;

      // Cloning the ref showed the best result when trying to avoid the
      // textarea to flicker.
      const clone = textarea.cloneNode(true) as HTMLTextAreaElement;
      clone.style.height = 'auto';
      clone.style.width = textarea.offsetWidth + 'px';
      clone.style.position = 'absolute';
      clone.style.userSelect = 'none';
      clone.style.left = '200vw';
      clone.style.pointerEvents = 'none';
      clone.style.visibility = 'hidden';

      // We add a character to pre extend the textarea
      clone.value += '0';
      clone.style.zIndex = String(100 + clone.scrollHeight + 5);
      clone.style.overflow = 'hidden';
      document.body.append(clone as any);
      clone.style.height = clone.scrollHeight + 2 + 'px';
      const computedHeight = clone.scrollHeight;
      textarea.style.height = computedHeight + 2 + 'px';
      containerRef.value.style.height = computedHeight + 'px';

      clone.remove();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => value);

      // eslint-disable-next-line unicorn/prefer-query-selector
      const textarea = document.getElementById(id);
      resizeTextarea$(textarea as any);
    });

    return (
      <div
        onMouseDown$={focusInput}
        onClick$={focusInput}
        ref={containerRef}
        style={{
          transition: 'height 0.1s ease',
        }}
        class={cn(
          'field relative rounded-onwo-s-sm border text-sm leading-none shadow-2xs cursor-text',
          error && 'border-error',
          focused.value && 'field-focused',
          disabled &&
            'cursor-not-allowed shadow-xs outline-0 border-transparent bg-parchment text-lead',
          className,
        )}
      >
        <textarea
          id={id}
          name={name}
          spellcheck={false}
          rows={props.rows}
          disabled={disabled}
          class={cn(
            'w-full block h-[39px] p-2.5 pt-3 pr-10 text-sm bg-transparent leading-tight focus-visible:outline-0! font-medium placeholder:font-normal text-ink placeholder:text-lead focus-visible:placeholder:text-graphite resize-none overflow-y-hidden',
            disabled && 'cursor-not-allowed',
          )}
          onFocus$={() => {
            focused.value = true;
          }}
          onBlur$={(event, element) => {
            focused.value = false;
            onBlur$?.(event, element);
          }}
          onInput$={(event: any) => onInput$?.(event.target.value)}
          value={value}
          {...props}
        />
      </div>
    );
  },
);
