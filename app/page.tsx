"use client";

import Image from "next/image";

import { ArrowUpRight, Check, Code2, Play } from "lucide-react";

import {
  WhySection,
  ParticipationSection,
  ConnectionSection,
  FutureSection,
  StartSection,
} from "./components/website-sections";

import { SessionDemo } from "./components/session-demo";

const repository = "https://github.com/YTwsy/Team-Cross";
function Wordmark() {
  return (
    <a href="#top" className="wordmark" aria-label="Team Cross 首页">
      <Image src="/brand-mark.svg" width="30" height="30" alt="" />
      <span>Team Cross</span>
    </a>
  );
}

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <header className="site-header">
        <nav className="container nav-content" aria-label="主导航">
          <Wordmark />
          <div className="nav-links">
            <a href="#demo">协作演示</a>
            <a href="#participate">参与方式</a>
            <a href="#connect">连接方式</a>
            <a href="#start">开始使用</a>
          </div>
          <a
            className="github-link"
            href={repository}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={18} />
            <span>GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            SESSION-FIRST COLLABORATION
          </div>
          <h1>
            你的工具，
            <br />
            <span>就是协作的入口。</span>
          </h1>
          <p className="hero-description">
            带上各自的 Codex、Claude Code 会话材料，一起看清问题。
            <br className="desktop-break" />
            需要一起动手时，把共享会话的输入交给同事，接着做。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#demo">
              <Play size={16} fill="currentColor" />
              体验一次协作
            </a>
            <a
              className="button secondary"
              href={`${repository}/releases`}
              target="_blank"
              rel="noreferrer"
            >
              下载 macOS 版<ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-notes">
            <span>
              <Check size={14} />
              没有云端后端
            </span>
            <span>
              <Check size={14} />
              WebGUI 可选
            </span>
            <span>
              <Check size={14} />
              各自带来会话材料
            </span>
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
        <Wordmark />
        <span>从一个 Session，把团队连接起来。</span>
        <a href={`${repository}#readme`} target="_blank" rel="noreferrer">
          使用文档 <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}
