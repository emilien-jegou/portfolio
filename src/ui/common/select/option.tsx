import { useId, type PropFunction, component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

type SelectOptionProps = {
  selected?: boolean;
  label: string;
  onClick$: PropFunction<() => void>;
};

export const SelectOption = component$((props: SelectOptionProps) => {
  const id = useId();

  return (
    <div
      role="option"
      onClick$={props.onClick$}
      aria-labelledby={`radix-:${id}:`}
      aria-selected={props.selected}
      tabIndex={-1}
      class={twMerge(
        'flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-subtle focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.selected && 'select-selected-option',
      )}
      data-radix-collection-item=""
    >
      <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center"></span>
      <span id={`radix-:${id}:`}>{props.label}</span>
    </div>
  );
});
