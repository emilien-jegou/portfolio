import { SvgIcon } from '../common/svg-icon';
import type { IconProps } from '../common/svg-icon';

export const DismissIcon = (props: IconProps) => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="currentColor"
      d="m2.589 2.716l.057-.07a.5.5 0 0 1 .638-.057l.07.057L8 7.293l4.646-4.647a.5.5 0 0 1 .708.708L8.707 8l4.647 4.646a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L8 8.707l-4.646 4.647a.5.5 0 0 1-.708-.708L7.293 8L2.646 3.354a.5.5 0 0 1-.057-.638l.057-.07z"
    />
  </SvgIcon>
);
