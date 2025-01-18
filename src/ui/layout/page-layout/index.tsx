import { ThemeSwitcherButton } from '~/ui/common/theme-switcher-button';
import { AppIcon } from '../app-icon';
import { FooterBar } from '../footer-bar';
import type { JSXChildren } from '@builder.io/qwik';

export type PageLayoutProps = {
  children: JSXChildren;
};

export const PageLayout = (props: PageLayoutProps) => (
  <div class="overflow-hidden w-screen py-6">
    <div class="absolute lg:fixed flex items-center justify-between w-full px-4 sm:px-8 ">
      <AppIcon fg={{ r: 84, g: 3, b: 149 }} />
      <ThemeSwitcherButton />
    </div>
    <div class="relative mx-auto custom-container px-4 sm:px-8 ">
      <section class="mdx my-8 mb-32">{props.children}</section>
    </div>
    <FooterBar />
  </div>
);
