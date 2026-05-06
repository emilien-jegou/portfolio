import { $, Slot, component$, noSerialize, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { JSXChildren, NoSerialize, QRL } from '@builder.io/qwik';
import { CookieBannerLayout } from '~/ui/layout/cookie-banner';
import type { CookieBannerSubmitData } from '~/ui/layout/cookie-banner';
import { cn } from '~/utils/cn';
import { initContext } from '~/utils/context-utils';
import { ExclusiveLock } from '~/utils/lock-handle';
import { getStorage, storageGet, storageSet } from '~/utils/storage';

interface CookieBannerState {
  isVisible: boolean;
  isAccepted: boolean;
  isEnabled: boolean;
  atomicHandle: ExclusiveLock;
}

export const cookieBannerStorage = getStorage<boolean>('local', 'cookie-banner');

export type CookieBannerWrapperProps = {
  visible: boolean;
  onAccept$: QRL<() => void>;
  onReject$: QRL<() => void>;
  children: JSXChildren;
};

const CookieBannerWrapper = ({
  visible,
  onAccept$,
  onReject$,
  children,
}: CookieBannerWrapperProps) => {
  return (
    <div>
      <CookieBannerLayout
        class="z-[2000]"
        visible={visible}
        onSubmit$={$((submitted: CookieBannerSubmitData) => {
          if (submitted.kind === 'rejected') {
            onReject$();
          } else {
            onAccept$();
          }
        })}
      />
      {visible && <div class="z-20 w-screen h-screen fixed top-0 left-0" />}
      <div
        class={cn(
          'z-[1000]',
          visible &&
          'select-none pointer-events-none transition-all saturate-[0.1] bg-bgr-default overflow-hidden max-h-[120vh]',
        )}
        data-name="cookie-banner-wrapper"
      >
        {children}
      </div>
    </div>
  );
};

export const CookieBannerContext = initContext<CookieBannerState>('cookie-banner-context');


export const CookieBanner = component$(() => {
  const store = CookieBannerContext.use();

  useVisibleTask$(({ cleanup }) => {
    const handle = ExclusiveLock.tryAcquire(store.atomicHandle);
    if (!handle) return;
    cleanup(() => {
      store.isEnabled = false;
      handle.destroy();
    });
    store.isEnabled = true;
  }, { strategy: 'document-ready' });

  return <span data-cookie-banner-enabled class="absolute" />;
});

export const CookieBannerProvider = component$(() => {
  const store = useStore<CookieBannerState>({
    isVisible: false,
    isAccepted: false,
    isEnabled: false,
    atomicHandle: ExclusiveLock.create(),
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const cookieConsent = storageGet(cookieBannerStorage);

    if (cookieConsent.kind === 'none') {
      store.isVisible = true;
    } else {
      store.isAccepted = cookieConsent.value;
    }
  });

  CookieBannerContext.useProvider(store);

  return (
    <div>
      <CookieBannerWrapper
        visible={store.isVisible && store.isEnabled}
        onAccept$={$(() => {
          store.isAccepted = true;
          store.isVisible = false;
          storageSet(cookieBannerStorage, true);
        })}
        onReject$={$(() => {
          store.isAccepted = false;
          store.isVisible = false;
          storageSet(cookieBannerStorage, false);
        })}
      >
        <Slot />
      </CookieBannerWrapper>
    </div>
  );
});
