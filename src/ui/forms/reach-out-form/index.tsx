import { useContext, type Signal, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { PortalAPI } from '~/providers/portal';
import { Modal } from '~/ui/common/modal';
import { sendToast } from '~/ui/common/toast';
import { sleep } from '~/utils/sleep';
import { ReachOutFormLogic } from './form-logic';

type ReachOutFormProps = {
  'bind:show': Signal<boolean>;
};

export const ReachOutForm = component$((props: ReachOutFormProps) => {
  const portal = useContext(PortalAPI);
  const loading = useSignal(false);

  useTask$(({ track }) => {
    track(() => props['bind:show'].value);
    if (props['bind:show'].value == false) return;
    loading.value = false;
  });

  return (
    <Modal bind:show={props['bind:show']}>
      <h2 class="mb-6 sm:mb-8 mt-10 text-xl sm:text-3xl font-bold max-w-[480px] leading-relaxed">
        Need help with anything? Get in touch
      </h2>
      <ReachOutFormLogic
        loading={loading.value}
        onSubmit$={async (data) => {
          try {
            loading.value = true;
            const runningTimer = sleep(500);

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

            await runningTimer;

            sendToast(portal, {
              status: 'success',
              title: 'We received your message',
              description: "Thank you for reaching out, I'll get back to you shortly!",
            });
          } catch (error) {
            sendToast(portal, {
              status: 'error',
              title: "We couldn't receive your contact request! 😿",
              description: 'Verify your network or try again later',
            });
            console.error(error);
          }
          props['bind:show'].value = false;
        }}
        onCancel$={() => {
          props['bind:show'].value = false;
        }}
      />
    </Modal>
  );
});
