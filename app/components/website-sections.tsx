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
  Users,
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
    label: "看一眼，提个意见",
    icon: MessageSquare,
    title: "带着上下文开始讨论。",
    text: "查看已经发生的对话和当前改动，把意见留在具体代码或原文旁。只想帮忙审阅，也是一种完整的参与方式。",
    prompt: "读一下 Lin 分享的会话，看看回跳逻辑。",
    tool: "读取会话与当前改动",
    result: "这里还需要检查外部 URL。我已把意见留在对应代码旁。",
    detail: "浏览与批注无需取得输入权。",
  },
  {
    id: "agent",
    label: "带上我的 Agent",
    icon: Terminal,
    title: "让你自己的 Agent 参与。",
    text: "个人 Codex 或 Claude Code 通过 Team Cross MCP 读取共享 Session、核对文件、回复批注。自己的会话与本地上下文继续保留。",
    prompt: "核对这条批注，结合我们的约定分析一下。",
    tool: "Team Cross MCP · 读取引用与改动",
    result: "已核对原文，建议只接受同源路径。我已将分析回复到原批注。",
    detail: "读取可以并行；向共享 Agent 发送任务需要输入权。",
  },
  {
    id: "native",
    label: "这一段，我来处理",
    icon: Monitor,
    title: "在原生客户端里接着做。",
    text: "明确交接输入后，使用本机 Codex Desktop 或熟悉终端中的原生 CLI/TUI 操作共享会话。处理好这一段，再把输入交还。",
    prompt: "补上同源校验，并运行对应测试。",
    tool: "原生协作 · 输入已交接给 Mei",
    result: "将在 Lin 的 Mac 上完成修改。会话与执行继续留在发起者主机。",
    detail: "直接入口遵循协作的 Provider；Claude Code TUI 为实验性。",
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
            <h3>省下重新讲述上下文的时间。</h3>
            <p>
              之前的尝试、正在讨论的问题、当下的代码改动，都有迹可循。让同事直接进入工作现场，把意见留在原处。
            </p>
          </div>
        </article>
        <article>
          <span className="point-number">03</span>
          <div>
            <h3>参与多深，由这次工作决定。</h3>
            <p>
              可以只看一眼，让自己的 Agent
              分析，也可以接过输入处理一段。需要帮助时加入，处理好后交还，接力的节奏由你们决定。
            </p>
          </div>
        </article>
      </div>
      <div className="workflow-strip">
        <span>你已经在用的工作方式</span>
        <div>
          Multica<span>·</span>T3 Code<span>·</span>Paseo<span>·</span>Lody
          <span>·</span>Warp + tmux<span>·</span>Herdr
        </div>
        <p>围绕可接入的原生 Session 协作，具体接入范围以对应版本文档为准。</p>
      </div>
    </section>
  );
}

export function ParticipationSection() {
  const [webOpen, setWebOpen] = useState(false);
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
          <p>从给出一个建议，到亲自接过输入，都能沿用熟悉的工具。</p>
        </div>
        <Tabs defaultValue="agent" className="participation-tabs">
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
                      : "Mei 的个人 Agent"}
                  </span>
                  <span>{mode.id === "native" ? "共享会话" : "个人会话"}</span>
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
                <p>会话、改动与批注，一个可选的展示面。</p>
              </div>
            </div>
            <CollapsibleTrigger className="web-toggle">
              {webOpen ? "收起视图" : "看看 WebGUI"}
              <ChevronDown size={16} className={webOpen ? "rotated" : ""} />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="web-preview" aria-label="可选 WebGUI 示意">
              <div className="web-preview-nav">
                <Image src="/brand-mark.svg" width="18" height="18" alt="" />
                <strong>修复登录回跳</strong>
                <span>Lin 的 Mac · 输入：Lin</span>
              </div>
              <div className="web-preview-content">
                <div>
                  <div className="file-label">src/auth/redirect.ts</div>
                  <pre>
                    <code>
                      <span>{" const raw = params.get('next');"}</span>
                      <span className="diff-line">
                        + const next = sameOriginPath(raw);
                      </span>
                      <span> return redirect(next);</span>
                    </code>
                  </pre>
                </div>
                <aside>
                  <span className="file-label">原处批注</span>
                  <div className="web-comment">
                    <div className="small-avatar">M</div>
                    <p>
                      这里也要检查外部 URL。<small>Mei · 引用第 2 行</small>
                    </p>
                  </div>
                  <div className="web-comment reply">
                    <Image src="/brand-mark.svg" width="20" height="20" alt="" />
                    <p>
                      已核对原文，将补上同源校验。
                      <small>共享 Agent · 回复</small>
                    </p>
                  </div>
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
          发起邀请的，也可以是托管机器上的
          Agent。把一次需要判断的工作交到你熟悉的工具里，再沿着原来的 Session
          继续。
        </p>
        <div className="future-scope">
          <Users size={17} />
          <span>多人共读与讨论</span>
          <span className="future-dot">·</span>
          <Server size={17} />
          <span>Agent 自主邀请</span>
        </div>
        <small>
          以上为产品方向。当前版本以发起者与一位受邀者的协作为基础。
        </small>
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
    "协作必须打开 Team Cross 的 WebGUI 吗？",
    "WebGUI 是可选的上下文与协作视图。通过个人 Agent 的 MCP 可以阅读、批注和回复；直接操作使用对应 Provider 的原生客户端。终端管理操作按文档中的实际 CLI 或本机 API 入口完成。",
  ],
  [
    "需要把同事的仓库复制到我的电脑上吗？",
    "查看共享上下文无需先准备本地仓库。共享会话、模型调用和代码执行保留在发起者主机。个人辅助 Agent 的会话与上下文仍在你本机。",
  ],
  [
    "分享之后，原来的 Session 会怎样？",
    "Team Cross 从所选来源创建新的原生协作 fork。可以保留原目录，也可以从确认的 HEAD 创建干净 worktree。结束共享会关闭远端访问，会话和代码继续保留。",
  ],
  [
    "目前支持哪些系统和原生客户端？",
    "当前面向 Apple Silicon、macOS 14 及以上。Codex 支持本机 TUI 与专用于协作的 Desktop；个人 Codex TUI/Desktop、Claude Code TUI 可通过 MCP 辅助。Claude Code 原生 TUI 直接接入与 Tailcat 连接为实验性，具体范围以对应版本文档为准。",
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
          <h2 id="faq-title">把边界说清楚。</h2>
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
          <p>带上你的工具，邀请一个同事，一起继续这次工作。</p>
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
