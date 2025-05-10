import { component$ } from '@builder.io/qwik';
import { Modal } from '@onwo/ui';
import { CustomPanel } from '~/ui/forms/reach-out-form/custom-panel';
import { ArrowExpandIcon } from '~/ui/icons/arrow-expand';

type BlogImageProps = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

const BlogImageContent = ({ showExpand, ...props }: BlogImageProps & { showExpand?: boolean }) => (
  <div>
    <img class="border rounded-onwo-s-sm" {...props} />
    {showExpand && (
      <div class="absolute bottom-2 right-2 p-1 rounded-onwo-s-xs bg-[#000]/20 hover:bg-[#000]/40">
        <ArrowExpandIcon class="text-white" />
      </div>
    )}
  </div>
);

export const BlogImage = component$((props: BlogImageProps) => {
  return (
    <Modal.Root class="relative mt-6">
      <CustomPanel class="max-w-[90vw] sm:max-w-[70vw] border-0">
        <Modal.Close class="w-full h-full">
          <div class="cursor-zoom-out">
            <img class="rounded-t-md h-full max-h-[80vh] w-full" {...props} />
            <figcaption class="rounded-b-md w-full text-center text-xs font-medium py-1 px-2 bg-black text-white">
              {props.alt}
            </figcaption>
          </div>
        </Modal.Close>
      </CustomPanel>
      <Modal.Trigger class="hidden md:block cursor-zoom-in">
        <BlogImageContent showExpand {...props} />
      </Modal.Trigger>
      <div class="block md:hidden">
        <BlogImageContent {...props} />
      </div>
    </Modal.Root>
  );
});
