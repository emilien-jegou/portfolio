# Portfolio

A minimalist blog using the qwik framework and tailwind css library.

## Introduction

This is my personal portfolio as shown on [emje.dev](emje.dev), it is fully open source with the exception of the blog articles so feel free to copy it over. Everything has been coded with qwik.js, no third party components libraries are used in this project but some styles of shadcn were copied over.

> ⚠️ This blog is still in active development, be prepared for potential roadblocks and shortcomings .

## Cloudflare setup

I use Cloudflare pages for deployment, the contact form also use a D1 store. I haven't written any documentation on the cloudflare integration but you will find the api logic in the `api` directory, this with [the cloudflare D1 documentation](https://developers.cloudflare.com/d1/) would be a good place to get started.

## Notable features and roadmap

- [x] PWA capabilities
- [x] RSS Feed
- [x] Contact form
- [x] Table of contents on article page
- [x] Various utilities on article (code block, fullscreen images, external links)
- [x] Basic SEO capabilities and search engine indexing
- [x] Automatic inclusion of article in the sitemap
- [ ] Dark theme
- [ ] verify the website accessibility rating
    - [ ] 100 lighthouse score on all pages
    - [ ] verify aria labels
    - [ ] prefer no animation
- [ ] "Swipe" action for toasts
- [ ] Image carousel
- [ ] Anonymous analytics
- [ ] 404 page
