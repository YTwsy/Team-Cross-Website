"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Check,
  FileText,
  Keyboard,
  MessageSquare,
  Monitor,
  Pause,
  Play,
  Terminal,
  Users,
} from "lucide-react";

import {
  sessionDemoCopy,
  type DemoScenario,
} from "../content/session-demo";
import { useLocale } from "./locale-context";

type Scenario = DemoScenario;
const SCROLL_STEP_DISTANCE = 320;
const SCROLL_ENTRY_GUARD = 64;
const MIN_PAN_DISTANCE = 200;
const STICKY_TOP = 16;
const DISCUSS_STEP_COUNT = sessionDemoCopy.en.scenarios.discuss.steps.length;
const TOTAL_STEP_COUNT =
  DISCUSS_STEP_COUNT + sessionDemoCopy.en.scenarios.execute.steps.length;

function useDemoCopy() {
  return sessionDemoCopy[useLocale()];
}

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollStepDistance() {
  if (window.innerWidth <= 760) return Math.max(1000, window.innerHeight);
  if (window.innerWidth <= 1100 || window.innerHeight <= 850)
    return Math.max(560, Math.round(window.innerHeight * 0.75));
  return SCROLL_STEP_DISTANCE;
}

function panDemoPanel(panel: HTMLDivElement | null, progress: number) {
  if (!panel) return;
  const overflow = Math.max(0, panel.scrollHeight - panel.clientHeight);
  // Adjacent steps can have different heights; keep their pan distance steady.
  panel.scrollTop = Math.min(
    overflow,
    Math.max(overflow, MIN_PAN_DISTANCE) * progress,
  );
}

function scenarioPanProgress(distance: number, index: number, stepDistance: number) {
  const firstStep = index < DISCUSS_STEP_COUNT ? 0 : DISCUSS_STEP_COUNT;
  const stepCount = index < DISCUSS_STEP_COUNT
    ? DISCUSS_STEP_COUNT
    : TOTAL_STEP_COUNT - DISCUSS_STEP_COUNT;
  const scenarioDistance = Math.max(0, distance - firstStep * stepDistance);
  return Math.min(
    1,
    Math.max(
      0,
      (scenarioDistance - SCROLL_ENTRY_GUARD) /
        (stepCount * stepDistance - SCROLL_ENTRY_GUARD),
    ),
  );
}

let restoreScrollFrame = 0;
let originalScrollBehavior: string | null = null;

function jumpToDemoPosition(top: number) {
  const root = document.documentElement;
  if (originalScrollBehavior === null)
    originalScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top, behavior: "instant" });
  window.cancelAnimationFrame(restoreScrollFrame);
  restoreScrollFrame = window.requestAnimationFrame(() => {
    root.style.scrollBehavior = originalScrollBehavior ?? "";
    originalScrollBehavior = null;
    restoreScrollFrame = 0;
  });
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
  const copy = useDemoCopy().bridge;
  const labels = execution ? copy.executeLabels : copy.discussLabels;

  return (
    <div className="session-bridge">
      <div className="bridge-line" aria-hidden="true" />
      <div className="session-token">
        <Image src="/brand-mark.svg" width="20" height="20" alt="" />
      </div>
      <div className="session-legend">
        <p>{execution ? copy.executeTitle : copy.discussTitle}</p>
        <ul className="bridge-label">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SourceWindow({ index, step }: { index: 0 | 1; step: number }) {
  const copy = useDemoCopy();
  const material = copy.materials[index];
  const source = copy.source;
  const personal = index === 1;
  return (
    <div
      className={`native-window ${personal ? "personal-window claude-source-window" : "terminal-window"}`}
    >
      <div className="window-chrome">
        <TrafficLights />
        <span>
          <Terminal size={13} />
          {source.sessionLabel(material.author)}
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
            <p>
              {personal ? source.personalDescription : source.hostDescription}
            </p>
          </div>
        </div>
        <div className="outside-range">
          <span aria-hidden="true">···</span>
          {source.outsideRange}
        </div>
        <div className="source-selection" data-material-source={material.id}>
          <div className="range-label">
            <Check size={13} />
            {source.publicRange} · {material.range}
          </div>
          <div className="source-turn">
            <span>
              {personal ? source.personalFirstTurn : source.hostFirstTurn}
            </span>
            <p>{material.question}</p>
          </div>
          <div className="source-turn">
            <span>
              {personal ? source.personalSecondTurn : source.hostSecondTurn}
            </span>
            <p>{material.finding}</p>
          </div>
        </div>
        <div className="terminal-event">
          <Check size={14} />
          <span>
            {personal && step === 3
              ? source.agentChecked
              : step === 0
                ? source.previewFirst
                : source.published(material.title)}
          </span>
        </div>
      </div>
      <div className="window-status">
        <span>{source.sessionKept}</span>
        <span>{source.scopeOwned}</span>
      </div>
    </div>
  );
}

function DiscussionScene({
  step,
  active,
  reducedMotion,
  selectedMaterial,
  onSelect,
  next,
}: {
  step: number;
  active: boolean;
  reducedMotion: boolean;
  selectedMaterial: number | null;
  onSelect: (index: number | null) => void;
  next: () => void;
}) {
  const copy = useDemoCopy();
  const materials = copy.materials;
  const discussion = copy.discussion;
  const stage = useRef<HTMLDivElement>(null);
  const selected =
    selectedMaterial === null ? null : materials[selectedMaterial];

  useEffect(() => {
    const root = stage.current;
    if (!root || !active || step !== 1 || reducedMotion) return;
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
  }, [step, active, reducedMotion, materials]);

  return (
    <div className="native-stage discussion-stage" data-step={step} ref={stage}>
      <SourceWindow index={0} step={step} />
      <div className="discussion-bridge">
        <Bridge />
        <div className="contributor-session" data-material-source="kai">
          <span className="contributor-avatar" aria-hidden="true">
            K
          </span>
          <div>
            <strong>Kai · Codex</strong>
            <span>{materials[2].title}</span>
          </div>
          <span className="contributor-status">
            <FileText size={12} />
            {step === 0
              ? discussion.contributorSelected
              : discussion.contributorPublished}
          </span>
        </div>
      </div>
      <SourceWindow index={1} step={step} />
      <div className="shared-materials">
        <div className="shared-materials-heading">
          <div>
            <Users size={16} />
            <strong>
              {step === 0
                ? discussion.headingBefore
                : discussion.headingAfter}
            </strong>
          </div>
          <span>
            {step === 0
              ? discussion.statusBefore
              : discussion.statusAfter}
          </span>
        </div>
        <div
          className="shared-material-grid"
          role="group"
          aria-label={discussion.materialsAriaLabel}
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
              <small>{step === 0 ? discussion.preview : "v1"}</small>
            </button>
          ))}
        </div>
        <div className="material-discussion" aria-live="polite">
          {selected ? (
            <div className="material-excerpt">
              <div>
                <span>
                  {selected.author} · {selected.title} · {selected.range}
                  {step > 0 ? " · v1" : discussion.prePublishPreview}
                </span>
                <button type="button" onClick={() => onSelect(null)}>
                  {step >= 2
                    ? discussion.returnToDiscussion
                    : discussion.collapseExcerpt}
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
                    ? discussion.agentReplyLabel
                    : discussion.citationLabel}
                </span>
                <p>
                  {step === 3
                    ? discussion.agentReply
                    : discussion.citationReply}
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
                  ? discussion.noteBefore
                  : discussion.noteAfter}
              </p>
            </div>
          )}
        </div>
        <div className="material-scene-actions">
          <span>{discussion.readOnlyStatus}</span>
          <button type="button" className="inline-action" onClick={next}>
            {copy.scenarios.discuss.actions[step]}
            <ArrowRight size={15} />
            <span className="sr-only">{copy.controls.demoOnly}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExecutionScene({ step, next }: { step: number; next: () => void }) {
  const copy = useDemoCopy();
  const execution = copy.execution;
  const remote = step === 2 || step === 3;
  const writer = remote ? "Mei" : "Lin";
  return (
    <div
      className="native-stage execution-stage"
      data-step={step}
      data-writer={writer}
    >
      <div className="handoff-overview">
        <span>
          <Keyboard size={16} />
          {execution.oneWriter}
        </span>
        <span className="execution-host">
          <Monitor size={15} />
          {execution.executionHost}
        </span>
      </div>
      <div
        className="handoff-track"
        role="group"
        aria-label={execution.currentWriterAria(writer)}
      >
        <div className="handoff-route" aria-hidden="true" />
        <div className="input-baton" aria-hidden="true">
          <Keyboard size={14} />
          {execution.currentInput} · {writer}
        </div>
        <div className="handoff-person">
          <span className="avatar">L</span>
          <div>
            <strong>Lin</strong>
            <span>
              {remote ? execution.hostCanReclaim : execution.canContinue}
            </span>
          </div>
        </div>
        <span className="handoff-direction" aria-hidden="true">
          {step === 4
            ? execution.returnDirection
            : execution.handoffDirection}
        </span>
        <div className="handoff-person">
          <span className="avatar">M</span>
          <div>
            <strong>Mei</strong>
            <span>
              {remote
                ? execution.canContinue
                : step >= 1
                  ? execution.accessWaiting
                  : execution.discussionOnly}
            </span>
          </div>
        </div>
      </div>
      <div className="native-window terminal-window" data-has-input={!remote}>
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Terminal size={13} />
            {execution.hostSession}
          </span>
          <span className="source-provider">Codex</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-agent">
            <span className="agent-symbol" aria-hidden="true">
              ✳
            </span>
            <div>
              <strong>{execution.taskTitle}</strong>
              <p>{execution.nativeFork}</p>
            </div>
          </div>
          <p className="terminal-prompt">
            <span>›</span>
            {step >= 3
              ? execution.taskPrompt
              : execution.waitingPrompt}
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
            <span>{execution.events[step]}</span>
          </div>
          <div
            className={`terminal-input ${remote ? "input-view-only" : "input-available"}`}
          >
            <span>›</span>
            <span>
              {remote ? execution.handedToMei : execution.linCanType}
            </span>
            {!remote && <i className="cursor" aria-hidden="true" />}
          </div>
        </div>
        <div className="window-status">
          <span>
            <span className="status-dot" />
            {execution.staysOnMac}
          </span>
          <span>
            {remote ? execution.viewing : execution.currentWriter}
          </span>
        </div>
      </div>
      <Bridge execution />
      <div className="native-window personal-window" data-has-input={remote}>
        <div className="window-chrome">
          <TrafficLights />
          <span>
            <Monitor size={13} />
            {remote ? execution.nativeClient : execution.collaborationView}
          </span>
          <span className="source-provider">Codex</span>
        </div>
        <div className="personal-body">
          <div className="personal-heading">
            <div className="avatar">M</div>
            <div>
              <strong>{execution.headings[step]}</strong>
              <p>
                {remote
                  ? execution.nativeClients
                  : execution.materialsRemain}
              </p>
            </div>
          </div>
          <div className="personal-message">{execution.messages[step]}</div>
          <p className="agent-response">{execution.agentResponse}</p>
          <div
            className={`personal-input ${remote ? "input-available" : "input-view-only"}`}
          >
            <Keyboard size={15} />
            <span>
              {remote
                ? step === 3
                  ? execution.meiDone
                  : execution.meiCanType
                : execution.keepDiscussing}
            </span>
            {remote && <i className="cursor" aria-hidden="true" />}
          </div>
          <div className="annotation">
            <MessageSquare size={15} />
            <div>
              <span>{execution.annotationLabel}</span>
              <p>{execution.annotation}</p>
            </div>
          </div>
        </div>
        <div className="window-status">
          <span>
            {remote
              ? execution.nativeCurrentWriter
              : execution.discussionOpen}
          </span>
          <span>{remote ? execution.canType : execution.inputWithLin}</span>
        </div>
      </div>
      <div className="handoff-actions">
        <span>
          <MessageSquare size={15} />
          {execution.othersContinue}
        </span>
        <button type="button" className="inline-action" onClick={next}>
          {copy.scenarios.execute.actions[step]}
          <ArrowRight size={15} />
          <span className="sr-only">{copy.controls.demoOnly}</span>
        </button>
      </div>
    </div>
  );
}

function DemoControls({
  scenario,
  step,
  playing,
  choose,
  togglePlayback,
}: {
  scenario: Scenario;
  step: number;
  playing: boolean;
  choose: (step: number) => void;
  togglePlayback: () => void;
}) {
  const copy = useDemoCopy();
  const current = copy.scenarios[scenario];
  const controls = copy.controls;
  return (
    <>
      <div className="demo-controls">
        <div
          className="demo-steps"
          role="group"
          aria-label={controls.stepsAria(current.name)}
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
              aria-label={controls.stepAria(current.name, index + 1, label)}
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
          aria-label={controls.playbackAria(playing, current.name)}
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
  const copy = useDemoCopy();
  const scenarios = copy.scenarios;
  const [scenario, setScenario] = useState<Scenario>("discuss");
  const [steps, setSteps] = useState({ discuss: 0, execute: 0 });
  const [playing, setPlaying] = useState<Scenario | null>(null);
  const [stepDistance, setStepDistance] = useState(SCROLL_STEP_DISTANCE);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const scrollStep = useRef(-1);
  const scrollProgress = useRef(0);
  const stepDistanceRef = useRef(SCROLL_STEP_DISTANCE);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    prefersReducedMotion,
    () => false,
  );

  useEffect(() => {
    const measure = () => {
      const next = scrollStepDistance();
      const previous = stepDistanceRef.current;
      if (next === previous) return;
      const node = track.current;
      const start = node
        ? node.getBoundingClientRect().top + window.scrollY - STICKY_TOP
        : 0;
      const distance = window.scrollY - start;
      stepDistanceRef.current = next;
      setStepDistance(next);
      if (distance >= 0 && distance <= TOTAL_STEP_COUNT * previous) {
        jumpToDemoPosition(start + (distance / previous) * next);
      }
    };
    window.addEventListener("resize", measure);
    measure();
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    scrollStep.current = -1;
    let frame = 0;
    const update = () => {
      const start = node.getBoundingClientRect().top + window.scrollY - STICKY_TOP;
      const distance = Math.max(0, window.scrollY - start);
      const index = Math.min(
        TOTAL_STEP_COUNT - 1,
        Math.floor(distance / stepDistance),
      );
      scrollProgress.current = scenarioPanProgress(
        distance,
        index,
        stepDistance,
      );
      if (index === scrollStep.current) {
        panDemoPanel(panels.current, scrollProgress.current);
        return;
      }
      scrollStep.current = index;
      const nextScenario: Scenario =
        index < DISCUSS_STEP_COUNT ? "discuss" : "execute";
      const nextStep =
        index < DISCUSS_STEP_COUNT ? index : index - DISCUSS_STEP_COUNT;
      setScenario(nextScenario);
      setSteps((previous) => ({ ...previous, [nextScenario]: nextStep }));
      setSelectedMaterial(null);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stepDistance]);

  useLayoutEffect(() => {
    panDemoPanel(panels.current, scrollProgress.current);
  }, [scenario, steps, selectedMaterial, stepDistance]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (scenario !== playing || steps[playing] === scenarios[playing].steps.length - 1) {
        setPlaying(null);
        return;
      }
      const node = track.current;
      if (!node) return;
      const start = node.getBoundingClientRect().top + window.scrollY - STICKY_TOP;
      const index =
        (playing === "discuss" ? 0 : DISCUSS_STEP_COUNT) +
        steps[playing] + 1;
      jumpToDemoPosition(start + index * stepDistance + SCROLL_ENTRY_GUARD);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [playing, scenario, steps, scenarios, stepDistance]);

  useEffect(() => {
    if (!playing) return;
    const pause = () => setPlaying(null);
    const pauseForScrollKey = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(
          event.key,
        ) ||
        (event.key === " " && event.target === document.body)
      )
        pause();
    };
    window.addEventListener("wheel", pause, { passive: true });
    window.addEventListener("touchstart", pause, { passive: true });
    window.addEventListener("keydown", pauseForScrollKey);
    return () => {
      window.removeEventListener("wheel", pause);
      window.removeEventListener("touchstart", pause);
      window.removeEventListener("keydown", pauseForScrollKey);
    };
  }, [playing]);

  useEffect(() => {
    const pauseForVisibility = () => {
      if (document.hidden) setPlaying(null);
    };
    document.addEventListener("visibilitychange", pauseForVisibility);
    return () => {
      document.removeEventListener("visibilitychange", pauseForVisibility);
    };
  }, []);

  useEffect(() => {
    const chapter = panels.current;
    if (!playing || !chapter) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(null);
    });
    observer.observe(chapter);
    return () => observer.disconnect();
  }, [playing]);

  const choose = (scenario: Scenario, step: number) => {
    setPlaying(null);
    if (track.current) {
      const index =
        (scenario === "discuss" ? 0 : DISCUSS_STEP_COUNT) + step;
      const start =
        track.current.getBoundingClientRect().top + window.scrollY - STICKY_TOP;
      scrollStep.current = index;
      scrollProgress.current = scenarioPanProgress(
        index * stepDistance + SCROLL_ENTRY_GUARD,
        index,
        stepDistance,
      );
      setScenario(scenario);
      setSteps((previous) => ({ ...previous, [scenario]: step }));
      setSelectedMaterial(null);
      jumpToDemoPosition(start + index * stepDistance + SCROLL_ENTRY_GUARD);
      return;
    }
  };
  const next = (scenario: Scenario) =>
    choose(scenario, (steps[scenario] + 1) % scenarios[scenario].steps.length);
  const togglePlayback = (scenario: Scenario) => {
    if (playing === scenario) {
      setPlaying(null);
      return;
    }
    if (scenario === "discuss") setSelectedMaterial(null);
    if (steps[scenario] === scenarios[scenario].steps.length - 1)
      choose(scenario, 0);
    setPlaying(scenario);
  };

  return (
    <section
      className="demo-section container"
      id="demo"
      aria-labelledby="session-demo-title"
    >
      <div
        className="demo-scroll-track"
        data-scroll-mode="true"
        ref={track}
        style={
          {
            "--demo-scroll-runway": `${TOTAL_STEP_COUNT * stepDistance}px`,
          } as CSSProperties
        }
      >
        <Tabs
          className="collaboration-demo"
          value={scenario}
          onValueChange={(value) => {
            choose(value as Scenario, 0);
          }}
        >
          <div className="demo-heading">
            <div className="demo-copy">
              <div className="demo-kicker">
                <span className="overline">{copy.heading.overline}</span>
                <span className="demo-sample">{copy.heading.sample}</span>
              </div>
              <div className="demo-title" key={scenario}>
                <h2 id="session-demo-title">
                  {scenario === "discuss"
                    ? copy.heading.discussTitle
                    : copy.heading.executeTitle}
                </h2>
              </div>
            </div>
            <TabsList
              className="scenario-tabs"
              aria-label={copy.heading.tabsAriaLabel}
              data-scenario={scenario}
            >
              <TabsTrigger value="discuss" className="whitespace-normal">
                <FileText size={16} />
                <span>{copy.heading.discussTab}</span>
              </TabsTrigger>
              <TabsTrigger value="execute" className="whitespace-normal">
                <Keyboard size={16} />
                <span>{copy.heading.executeTab}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="demo-guidance">
            <span>{copy.controls.scrollHint}</span>
            <span className="demo-scroll-count" aria-hidden="true">
              {String(
                (scenario === "discuss" ? 0 : DISCUSS_STEP_COUNT) +
                  steps[scenario] +
                  1,
              ).padStart(2, "0")} / {String(TOTAL_STEP_COUNT).padStart(2, "0")}
            </span>
          </div>
          <DemoControls
            scenario={scenario}
            step={steps[scenario]}
            playing={playing === scenario}
            choose={(step) => choose(scenario, step)}
            togglePlayback={() => togglePlayback(scenario)}
          />
          <div className="demo-panels" ref={panels}>
            <TabsContent
              value="discuss"
              className="demo-chapter"
              forceMount
              inert={scenario !== "discuss"}
              aria-hidden={scenario !== "discuss"}
              tabIndex={scenario === "discuss" ? 0 : -1}
            >
              <DiscussionScene
                step={steps.discuss}
                active={scenario === "discuss"}
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
                  {copy.takeaways.discussPrimary}
                </span>
                <span>{copy.takeaways.discussSecondary}</span>
              </div>
            </TabsContent>
            <TabsContent
              value="execute"
              className="demo-chapter"
              forceMount
              inert={scenario !== "execute"}
              aria-hidden={scenario !== "execute"}
              tabIndex={scenario === "execute" ? 0 : -1}
            >
              <ExecutionScene step={steps.execute} next={() => next("execute")} />
              <div className="demo-takeaway">
                <span>
                  <Check size={15} />
                  {copy.takeaways.executePrimary}
                </span>
                <span>{copy.takeaways.executeSecondary}</span>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
