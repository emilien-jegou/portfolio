import { component$, useComputed$ } from '@builder.io/qwik';
import { format } from 'date-fns';
import { cn } from '~/utils/cn';

type HeroCardProps = {
  class?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  coverUrl: string;
  date: Date;
};

export const HeroCard = (props: HeroCardProps) => (
  <a
    class={cn('h-full relative rounded-lg bg-subtle w-full', props.class)}
    href={props.slug}
    style={{
      backgroundImage: `url('${props.coverUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div
      class="absolute transition-colors duration-500 top-0 rounded-lg left-0 w-full h-full"
      style={{
        background: 'var(--hero-gradient)',
        mixBlendMode: 'color',
        opacity: '0.95',
        pointerEvents: 'none',
      }}
    />
    <div
      class="absolute transition-colors duration-500 top-0 rounded-lg left-0 w-full h-full"
      style={{
        background: 'var(--hero-gradient)',
        mixBlendMode: 'screen',
        opacity: '0.3',
        pointerEvents: 'none',
      }}
    />
    <HeroCardDate class="top-4 left-4 absolute" date={props.date} />
    <div class="absolute right-4 bottom-4 w-full pl-8 sm:pl-0 sm:max-w-[45%] sm:min-w-[400px]">
      <h3 class="text-sm bg-black text-white text-lg flex gap-4 items-center px-6 py-3 translate-y-[16px] rounded-lg font-medium w-min">
        <div class="w-2 h-2 mt-1 rounded-full bg-[pink]" />
        <span>{props.category}</span>
      </h3>
      <h3 class="bg-black text-white text-2xl lg:text-4xl px-6 py-3 rounded-lg font-medium mt-1 w-full">
        {props.title}
      </h3>
      <p class="leading-5 mt-2 rounded-lg text-black bg-white lg:text-lg leading-relaxed px-6 py-3 rounded-lg w-full">
        {props.description}
        <span class="block mt-2 underline">Read now</span>
      </p>
    </div>
  </a>
);

type HeroCardDateProps = { class?: string; date: Date };

const HeroCardDate = component$((props: HeroCardDateProps) => {
  const d = useComputed$(() => format(props.date, 'MMM dd, yyyy'));
  return (
    <p
      class={cn(
        'bg-white rounded-full py-1 font-mono text-[black] font-medium px-4 w-fit text-sm',
        props.class,
      )}
    >
      {d.value}
    </p>
  );
});
