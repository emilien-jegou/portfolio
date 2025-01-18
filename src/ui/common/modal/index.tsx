import { component$, Slot } from '@builder.io/qwik';
import { Modal as HModal, ModalContent } from '@qwik-ui/headless';
import { cn } from '~/utils/cn';
import type { ModalProps as HModalProps } from '@qwik-ui/headless';

import './styles.css';

type ModalProps = {
  disableBackground?: boolean;
} & HModalProps;

export const Modal = component$((props: ModalProps) => (
  <HModal
    {...props}
    class={cn(
      'modal-animation bg-transparent',
      !props.disableBackground &&
        'bg-default left-1/2 top-[32px] lg:top-[64px] -translate-x-1/2 w-full border p-6 shadow-lg sm:rounded-lg sm:max-w-[640px]',
    )}
  >
    <ModalContent>
      <Slot />
    </ModalContent>
  </HModal>
));
