import { ExternalLink } from '~/ui/common/external-link';
import { ThemeSwitcherButton } from '~/ui/common/theme-switcher-button';

export const HeaderBar = () => (
  <header class="absolute flex gap-4 right-4 top-4 h-[24px]">
    <ExternalLink href="https://emje.dev/rss.xml" label="RSS" disableIcon />
    <ExternalLink href="https://github.com/emilien-jegou" label="Github" />
    <ThemeSwitcherButton />
  </header>
);
