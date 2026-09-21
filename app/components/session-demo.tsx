"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  Keyboard,
  MessageSquare,
  Monitor,
  Pause,
  Play,
  Terminal,
  Users,
} from "lucide-react";

const scenarios = {
  discuss: {
    name: "材料与讨论",
    steps: ["各自的材料", "汇入空间", "引用讨论", "Agent 辅助"],
    short: ["材料", "发布", "讨论", "Agent"],
    captions: [
      "Lin、Mei 和 Kai 各自选一段已经完成的会话。不同 Agent 的发现，从这里走到一起。",
      "同事通过邀请加入，各自预览并发布选定的材料。个人会话继续保留，新内容由作者决定何时再分享。",
      "引用三份材料的具体版本，在原文旁讨论。材料更新后，已有引用仍保留当时的版本。",
      "Mei 让自己的 Claude Code 通过 MCP 按需读取材料、核对依据并回复，继续使用自己的个人会话。",
    ],
    actions: [
      "把选定材料带进来",
      "看看大家如何讨论",
      "让个人 Agent 帮忙核对",
      "重新看材料汇入",
    ],
  },
  execute: {
    name: "输入接力",
    steps: ["启用执行", "开放访问", "交接输入", "原生继续", "交还输入"],
    short: ["启用", "访问", "交接", "继续", "交还"],
    captions: [
      "需要一起动手时，Lin 确认来源、工作目录与权限模式，创建新的原生协作 fork。材料与讨论继续保留。",
      "Lin 向 Mei 明确开放完整原生历史与工作目录。访问已开放，输入仍然归 Lin。",
      "Lin 将输入交给 Mei。当前输入者变了，执行主机保持不变，Kai 仍可继续阅读与讨论。",
      "Mei 在对应的 Codex 原生客户端继续输入。模型调用、代码修改与执行都在 Lin 的 Mac。",
      "完成这一段，Mei 把输入交还给 Lin。大家贡献的材料与讨论仍在，沿着这次工作继续。",
    ],
    actions: [
      "向 Mei 开放执行访问",
      "把输入交给 Mei",
      "看看 Mei 如何继续",
      "Mei 交还输入",
      "重新看输入接力",
    ],
  },
} as const;

type Scenario = keyof typeof scenarios;

const materials = [
  {
    id: "lin",
    author: "Lin",
    provider: "Codex",
    title: "登录回跳调查",
    range: "第 2—3 轮",
    question: "登录后，为什么会跳到外部地址？",
    finding: "回跳参数缺少同源校验。",
    reference: "Lin 的调查 · v1",
  },
  {
    id: "mei",
    author: "Mei",
    provider: "Claude Code",
    title: "外部地址复现",
    range: "第 4—5 轮",
    question: "试一下外部 URL 和 // 开头的地址。",
    finding: "两种写法都能复现，需要一起检查。",
    reference: "Mei 的复现 · v1",
  },
  {
    id: "kai",
    author: "Kai",
    provider: "Codex",
    title: "站内跳转约定",
    range: "第 1—2 轮",
    question: "哪些登录后的回跳路径需要保留？",
    finding: "合法的站内路径应继续保留。",
    reference: "Kai 的约定 · v1",
  },
] as const;

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function Bridge({ execution = false }: { execution?: boolean }) {
  return (
    <div className="session-bridge">
      <div className="bridge-line" aria-hidden="true" />
      <div className="session-token">
        <Image src="/brand-mark.svg" width="20" height="20" alt="" />
      </div>
      <div className="session-legend">
        <p>{execution ? "同一个协作会话" : "各自的发现，一起用"}</p>
        <ul className="bridge-label">
          {execution ? (
            <>
              <li>原生 fork</li>
              <li>输入接力</li>
            </>
          ) : (
            <>
              <li>材料</li>
              <li>引用</li>
              <li>讨论</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function SourceWindow({ index, step }: { index: 0 | 1; step: number }) {
  const material = materials[index];
  const personal = index === 1;
  return (
    <div
      className={`native-window ${personal ? "personal-window claude-source-window" : "terminal-window"}`}
    >
      <div className="window-chrome">
        <TrafficLights />
        <span>
          <Terminal size={13} />
          {material.author} 的 Session
        </span>
        <span className="source-provider">{material.provider}</span>
      </div>
      <div className="terminal-body source-body">
        <div className="terminal-agent">
          <span className="agent-symbol" aria-hidden="true">
            ✳
          </span>
          <div>
            <strong>{material.title}</strong>
            <p>{personal ? "同事已经做过的复现" : "从已经做过的调查开始"}</p>
          </div>
        </div>
        <div className="source-turn outside-range">
          <span>先前的工作</span>
          <p>{personal ? "整理其他问题的复现记录" : "整理本地开发环境"}</p>
          <small>不在本次公开范围</small>
        </div>
        <div className="source-selection" data-material-source={material.id}>
          <div className="range-label">
            <Check size={13} />
            本次公开范围 · {material.range}
          </div>
          <div className="source-turn">
            <span>{personal ? "04 · 尝试复现" : "02 · 定位问题"}</span>
            <p>{material.question}</p>
          </div>
          <div className="source-turn">
            <span>{personal ? "05 · 核对结果" : "03 · 核对实现"}</span>
            <p>{material.finding}</p>
          </div>
        </div>
        <div className="terminal-event">
          <Check size={14} />
          <span>
            {personal && step === 3
              ? "按 Mei 的指令，已核对三份共享材料"
              : step === 0
                ? "选好这一段，预览后再发布"
                : `${material.title} v1 · 已发布`}
          </span>
        </div>
      </div>
      <div className="window-status">
        <span>个人会话继续保留</span>
        <span>公开范围由自己决定</span>
      </div>
    </div>
  );
}

function DiscussionScene({
  step,
  reducedMotion,
  selectedMaterial,
  onSelect,
  next,
}: {
  step: number;
  reducedMotion: boolean;
  selectedMaterial: number | null;
  onSelect: (index: number | null) => void;
  next: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const selected =
    selectedMaterial === null ? null : materials[selectedMaterial];

  useEffect(() => {
    const root = stage.current;
    if (!root || step !== 1 || reducedMotion) return;
    const bounds = root.getBoundingClientRect();
    const flights = materials.flatMap((material, index) => {
      const source = root.querySelector<HTMLElement>(
        `[data-material-source="${material.id}"]`,
      );
      const destination = root.querySelector<HTMLElement>(
        `[data-material-target="${material.id}"]`,
      );
      if (!source || !destination) return [];
      const from = source.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const card = document.createElement("div");
      card.className = "material-flight";
      card.setAttribute("aria-hidden", "true");
      const title = document.createElement("strong");
      title.textContent = material.title;
      const author = document.createElement("span");
      author.textContent = `${material.author} · ${material.provider} · v1`;
      card.appendChild(title);
      card.appendChild(author);
      const left = from.left + (from.width - to.width) / 2;
      card.style.width = `${to.width}px`;
      card.style.left = `${left - bounds.left}px`;
      card.style.top = `${from.top - bounds.top}px`;
      root.appendChild(card);
      const animation = card.animate(
        [
          { transform: "translate(0, 0) scale(.94)", opacity: 0 },
          { opacity: 1, offset: 0.16 },
          {
            transform: `translate(${to.left - left}px, ${to.top - from.top}px) scale(1)`,
            opacity: 1,
          },
        ],
        {
          duration: 850,
          delay: index * 130,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "both",
        },
      );
      animation.finished.then(() => card.remove()).catch(() => {});
      return [{ card, animation }];
    });
    return () =>
      flights.forEach(({ card, animation }) => {
        animation.cancel();
        card.remove();
      });
  }, [step, reducedMotion]);

  return (
    <div className="native-stage discussion-stage" data-step={step} ref={stage}>
      <SourceWindow index={0} step={step} />
      <Bridge />
      <SourceWindow index={1} step={step} />
      <div className="contributor-session" data-material-source="kai">
        <span className="contributor-avatar" aria-hidden="true">
          K
        </span>
        <div>
          <strong>Kai 的 Codex Session</strong>
          <span>站内跳转约定 · 第 1—2 轮</span>
        </div>
        <p>“合法的站内路径也要保留。”</p>
        <span className="contributor-status">
          <FileText size={13} />
          {step === 0 ? "也带来一份材料" : "已发布 v1"}
        </span>
      </div>
      <div className="shared-materials">
        <div className="shared-materials-heading">
          <div>
            <Users size={16} />
            <strong>
              {step === 0
                ? "各自选一段，带进这次讨论。"
                : "同一个空间，三个人的发现。"}
            </strong>
          </div>
          <span>
            {step === 0
              ? "已选片段 · 可点开预览"
              : "已发布材料 · 可查看固定版本"}
          </span>
        </div>
        <div
          className="shared-material-grid"
          role="group"
          aria-label="查看各自的会话材料"
        >
          {materials.map((material, index) => (
            <button
              type="button"
              key={material.id}
              className="demo-material"
              data-material-target={material.id}
              aria-pressed={selectedMaterial === index}
              onClick={() =>
                onSelect(selectedMaterial === index ? null : index)
              }
            >
              <FileText size={17} />
              <div>
                <strong>{material.title}</strong>
                <span>
                  {material.author} · {material.provider} Session
                </span>
              </div>
              <small>{step === 0 ? "预览" : "v1"}</small>
            </button>
          ))}
        </div>
        <div className="material-discussion" aria-live="polite">
          {selected ? (
            <div className="material-excerpt">
              <div>
                <span>
                  {selected.author} · {selected.title} · {selected.range}
                  {step > 0 ? " · v1" : " · 发布前预览"}
                </span>
                <button type="button" onClick={() => onSelect(null)}>
                  {step >= 2 ? "返回讨论" : "收起片段"}
                </button>
              </div>
              <p>{selected.finding}</p>
            </div>
          ) : step >= 2 ? (
            <div className="annotation">
              <MessageSquare size={16} />
              <div>
                <span>
                  {step === 3
                    ? "Mei 的个人 Claude Code · MCP 辅助回复"
                    : "Kai · 引用大家的发现"}
                </span>
                <p>
                  {step === 3
                    ? "已按 Mei 的要求核对三份材料：检查外部 URL 和协议相对地址，同时保留合法站内路径。"
                    : "Lin 找到了原因，Mei 补上了复现。结合站内跳转约定，这次修改也要保留合法路径。"}
                </p>
                <div className="reference-tags">
                  {materials.map((material, index) => (
                    <button
                      type="button"
                      key={material.id}
                      onClick={() => onSelect(index)}
                    >
                      {material.reference}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="material-scene-note">
              <MessageSquare size={17} />
              <p>
                {step === 0
                  ? "你带来定位过程，同事补上复现与约定。从各自做过的工作开始。"
                  : "三份材料都有各自的作者和版本。一起阅读、引用和讨论，无需交接输入。"}
              </p>
            </div>
          )}
        </div>
        <div className="material-scene-actions">
          <span>只读分享 · 后续对话由作者主动发布</span>
          <button type="button" className="inline-action" onClick={next}>
            {scenarios.discuss.actions[step]}
            <ArrowRight size={15} />
            <span className="sr-only">（演示）</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExecutionScene({ step, next }: { step: number; next: () => void }) {
  const remote = step === 2 || step === 3;
  const writer = remote ? "Mei" : "Lin";
  const events = [
    "已从选定来源创建新的协作 fork",
    "已向 Mei 开放执行访问 · 输入仍在 Lin",
    "输入已交给 Mei · 等待 Mei 的下一步输入",
    "Mei 已提交输入 · 正在 Lin 的 Mac 上处理",
    "Mei 已交还输入 · Lin 可以继续",
  ];
  return (
    <div
      className="native-stage execution-stage"
      data-step={step}
      data-writer={writer}
    >
      <div className="handoff-overview">
        <span>
          <Keyboard size={16} />
          同一时刻，一位当前输入者
        </span>
        <span className="execution-host">
          <Monitor size={15} />
          执行：Lin 的 Mac
        </span>
      </div>
      <div
        className="handoff-track"
        role="group"
        aria-label={`当前输入者：${writer}`}
      >
        <div className="handoff-route" aria-hidden="true" />
        <div className="input-baton" aria-hidden="true">
          <Keyboard size={14} />
          当前输入 · {writer}
        </div>
        <div className="handoff-person">
          <span className="avatar">L</span>
          <div>
            <strong>Lin</strong>
            <span>{remote ? "发起者 · 可以接回" : "可以继续输入"}</span>
          </div>
        </div>
        <span className="handoff-direction" aria-hidden="true">
          {step === 4 ? "← 交还" : "交接 →"}
        </span>
        <div className="handoff-person">
          <span className="avatar">M</span>
          <div>
            <strong>Mei</strong>
            <span>
              {remote
                ? "可以继续输入"
                : step >= 1
                  ? "已获访问 · 等待交接"
                  : "阅读与讨论"}
            </span>
          </div>
        </div>
      </div>
      <div className="native-window terminal-window" data-has-input={!remote}>
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Terminal size={13} />
            Lin 的协作会话
          </span>
          <span className="source-provider">Codex</span>
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
            <span className="agent-symbol" aria-hidden="true">
              ✳
            </span>
            <div>
              <strong>修复登录回跳</strong>
              <p>从 Lin 的 Codex Session 创建的原生 fork</p>
            </div>
          </div>
          <p className="terminal-prompt">
            <span>›</span>
            {step >= 3
              ? "补上同源校验，并保留合法站内路径。"
              : "材料与讨论都在，等待下一步输入。"}
          </p>
          <p className="terminal-reply">
            {step >= 3
              ? "已补上回跳地址检查，合法站内路径继续保留。"
              : "一起看清的问题，可以沿着这个会话继续。"}
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
          <div
            className={`terminal-input ${remote ? "input-view-only" : "input-available"}`}
          >
            <span>›</span>
            <span>
              {remote ? "输入已交给 Mei · Lin 继续查看" : "Lin 可以输入下一步…"}
            </span>
            {!remote && <i className="cursor" aria-hidden="true" />}
          </div>
        </div>
        <div className="window-status">
          <span>
            <span className="status-dot" />
            会话与执行留在这台 Mac
          </span>
          <span>{remote ? "查看中" : "当前输入者"}</span>
        </div>
      </div>
      <Bridge execution />
      <div className="native-window personal-window" data-has-input={remote}>
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Monitor size={13} />
            {remote ? "Mei 的原生客户端" : "Mei 的协作视图"}
          </span>
          <span className="source-provider">Codex</span>
        </div>
        <div className="personal-body">
          <div className="personal-heading">
            <div className="avatar">M</div>
            <div>
              <strong>
                {
                  [
                    "讨论之后，一起继续",
                    "访问已开放，输入还没交接",
                    "这一段，交给 Mei",
                    "在熟悉的客户端里处理",
                    "处理好了，交还输入",
                  ][step]
                }
              </strong>
              <p>
                {remote
                  ? "原生 TUI / 专用 Codex Desktop"
                  : "原有材料和讨论继续保留"}
              </p>
            </div>
          </div>
          <div className="personal-message">
            {
              [
                "Lin 启用共同执行，Mei 和 Kai 仍可继续阅读、发布材料与讨论。",
                "Mei 获得完整原生历史与工作目录访问，等待 Lin 明确交出输入。",
                "输入已交到 Mei 手里，可以在对应的 Codex 客户端继续这次工作。",
                "补上同源校验，并保留合法的站内回跳路径。",
                "这一段已经处理好，交还给 Lin 继续下一步。",
              ][step]
            }
          </div>
          <div className="tool-receipt">
            <Check size={14} />
            <span>
              {
                [
                  "新的原生 fork 已准备好",
                  "访问已开放 · 输入仍在 Lin",
                  "当前输入者：Mei",
                  "输入已提交给共享会话",
                  "当前输入者：Lin",
                ][step]
              }
            </span>
          </div>
          <p className="agent-response">
            {step === 3
              ? "Mei 使用自己的客户端操作，修改与模型调用在 Lin 的 Mac 上完成。"
              : "个人 Claude Code 的调查仍在材料区，这里接入的是共享的 Codex 会话。"}
          </p>
          <div
            className={`personal-input ${remote ? "input-available" : "input-view-only"}`}
          >
            <Keyboard size={15} />
            <span>
              {remote
                ? step === 3
                  ? "Mei：这一段处理好了。"
                  : "Mei 可以输入下一步…"
                : "查看共享进展，继续参与讨论"}
            </span>
            {remote && <i className="cursor" aria-hidden="true" />}
          </div>
          <div className="annotation">
            <MessageSquare size={15} />
            <div>
              <span>Kai · 讨论继续</span>
              <p>记得保留合法的站内回跳路径。</p>
            </div>
          </div>
        </div>
        <div className="window-status">
          <span>
            {remote ? "原生客户端 · 当前输入者" : "阅读与讨论继续开放"}
          </span>
          <span>{remote ? "可以输入" : "输入在 Lin"}</span>
        </div>
      </div>
      <div className="handoff-actions">
        <span>
          <MessageSquare size={15} />
          其他成员可以一直阅读、发布材料与讨论。
        </span>
        <button type="button" className="inline-action" onClick={next}>
          {scenarios.execute.actions[step]}
          <ArrowRight size={15} />
          <span className="sr-only">（演示）</span>
        </button>
      </div>
    </div>
  );
}

function DemoControls({
  scenario,
  step,
  playing,
  reducedMotion,
  choose,
  togglePlayback,
}: {
  scenario: Scenario;
  step: number;
  playing: boolean;
  reducedMotion: boolean;
  choose: (step: number) => void;
  togglePlayback: () => void;
}) {
  const current = scenarios[scenario];
  return (
    <>
      <div className="demo-controls">
        <div
          className="demo-steps"
          role="group"
          aria-label={`${current.name}演示步骤`}
          style={{
            gridTemplateColumns: `repeat(${current.steps.length}, minmax(0, 1fr))`,
          }}
        >
          {current.steps.map((label, index) => (
            <button
              type="button"
              key={label}
              onClick={() => choose(index)}
              aria-pressed={step === index}
              aria-current={step === index ? "step" : undefined}
              aria-label={`${current.name}第 ${index + 1} 步：${label}`}
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
          disabled={reducedMotion}
          aria-label={
            reducedMotion
              ? "已开启减少动态效果，请逐步查看"
              : `${playing ? "暂停" : "播放"}${current.name}演示`
          }
          aria-pressed={playing}
          onClick={togglePlayback}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <p className="demo-caption" aria-live="polite">
        {current.captions[step]}
      </p>
    </>
  );
}

export function SessionDemo() {
  const [steps, setSteps] = useState({ discuss: 0, execute: 0 });
  const [playing, setPlaying] = useState<Scenario | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const chapters = useRef<Partial<Record<Scenario, HTMLElement | null>>>({});
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    prefersReducedMotion,
    () => false,
  );

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (steps[playing] === scenarios[playing].steps.length - 1)
        setPlaying(null);
      else
        setSteps((previous) => ({
          ...previous,
          [playing]: previous[playing] + 1,
        }));
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [playing, steps, reducedMotion]);

  useEffect(() => {
    const pauseForVisibility = () => {
      if (document.hidden) setPlaying(null);
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauseForMotion = () => {
      if (motion.matches) setPlaying(null);
    };
    document.addEventListener("visibilitychange", pauseForVisibility);
    motion.addEventListener("change", pauseForMotion);
    return () => {
      document.removeEventListener("visibilitychange", pauseForVisibility);
      motion.removeEventListener("change", pauseForMotion);
    };
  }, []);

  useEffect(() => {
    const chapter = playing ? chapters.current[playing] : null;
    if (!chapter) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(null);
    });
    observer.observe(chapter);
    return () => observer.disconnect();
  }, [playing]);

  const choose = (scenario: Scenario, step: number) => {
    setPlaying(null);
    setSteps((previous) => ({ ...previous, [scenario]: step }));
    if (scenario === "discuss") setSelectedMaterial(null);
  };
  const next = (scenario: Scenario) =>
    choose(scenario, (steps[scenario] + 1) % scenarios[scenario].steps.length);
  const togglePlayback = (scenario: Scenario) => {
    if (reducedMotion) return;
    if (scenario === "discuss") setSelectedMaterial(null);
    if (
      playing !== scenario &&
      steps[scenario] === scenarios[scenario].steps.length - 1
    ) {
      setSteps((previous) => ({ ...previous, [scenario]: 0 }));
    }
    setPlaying(playing === scenario ? null : scenario);
  };

  return (
    <section
      className="demo-section container"
      id="demo"
      aria-label="体验一次 Session 协作"
    >
      <section
        className="demo-chapter"
        aria-labelledby="materials-demo-title"
        ref={(element) => {
          chapters.current.discuss = element;
        }}
      >
        <div className="demo-toolbar">
          <span className="overline">01 · 各自带来，一起讨论</span>
          <span className="demo-label">交互演示 · 示例内容</span>
        </div>
        <div className="demo-heading">
          <div>
            <h2 id="materials-demo-title">各自的 Agent 材料，一起用起来。</h2>
            <p>你的调查、同事的复现，各自的 Session 都能成为共同的依据。</p>
          </div>
          <a className="demo-jump" href="#handoff">
            看看输入接力
            <ArrowDown size={15} />
          </a>
        </div>
        <DemoControls
          scenario="discuss"
          step={steps.discuss}
          playing={playing === "discuss" && !reducedMotion}
          reducedMotion={reducedMotion}
          choose={(step) => choose("discuss", step)}
          togglePlayback={() => togglePlayback("discuss")}
        />
        <DiscussionScene
          step={steps.discuss}
          reducedMotion={reducedMotion}
          selectedMaterial={selectedMaterial}
          onSelect={(index) => {
            setPlaying(null);
            setSelectedMaterial(index);
          }}
          next={() => next("discuss")}
        />
        <div className="demo-takeaway">
          <span>
            <Check size={15} />
            阅读和讨论，本身就是一次完整的协作。
          </span>
          <span>选定范围 · 固定版本 · 各自贡献</span>
        </div>
      </section>
      <section
        className="demo-chapter handoff-chapter"
        id="handoff"
        aria-labelledby="handoff-demo-title"
        ref={(element) => {
          chapters.current.execute = element;
        }}
      >
        <div className="demo-toolbar">
          <span className="overline">02 · 需要一起动手时</span>
          <span className="demo-label">按需启用 · 明确交接</span>
        </div>
        <div className="demo-heading">
          <div>
            <h2 id="handoff-demo-title">下一步，交给同事继续。</h2>
            <p>接过输入，在熟悉的客户端里处理，再把输入交还。</p>
          </div>
        </div>
        <DemoControls
          scenario="execute"
          step={steps.execute}
          playing={playing === "execute" && !reducedMotion}
          reducedMotion={reducedMotion}
          choose={(step) => choose("execute", step)}
          togglePlayback={() => togglePlayback("execute")}
        />
        <ExecutionScene step={steps.execute} next={() => next("execute")} />
        <div className="demo-takeaway">
          <span>
            <Check size={15} />
            执行留在发起者主机，大家继续使用自己的客户端。
          </span>
          <span>新的原生 fork · 明确开放访问 · 输入接力</span>
        </div>
      </section>
    </section>
  );
}
