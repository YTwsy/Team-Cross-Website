"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  GitBranch,
  Globe,
  Laptop,
  MessageSquare,
  Monitor,
  Network,
  PanelTop,
  Server,
  ShieldCheck,
  Terminal,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const repository = "https://github.com/YTwsy/Team-Cross";
const installCommand = "brew install YTwsy/teamcross/teamcross-rc";
const participation = [
  {
    id: "read",
    label: "看一眼，提意见",
    icon: MessageSquare,
    title: "带着上下文开始讨论。",
    text: "阅读同事选择公开的会话内容，把意见留在原文旁。几位同事可以一起讨论，只想帮忙审阅，也是一种完整的参与方式。",
    prompt: "这段回跳逻辑，还需要检查外部 URL。",
    tool: "原文旁批注 · 登录回跳调查 v1",
    result: "意见已保存，其他同事可以沿着这段原文继续回复。",
    detail: "浏览与批注无需取得输入权。",
  },
  {
    id: "publish",
    label: "带来我的调查",
    icon: FileText,
    title: "把你这边的发现，也带进来。",
    text: "从自己的 Codex 或 Claude Code Session 中选择一段，预览后发布到同一个空间。每位同事都能贡献多份材料，让各自做过的调查成为共同的讨论依据。",
    prompt: "把我这次复现的第 2—3 轮分享进来。",
    tool: "已预览公开范围 · 发布会话材料",
    result:
      "外部地址复现记录 v1 已发布。大家可以引用这份材料，与 Lin 的调查一起讨论。",
    detail: "后续更新由作者主动发布，已有引用保留当时的版本。",
  },
  {
    id: "agent",
    label: "带上我的 Agent",
    icon: Terminal,
    title: "让你自己的 Agent 参与。",
    text: "个人 Codex 或 Claude Code 通过 Team Cross MCP 按需读取已发布材料、核对引用并回复讨论。自己的会话、模型与本地上下文继续保留。",
    prompt: "核对这条批注，结合我们的约定分析一下。",
    tool: "Team Cross MCP · 读取两份引用材料",
    result: "已核对原文，建议只接受同源路径。我已将分析回复到原批注。",
    detail: "按你的指令参与，保存批注不会自动向共享 Agent 发送任务。",
  },
  {
    id: "native",
    label: "接过输入继续",
    icon: Monitor,
    title: "在原生客户端里接着做。",
    text: "获得执行访问并明确交接输入后，使用本机 Codex 专用 Desktop 或原生 CLI/TUI 操作共享会话。处理好这一段，再把输入交还。",
    prompt: "补上同源校验，并运行对应测试。",
    tool: "原生协作 · 输入已交接给 Mei",
    result: "将在 Lin 的 Mac 上完成修改。会话与执行继续留在发起者主机。",
    detail: "使用与共享会话对应的原生客户端；Claude Code TUI 为实验性。",
  },
];

export function WhySection() {
  return (
    <section
      className="why-section container section-space"
      id="why"
      aria-labelledby="why-title"
    >
      <div className="why-heading">
        <span className="overline">一次求助，可以很轻</span>
        <h2 id="why-title">
          “能帮我看一下
          <br />
          这个 Session 吗？”
        </h2>
        <p>从这句话开始，协作就该发生。</p>
        <div className="context-note">
          <GitBranch size={17} />
          <span>沿着已经推进的工作，一起继续。</span>
        </div>
      </div>
      <div className="why-points">
        <article>
          <span className="point-number">01</span>
          <div>
            <h3>工作区和习惯，都留在你手里。</h3>
            <p>
              一次临时合作，无需先把团队搬进新的项目体系。沿用熟悉的终端、客户端和工作组织方式，从一个具体
              Session 开始。
            </p>
          </div>
        </article>
        <article>
          <span className="point-number">02</span>
          <div>
            <h3>各自做过的调查，一起用起来。</h3>
            <p>
              你分享定位问题的过程，同事补充自己的复现记录。把来自不同 Session
              的依据放在一起，引用具体版本，在原文旁讨论。
            </p>
          </div>
        </article>
        <article>
          <span className="point-number">03</span>
          <div>
            <h3>参与多深，由这次工作决定。</h3>
            <p>
              先选择一段内容分享，邀请几位同事讨论。需要一起动手时，再开启执行并交接输入，沿着新的原生协作会话继续。
            </p>
          </div>
        </article>
      </div>
      <div className="workflow-strip">
        <span>你已经在用的工作方式</span>
        <div>
          Codex<span>·</span>Claude Code<span>·</span>T3 Code<span>·</span>Paseo
          <span>·</span>Lody
          <span>·</span>Warp + tmux<span>·</span>Herdr
        </div>
        <p>围绕可接入的原生 Session 协作，具体接入范围以对应版本文档为准。</p>
      </div>
    </section>
  );
}

export function ParticipationSection() {
  const [webOpen, setWebOpen] = useState(false);
  const [material, setMaterial] = useState(0);
  const materials = [
    {
      title: "登录回跳调查",
      author: "Lin",
      turn: "第 3 轮 · 核对实现",
      quote: "回跳参数直接传给了跳转函数，还没有检查目标地址是否同源。",
      comment: "结合 Mei 的复现记录，这里也要检查 // 开头的地址。",
      reference: "外部地址复现记录 · v1",
    },
    {
      title: "外部地址复现记录",
      author: "Mei",
      turn: "第 2 轮 · 复现问题",
      quote:
        "使用外部 URL 和协议相对地址都可以触发跳转，合法的站内路径应继续保留。",
      comment: "这与 Lin 定位的代码一致，可以把这两类地址一起补进检查。",
      reference: "登录回跳调查 · v1",
    },
  ];
  const selected = materials[material];
  return (
    <section
      className="participation-section section-space"
      id="participate"
      aria-labelledby="participate-title"
    >
      <div className="container">
        <div className="section-heading">
          <span className="overline">轻轻加入，也能真正参与</span>
          <h2 id="participate-title">选择适合当下的参与方式。</h2>
          <p>给出建议、带来调查、让 Agent 帮忙，或亲自接过输入。</p>
        </div>
        <Tabs defaultValue="publish" className="participation-tabs">
          <TabsList className="mode-tabs" aria-label="参与协作的方式">
            {participation.map(({ id, label, icon: Icon }) => (
              <TabsTrigger key={id} value={id}>
                <Icon size={17} />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {participation.map((mode) => (
            <TabsContent key={mode.id} value={mode.id} className="mode-panel">
              <div className="mode-copy">
                <div className="feature-icon">
                  <mode.icon size={24} />
                </div>
                <h3>{mode.title}</h3>
                <p>{mode.text}</p>
                <div className="mode-detail">
                  <ShieldCheck size={16} />
                  <span>{mode.detail}</span>
                </div>
              </div>
              <div className="conversation-example">
                <div className="conversation-header">
                  <span>
                    {mode.id === "native"
                      ? "Mei 的原生客户端"
                      : mode.id === "agent"
                        ? "Mei 的个人 Agent"
                        : "Mei 的协作视图"}
                  </span>
                  <span>
                    {mode.id === "native"
                      ? "共享会话"
                      : mode.id === "agent"
                        ? "个人会话"
                        : "材料与讨论"}
                  </span>
                </div>
                <div className="conversation-user">
                  <div className="small-avatar">M</div>
                  <p>{mode.prompt}</p>
                </div>
                <div className="conversation-agent">
                  <Image src="/brand-mark.svg" width="21" height="21" alt="" />
                  <div>
                    <div className="conversation-tool">
                      <Check size={13} />
                      {mode.tool}
                    </div>
                    <p>{mode.result}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <Collapsible
          open={webOpen}
          onOpenChange={setWebOpen}
          className="optional-web"
        >
          <div className="optional-web-header">
            <div className="optional-label">
              <PanelTop size={20} />
              <div>
                <strong>需要共同视图时，也可以打开 WebGUI。</strong>
                <p>按轮次阅读材料，展开工具过程，把讨论留在原文旁。</p>
              </div>
            </div>
            <CollapsibleTrigger className="web-toggle">
              {webOpen ? "收起视图" : "看看 WebGUI"}
              <ChevronDown size={16} className={webOpen ? "rotated" : ""} />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="web-preview" aria-label="可选 WebGUI 交互示意">
              <div className="web-preview-nav">
                <Image src="/brand-mark.svg" width="18" height="18" alt="" />
                <strong>一起核对登录回跳</strong>
                <span>Lin、Mei、Kai · 只读分享</span>
              </div>
              <div
                className="preview-material-list"
                role="group"
                aria-label="选择示意材料"
              >
                {materials.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    aria-pressed={material === index}
                    onClick={() => setMaterial(index)}
                  >
                    <FileText size={16} />
                    <span>
                      {item.title}
                      <small>{item.author} · v1</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="web-preview-content">
                <div className="preview-reader" key={material}>
                  <span className="file-label">{selected.turn}</span>
                  <h3>{selected.title}</h3>
                  <blockquote>{selected.quote}</blockquote>
                  <details className="preview-tool-output">
                    <summary>查看工具过程</summary>
                    <pre>
                      {material === 0
                        ? 'src/auth/redirect.ts\nconst next = params.get("next");\nreturn redirect(next);'
                        : "外部 URL → 可以跳转\n// 开头的地址 → 可以跳转\n站内路径 → 正常跳转"}
                    </pre>
                  </details>
                  <p className="preview-reader-note">
                    先读对话，需要时再展开具体过程。
                  </p>
                </div>
                <aside>
                  <span className="file-label">围绕这段原文讨论</span>
                  <div className="web-comment">
                    <div className="small-avatar">K</div>
                    <p>
                      {selected.comment}
                      <small>Kai · 引用 {selected.title} v1</small>
                    </p>
                  </div>
                  <div className="reference-tags">
                    <span>{selected.reference}</span>
                  </div>
                  <p className="preview-reader-note">
                    引用固定版本。作者发布新内容后，仍能找到当时的依据。
                  </p>
                </aside>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}

export function ConnectionSection() {
  return (
    <section
      className="connection-section container section-space"
      id="connect"
      aria-labelledby="connect-title"
    >
      <div className="connection-copy">
        <span className="overline">距离变了，工作方式不变</span>
        <h2 id="connect-title">
          同一局域网，直接协作。
          <br />
          <span>跨网络，选择 Tailcat。</span>
        </h2>
        <p>
          选择适合这次协作的连接方式。你的客户端、共享的
          Session，以及熟悉的操作习惯，都留在原位。
        </p>
        <div className="connection-facts">
          <span>
            <Check size={15} />
            无需 Team Cross 账号
          </span>
          <span>
            <Check size={15} />
            无需 Tailscale 账号
          </span>
        </div>
      </div>
      <Tabs defaultValue="lan" className="connection-demo">
        <TabsList className="network-tabs" aria-label="连接方式">
          <TabsTrigger value="lan">
            <Network size={16} />
            同一局域网
          </TabsTrigger>
          <TabsTrigger value="tailcat">
            <Globe size={16} />
            Tailcat<span className="experimental">实验性</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lan" className="network-panel">
          <div
            className="network-diagram"
            role="img"
            aria-label="邀请者与参与者通过可互访的局域网直接连接"
          >
            <div className="network-machine">
              <Laptop size={29} />
              <span>邀请者</span>
              <small>Lin 的 Mac</small>
            </div>
            <div className="network-wire">
              <span>LAN 直连</span>
              <i />
            </div>
            <div className="network-machine">
              <Laptop size={29} />
              <span>参与者</span>
              <small>Mei 的 Mac</small>
            </div>
          </div>
          <p>双方位于可互访的局域网，连接直接在两端建立。</p>
          <span className="network-footnote">本次协作明确选择局域网连接。</span>
        </TabsContent>
        <TabsContent value="tailcat" className="network-panel">
          <div
            className="network-diagram"
            role="img"
            aria-label="邀请者与参与者通过 Tailcat 跨网络连接，条件允许时点对点直连，否则使用 DERP 中继"
          >
            <div className="network-machine">
              <Laptop size={29} />
              <span>邀请者</span>
              <small>网络 A</small>
            </div>
            <div className="network-wire tailcat">
              <span>Tailcat</span>
              <i />
              <Globe size={19} />
            </div>
            <div className="network-machine">
              <Laptop size={29} />
              <span>参与者</span>
              <small>网络 B</small>
            </div>
          </div>
          <p>
            通过 Tailcat 完成发现和连接；条件允许时使用点对点 UDP，否则可经 DERP
            中继。
          </p>
          <span className="network-footnote">
            实验性连接，质量取决于双方网络与所用 DERP。
          </span>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export function FutureSection() {
  return (
    <section
      className="future-section container"
      aria-labelledby="future-title"
    >
      <div className="future-copy">
        <span className="direction-label">正在探索的产品方向</span>
        <h2 id="future-title">
          工作需要你的判断时，
          <br />
          协作就可以开始。
        </h2>
        <p>
          我们正在探索：让托管机器上的 Agent 在需要人参与时主动发出邀请，
          把工作现场带到你熟悉的工具里，再沿着原来的 Session 继续。
        </p>
        <div className="future-scope">
          <Server size={17} />
          <span>Agent 自主邀请</span>
        </div>
        <small>Agent 自主判断并邀请人参与，仍是产品方向。</small>
      </div>
      <div className="future-scenario">
        <div className="scenario-origin">
          <Server size={20} />
          <div>
            <strong>托管机器上的 Agent</strong>
            <span>正在推进一次具体工作</span>
          </div>
        </div>
        <div className="scenario-connector" />
        <div className="scenario-invitation">
          <span className="scenario-label">协作邀请 · 方向示意</span>
          <p>“这里需要你的判断。”</p>
          <span>查看现场，给出意见，或接过这一段。</span>
        </div>
        <div className="scenario-connector" />
        <div className="scenario-target">
          <Monitor size={19} />
          <span>进入你熟悉的客户端</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "只是想分享一段调查，也能用吗？",
    "可以。选择已结束对话的公开范围，预览后创建只读空间。它不创建原生 fork，也不开放执行目录；同事可以阅读、批注，并分享各自的会话材料。",
  ],
  [
    "几位同事可以一起参与吗？",
    "可以，一份邀请链接可供多位同事加入，每个人都有独立身份。大家可以同时阅读、发布材料和讨论；启用共同执行后，同一时刻只有一位输入者，由发起者明确交接。",
  ],
  [
    "分享后，新的对话会自动公开吗？",
    "只读材料固定在你选定并预览过的范围。之后的新对话不会自动公开，需要你主动发布新版本；已有批注和引用仍指向当时的版本。撤回可停止后续读取，已经被读到的内容无法收回。",
  ],
  [
    "协作必须打开 Team Cross 的 WebGUI 吗？",
    "WebGUI 是可选的阅读与协作视图。个人 Codex 或 Claude Code 可通过 MCP 按你的指令分享材料、阅读和回复讨论；终端也有相应 CLI 入口。共同执行时，使用对应的原生 TUI 或 Codex 专用 Desktop。",
  ],
  [
    "需要一起修改代码时，会发生什么？",
    "发起者确认来源、工作目录和权限模式，创建新的原生协作 fork，再向指定同事开放完整历史与执行目录、交接输入。原来的材料与讨论保留；同事使用自己的客户端，执行留在发起者的 Mac。也可以直接从 Session 发起执行协作。",
  ],
  [
    "需要把同事的仓库复制到我的电脑上吗？",
    "阅读已发布材料无需先准备本地仓库。共同执行的会话、模型调用和代码操作留在发起者主机；个人辅助 Agent 的对话与模型调用仍在各自本机。发起者需保持 Team Cross 运行，供同事连接。",
  ],
  [
    "目前支持哪些系统和原生客户端？",
    "面向 Apple Silicon、macOS 14 及以上。Codex 支持原生 TUI 和专用于协作的 Desktop；个人 Codex TUI/Desktop、Claude Code TUI 可通过 MCP 辅助。Claude Code 原生 TUI 直接接入与 Tailcat 连接为实验性。下载与安装范围以对应 Release 为准。",
  ],
];

export function StartSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 3500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <>
      <section
        className="faq-section container section-space"
        aria-labelledby="faq-title"
      >
        <div>
          <span className="overline">开始前，几件你可能想知道的事</span>
          <h2 id="faq-title">从你想做的事开始。</h2>
          <a
            className="text-link"
            href={`${repository}#readme`}
            target="_blank"
            rel="noreferrer"
          >
            阅读完整文档
            <ArrowUpRight size={16} />
          </a>
        </div>
        <Accordion type="single" collapsible className="faq-list">
          {faqs.map(([question, answer], index) => (
            <AccordionItem value={`faq-${index}`} key={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section
        className="get-started container"
        id="start"
        aria-labelledby="start-title"
      >
        <div>
          <div className="download-brand">
            <Image
              src="/app-icon.png"
              loading="lazy"
              decoding="async"
              width="56"
              height="56"
              alt="Team Cross 应用图标"
            />
            <span>Team Cross for Mac</span>
          </div>
          <h2 id="start-title">
            从下一次
            <br />
            “帮我看一下”开始。
          </h2>
          <p>选一段值得讨论的 Session，邀请同事带上各自的发现。</p>
          <a
            className="button download-button"
            href={`${repository}/releases`}
            target="_blank"
            rel="noreferrer"
          >
            下载 macOS 版 <ArrowUpRight size={17} />
          </a>
          <div className="download-requirements">
            macOS 14+ · Apple Silicon · 当前为开发预览阶段
          </div>
        </div>
        <div className="install-panel">
          <div className="install-label">
            <Terminal size={17} />
            <span>也可以从终端开始</span>
          </div>
          <p>安装预览版 CLI</p>
          <div className="install-command">
            <code>{installCommand}</code>
            <button
              type="button"
              aria-label={copied ? "安装命令已复制" : "复制 Homebrew 安装命令"}
              onClick={copy}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <div className="copy-result" role="status">
            {copyError
              ? "复制未成功，请手动选择上方命令。"
              : copied
                ? "安装命令已复制。"
                : "安装 App 和 CLI 时，选择一种分发方式即可。"}
          </div>
          <a
            href={`${repository}#安装`}
            className="install-doc-link"
            target="_blank"
            rel="noreferrer"
          >
            安装说明与当前支持范围 <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
