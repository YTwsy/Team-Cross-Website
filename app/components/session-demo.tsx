"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  MessageSquare,
  Monitor,
  Pause,
  Play,
  Terminal,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scenarios = {
  discuss: {
    steps: ["选择公开范围", "邀请同事", "带来调查", "引用讨论", "Agent 辅助"],
    short: ["选择", "邀请", "调查", "讨论", "Agent"],
    captions: [
      "选定几轮已结束的对话，预览后发布。之后的新内容由你决定是否再分享。",
      "一份邀请，几位同事。一起阅读你发布的内容，暂时无需开放执行。",
      "Mei 把自己 Session 中的调查也带进来。各自的工作，在这里有了共同上下文。",
      "引用两份材料的具体版本，把意见留在原文旁。发布新版本，已有引用仍保留。",
      "让个人 Agent 按需读取材料、核对依据并回复。各自的会话与工作习惯继续保留。",
    ],
  },
  execute: {
    steps: ["启用执行", "开放访问", "交接输入", "原生继续", "交还输入"],
    short: ["启用", "访问", "交接", "继续", "交还"],
    captions: [
      "需要一起继续时，确认来源、工作目录与权限模式，创建新的原生协作 fork。",
      "向 Mei 明确开放执行访问，共享完整原生历史与工作目录。其他同事仍可只参与讨论。",
      "Lin 将输入交给 Mei。同一时刻只有一位输入者，其他成员可以继续阅读和批注。",
      "Mei 在自己的原生客户端继续处理。模型调用、代码修改与执行都在 Lin 的 Mac。",
      "完成这一段，把输入交还给 Lin。材料、讨论和协作会话继续保留。",
    ],
  },
} as const;

function TrafficLights() {
  return (
    <div className="traffic-lights" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

function Bridge({ execution }: { execution: boolean }) {
  return (
    <div className="session-bridge">
      <div className="bridge-line" aria-hidden="true" />
      <div className="session-token">
        <Image src="/brand-mark.svg" width="20" height="20" alt="" />
      </div>
      <div className="session-legend">
        <p>{execution ? "一起继续这次工作" : "一个协作空间"}</p>
        <ul className="bridge-label">
          {execution ? (
            <>
              <li>原生 fork</li>
              <li>输入交接</li>
            </>
          ) : (
            <>
              <li>材料</li>
              <li>批注</li>
              <li>讨论</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function DiscussionScene({ step, next }: { step: number; next: () => void }) {
  return (
    <div className="native-stage discussion-stage" data-step={step}>
      <div className="native-window terminal-window">
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Terminal size={13} />
            Lin 的 Session
          </span>
          <span className="window-decoration">Codex</span>
        </div>
        <div className="terminal-body source-body">
          <div className="terminal-agent">
            <span className="agent-symbol">✳</span>
            <div>
              <strong>登录回跳调查</strong>
              <p>从已经做过的工作开始</p>
            </div>
          </div>
          <div className="source-turn outside-range">
            <span>01 · 先前的对话</span>
            <p>整理本地开发环境</p>
            <small>不在本次公开范围</small>
          </div>
          <div className="source-selection">
            <div className="range-label">
              <Check size={13} />
              本次公开范围 · 第 2—3 轮
            </div>
            <div className="source-turn">
              <span>02 · 定位问题</span>
              <p>登录后，为什么会跳到外部地址？</p>
            </div>
            <div className="source-turn">
              <span>03 · 核对实现</span>
              <p>回跳参数缺少同源校验。</p>
            </div>
          </div>
          <div className="terminal-event">
            <Check size={14} />
            <span>
              {step === 0
                ? "预览这两轮对话与已保存的工具过程"
                : "登录回跳调查 v1 · 已发布"}
            </span>
          </div>
        </div>
        <div className="window-status">
          <span>原 Session 继续保留</span>
          <span>新内容不会自动公开</span>
        </div>
      </div>
      <Bridge execution={false} />
      <div className="native-window personal-window">
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Users size={13} />
            {step === 0 ? "准备邀请同事" : "一起核对登录回跳"}
          </span>
          <span className="window-decoration">Team Cross</span>
        </div>
        <div className="personal-body discussion-body" key={step}>
          {step === 0 ? (
            <div className="invitation-preview">
              <div className="invitation-icon">
                <FileText size={23} />
              </div>
              <strong>先分享这一段。</strong>
              <p>让同事带着上下文来讨论</p>
              <span>公开范围由你选定，原生会话与工作目录保持私有。</span>
              <button type="button" className="inline-action" onClick={next}>
                发布并邀请 · 演示
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <>
              <div className="room-members">
                <div className="member-avatars" aria-hidden="true">
                  <span>L</span>
                  <span>M</span>
                  <span>K</span>
                </div>
                <div>
                  <strong>Lin、Mei、Kai</strong>
                  <p>三个人，各自熟悉的工具</p>
                </div>
              </div>
              <div className="demo-material">
                <FileText size={16} />
                <div>
                  <strong>登录回跳调查</strong>
                  <span>Lin · Codex Session</span>
                </div>
                <small>v1</small>
              </div>
              {step >= 2 && (
                <div className="demo-material contributed">
                  <FileText size={16} />
                  <div>
                    <strong>外部地址复现记录</strong>
                    <span>Mei · Claude Code Session</span>
                  </div>
                  <small>v1</small>
                </div>
              )}
              {step === 1 && (
                <div className="scene-note">
                  <MessageSquare size={17} />
                  <p>
                    先读一读、留个意见。
                    <br />
                    每位同事也能发布自己的会话材料。
                  </p>
                </div>
              )}
              {step === 2 && (
                <div className="scene-note">
                  <Check size={17} />
                  <p>“我这边也复现了，把调查放进来一起看。”</p>
                </div>
              )}
              {step >= 3 && (
                <div className="annotation">
                  <MessageSquare size={15} />
                  <div>
                    <span>
                      {step === 4
                        ? "Mei 的个人 Agent · MCP 回复"
                        : "Kai · 引用两份材料"}
                    </span>
                    <p>
                      {step === 4
                        ? "已核对两份材料。建议补充协议相对地址的检查，并保留合法站内路径。"
                        : "两份调查指向同一处。除了外部 URL，也要检查 // 开头的地址。"}
                    </p>
                    <div className="reference-tags">
                      <span>Lin 的调查 · v1</span>
                      <span>Mei 的复现 · v1</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="window-status">
          <span>只读分享 · 阅读与讨论</span>
          <span>无需交接输入</span>
        </div>
      </div>
    </div>
  );
}

function ExecutionScene({ step }: { step: number }) {
  const remote = step === 2 || step === 3;
  const events = [
    "已从选定来源创建新的协作 fork",
    "已向 Mei 开放执行访问 · 输入仍在 Lin",
    "输入已交给 Mei · 其他成员继续讨论",
    "Mei 正在处理 · 在 Lin 的 Mac 执行",
    "Mei 已交还输入 · 可以继续",
  ];
  return (
    <div className="native-stage execution-stage" data-step={step}>
      <div className="native-window terminal-window">
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Terminal size={13} />
            Lin 的协作会话
          </span>
          <span className="window-decoration">Codex</span>
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
              <p>修复登录回跳 · 新的原生 fork</p>
            </div>
          </div>
          <p className="terminal-prompt">
            <span>›</span>沿着讨论，补上回跳地址检查。
          </p>
          <p className="terminal-reply">
            {step >= 3
              ? "已补上同源校验，对应测试通过。"
              : "材料与讨论已保留，等待继续处理。"}
          </p>
          <div className="terminal-file">
            <span>src/auth/redirect.ts</span>
            <code>
              {step >= 3
                ? "+ const next = sameOriginPath(raw);"
                : "const next = params.get('next');"}
            </code>
          </div>
          <div className="terminal-event" key={step}>
            <Check size={14} />
            <span>{events[step]}</span>
          </div>
          <div className="terminal-input">
            <span>›</span>
            <span>
              {remote ? "Mei 正在操作这个 Session" : "等待 Lin 的下一步输入…"}
            </span>
            <i className="cursor" />
          </div>
        </div>
        <div className="window-status">
          <span>
            <span className="status-dot" />
            执行：Lin 的 Mac
          </span>
          <span>输入：{remote ? "Mei" : "Lin"}</span>
        </div>
      </div>
      <Bridge execution />
      <div className="native-window personal-window">
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Monitor size={13} />
            {remote ? "Mei 的 Codex · 原生接入" : "Mei 的协作视图"}
          </span>
          <span className="window-decoration">↗</span>
        </div>
        <div className="personal-body" key={step}>
          <div className="personal-heading">
            <div className="avatar">M</div>
            <div>
              <strong>
                {
                  [
                    "讨论之后，一起继续",
                    "先明确访问范围",
                    "这一段，交给 Mei",
                    "在熟悉的客户端里处理",
                    "处理好了，交还输入",
                  ][step]
                }
              </strong>
              <p>
                {remote
                  ? "原生 TUI / 专用 Codex Desktop"
                  : "原有材料和讨论都在"}
              </p>
            </div>
          </div>
          <div className="personal-message">
            {
              [
                "Lin 选择启用共同执行。Mei 和 Kai 仍可阅读材料、参与讨论。",
                "Lin 向 Mei 开放完整原生历史与工作目录；Kai 继续只参与讨论。",
                "Lin 明确交出输入后，Mei 可以打开自己的原生客户端。",
                "补上同源校验，再跑一下对应测试。",
                "这一段完成了，请 Lin 继续下一步。",
              ][step]
            }
          </div>
          <div className="tool-receipt">
            <Check size={14} />
            <span>
              {
                [
                  "原生 fork 已准备好",
                  "访问已开放 · 输入仍归 Lin",
                  "当前输入者：Mei",
                  "已连接共享原生会话",
                  "当前输入者：Lin",
                ][step]
              }
            </span>
          </div>
          <p className="agent-response">
            {step === 3
              ? "修改与模型调用在 Lin 的 Mac 上完成，Mei 使用自己的客户端操作。"
              : "多人可以一起阅读与讨论，共同执行时只有一位当前输入者。"}
          </p>
          <div className="annotation">
            <MessageSquare size={15} />
            <div>
              <span>Kai · 原讨论继续保留</span>
              <p>记得保留合法的站内回跳路径。</p>
            </div>
          </div>
        </div>
        <div className="window-status">
          <span>
            {remote ? "原生客户端 · 当前输入者" : "明确授权 · 按需接力"}
          </span>
          <span className="client-tag">Codex</span>
        </div>
      </div>
    </div>
  );
}

export function SessionDemo() {
  const [scenario, setScenario] = useState<keyof typeof scenarios>("discuss");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = scenarios[scenario];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step === current.steps.length - 1) setPlaying(false);
      else setStep(step + 1);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [playing, step, current]);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) setPlaying(false);
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseForMotion = () => {
      if (motion.matches) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pause);
    motion.addEventListener("change", pauseForMotion);
    return () => {
      document.removeEventListener("visibilitychange", pause);
      motion.removeEventListener("change", pauseForMotion);
    };
  }, []);
  const choose = (value: number) => {
    setPlaying(false);
    setStep(value);
  };
  return (
    <section
      className="demo-section container"
      id="demo"
      aria-label="体验一次 Session 协作"
    >
      <div className="demo-toolbar">
        <span className="overline">从分享开始，按需一起继续</span>
        <span className="demo-label">交互演示</span>
      </div>
      <Tabs
        value={scenario}
        onValueChange={(value) => {
          setPlaying(false);
          setStep(0);
          setScenario(value as keyof typeof scenarios);
        }}
        className="scenario-tabs"
      >
        <TabsList className="scenario-switch" aria-label="选择协作场景">
          <TabsTrigger value="discuss">
            <MessageSquare size={17} />
            先分享，一起讨论
          </TabsTrigger>
          <TabsTrigger value="execute">
            <Terminal size={17} />
            需要时，一起执行
          </TabsTrigger>
        </TabsList>
        <div className="demo-controls">
          <div
            className="demo-steps"
            role="group"
            aria-label="选择协作演示步骤"
          >
            {current.steps.map((label, index) => (
              <button
                type="button"
                key={label}
                onClick={() => choose(index)}
                aria-pressed={step === index}
                aria-current={step === index ? "step" : undefined}
                aria-label={`第 ${index + 1} 步：${label}`}
              >
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="step-name">{label}</span>
                <span className="step-short-name" aria-hidden="true">
                  {current.short[index]}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="play-control"
            aria-label={playing ? "暂停演示" : "播放演示"}
            onClick={() => {
              if (!playing && step === current.steps.length - 1) setStep(0);
              setPlaying(!playing);
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <p className="demo-caption" aria-live="polite">
          {current.captions[step]}
        </p>
        <TabsContent value="discuss">
          <DiscussionScene step={step} next={() => choose(1)} />
        </TabsContent>
        <TabsContent value="execute">
          <ExecutionScene step={step} />
        </TabsContent>
      </Tabs>
      <div className="demo-takeaway">
        <span>
          <Check size={15} />
          {scenario === "discuss"
            ? "阅读和讨论，本身就是一次完整的协作。"
            : "执行留在发起者主机，各自使用熟悉的客户端。"}
        </span>
        <span>
          {scenario === "discuss"
            ? "选定范围 · 多人参与 · 各自贡献"
            : "新的原生 fork · 明确授权 · 输入接力"}
        </span>
      </div>
    </section>
  );
}
