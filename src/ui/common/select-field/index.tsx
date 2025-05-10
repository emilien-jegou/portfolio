import { component$ } from '@builder.io/qwik';
import type { JSXChildren } from '@builder.io/qwik';
import { cn } from '~/utils/cn';
import type { Classes } from '~/utils/types';
import { Label } from '../label';
import { Select } from '../select';
import type { SelectProps } from '../select';

export type SelectFieldProps = {
  classes?: Classes<'root' | 'select'>;
  error?: string;
  helperText?: string;
  info?: JSXChildren;
  label: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<SelectProps, 'error'>;

export const SelectField = component$(
  ({ classes, info, label, required, error, helperText, ...props }: SelectFieldProps) => (
    <div class={classes?.root}>
      <Label info={info} classes={{ root: 'mb-2' }} text={label} required={required} />
      <Select error={Boolean(error)} class={cn('w-full', classes?.select)} {...props} />
      <p class={cn('mt-1 text-xs text-graphite select-none', error && 'text-error')}>
        {error || helperText}&nbsp;
      </p>
    </div>
  ),
);
