import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { Portal, PortalProvider } from './providers/portal';
import { RouterHead } from './ui/logics/router-head';

import './global.css';
import './fonts.css';

export default component$(() => {
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
        <PortalProvider>
          <RouterOutlet />
          <ServiceWorkerRegister />
          <Portal name="toast" />
        </PortalProvider>
      </body>
    </QwikCityProvider>
  );
});
