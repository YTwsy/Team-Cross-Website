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
import { installCommand, repository } from "@/lib/site";

import { websiteCopy } from "../content/website";
import { useLocale } from "./locale-context";

const participationIcons = {
  read: MessageSquare,
  publish: FileText,
  agent: Terminal,
  native: Monitor,
} as const;

export function WhySection() {
  const copy = websiteCopy[useLocale()].why;

  return (
    <section
      className="why-section container section-space"
      id="why"
      aria-labelledby="why-title"
    >
      <div className="why-heading">
        <span className="overline">{copy.overline}</span>
        <h2 id="why-title">
          {copy.titleFirst}{" "}
          <br />
          {copy.titleSecond}
        </h2>
        <p>{copy.introduction}</p>
        <div className="context-note">
          <GitBranch size={17} />
          <span>{copy.context}</span>
        </div>
      </div>
      <div className="why-points">
        {copy.points.map((point, index) => (
          <article key={point.title}>
            <span className="point-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="workflow-strip">
        <span>{copy.workflowLabel}</span>
        <div>
          Codex<span>·</span>Claude Code<span>·</span>T3 Code<span>·</span>Paseo
          <span>·</span>Lody
          <span>·</span>Warp + Tmux<span>·</span>Herdr
        </div>
        <p>{copy.workflowNote}</p>
      </div>
    </section>
  );
}

export function ParticipationSection() {
  const copy = websiteCopy[useLocale()].participation;
  const [webOpen, setWebOpen] = useState(false);
  const [material, setMaterial] = useState(0);
  const materials = copy.optionalWeb.materials;
  const selected = materials[material];
  return (
    <section
      className="participation-section section-space"
      id="participate"
      aria-labelledby="participate-title"
    >
      <div className="container">
        <div className="section-heading">
          <span className="overline">{copy.overline}</span>
          <h2 id="participate-title">{copy.title}</h2>
          <p>{copy.introduction}</p>
        </div>
        <Tabs defaultValue="publish" className="participation-tabs">
          <TabsList className="mode-tabs" aria-label={copy.ariaLabel}>
            {copy.modes.map((mode) => {
              const Icon = participationIcons[mode.id];
              return (
                <TabsTrigger key={mode.id} value={mode.id}>
                  <Icon size={17} />
                  <span>{mode.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {copy.modes.map((mode) => {
            const Icon = participationIcons[mode.id];
            return (
              <TabsContent key={mode.id} value={mode.id} className="mode-panel">
                <div className="mode-copy">
                  <div className="feature-icon">
                    <Icon size={24} />
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
                    <span>{mode.surface}</span>
                    <span>{mode.context}</span>
                  </div>
                  <div className="conversation-user">
                    <div className="small-avatar">M</div>
                    <p>{mode.prompt}</p>
                  </div>
                  <div className="conversation-agent">
                    <Image
                      src="/brand-mark.svg"
                      width="21"
                      height="21"
                      alt=""
                    />
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
            );
          })}
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
                <strong>{copy.optionalWeb.title}</strong>
                <p>{copy.optionalWeb.description}</p>
              </div>
            </div>
            <CollapsibleTrigger className="web-toggle">
              {webOpen ? copy.optionalWeb.close : copy.optionalWeb.open}
              <ChevronDown size={16} className={webOpen ? "rotated" : ""} />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="web-preview" aria-label={copy.optionalWeb.ariaLabel}>
              <div className="web-preview-nav">
                <Image src="/brand-mark.svg" width="18" height="18" alt="" />
                <strong>{copy.optionalWeb.heading}</strong>
                <span>{copy.optionalWeb.members}</span>
              </div>
              <div
                className="preview-material-list"
                role="group"
                aria-label={copy.optionalWeb.materialPickerLabel}
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
                    <summary>{copy.optionalWeb.toolSummary}</summary>
                    <pre>
                      {material === 0
                        ? 'src/auth/redirect.ts\nconst next = params.get("next");\nreturn redirect(next);'
                        : copy.optionalWeb.alternateToolOutput}
                    </pre>
                  </details>
                  <p className="preview-reader-note">
                    {copy.optionalWeb.readerNote}
                  </p>
                </div>
                <aside>
                  <span className="file-label">
                    {copy.optionalWeb.discussionLabel}
                  </span>
                  <div className="web-comment">
                    <div className="small-avatar">K</div>
                    <p>
                      {selected.comment}
                      <small>
                        Kai · {copy.optionalWeb.citationVerb} {selected.title} v1
                      </small>
                    </p>
                  </div>
                  <div className="reference-tags">
                    <span>{selected.reference}</span>
                  </div>
                  <p className="preview-reader-note">
                    {copy.optionalWeb.versionNote}
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
  const copy = websiteCopy[useLocale()].connection;

  return (
    <section
      className="connection-section container section-space"
      id="connect"
      aria-labelledby="connect-title"
    >
      <div className="connection-copy">
        <span className="overline">{copy.overline}</span>
        <h2 id="connect-title">
          {copy.titleFirst}{" "}
          <br />
          <span>{copy.titleSecond}</span>
        </h2>
        <p>{copy.introduction}</p>
        <div className="connection-facts">
          {copy.facts.map((fact) => (
            <span key={fact}>
              <Check size={15} />
              {fact}
            </span>
          ))}
        </div>
      </div>
      <Tabs defaultValue="lan" className="connection-demo">
        <TabsList className="network-tabs" aria-label={copy.tabsAriaLabel}>
          <TabsTrigger value="lan">
            <Network size={16} />
            {copy.lanLabel}
          </TabsTrigger>
          <TabsTrigger value="tailcat">
            <Globe size={16} />
            {copy.tailcatLabel}
            <span className="experimental">{copy.experimental}</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lan" className="network-panel">
          <div
            className="network-diagram"
            role="img"
            aria-label={copy.lanAriaLabel}
          >
            <div className="network-machine">
              <Laptop size={29} />
              <span>{copy.inviter}</span>
              <small>{copy.inviterMac}</small>
            </div>
            <div className="network-wire">
              <span>{copy.lanWire}</span>
              <i />
            </div>
            <div className="network-machine">
              <Laptop size={29} />
              <span>{copy.participant}</span>
              <small>{copy.participantMac}</small>
            </div>
          </div>
          <p>{copy.lanDescription}</p>
          <span className="network-footnote">{copy.lanFootnote}</span>
        </TabsContent>
        <TabsContent value="tailcat" className="network-panel">
          <div
            className="network-diagram"
            role="img"
            aria-label={copy.tailcatAriaLabel}
          >
            <div className="network-machine">
              <Laptop size={29} />
              <span>{copy.inviter}</span>
              <small>{copy.networkA}</small>
            </div>
            <div className="network-wire">
              <span>Tailcat</span>
              <i>
                <Globe size={18} strokeWidth={1.75} aria-hidden="true" />
              </i>
            </div>
            <div className="network-machine">
              <Laptop size={29} />
              <span>{copy.participant}</span>
              <small>{copy.networkB}</small>
            </div>
          </div>
          <p>{copy.tailcatDescription}</p>
          <span className="network-footnote">{copy.tailcatFootnote}</span>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export function FutureSection() {
  const copy = websiteCopy[useLocale()].future;

  return (
    <section
      className="future-section container"
      aria-labelledby="future-title"
    >
      <div className="future-copy">
        <span className="direction-label">{copy.label}</span>
        <h2 id="future-title">
          {copy.titleFirst}{" "}
          <br />
          {copy.titleSecond}
        </h2>
        <p>{copy.description}</p>
        <div className="future-scope">
          <Server size={17} />
          <span>{copy.scope}</span>
        </div>
        <small>{copy.footnote}</small>
      </div>
      <div className="future-scenario">
        <div className="scenario-origin">
          <Server size={20} />
          <div>
            <strong>{copy.originTitle}</strong>
            <span>{copy.originStatus}</span>
          </div>
        </div>
        <div className="scenario-connector" />
        <div className="scenario-invitation">
          <span className="scenario-label">{copy.invitationLabel}</span>
          <p>{copy.invitationQuote}</p>
          <span>{copy.invitationAction}</span>
        </div>
        <div className="scenario-connector" />
        <div className="scenario-target">
          <Monitor size={19} />
          <span>{copy.target}</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </section>
  );
}

export function StartSection() {
  const content = websiteCopy[useLocale()].start;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 3500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copyInstallCommand = async () => {
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
          <span className="overline">{content.faqOverline}</span>
          <h2 id="faq-title">{content.faqTitle}</h2>
          <a
            className="text-link"
            href={`${repository}#readme`}
            target="_blank"
            rel="noreferrer"
          >
            {content.documentation}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <Accordion type="single" collapsible className="faq-list">
          {content.faqs.map(([question, answer], index) => (
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
              alt={content.appIconAlt}
            />
            <span>Team Cross for Mac</span>
          </div>
          <h2 id="start-title">
            {content.titleFirst}{" "}
            <br />
            {content.titleSecond}
          </h2>
          <p>{content.description}</p>
          <a
            className="button download-button"
            href={`${repository}/releases`}
            target="_blank"
            rel="noreferrer"
          >
            {content.download} <ArrowUpRight size={17} />
          </a>
          <div className="download-requirements">{content.requirements}</div>
        </div>
        <div className="install-panel">
          <div className="install-label">
            <Terminal size={17} />
            <span>{content.terminalLabel}</span>
          </div>
          <p>{content.installLabel}</p>
          <div className="install-command">
            <code>{installCommand}</code>
            <button
              type="button"
              aria-label={
                copied ? content.copyDoneLabel : content.copyReady
              }
              onClick={copyInstallCommand}
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <div className="copy-result" role="status">
            {copyError
              ? content.copyError
              : copied
                ? content.copyDone
                : content.copyIdle}
          </div>
          <a
            href={`${repository}#安装`}
            className="install-doc-link"
            target="_blank"
            rel="noreferrer"
          >
            {content.installDocumentation} <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
