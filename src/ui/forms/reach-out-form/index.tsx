import { useContext, type Signal, component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import { Modal as PModal } from '@onwo/primitives';
import { Modal } from '@onwo/ui';
import { PortalAPI } from '~/providers/portal';
import { sendToast } from '~/ui/common/toast';
import { sleep } from '~/utils/sleep';
import { ReachOutFormLogic } from './form-logic';

type ReachOutFormProps = {};

export const ReachOutForm = component$((props: ReachOutFormProps) => {
  const context = PModal.useModalContext();
  const portal = useContext(PortalAPI);
  const loading = useSignal(false);

  useTask$(({ track }) => {
    track(() => context.panel.value);
    if (context.panel.value === undefined) return;
    loading.value = false;
  });

  const closeModal$ = $(() => {
    if (!context.panel.value) return;
    context.panel.value.opened.value = false;
  });

  return (
    <Modal.Panel>
      <Modal.Header>
        <Modal.Title>Need help with anything? Get in touch</Modal.Title>
      </Modal.Header>
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
          closeModal$();
        }}
        onCancel$={closeModal$}
      />
    </Modal.Panel>
  );
});
