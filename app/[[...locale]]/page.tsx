import { HomePage } from "../components/home-page";
import { localeFromRoute, type LocaleRouteParams } from "@/lib/i18n";

export default async function LocalizedHome({
  params,
}: {
  params: Promise<LocaleRouteParams>;
}) {
  return <HomePage locale={localeFromRoute(await params)} />;
}
