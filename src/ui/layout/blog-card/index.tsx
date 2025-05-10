import { component$, useComputed$ } from '@builder.io/qwik';
import { formatDistance } from 'date-fns';

type BlogCardProps = {
  class?: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  date: Date;
};

const BlogCardDate = component$(({ date }: { date: Date }) => {
  const d = useComputed$(() => formatDistance(date, new Date(), { addSuffix: true }));
  return <p class="text-graphite text-xs">{d.value}</p>;
});

export const BlogCard = (props: BlogCardProps) => (
  <a href={props.slug} class={props.class}>
    <div class="flex items-center justify-between gap-4 sm:gap-8">
      <div>
        <div class="flex items-center justify-between gap-4">
          <div>
            <BlogCardDate date={props.date} />
            <h3 class="text-sm font-medium mt-1 sm:mt-2">{props.title}</h3>
          </div>
          <img
            class="sm:hidden object-cover rounded-full border border-line w-[32px] shadow-sm h-[32px]"
            src={props.thumbnailUrl}
            alt="blog card image"
            width={32}
            height={32}
          />
        </div>
        <p class="leading-5 mt-2 text-graphite text-sm pr-6">{props.description}</p>
        <p class="block mt-1 font-medium underline text-sm">Read now</p>
      </div>
      <div class="shrink-0 hidden sm:block">
        <img
          class="object-cover rounded-2xl w-[102px] shadow-sm h-[102px]"
          src={props.thumbnailUrl}
          alt="blog card image"
          width={122}
          height={122}
        />
      </div>
    </div>
  </a>
);
