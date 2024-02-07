import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { type JSXNode } from '@builder.io/qwik/jsx-runtime';
import type { ContextId, QRL, Signal } from '@builder.io/qwik';

/**
 * Add JSX to a portal.
 * @param name portal name.
 * @param jsx to add.
 * @param contexts to add to the portal.
 * @returns A function used for closing the portal.
 */
export type AddPortal = QRL<
  (name: string, jsx: JSXNode, contexts?: ContextPair<any>[]) => () => void
>;

// Define public API for opening up Portals
export const PortalAPI = createContextId<AddPortal>('PortalProviderAPI');

export type ContextPair<T> = { id: ContextId<T>; value: T };

// Define public API for closing Portals
export const PortalCloseAPIContextId = createContextId<QRL<() => void>>('PortalCloseAPI');

// internal context for managing portals
const PortalsContextId = createContextId<Signal<Portal[]>>('Portals');

interface Portal {
  name: string;
  jsx: JSXNode;
  close: QRL<() => void>;
  contexts: Array<ContextPair<any>>;
}

export const PortalProvider = component$(() => {
  const portals = useSignal<Portal[]>([]);
  useContextProvider(PortalsContextId, portals);

  // Provide the public API for the PopupManager for other components.
  useContextProvider(
    PortalAPI,
    $((name: string, jsx: JSXNode, contexts?: ContextPair<any>[]) => {
      const portal: Portal = {
        name,
        jsx,
        close: null!,
        contexts: [...(contexts || [])],
      };
      portal.close = $(() => {
        // eslint-disable-next-line qwik/valid-lexical-scope
        portals.value = portals.value.filter((p) => p !== portal);
      });
      portal.contexts.push({
        id: PortalCloseAPIContextId,
        value: portal.close,
      });
      // eslint-disable-next-line qwik/valid-lexical-scope
      portals.value = [...portals.value, portal];
      return portal.close;
    }),
  );

  return <Slot />;
});

type PortalProps = {
  name: string;
};

/**
 * IMPORTANT: In order for the <Portal> to correctly render in SSR, it needs
 * to be rendered AFTER the call to open portal. (Setting content to portal
 * AFTER the portal is rendered can't be done in SSR, because it is not possible
 * to return back to the <Portal/> after it has been streamed to the client.)
 */
export const Portal = component$<PortalProps>(({ name }) => {
  const portals = useContext(PortalsContextId);
  const myPortals = portals.value.filter((portal) => portal.name === name);

  return (
    <>
      {myPortals.map((portal, key) => (
        <div class="contents" key={key} data-portal={name}>
          <WrapJsxInContext jsx={portal.jsx} contexts={portal.contexts} />
        </div>
      ))}
    </>
  );
});

export const WrapJsxInContext = component$<{
  jsx: JSXNode;
  contexts: Array<ContextPair<any>>;
}>(({ jsx, contexts }) => {
  contexts.forEach(({ id, value }) => {
    // eslint-disable-next-line
    useContextProvider(id, value);
  });
  return (
    <>
      {/* Workaround: https://github.com/BuilderIO/qwik/issues/4966 */}
      {/* {jsx} */}
      {[jsx].map((jsx) => jsx)}
    </>
  );
});
