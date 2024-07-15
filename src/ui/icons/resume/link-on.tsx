import { twMerge } from "tailwind-merge";

type LinkOnIconProps = {
  class?: string;
}

export const LinkOnIcon = (props: LinkOnIconProps) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={twMerge("ai ai-LinkOn", props.class)} style="--darkreader-inline-stroke: currentColor;" data-darkreader-inline-stroke=""><path d="M9 12h6" /><path d="M15 6h1a6 6 0 0 1 0 12h-1" /><path d="M9 18H8A6 6 0 0 1 8 6h1" /></svg>

