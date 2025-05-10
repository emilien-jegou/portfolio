import type { JSXChildren } from '@builder.io/qwik';
import { ThemeSwitcherButton } from '~/ui/common/theme-switcher-button';
import { AppIcon } from '../app-icon';
import { FooterBar } from '../footer-bar';

export type PageLayoutProps = {
  children: JSXChildren;
};

export const PageLayout = (props: PageLayoutProps) => (
  <div class="overflow-hidden w-screen py-6">
    <div class="absolute lg:fixed z-10 flex items-center justify-between w-full px-4 sm:px-8 ">
      <AppIcon fg={{ r: 84, g: 3, b: 149 }} />
      <ThemeSwitcherButton />
    </div>
    <section class="relative my-8 px-4 sm:px-8 ">{props.children}</section>
    <FooterBar />
  </div>
);
