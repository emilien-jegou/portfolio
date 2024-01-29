import type { ContentHeading } from '@builder.io/qwik-city';

type TableOfContentsProps = {
  headings: ContentHeading[];
};

export const TableOfContents = (props: TableOfContentsProps) => {
  return (
    <nav class="hidden 2xl:block absolute h-full left-[100%] ml-40 w-[240px] mt-12">
      <div class="flex gap-2 text-subtler flex-col top-10 sticky border-l pl-6 py-2 w-full">
        <a href="#intro" class="flex gap-1 text-sm">
          Introduction
        </a>
        {props.headings
          .filter((h) => h.level <= 2)
          .map((heading, idx) => (
            <a
              class="text-sm text-subtler whitespace-nowrap overflow-hidden text-ellipsis"
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
