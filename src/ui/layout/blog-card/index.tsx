import { formatDistance } from 'date-fns';
import { twMerge } from 'tailwind-merge';

type BlogCardProps = {
  class?: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  date: Date;
};

export const BlogCard = (props: BlogCardProps) => (
  <a href={props.slug}>
    <div class={twMerge('flex items-center gap-8 sm:gap-20', props.class)}>
      <div>
        <p class="text-subtler text-sm">
          {formatDistance(props.date, new Date(), { addSuffix: true })}
        </p>
        <h3 class="font-medium mt-1">{props.title}</h3>
        <p class="leading-6 mt-2 text-subtle text-sm max-w-[480px] sm:max-w-auto pr-6">
          {props.description}
        </p>
        <p class="block mt-2 font-medium underline text-sm">Read now</p>
      </div>
      <div class="hidden sm:block shrink-0">
        <img
          class="object-cover rounded-2xl w-[122px] shadow h-[122px]"
          src={props.thumbnailUrl}
          alt="blog card image"
          width={122}
          height={122}
        />
      </div>
    </div>
  </a>
);
