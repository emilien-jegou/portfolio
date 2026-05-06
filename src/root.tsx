import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { RouterHead } from './ui/logics/router-head';

import './global.css';
import { RootProviders } from './providers';

//<div class="absolute z-[-1] top-0 left-0 w-screen h-[32vh] bg-pattern-checked pattern-subtlest" />
//<div class="absolute z-[-1] top-[22vh] left-0 w-screen h-[10vh] bg-linear-to-b from-transparent to-bg-paper" />

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
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="app">
        <RootProviders>
          <RouterOutlet />
        </RootProviders>
      </body>
    </QwikCityProvider>
  );
};
