import { ThemeSwitcherButton } from '~/ui/common/theme-switcher-button';
import { cn } from '~/utils/cn';

type HeaderBarProps = { class?: string };
export const HeaderBar = (props: HeaderBarProps) => (
  <header class={cn('absolute z-40 flex gap-4 right-4 top-4 h-[24px]', props.class)}>
    <ThemeSwitcherButton />
  </header>
);
