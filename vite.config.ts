import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikPwa } from "@qwikdev/pwa";
import svgx from "@svgx/vite-plugin-qwik";
import tsconfigPaths from "vite-tsconfig-paths";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import MarkdownParserPlugin from './utils/vite-plugin-qwik-markdown-parser';

export default defineConfig((): UserConfig => {
  return {
    plugins: [
        MarkdownParserPlugin({
          contentDirectory: './src/routes/blog',
          jsonOutputPath: './src/generated/blog-data.json',
          parse: (data) => data.data,
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
        svgx(),
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
