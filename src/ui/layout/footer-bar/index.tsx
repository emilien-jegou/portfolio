import { ExternalLink } from '~/ui/common/external-link';
import { Link } from '~/ui/common/link';

export const FooterBar = () => (
  <div class="max-w-[640px] px-4 sm:px-0 mb-8 mx-auto">
    <FooterRaw />
  </div>
);

export const FooterRaw = () => (
  <div class="z-10 col-span-full h-min py-4 bg-parchment dark:bg-paper pattern-subtler border border-line bg-pattern-dotted rounded-onwo-s-sm flex w-full place-content-evenly">
    <div class="mx-auto gap-2 gap-x-4 grid sm:px-0 grid-cols-[auto_auto] sm:flex w-full place-content-evenly">
      <ExternalLink href="https://emje.dev/rss.xml" label="RSS" disableIcon />
      <ExternalLink href="https://github.com/emilien-jegou" label="Github" />
      <Link href="/privacy" class="whitespace-nowrap" label="privacy policy" />
      <ExternalLink href="https://emje.dev/sitemap.xml" label="sitemap" disableIcon />
    </div>
  </div>
);
