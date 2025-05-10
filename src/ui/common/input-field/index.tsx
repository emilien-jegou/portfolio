import { component$ } from '@builder.io/qwik';
import type { JSXChildren } from '@builder.io/qwik';
import { cn } from '~/utils/cn';
import type { Classes } from '~/utils/types';
import { Input } from '../input';
import type { InputProps } from '../input';
import { Label } from '../label';

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
      <Input error={Boolean(error)} class={cn('w-full', classes?.input)} {...props} />
      <p class={cn('mt-1 text-xs text-graphite select-none', error && 'text-error')}>
        {error || helperText}&nbsp;
      </p>
    </div>
  ),
);
