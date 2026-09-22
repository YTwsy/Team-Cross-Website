export type Locale = "zh-CN" | "en";

export const localePaths: Record<Locale, string> = {
  "zh-CN": "/",
  en: "/en",
};

export type LocaleRouteParams = {
  locale?: string[];
};

export const staticLocaleParams: LocaleRouteParams[] = [
  { locale: [] },
  { locale: ["en"] },
];

export function localeFromRoute({ locale }: LocaleRouteParams): Locale {
  return locale?.length === 1 && locale[0] === "en" ? "en" : "zh-CN";
}
