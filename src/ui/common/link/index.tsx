import type { JSXChildren } from '@builder.io/qwik';
import { Link as QwikLink } from '@builder.io/qwik-city';
import { cn } from '~/utils/cn';

type LinkProps = {
  class?: string;
  style?: any;
  href: `/${string}`;
} & ({ label: string; children?: never } | { label?: never; children: JSXChildren });

export const Link = (props: LinkProps) => (
  <QwikLink
    href={props.href}
    style={props.style}
    class={cn('flex text-ink items-center font-semibold text-sm', props.class)}
  >
    <span class="flex justify-center underline items-center gap-1">
      {props.children ?? props.label}
    </span>
  </QwikLink>
);
