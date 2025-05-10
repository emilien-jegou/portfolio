import { Button, Modal } from '@onwo/ui';
import { CatButton } from '~/ui/common/cat-button';
import { ReachOutForm } from '~/ui/forms/reach-out-form';
import { cn } from '~/utils/cn';

import ImgProfile from './profile.webp?jsx';

export type AboutMeProps = {
  class?: string;
};

const MailIcon = () => <span class="pr-2 text-[16px]">✉️</span>;

export const AboutMe = (props: AboutMeProps) => (
  <main class={cn('relative', props.class)}>
    <div class="absolute w-[110%] h-[120%] top-1/2 z-[-1] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper opacity-[0.5] pointer-events-none" />
    <div class="flex items-center gap-2">
      <ImgProfile class="rounded-full shadow-sm bg-parchment w-6 h-6" />
      <h4 class="text-xs font-medium">Emilien Jegou</h4>
    </div>
    <p class="mt-2 text-xl font-semibold">Developping websites, apps, and servers.</p>
    <p class="text-base mt-2 text-sm">
      My name is Emilien, I'm a French fullstack developer from Brittany france, mainly programming
      in node.js & rust. I love discovering new things, so I started this blog, hope you find it
      interesting!{' '}
    </p>
    <div class="flex items-center gap-4 mt-4 sm:mt-6">
      <CatButton />
      <Modal.Root>
        <Modal.Trigger class="rounded-onwo-s-sm">
          <Button
            as="div"
            class="bg-contrast dark:bg-papyrus border border-transparent dark:border-line"
            end={MailIcon}
          >
            <span class="pl-2">Reach out</span>
          </Button>
        </Modal.Trigger>
        <ReachOutForm />
      </Modal.Root>
    </div>
  </main>
);
