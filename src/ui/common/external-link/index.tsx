import { ExternalLinkIcon } from '~/ui/icons/external-link';

export type HttpsLink = `https://${string}`;

type ExternalLinkProps = {
  href: HttpsLink;
  label: string;
  noreferrer?: boolean;
};

export const ExternalLink = (props: ExternalLinkProps) => (
  <a
    href={props.href}
    class="flex items-center font-semibold text-sm"
    rel={['nofollow', 'noopener', 'external', props.noreferrer && 'noreferrer']
      .filter(Boolean)
      .join(' ')}
    target="_blank"
  >
    <span class="underline">{props.label}</span>
    <ExternalLinkIcon />
  </a>
);
