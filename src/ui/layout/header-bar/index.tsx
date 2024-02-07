import { ExternalLink } from '~/ui/common/external-link';

export const HeaderBar = () => (
  <header class="absolute flex gap-4 right-4 top-4">
    <ExternalLink href="https://emje.dev/rss.xml" label="RSS" disableIcon />
    <ExternalLink href="https://github.com/emilien-jegou" label="Github" />
  </header>
);
