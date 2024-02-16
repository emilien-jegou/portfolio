import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { GrayMatterFile } from 'gray-matter';

type ParseFn = (data: GrayMatterFile<string>) => unknown;

type BlogMdxLoaderOptions = {
  contentDirectory: string;
  jsonOutputPath: string;
  parse: ParseFn;
};

/*
 * This loader search and extract all frontmatter information from a directory
 * and save it as a json file
 */
export default function (options: BlogMdxLoaderOptions) {
  const readAndSave = () => {
    const frontmatterData = readFrontmatterFromDirectory(options.contentDirectory, options.parse);
    fs.writeFileSync(options.jsonOutputPath, JSON.stringify(frontmatterData, null, 2));
  };
  return {
    name: 'vite-plugin-qwik-static-frontmatter-loader',
    enforce: 'pre',
    buildStart() {
      (this as any).addWatchFile(options.contentDirectory);
      readAndSave();
    },
    handleHotUpdate({ file }: any) {
      if (!file.startsWith(path.resolve(options.contentDirectory))) return;
      readAndSave();
    },
  };
}

function readFrontmatterFromDirectory(directory: string, parse: ParseFn) {
  const paths = fs.readdirSync(directory);
  const frontmatterData: any = {};

  const folders = paths.filter((p) => fs.statSync(path.join(directory, p)).isDirectory());

  folders.forEach((folder) => {
    const fullPath = path.join(directory, folder, 'index.mdx');
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const data = matter(fileContent);

    frontmatterData[folder] = parse(data);
  });

  return frontmatterData;
}
