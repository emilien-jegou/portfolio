import { ExternalLinkIcon } from '~/ui/icons/external-link';
import { cn } from '~/utils/cn';
import type { JSXChildren } from '@builder.io/qwik';

export type HttpsLink = `https://${string}`;

type ExternalLinkProps = {
  class?: string;
  style?: any;
  href: HttpsLink;
  noreferrer?: boolean;
  disableIcon?: boolean;
} & ({ label: string; children?: never } | { label?: undefined; children: JSXChildren });

export const ExternalLink = (props: ExternalLinkProps) => (
  <a
    href={props.href}
    style={props.style}
    class={cn('flex text-default items-center font-semibold text-sm', props.class)}
    rel={['nofollow', 'noopener', 'external', props.noreferrer && 'noreferrer']
      .filter(Boolean)
      .join(' ')}
    target="_blank"
  >
    <span class="flex justify-center underline items-center gap-1">
      {props.children ? props.children : props.label}
    </span>
    {!props.disableIcon && <ExternalLinkIcon />}
  </a>
);

export const ExternalLinkInline = (props: ExternalLinkProps) => (
  <a
    href={props.href}
    style={props.style}
    class={cn('inline-block text-medium text-link hover:underline items-center', props.class)}
    rel={['nofollow', 'noopener', 'external', props.noreferrer && 'noreferrer']
      .filter(Boolean)
      .join(' ')}
    target="_blank"
  >
    {props.label ? props.label : props.children}
  </a>
);
