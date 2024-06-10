import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { InitialColorModeProvider } from './providers/initial-color-mode-provider';
import { Portal, PortalProvider } from './providers/portal';
import { RouterHead } from './ui/logics/router-head';

import './global.css';
import './fonts.css';

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
        <InitialColorModeProvider />
        <PortalProvider>
          <RouterOutlet />
          <ServiceWorkerRegister />
          <Portal name="toast" />
        </PortalProvider>
      </body>
    </QwikCityProvider>
  );
};
