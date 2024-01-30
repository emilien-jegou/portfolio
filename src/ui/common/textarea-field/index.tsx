import { component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { Label } from '../label';
import { Textarea } from '../textarea';
import type { TextareaProps } from '../textarea';
import type { JSXChildren } from '@builder.io/qwik';
import type { Classes } from '~/utils/types';

export type TextareaFieldProps = {
  classes?: Classes<'root' | 'input'>;
  error?: string;
  helperText?: string;
  info?: JSXChildren;
  label: string;
  required?: boolean;
} & Omit<TextareaProps, 'error'>;

export const TextareaField = component$(
  ({ classes, info, label, required, error, helperText, ...props }: TextareaFieldProps) => (
    <div class={classes?.root}>
      <Label info={info} classes={{ root: 'mb-2' }} text={label} required={required} />
      <Textarea error={Boolean(error)} class={twMerge('w-full', classes?.input)} {...props} />
      <p class={twMerge('mt-1 text-xs text-subtler select-none', error && 'text-error')}>
        {error || helperText}&nbsp;
      </p>
    </div>
  ),
);
