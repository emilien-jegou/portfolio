type BuildHead = {
  title: string;
  description: string;
  shareImage: string;
};

export const buildHead = (data: BuildHead) => ({
  title: data.title,
  meta: [
    {
      name: 'description',
      content: data.description,
    },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://emje.dev/' },
    { name: 'og:title', content: `${data.title} - emje.dev` },
    {
      name: 'og:description',
      content: data.description,
    },
    { name: 'og:image', content: data.shareImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://emje.dev/' },
    { name: 'twitter:title', content: `${data.title} - emje.dev` },
    {
      name: 'twitter:description',
      content: data.description,
    },
    { name: 'twitter:image', content: data.shareImage },
  ],
});
