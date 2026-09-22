import type { Metadata } from "next";

import {
  localeFromRoute,
  staticLocaleParams,
  type LocaleRouteParams,
} from "@/lib/i18n";
import { createSiteMetadata } from "@/lib/metadata";

import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticLocaleParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleRouteParams>;
}): Promise<Metadata> {
  return createSiteMetadata(localeFromRoute(await params));
}

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LocaleRouteParams>;
}>) {
  const locale = localeFromRoute(await params);

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
