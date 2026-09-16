"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
  Code2,
  MessageSquare,
  Monitor,
  Pause,
  Play,
  Terminal,
} from "lucide-react";

import {
  WhySection,
  ParticipationSection,
  ConnectionSection,
  FutureSection,
  StartSection,
} from "./components/website-sections";

const repository = "https://github.com/YTwsy/Team-Cross";
const steps = [
  "分享 Session",
  "一起阅读",
  "让 Agent 参与",
  "原生接管",
  "交还输入",
];
const shortSteps = ["分享", "共读", "MCP", "接管", "交还"];
const captions = [
  "从已有会话分出协作，邀请同事进入这次工作。",
  "共享上下文与改动。同事可以阅读、留下意见，无需取得输入权。",
  "个人 Agent 通过 MCP 阅读共享会话、核对改动、回复批注。",
  "明确交接输入后，在本机原生客户端继续；执行仍在发起者主机。",
  "交还输入，沿着同一个协作 Session 继续推进。",
];

function Wordmark() {
  return (
    <a href="#top" className="wordmark" aria-label="Team Cross 首页">
      <Image src="/brand-mark.svg" width="30" height="30" alt="" />
      <span>Team Cross</span>
    </a>
  );
}

function TrafficLights() {
  return (
    <div className="traffic-lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

function SessionDemo({
  step,
  setStep,
  playing,
  setPlaying,
}: {
  step: number;
  setStep: (value: number) => void;
  playing: boolean;
  setPlaying: (value: boolean) => void;
}) {
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === 4) setPlaying(false);
      else setStep(step + 1);
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [playing, step, setStep, setPlaying]);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, [setPlaying]);
  const choose = (value: number) => {
    setPlaying(false);
    setStep(value);
  };
  const remote = step === 3;
  return (
    <section
      className="demo-section container"
      id="demo"
      aria-label="体验一次 Session 协作"
    >
      <div className="demo-toolbar">
        <span className="overline">一次协作，各自熟悉的界面</span>
        <span className="demo-label">交互演示 · Codex 协作</span>
      </div>
      <div className="demo-controls">
        <div className="demo-steps" role="group" aria-label="选择协作演示步骤">
          {steps.map((label, index) => (
            <button
              type="button"
              key={label}
              onClick={() => choose(index)}
              aria-pressed={step === index}
              aria-current={step === index ? "step" : undefined}
              aria-label={`第 ${index + 1} 步：${label}`}
              data-step-control={index}
            >
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="step-name">{label}</span>
              <span className="step-short-name" aria-hidden="true">{shortSteps[index]}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="play-control"
          aria-label={playing ? "暂停演示" : "播放演示"}
          onClick={() => {
            if (!playing && step === 4) setStep(0);
            setPlaying(!playing);
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <p className="demo-caption" aria-live="polite">
        {captions[step]}
      </p>
      <div className="native-stage" data-step={step}>
        <div className="native-window terminal-window">
          <div className="window-chrome">
            <TrafficLights />
            <span>
              <Terminal size={13} />
              邀请者的终端
            </span>
            <span className="window-decoration">⌘ 1</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-location">
              <span>~/projects/checkout</span>
              <span>
                <GitBranch size={12} />
                main
              </span>
            </div>
            <div className="terminal-agent">
              <span className="agent-symbol">✳</span>
              <div>
                <strong>Codex</strong>
                <p>修复登录回跳</p>
              </div>
            </div>
            <p className="terminal-prompt">
              <span>›</span> 检查登录后的回跳逻辑。
            </p>
            <p className="terminal-reply">
              已定位到参数处理逻辑，
              <br />
              正在核对边界情况。
            </p>
            <div className="terminal-file">
              <span>src/auth/redirect.ts</span>
              <code>
                {step === 4
                  ? "+ const next = sameOriginPath(raw);"
                  : "+ const next = params.get('next');"}
              </code>
            </div>
            <div className="terminal-event" key={step}>
              <Check size={14} />
              <span>
                {
                  [
                    "协作 fork 已创建，邀请已就绪",
                    "Mei 已加入 · 正在阅读上下文",
                    "Mei 的 Agent 正在读取共享改动",
                    "输入已交给 Mei · 在本机继续执行",
                    "Mei 已交还输入 · 可以继续",
                  ][step]
                }
              </span>
            </div>
            <div className="terminal-input">
              <span>›</span>
              <span>
                {remote
                  ? "Mei 正在操作这个 Session"
                  : step === 4
                    ? "继续下一步…"
                    : "等待下一步输入…"}
              </span>
              <i className="cursor" />
            </div>
          </div>
          <div className="window-status">
            <span>
              <span className="status-dot" />
              执行：Lin 的 Mac
            </span>
            <span>{remote ? "输入：Mei" : "输入：Lin"}</span>
          </div>
        </div>
        <div className="session-bridge" aria-label="共享的是这次协作 Session">
          <div className="bridge-line" />
          <div className="session-token">
            <Image src="/brand-mark.svg" width="23" height="23" alt="" />
            <span>一个 Session</span>
          </div>
          <div className="bridge-label">
            <span>上下文</span>
            <span>批注</span>
            <span>输入交接</span>
          </div>
        </div>
        <div className="native-window personal-window">
          <div className="window-chrome">
            <TrafficLights />
            <span>
              <Monitor size={13} />
              {remote ? "Mei 的 Codex · 原生接入" : "Mei 的个人 Agent"}
            </span>
            <span className="window-decoration">↗</span>
          </div>
          <div className="personal-body" key={step}>
            <div className="personal-heading">
              <div className="avatar">M</div>
              <div>
                <strong>
                  {remote ? "一起继续这次工作" : "看看 Lin 分享的 Session"}
                </strong>
                <p>
                  {remote ? "共享协作 · 修复登录回跳" : "个人会话 · 本地上下文"}
                </p>
              </div>
            </div>
            {step === 0 ? (
              <div className="invitation-preview">
                <div className="invitation-icon">
                  <GitBranch size={23} />
                </div>
                <strong>Lin 邀请你参与</strong>
                <p>修复登录回跳</p>
                <span>一个具体 Session，一次轻量协作。</span>
                <button
                  type="button"
                  onClick={() => choose(1)}
                  className="inline-action"
                >
                  加入演示 <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <div className="personal-message">
                  {step === 1
                    ? "读一下这个共享会话，帮我看看改动。"
                    : step === 2
                      ? "核对回跳地址的处理，并回复这条批注。"
                      : step === 3
                        ? "补上同源校验，再跑一下对应测试。"
                        : "这一段处理好了，把输入交还给 Lin。"}
                </div>
                <div className="tool-receipt">
                  <span className="tool-icon">
                    {remote ? (
                      <Terminal size={15} />
                    ) : (
                      <Image
                        src="/brand-mark.svg"
                        width="15"
                        height="15"
                        alt=""
                      />
                    )}
                  </span>
                  <span>
                    {remote ? "已连接共享原生会话" : "Team Cross MCP"}
                  </span>
                  <Check size={13} />
                </div>
                <p className="agent-response">
                  {step === 1
                    ? "已读取会话与当前改动。回跳参数还需要检查外部 URL。"
                    : step === 2
                      ? "我已核对引用的代码，并把分析回复到原批注。"
                      : step === 3
                        ? "收到。将在 Lin 的 Mac 上完成修改与验证。"
                        : "输入已交还。共享 Session、改动和讨论都保留。"}
                </p>
                <div className="annotation">
                  <MessageSquare size={15} />
                  <div>
                    <span>
                      {step >= 3
                        ? "原批注 · 已回应"
                        : "src/auth/redirect.ts · 批注"}
                    </span>
                    <p>也要检查外部 URL，避免跳转到不可信地址。</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="window-status">
            <span>
              {remote ? "原生客户端 · 当前输入者" : "MCP 辅助 · 保留个人会话"}
            </span>
            <span className="client-tag">
              {remote ? "Codex" : "Codex / Claude Code"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const play = () => {
    setStep(0);
    setPlaying(true);
    document
      .getElementById("demo")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  };
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
            分享一个 Agent Session，让同事带着自己的工具加入。
            <br className="desktop-break" />
            阅读、讨论、原生接力。一起工作，沿用各自的习惯。
          </p>
          <div className="hero-actions">
            <button type="button" className="button primary" onClick={play}>
              <Play size={16} fill="currentColor" />
              体验一次接力
            </button>
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
              无需 Team Cross 账号
            </span>
            <span>
              <Check size={14} />
              WebGUI 可选
            </span>
            <span>
              <Check size={14} />
              原生 CLI / Desktop
            </span>
          </div>
        </section>
        <SessionDemo
          step={step}
          setStep={setStep}
          playing={playing}
          setPlaying={setPlaying}
        />
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
