import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Team Cross — 你的工具，就是协作的入口",
  description:
    "从一段 Agent Session 开始，分享选定内容。邀请同事带上各自的调查与 Agent，一起阅读、引用和讨论，需要时再用原生客户端接力执行。无需 Team Cross 账号，WebGUI 可选。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Team Cross — 你的工具，就是协作的入口",
    description:
      "分享选定的 Session 内容，汇集同事的调查，一起讨论，需要时再接力执行。",
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
