import { $, component$, useId, useOnDocument, useSignal } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { SelectExpandIcon } from '~/ui/icons/select-expand';
import { SelectOption } from './option';
import type { PropFunction } from '@builder.io/qwik';

import './styles.css';

export type SelectProps = {
  name?: string;
  class?: string;
  selected?: string;
  onSelect$: PropFunction<(v: string) => void>;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
};

export const Select = component$((props: SelectProps) => {
  const ref = useSignal<HTMLDivElement>();
  const focused = useSignal(false);
  const expanded = useSignal(false);
  const id = useId();

  useOnDocument(
    'click',
    $((e) => {
      if (!ref.value || ref.value.contains(e.target as any)) return;
      expanded.value = false;
    }),
  );

  return (
    <div ref={ref} class={twMerge('relative w-full', props.class)}>
      <button
        type="button"
        role="combobox"
        aria-controls={`radix-:${id}:`}
        aria-expanded={expanded.value}
        onFocus$={() => {
          focused.value = true;
        }}
        onBlur$={() => {
          focused.value = false;
        }}
        onClick$={(e) => {
          e.preventDefault();
          expanded.value = !expanded.value;
        }}
        aria-autocomplete="none"
        class={twMerge(
          'w-full flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background [&amp;>span]:line-clamp-1',
          (expanded.value || focused.value) && 'field-focused',
          props.disabled && 'cursor-not-allowed opacity-50',
          props.error && 'border-error',
        )}
      >
        <span class={twMerge('pointer-events-none', !props.selected && 'text-subtler')}>
          {(props.selected ? props.options.find((a) => a.value === props.selected)?.label : null) ??
            props.placeholder ??
            'select an option'}
        </span>
        <SelectExpandIcon class="h-4 w-4 opacity-50" />
      </button>

      <div
        role="presentation"
        class={twMerge(
          'select-expanded flex flex-col border shadow-sm rounded-md absolute bg-default z-50 top-[100%] mt-2 p-1 h-fit w-full',
          !expanded.value && 'hidden',
        )}
      >
        {props.options.map((option, idx) => (
          <SelectOption
            key={idx}
            onClick$={() => {
              expanded.value = false;
              props.onSelect$(option.value);
            }}
            selected={option.value === props.selected}
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
});
