import { ServiceWorkerRegister } from '@builder.io/qwik-city';
import { CookieBannerProvider } from './cookie-banner-provider';
import { InitialColorModeProvider } from './initial-color-mode-provider';
import { Portal, PortalProvider } from './portal';
import { ThemeContextProvider } from './theme-provider';
import type { JSXChildren } from '@builder.io/qwik';

type RootProvidersProps = { children: JSXChildren }
export const RootProviders = (props: RootProvidersProps) => (
  <ThemeContextProvider>
    <CookieBannerProvider>
      <InitialColorModeProvider />
      <PortalProvider>
        {props.children}
        <ServiceWorkerRegister />
        <Portal name="toast" />
      </PortalProvider>
    </CookieBannerProvider>
  </ThemeContextProvider>
)
