import type { ContentHeading } from '@builder.io/qwik-city';
import { cn } from '@onwo/ui';

type TableOfContentsProps = {
  headings: ContentHeading[];
  class?: string;
};

export const TableOfContents = (props: TableOfContentsProps) => {
  return (
    <nav
      class={cn('hidden 2xl:block absolute h-full left-[100%] ml-40 w-[240px] mt-12', props.class)}
    >
      <div class="flex text-sm gap-2 text-graphite flex-col top-10 sticky border-l pl-6 pt-1 pb-2 w-full">
        <p class="text-ink text-xs font-semibold pb-2"> On the page </p>
        <a href="#intro" class="flex gap-1 text-sm">
          Introduction
        </a>
        {props.headings
          .filter((h) => h.level <= 2)
          .map((heading, idx) => (
            <a
              class="text-sm text-graphite whitespace-nowrap overflow-hidden text-ellipsis"
              key={idx}
              href={`#${heading.id}`}
            >
              {heading.text.split(',')[0]}
            </a>
          ))}
      </div>
    </nav>
  );
};
