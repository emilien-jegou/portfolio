import { component$ } from '@builder.io/qwik';
import type { JSXChildren } from '@builder.io/qwik';
import { cn } from '~/utils/cn';
import type { Classes } from '~/utils/types';
import { Label } from '../label';
import { Textarea } from '../textarea';
import type { TextareaProps } from '../textarea';

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
      <Textarea error={Boolean(error)} class={cn('w-full', classes?.input)} {...props} />
      <p class={cn('mt-1 text-xs text-graphite select-none', error && 'text-error')}>
        {error || helperText}&nbsp;
      </p>
    </div>
  ),
);
