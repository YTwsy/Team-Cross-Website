import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Team Cross — 你的工具，就是协作的入口",
  description:
    "从一个 Agent Session 发起协作。在熟悉的终端、Codex Desktop 或个人 Agent 中阅读、讨论、原生接力。无需 Team Cross 账号，WebGUI 可选。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Team Cross — 你的工具，就是协作的入口",
    description: "分享一个 Agent Session，让同事带着自己的工具加入。",
    type: "website",
    locale: "zh_CN",
    siteName: "Team Cross",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Team Cross — 你的工具，就是协作的入口",
    description: "从一个 Session，把团队连接起来。",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/app-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
