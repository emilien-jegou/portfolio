import { formatDistance, formatRelative, subDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';

type BlogCardProps = {
  class?: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
};

export const BlogCard = (props: BlogCardProps) => (
  <div class={twMerge('flex items-center gap-24', props.class)}>
    <div>
      <p class="text-subtler text-sm">
        {formatDistance(props.date, new Date(), { addSuffix: true })}
      </p>
      <h3 class="font-medium mt-1">{props.title}</h3>
      <p class="leading-6 mt-2 text-subtle text-sm">{props.description}</p>
      <a href={props.slug} class="block mt-2 font-medium underline text-sm">
        Read now
      </a>
    </div>
    <div class="shrink-0">
      <img
        class="object-cover rounded-2xl w-[122px] shadow h-[122px]"
        src={props.imageUrl}
        alt="blog card image"
        width={122}
        height={122}
      />
    </div>
  </div>
);
