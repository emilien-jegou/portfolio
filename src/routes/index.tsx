import { type DocumentHead } from '@builder.io/qwik-city';
import articles from '~/generated/blog-data.json';
import { ThemeSwitcherButton } from '~/ui/common/theme-switcher-button';
import { Wave } from '~/ui/common/wave';
import { AboutMe } from '~/ui/layout/about-me';
import { AppIcon } from '~/ui/layout/app-icon';
import { FooterRaw } from '~/ui/layout/footer-bar';
import { HeaderBar } from '~/ui/layout/header-bar';
import { HeroCard } from '~/ui/layout/hero-card';
import { LatestArticles } from '~/ui/layout/latest-articles';
import { buildHead } from '~/utils/build-head';

export type Article = {
  slug: string;
  title: string;
  thumbnailUrl: string;
  coverUrl?: string;
  description: string;
  createdAt: number;
};

const sortedArticles: Article[] = Object.entries(articles)
  .map(([slug, { data }]: any) => ({ slug, ...data }))
  .sort((a: any, b: any) => b.createdAt - a.createdAt);

const heroArticleIdx = sortedArticles.findIndex((a) => !!a.coverUrl);
const heroArticle = sortedArticles[heroArticleIdx];

sortedArticles.splice(heroArticleIdx, 1);

export default () => {
  return (
    <div class="grid overflow-hidden grid-flow-row xl:flex gap-4 xl:gap-8 px-4 sm:px-8 flex-col xl:flex-row w-screen xl:mob-h-screen py-6">
      <HeaderBar class="hidden xl:block" />
      <div class="flex items-center xl:items-start justify-between w-full xl:w-fit">
        <div class="flex gap-2 items-center  xl:items-start">
          <AppIcon fg={{ r: 84, g: 3, b: 149 }} />
          <p class="ml-2 italic hidden sm:block xl:hidden">
            "Computers are useless. They can only give you answers."
            <br /> — Pablo Picasso
          </p>
        </div>
        <div class="flex gap-4 xl:hidden">
          <ThemeSwitcherButton />
        </div>
      </div>
      <HeroCard
        class="h-[600px] grid-col-1 xl:h-auto"
        slug={`/blog/${heroArticle.slug}`}
        title={heroArticle.title}
        category="tools"
        description={heroArticle.description}
        coverUrl={heroArticle.coverUrl!}
        date={new Date(heroArticle.createdAt)}
      />
      <div class="relative z-0 grid grid-cols-1 lg:grid-cols-[400px_auto] shrink-0 xl:flex xl:flex-col gap-4 h-full w-full xl:w-[500px] 2xl:w-[600px]">
        <AboutMe class="w-full mt-4 xl:w-auto xl:mt-8 mb-4 xl:mr-8" />
        <div class="absolute w-screen h-full pointer-events-none">
          <div class="relative">
            <Wave
              timeSec={30}
              class="absolute pointer-events-none w-[400px] h-[470px] lg:w-[350px] lg:h-[400px] bg-radial mix-blend-darken dark:mix-blend-lighten from-transparent from-60% to-[#bad9ff] dark:to-[blue]"
            />
            <Wave
              timeSec={60}
              class="absolute pointer-events-none w-[400px] h-[470px] lg:w-[350px] lg:h-[400px] bg-radial mix-blend-darken dark:mix-blend-lighten from-transparent from-60% to-[#e9ccff] dark:to-[purple]"
            />
          </div>
        </div>
        <LatestArticles
          class="shrink-1 overflow-auto w-full xl:w-auto"
          latestArticles={sortedArticles}
        />
        <FooterRaw />
      </div>
    </div>
  );
};

export const head: DocumentHead = buildHead({
  title: 'Emilien Jegou, Fullstack engineer blog',
  description:
    'My personal blog, where I talk about the technology I love, explore new areas and share my programming knowledge.',
  shareImage: '/share.png',
});
