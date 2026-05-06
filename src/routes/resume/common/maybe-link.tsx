import { HTMLElementAttrs, JSXChildren, PropsOf } from "@builder.io/qwik";

type MaybeLinkProps =
  | { href?: undefined, children: JSXChildren } & PropsOf<'div'>
  | { href: string, children: JSXChildren } & PropsOf<'a'>;
export const MaybeLink = ({ href, children, ...props }: MaybeLinkProps) =>
  href ?
    <a {...props as any} href={href}>{children}</a> :
    <div {...props as any}>{children}</div>;
