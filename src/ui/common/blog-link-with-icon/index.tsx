import { ExternalLink } from '../external-link';
import type { HttpsLink } from '../external-link';

type BlogLinkWithIconProps = {
  iconUrl: string;
  href: HttpsLink;
  label: string;
  size?: 'md' | 'lg';
};

export const BlogLinkWithIcon = ({ iconUrl, href, label, size = 'md' }: BlogLinkWithIconProps) => (
  <ExternalLink style={{ fontSize: size === 'md' ? '14px' : '16px' }} href={href} disableIcon>
    <img src={iconUrl} class="mt-[1px]" width={14} height={14} alt="" />
    <span>{label}</span>
  </ExternalLink>
);

///// Pre-made links:

export const BlogGithubLink = (props: Omit<BlogLinkWithIconProps, 'iconUrl'>) => (
  <BlogLinkWithIcon iconUrl="/company-icons/github.png" {...props} />
);

// TODO: make a vite plugin that automatically fetch website favicon and save them
