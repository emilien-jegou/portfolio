import { useComputed$ } from '@builder.io/qwik';
import { useWindowSize } from './use-window-size';
import type { Signal } from '@builder.io/qwik';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Operation = '>=' | '<';
type BreakpointInput = `${Operation}${Breakpoint}`;

export const useBreakpoint = (breakpoint: BreakpointInput): Signal<boolean | undefined> => {
  const size = useWindowSize();

  // eslint-disable-next-line qwik/no-use-visible-task
  return useComputed$(() => {
    if (size.value === undefined) return undefined;
    if (breakpoint[0] === '>') {
      const key = breakpoint.slice(2) as Breakpoint;
      const minWidth = breakpoints[key];
      return size.value.width >= minWidth;
    } else {
      const key = breakpoint.slice(1) as Breakpoint;
      const minWidth = breakpoints[key];
      return size.value.width < minWidth;
    }
  });
};
