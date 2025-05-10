import type { JSXChildren } from '@builder.io/qwik';
import { Tooltip } from '~/ui/common/tooltip';
import HelpCircle from '~/ui/icons/lib/help-circle-contained.svg?component';
import { cn } from '~/utils/cn';
import type { Classes } from '~/utils/types';

export type LabelProps = {
  text: string;
  info?: JSXChildren;
  required?: boolean;
  classes: Classes<'root'>;
};

export const Label = ({ classes, text, info, required }: LabelProps) => (
  <label class={cn('w-full flex gap-4 items-center', classes.root)}>
    <span class="font-medium text-sm">
      {text}
      {required ? ' *' : ''}
    </span>
    {info && (
      <Tooltip classes={{ root: 'ml-1', tooltip: 'text-sm text-lead' }} info={info}>
        <HelpCircle />
      </Tooltip>
    )}
  </label>
);
