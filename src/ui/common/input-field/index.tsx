import { component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { Input } from '../input';
import { Label } from '../label';
import type { InputProps } from '../input';
import type { JSXChildren } from '@builder.io/qwik';
import type { Classes } from '~/utils/types';

export type InputFieldProps = {
  classes?: Classes<'root' | 'input'>;
  error?: string;
  helperText?: string;
  info?: JSXChildren;
  label: string;
  required?: boolean;
} & Omit<InputProps, 'error'>;

export const InputField = component$(
  ({ classes, info, label, required, error, helperText, ...props }: InputFieldProps) => (
    <div class={classes?.root}>
      <Label info={info} classes={{ root: 'mb-2' }} text={label} required={required} />
      <Input error={Boolean(error)} class={twMerge('w-full', classes?.input)} {...props} />
      <p class={twMerge('mt-1 text-xs text-subtler select-none', error && 'text-error')}>
        {error || helperText}&nbsp;
      </p>
    </div>
  ),
);
