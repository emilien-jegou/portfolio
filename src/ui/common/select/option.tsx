import { useId, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { cn } from '~/utils/cn';
import type { HTMLAttributes } from '@builder.io/qwik';

type SelectOptionProps = {
  selected?: boolean;
  label: string;
} & HTMLAttributes<HTMLButtonElement>;

export const SelectOption = component$((props: SelectOptionProps) => {
  const id = useId();
  const buttonRef = useSignal<HTMLButtonElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => props.selected);
    track(() => buttonRef.value);
    if (!buttonRef.value || props.selected === false) return;
    buttonRef.value.focus();
  });

  return (
    <button
      ref={buttonRef}
      role="option"
      type="button"
      onClick$={props.onClick$}
      onMouseOver$={props.onMouseOver$}
      aria-labelledby={`radix-:${id}:`}
      aria-selected={props.selected}
      tabIndex={0}
      class={cn(
        'flex w-full select-none items-center rounded-xs py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-subtler data-disabled:pointer-events-none data-disabled:opacity-50',
        props.selected && 'select-selected-option',
      )}
      data-radix-collection-item=""
    >
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"></span>
      <span id={`radix-:${id}:`}>{props.label}</span>
    </button>
  );
});
