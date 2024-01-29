import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
// eslint-disable-next-line import/no-unresolved
import { qwikPwa } from "@qwikdev/pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import FrontmatterPlugin from './utils/vite-plugin-qwik-static-frontmatter-loader';


import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig((): UserConfig => {
  return {
    plugins: [
        FrontmatterPlugin({
          contentDirectory: './src/routes/blog',
          jsonOutputPath: './src/generated/blog-data.json',
        }),
        qwikCity({
          mdxPlugins: {
              rehypeSyntaxHighlight: true,
              remarkGfm: true,
              rehypeAutolinkHeadings: true,
          },
          mdx: {
            rehypePlugins: [
              // Plugins can now be added manually to use a different configuration
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }),
        qwikVite(),
         qwikPwa({}),
        tsconfigPaths()
    ],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
