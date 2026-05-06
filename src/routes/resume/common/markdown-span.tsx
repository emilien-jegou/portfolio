import { component$, PropsOf } from '@builder.io/qwik';
import { useMarkdown } from '../hooks/use-markdown';

export const MarkdownSpan = component$(({ text, ...props }: { text: string; } & PropsOf<'span'>) => {
  const safeHtml = useMarkdown(text);
  return <span {...props} dangerouslySetInnerHTML={safeHtml.value} />
});

