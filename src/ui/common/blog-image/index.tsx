import { component$, useSignal } from '@builder.io/qwik';
import { ArrowExpandIcon } from '~/ui/icons/arrow-expand';
import { FullScreenImageModal } from '../fullscreen-image-modal';

type BlogImageProps = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

export const BlogImage = component$((props: BlogImageProps) => {
  const showFullscreenModal = useSignal(false);

  return (
    <div class="relative mt-6">
      <img class="md:hidden rounded-md" {...props} />
      <div
        class="hidden md:block cursor-zoom-in"
        onClick$={() => {
          showFullscreenModal.value = true;
        }}
      >
        <img class="rounded-md" {...props} />
        <button class="absolute cursor-pointer bottom-2 right-2 p-1 rounded-sm bg-[#000]/20 hover:bg-[#000]/40">
          <ArrowExpandIcon class="text-white" />
        </button>
      </div>
      <FullScreenImageModal bind:show={showFullscreenModal} image={props} />
    </div>
  );
});
