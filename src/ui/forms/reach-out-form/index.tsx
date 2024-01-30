import { Modal } from '~/ui/common/modal';
import { ReachOutFormLogic } from './form-logic';
import type { Signal } from '@builder.io/qwik';

type ReachOutFormProps = {
  'bind:show': Signal<boolean>;
};

export const ReachOutForm = (props: ReachOutFormProps) => {
  return (
    <Modal bind:show={props['bind:show']}>
      <h2 class="mb-6 sm:mb-8 mt-10 text-xl sm:text-3xl font-bold max-w-[480px] leading-relaxed">
        Need help with anything? Get in touch
      </h2>
      <ReachOutFormLogic
        disabled={false}
        loading={false}
        onSubmit$={(data: any) => {
          console.info('there', data);
        }}
        onCancel$={() => {
          props['bind:show'].value = false;
        }}
      />
    </Modal>
  );
};
