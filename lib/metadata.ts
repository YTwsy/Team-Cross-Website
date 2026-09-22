import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import { localePaths } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const metadataCopy = {
  "zh-CN": {
    title: "Team Cross — 你的工具，就是协作的入口",
    description:
      "从一段 Agent Session 开始，分享选定内容。邀请同事带上各自的调查与 Agent，一起阅读、引用和讨论，需要时再用原生客户端接力执行。没有云端后端，WebGUI 可选。",
    openGraphDescription:
      "分享选定的 Session 内容，汇集同事的调查，一起讨论，需要时再接力执行。",
    twitterDescription: "从一个 Session，把团队连接起来。",
    openGraphLocale: "zh_CN",
    alternateOpenGraphLocale: "en_US",
  },
  en: {
    title: "Team Cross — Collaboration starts in the tools you already use",
    description:
      "Start with a specific Agent Session. Share selected material, bring teammates and their investigations into the discussion, then hand off input in native clients when it is time to act. No cloud backend; WebGUI optional.",
    openGraphDescription:
      "Share selected Session material, bring teammates' investigations together, and hand off input when it is time to act.",
    twitterDescription: "One Session. Bring the team into the work.",
    openGraphLocale: "en_US",
    alternateOpenGraphLocale: "zh_CN",
  },
} as const;

export function createSiteMetadata(locale: Locale): Metadata {
  const copy = metadataCopy[locale];
  const path = localePaths[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        "zh-CN": localePaths["zh-CN"],
        en: localePaths.en,
        "x-default": localePaths["zh-CN"],
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.openGraphDescription,
      type: "website",
      locale: copy.openGraphLocale,
      alternateLocale: copy.alternateOpenGraphLocale,
      siteName: "Team Cross",
      url: path,
    },
    twitter: {
      card: "summary",
      title: copy.title,
      description: copy.twitterDescription,
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/app-icon.png",
    },
  };
}
