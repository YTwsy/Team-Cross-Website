"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ArrowUpRight, Check, Code2, Play } from "lucide-react";

import type { Locale } from "@/lib/i18n";
import { localePaths } from "@/lib/i18n";
import { repository } from "@/lib/site";

import { LocaleProvider } from "./locale-context";
import { SessionDemo } from "./session-demo";
import {
  ConnectionSection,
  FutureSection,
  ParticipationSection,
  StartSection,
  WhySection,
} from "./website-sections";

const homeCopy = {
  "zh-CN": {
    homeLabel: "Team Cross 首页",
    skip: "跳到主要内容",
    navigationLabel: "主导航",
    navigation: [
      ["#demo", "协作演示"],
      ["#participate", "参与方式"],
      ["#connect", "连接方式"],
      ["#start", "开始使用"],
    ],
    language: {
      href: localePaths.en,
      hrefLang: "en",
      label: "切换到英文",
      name: "English",
    },
    hero: {
      eyebrow: "SESSION-FIRST COLLABORATION",
      titleFirst: "你的工具，",
      titleSecond: "就是协作的入口。",
      descriptionFirst:
        "带上各自的 Codex、Claude Code 会话材料，一起看清问题。",
      descriptionSecond: "需要一起动手时，把共享会话的输入交给同事，接着做。",
      demo: "体验一次协作",
      download: "下载 macOS 版",
      notes: ["没有云端后端", "WebGUI 可选", "各自带来会话材料"],
    },
    footer: {
      tagline: "从一个 Session，把团队连接起来。",
      documentation: "使用文档",
    },
  },
  en: {
    homeLabel: "Team Cross home",
    skip: "Skip to main content",
    navigationLabel: "Main navigation",
    navigation: [
      ["#demo", "Demo"],
      ["#participate", "Ways to join"],
      ["#connect", "Connections"],
      ["#start", "Get started"],
    ],
    language: {
      href: localePaths["zh-CN"],
      hrefLang: "zh-CN",
      label: "Switch to Simplified Chinese",
      name: "中文",
    },
    hero: {
      eyebrow: "SESSION-FIRST COLLABORATION",
      titleFirst: "Your tools are",
      titleSecond: "where collaboration begins.",
      descriptionFirst:
        "Bring together the findings already captured in everyone's Codex and Claude Code Sessions.",
      descriptionSecond:
        "When it is time to act, hand off input to a teammate and keep going in the shared Session.",
      demo: "See collaboration in action",
      download: "Download for macOS",
      notes: [
        "No cloud backend",
        "WebGUI is optional",
        "Everyone brings their own Session material",
      ],
    },
    footer: {
      tagline: "One Session. Bring the team into the work.",
      documentation: "Documentation (Chinese)",
    },
  },
} as const;

function Wordmark({ label }: { label: string }) {
  return (
    <a href="#top" className="wordmark" aria-label={label}>
      <Image src="/brand-mark.svg" width="30" height="30" alt="" />
      <span>Team Cross</span>
    </a>
  );
}

function LocalizedHome({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const router = useRouter();
  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.location.hash) return;
    event.preventDefault();
    router.push(`${copy.language.href}${window.location.hash}`);
  };

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <header className="site-header">
        <nav className="container nav-content" aria-label={copy.navigationLabel}>
          <Wordmark label={copy.homeLabel} />
          <div className="nav-links">
            {copy.navigation.map(([href, label]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a
              className="language-link"
              href={copy.language.href}
              hrefLang={copy.language.hrefLang}
              aria-label={copy.language.label}
              onClick={switchLanguage}
            >
              <span lang={copy.language.hrefLang}>{copy.language.name}</span>
            </a>
            <a
              className="github-link"
              href={repository}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Code2 size={18} />
              <span>GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            {copy.hero.eyebrow}
          </div>
          <h1>
            {copy.hero.titleFirst}{" "}
            <br />
            <span>{copy.hero.titleSecond}</span>
          </h1>
          <p className="hero-description">
            {copy.hero.descriptionFirst}{" "}
            <br className="desktop-break" />
            {copy.hero.descriptionSecond}
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#demo">
              <Play size={16} fill="currentColor" />
              {copy.hero.demo}
            </a>
            <a
              className="button secondary"
              href={`${repository}/releases`}
              target="_blank"
              rel="noreferrer"
            >
              {copy.hero.download}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-notes">
            {copy.hero.notes.map((note) => (
              <span key={note}>
                <Check size={14} />
                {note}
              </span>
            ))}
          </div>
        </section>
        <SessionDemo />
        <WhySection />
        <ParticipationSection />
        <ConnectionSection />
        <FutureSection />
        <StartSection />
      </main>
      <footer className="site-footer container">
        <Wordmark label={copy.homeLabel} />
        <span>{copy.footer.tagline}</span>
        <a href={`${repository}#readme`} target="_blank" rel="noreferrer">
          {copy.footer.documentation} <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <LocalizedHome locale={locale} />
    </LocaleProvider>
  );
}
