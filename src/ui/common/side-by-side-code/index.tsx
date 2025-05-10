import type { JSXChildren } from '@builder.io/qwik';
import { BlogCode } from '../blog-code';

type SideBySideCodeProps = {
  language: string;
  disableExpand?: boolean;
  children: [JSXChildren, JSXChildren];
};

export const SideBySideCode = (props: SideBySideCodeProps) => {
  return (
    <div class="grid grid-cols-2 mdx-expand">
      <BlogCode disableExpand language={props.language}>
        {props.children[0]}
      </BlogCode>
      <BlogCode disableExpand language={props.language}>
        {props.children[1]}
      </BlogCode>
    </div>
  );
};
