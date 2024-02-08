import { component$ } from '@builder.io/qwik';
import { z } from '@builder.io/qwik-city';
import { zodForm$ } from '@modular-forms/qwik';
import { twMerge } from 'tailwind-merge';
import { useForm } from '~/hooks/use-form';
import { Button } from '~/ui/common/button';
import { InputField } from '~/ui/common/input-field';
import { SelectField } from '~/ui/common/select-field';
import { TextareaField } from '~/ui/common/textarea-field';
import type { PropFunction } from '@builder.io/qwik';

const loginFormSchema = z
  .object({
    email: z
      .string({ required_error: 'This field is required' })
      .min(1, 'This field is required')
      .email('Your email address is badly formatted.'),
    reason: z.string().min(1, 'Please enter the reason for the contact request.'),
    otherReason: z.optional(
      z.string().min(1, 'Please fill-in the reason for this contact request.'),
    ),
    message: z
      .string({ required_error: 'This field is required' })
      .min(30, 'Your message need to be at least 40 characters long.'),
  })
  .superRefine(({ reason, otherReason }, ctx) => {
    if (reason === 'other' && !otherReason) {
      ctx.addIssue({
        code: 'custom',
        path: ['otherReason'],
        message: 'Please fill-in the reason for this contact request',
      });
    }
  });
type ReachOutFormLogicData = z.infer<typeof loginFormSchema>;

type ReachOutFormLogicProps = {
  class?: string;
  loading: boolean;
  onSubmit$: PropFunction<(data: ReachOutFormLogicData) => void>;
  onCancel$?: PropFunction<() => void>;
};

export const ReachOutFormLogic = component$(
  ({ loading, class: className, onSubmit$, onCancel$ }: ReachOutFormLogicProps) => {
    const form = useForm<ReachOutFormLogicData>('user-login', {
      onSuccess$: onSubmit$,
      validate: zodForm$(loginFormSchema),
      persistFormValues: true,
    });

    return (
      <form class={className} preventdefault:submit onSubmit$={form.formSubmit$}>
        <InputField
          name="email"
          value={form.fields.email}
          error={form.errors.email}
          required
          autoFocus
          onInput$={(value: string) => {
            form.setFormValue$('email', value);
          }}
          classes={{ root: 'mb-4' }}
          label="Your email address"
          autocomplete="email"
          disabled={loading}
        />
        <SelectField
          label="Reason"
          name="reason"
          required
          selected={form.fields.reason}
          classes={{ root: 'mb-4' }}
          error={form.errors.reason}
          onSelect$={(value: string) => {
            form.setFormValue$('reason', value);
          }}
          options={[
            { value: 'job', label: 'Recruitment' },
            { value: 'marketing', label: 'Marketing & Business' },
            { value: 'open-source', label: 'Open-Source' },
            { value: 'other', label: 'Other' },
          ]}
          disabled={loading}
        />
        <div class={twMerge('mb-4 animate-in fade-in', form.fields.reason !== 'other' && 'hidden')}>
          <InputField
            name="otherReason"
            value={form.fields.otherReason}
            error={form.errors.otherReason}
            required
            autoFocus
            onInput$={(value: string) => {
              form.setFormValue$('otherReason', value);
            }}
            label="Fill-in your reason"
            disabled={loading}
          />
        </div>
        <TextareaField
          name="message"
          value={form.fields.message}
          error={form.errors.message}
          rows={3}
          required
          autoFocus
          onInput$={(value: string) => {
            form.setFormValue$('message', value);
          }}
          classes={{ root: 'mb-4' }}
          label="Your message"
          disabled={loading}
        />
        <div class="mb-2 mt-auto flex ml-auto justify-end gap-2">
          <Button variant="transparent" onClick$={onCancel$}>
            Cancel
          </Button>
          <Button type="submit" state={{ loading, disabled: form.hasError.value }}>
            Contact me
          </Button>
        </div>
      </form>
    );
  },
);
