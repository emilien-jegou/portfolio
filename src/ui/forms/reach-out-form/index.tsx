import { Modal } from '~/ui/common/modal';
import { ReachOutFormLogic } from './form-logic';
import type { Signal } from '@builder.io/qwik';

type ReachOutFormProps = {
  'bind:show': Signal<boolean>;
};

export const ReachOutForm = (props: ReachOutFormProps) => {
  return (
    <Modal bind:show={props['bind:show']}>
      <h2 class="mb-6 sm:mb-8 mt-10 text-xl sm:text-3xl font-bold max-w-[480px] leading-relaxed">
        Need help with anything? Get in touch
      </h2>
      <ReachOutFormLogic
        disabled={false}
        loading={false}
        onSubmit$={async (data) => {
          try {
            // Do this properly
            await fetch('https://emje.dev/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                email: data.email,
                message: data.message,
                category: data.reason === 'other' ? data.otherReason : data.reason,
                metadata: '',
              } as any),
            });
          } catch (error) {
            console.error(error);
          }
        }}
        onCancel$={() => {
          props['bind:show'].value = false;
        }}
      />
    </Modal>
  );
};
