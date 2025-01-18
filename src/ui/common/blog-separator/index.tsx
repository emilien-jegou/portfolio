import { cn } from '~/utils/cn';

type BlogSeparatorProps = { class?: string };

export const BlogSeparator = (props: BlogSeparatorProps) => (
  <hr class={cn('my-12 sm:my-16', props.class)} />
);
