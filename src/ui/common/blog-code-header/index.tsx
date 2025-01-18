import { $ } from '@builder.io/qwik';
import { ArrowExpandIcon } from '~/ui/icons/arrow-expand';
import { ArrowFitIcon } from '~/ui/icons/arrow-fit';
import { ArrowFitInIcon } from '~/ui/icons/arrow-fit-in';
import { ArrowMinimizeIcon } from '~/ui/icons/arrow-minimize';
import { cn } from '~/utils/cn';
import type { JSXChildren, PropFunction } from '@builder.io/qwik';

export type CodeViewType = 'default' | 'expanded' | 'fullscreen';

type BlogCodeHeaderProps = {
  language: string;
  view: CodeViewType;
  onViewChange$: PropFunction<(newView: CodeViewType) => void>;
};

export const BlogCodeHeader = (props: BlogCodeHeaderProps) => (
  <div
    style={{
      borderTopLeftRadius: 'var(--code-blog-rounding, 0px)',
      borderTopRightRadius: 'var(--code-blog-rounding, 0px)',
    }}
    class="flex bg-[#030711] text-[white] border border-[#10141e] rounded-t-md text-xs gap-4 justify-between px-3 py-1 items-center"
  >
    <span class="select-none">{props.language}</span>
    <div class="flex gap-2">
      <HeaderInlineIconButton
        class="hidden lg:inline-block"
        onClick$={$(() => props.onViewChange$(props.view === 'expanded' ? 'default' : 'expanded'))}
      >
        {props.view === 'expanded' ? <ArrowFitInIcon size="lg" /> : <ArrowFitIcon size="lg" />}
      </HeaderInlineIconButton>
      <HeaderInlineIconButton
        class="inline-block lg:hidden"
        onClick$={$(() =>
          props.onViewChange$(props.view === 'fullscreen' ? 'default' : 'fullscreen'),
        )}
      >
        {props.view === 'fullscreen' ? (
          <ArrowMinimizeIcon size="lg" />
        ) : (
          <ArrowExpandIcon size="lg" />
        )}
      </HeaderInlineIconButton>
      {/*<HeaderInlineIconButton onClick$={$((): void => {})}>
        <ClipboardFilledIcon class="mt-[1px]" />
      </HeaderInlineIconButton>*/}
    </div>
  </div>
);

type HeaderInlineIconButtonProps = {
  class?: string;
  onClick$?: PropFunction<() => void>;
  children: JSXChildren;
};

const HeaderInlineIconButton = (props: HeaderInlineIconButtonProps) => (
  <button
    class={cn('text-white rounded-full hover:bg-white/20 p-1', props.class)}
    onClick$={props.onClick$}
  >
    {props.children}
  </button>
);
