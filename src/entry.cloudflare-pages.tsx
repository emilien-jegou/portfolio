/* eslint-disable import/no-unresolved */
/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Cloudflare Pages when building for production.
 *
 * Learn more about the Cloudflare Pages integration here:
 * - https://qwik.builder.io/docs/deployments/cloudflare-pages/
 *
 */
import {
  createQwikCity,
  type PlatformCloudflarePages,
} from '@builder.io/qwik-city/middleware/cloudflare-pages';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';

declare global {
  interface QwikCityPlatform extends PlatformCloudflarePages {}
}

const qwikFetch = createQwikCity({ render, qwikCityPlan, manifest });

export type ApiFunction = (
  _request: PlatformCloudflarePages['request'],
  _env: Record<string, any>,
  _ctx: PlatformCloudflarePages['ctx'],
) => Promise<Response>;

const fetch = async (
  request: PlatformCloudflarePages['request'],
  env: Record<string, any> & {
    ASSETS: {
      fetch: (req: Request) => Response;
    };
  },
  ctx: PlatformCloudflarePages['ctx'],
) => {
  const url = new URL(request.url);

  const f = async <T extends { run: ApiFunction }>(m: Promise<T>) =>
    (await m).run(request, env, ctx);

  const apiRouter = async () => {
    switch (url.pathname) {
      case '/api/contact':
        return f(import('./api/contact'));
    }
    return Promise.resolve(new Response(null, { status: 404 }));
  };

  if (url.pathname.startsWith('/api')) {
    if (request.method !== 'POST') return new Response(null, { status: 404 });
    try {
      return await apiRouter();
    } catch (e) {
      console.error(e);
      return new Response(null, { status: 500 });
    }
  }

  return qwikFetch(request, env, ctx);
};

export { fetch };
