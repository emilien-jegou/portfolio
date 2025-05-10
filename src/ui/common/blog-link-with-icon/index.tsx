import type { JSXOutput } from '@builder.io/qwik';
import type { XOR } from 'ts-essentials';
import { GithubIcon } from '~/ui/icons/company-icons/github';
import { ExternalLink } from '../external-link';
import type { HttpsLink } from '../external-link';
import type { IconProps } from '../svg-icon';

type VariadicIconProps = XOR<
  { iconUrl: string },
  { iconComponent: (props: IconProps) => JSXOutput }
>;

type BlogLinkWithIconProps = {
  href: HttpsLink;
  label: string;
  size?: 'md' | 'lg';
} & VariadicIconProps;

export const BlogLinkWithIcon = ({
  iconUrl,
  iconComponent,
  href,
  label,
  size = 'md',
}: BlogLinkWithIconProps) => (
  <ExternalLink style={{ fontSize: size === 'md' ? '14px' : '16px' }} href={href} disableIcon>
    {iconUrl && <img src={iconUrl} class="mt-[1px]" width={14} height={14} alt="" />}
    {iconComponent && iconComponent({ class: 'mt-[1px]', size: size === 'md' ? 'sm' : 'md' })}
    <span>{label}</span>
  </ExternalLink>
);

///// Pre-made links:

export const BlogGithubLink = (props: Omit<BlogLinkWithIconProps, 'iconUrl'>) => (
  <BlogLinkWithIcon iconComponent={GithubIcon} {...props} />
);

// TODO: make a vite plugin that automatically fetch website favicon and save them
