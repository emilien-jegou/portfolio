import { useContext, component$, useSignal, useTask$, $ } from '@builder.io/qwik';
import { Modal as PModal } from '@onwo/primitives';
import { PortalAPI } from '~/providers/portal';
import { sendToast } from '~/ui/common/toast';
import { sleep } from '~/utils/sleep';
import { CustomPanel } from './custom-panel';
import { ReachOutFormLogic } from './form-logic';

export const ReachOutForm = component$(() => {
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
    <CustomPanel class="sm:max-w-screen-sm px-6 py-4">
      <h2 class="mb-6 sm:mb-8 mt-6 sm:mt-8 text-xl sm:text-3xl font-bold max-w-[480px] leading-relaxed">
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
          closeModal$();
        }}
        onCancel$={closeModal$}
      />
    </CustomPanel>
  );
});
