import { twMerge } from 'tailwind-merge';

type BlogSeparatorProps = { class?: string };

export const BlogSeparator = (props: BlogSeparatorProps) => (
  <hr class={twMerge('my-12 sm:my-16', props.class)} />
);
