import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { CookieBannerProvider } from './providers/cookie-banner-provider';
import { InitialColorModeProvider } from './providers/initial-color-mode-provider';
import { Portal, PortalProvider } from './providers/portal';
import { ThemeContextProvider } from './providers/theme-provider';
import { RouterHead } from './ui/logics/router-head';

import './global.css';

export default () => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <div class="absolute z-[-1] top-0 left-0 w-screen h-[32vh] bg-pattern-checked pattern-subtlest" />
        <div class="absolute z-[-1] top-[22vh] left-0 w-screen h-[10vh] bg-linear-to-b from-transparent to-bg-paper" />
        <ThemeContextProvider>
          <CookieBannerProvider>
            <InitialColorModeProvider />
            <PortalProvider>
              <RouterOutlet />
              <ServiceWorkerRegister />
              <Portal name="toast" />
            </PortalProvider>
          </CookieBannerProvider>
        </ThemeContextProvider>
      </body>
    </QwikCityProvider>
  );
};
