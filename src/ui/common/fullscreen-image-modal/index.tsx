import { Modal } from '../modal';
import type { Signal } from '@builder.io/qwik';

type ImageBaseProps = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

type FullscreenImageModalProps = {
  image: ImageBaseProps;
  'bind:show': Signal<boolean>;
};

export const FullScreenImageModal = (props: FullscreenImageModalProps) => (
  <Modal disableBackground bind:show={props['bind:show']}>
    <div
      class="cursor-zoom-out"
      onClick$={() => {
        props['bind:show'].value = false;
      }}
    >
      <img class="rounded-t-md h-full" {...props.image} />
      <figcaption class="rounded-b-md w-full text-center text-xs font-medium py-1 px-2 bg-black text-white">
        {props.image.alt}
      </figcaption>
    </div>
  </Modal>
);
