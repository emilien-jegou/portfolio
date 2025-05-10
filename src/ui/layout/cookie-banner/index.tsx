import { $, component$ } from '@builder.io/qwik';
import type { JSXChildren, QRL } from '@builder.io/qwik';
import { useBreakpoint } from '~/hooks/use-breakpoints';
import { SpeechBubble } from '~/ui/common/speech-bubble';
import { AnimationMount } from '~/ui/logics/animation-mount';
import { cn } from '~/utils/cn';
import Cat from './cat.png';
import Cookie from './cookie-simple.png';

import './styles.css';

export type CookieBannerSubmitData = { kind: 'accepted' } | { kind: 'rejected' };

export type CookieBannerProps = {
  onSubmit$?: QRL<(submitted: CookieBannerSubmitData) => void>;
  class?: string;
  visible: boolean;
};

export const CookieBanner = component$((props: CookieBannerProps) => {
  const md = useBreakpoint('>=md');

  return (
    <div
      class={cn(
        'fixed left-0 bottom-0 md:bottom-12 w-full pointer-events-none',
        !props.visible && 'select-none',
        props.class,
      )}
    >
      <div class="relative md:h-[214px]">
        <AnimationMount
          animation={{
            from: {
              opacity: '0',
            },
            to: {
              opacity: '1',
            },
            duration: 0.1,
            timing: 'ease-in-out',
          }}
          /* `persistAfterAnimationSec` is required on small screen; The speech bubble animation is
           * faster than the cat character animation but the cat character
           * position is determined by the speech bubble.
           */
          persistAfterAnimationSec={1}
          mounted={props.visible}
          load$={$(() => (
            <SpeechBubble
              showTail={md.value}
              expansionCoef={md.value ? 5 : 4}
              class="pointer-events-auto min-w-[300px] m-2 w-[calc(100%_-_1rem)] bottom-2 md:bottom-full md:absolute z-20 md:max-w-[600px] md:left-[250px]"
            >
              <p class="mt-4 md:mt-0">
                Hi traveler! This site use cookies to improve your user experience. You can accept
                or reject them at any time — more details{' '}
                <a href="/privacy" class="text-[#0d4bc2] hover:underline">
                  in our privacy policy
                </a>{' '}
              </p>
              <div class="flex gap-2 md:gap-4 text-base sm:text-lg mt-4 ml-auto w-fit">
                <CookieBannerButton
                  color="#c70e06"
                  class="hover:bg-[#c70e06]/30 bg-[#c70e06]/10 flex  gap-3"
                  onClick$={$(() => {
                    props.onSubmit$?.({ kind: 'rejected' });
                  })}
                >
                  <span>Essential only</span>
                  <div class="relative">
                    <img class="shrink-0" src={Cookie} width={28} height={28} />
                    <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-sans text-[#c70e06] font-base text-5xl">
                      x
                    </p>
                  </div>
                </CookieBannerButton>
                <CookieBannerButton
                  color="#249f09"
                  class="transition-colors hover:bg-[#249f09]/30 bg-[#249f09]/10 flex gap-2"
                  onClick$={$(() => {
                    props.onSubmit$?.({ kind: 'accepted' });
                  })}
                >
                  <span>Allow</span>
                  <img class="shrink-0" src={Cookie} width={32} height={32} />
                </CookieBannerButton>
              </div>
            </SpeechBubble>
          ))}
        />
        <AnimationMount
          class="absolute bottom-[calc(100%_-_1.5rem)] md:top-0 -left-10 "
          animation={{
            from: {
              transform: 'translateY(0) translateX(-30%)',
              opacity: '0',
            },
            to: {
              transform: 'translateY(0) translateX(0)',
              opacity: '1',
            },
            duration: 0.25,
            timing: 'ease-out',
          }}
          mounted={props.visible}
          load$={$(() => (
            <img
              class="max-w-[unset] shrink-0 overflow-visible w-auto h-[160px] md:h-[214px]"
              src={Cat}
              width={356}
              height={214}
            />
          ))}
        />
      </div>
    </div>
  );
});

type CookieBannerButtonProps = {
  class?: string;
  onClick$?: QRL<() => void>;
  color: string;
  children: JSXChildren;
};

export const CookieBannerButton = (props: CookieBannerButtonProps) => (
  <button
    class={cn(
      'transition-colors duration-50 border rounded-onwo-s-sm py-1 items-center border-[3px] px-4 md:px-6',
      props.class,
    )}
    style={{ borderColor: props.color }}
    onClick$={props.onClick$}
  >
    {props.children}
  </button>
);
