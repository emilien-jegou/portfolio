import { SvgIcon } from '../common/svg-icon';
import type { IconProps } from '../common/svg-icon';

export const CheckmarkFilledIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2m2.12 4.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706"
    />
  </SvgIcon>
);
