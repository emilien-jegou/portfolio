import { $, Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { BlogCodeHeader } from '../blog-code-header';
import type { CodeViewType } from '../blog-code-header';
import type { JSXChildren } from '@builder.io/qwik';

import './styles.css';

type BlogCodeProps = {
  language: string;
  content: JSXChildren;
};

export const BlogCode = component$((props: BlogCodeProps) => {
  const viewType = useSignal<CodeViewType>('default');

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => viewType.value);
    if (viewType.value !== 'fullscreen') return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div
      class={twMerge(
        viewType.value !== 'fullscreen' && 'mt-8 blog-code-rounding bg-[#191D24]',
        viewType.value === 'expanded' && 'lg:w-[920px] lg:-translate-x-[140px]',
        viewType.value === 'fullscreen' && 'fixed top-0 left-0 w-[100%] h-screen z-50',
      )}
    >
      <BlogCodeHeader
        language={props.language}
        view={viewType.value}
        onViewChange$={$((newViewType: CodeViewType): void => {
          viewType.value = newViewType;
        })}
      />
      <div class="blog-code-container mob-h-screen h-full">
        <Slot />
      </div>
    </div>
  );
});
