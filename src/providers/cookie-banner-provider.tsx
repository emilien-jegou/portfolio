import { $, Slot, component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { JSXChildren, QRL } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { CookieBanner } from '~/ui/layout/cookie-banner';
import type { CookieBannerSubmitData } from '~/ui/layout/cookie-banner';
import { cn } from '~/utils/cn';
import { getStorage, storageGet, storageSet } from '~/utils/storage';

interface CookieBannerState {
  isVisible: boolean;
  isAccepted: boolean;
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
      <CookieBanner
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

export const CookieBannerProvider = component$(() => {
  const location = useLocation();
  const state = useStore<CookieBannerState>({
    isVisible: false,
    isAccepted: false,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const cookieConsent = storageGet(cookieBannerStorage);

    if (cookieConsent.kind === 'none') {
      state.isVisible = true;
    } else {
      state.isAccepted = cookieConsent.value;
    }
  });

  return (
    <div>
      <CookieBannerWrapper
        visible={state.isVisible && location.url.pathname !== '/privacy/'}
        onAccept$={$(() => {
          state.isAccepted = true;
          state.isVisible = false;
          storageSet(cookieBannerStorage, true);
        })}
        onReject$={$(() => {
          state.isAccepted = false;
          state.isVisible = false;
          storageSet(cookieBannerStorage, false);
        })}
      >
        <Slot />
      </CookieBannerWrapper>
    </div>
  );
});
