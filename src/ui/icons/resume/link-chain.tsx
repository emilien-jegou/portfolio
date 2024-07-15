import { twMerge } from "tailwind-merge";

type LinkChainIconProps = {
  class?: string;
}

export const LinkChainIcon = (props: LinkChainIconProps) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={twMerge("ai ai-LinkChain", props.class)} style="--darkreader-inline-stroke: currentColor;" data-darkreader-inline-stroke=""><path d="M13.544 10.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177" /><path d="M10.456 13.544a4.368 4.368 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823" /></svg>
