export const websiteCopy = {
  "zh-CN": {
    why: {
      overline: "一次求助，可以很轻",
      titleFirst: "“能帮我看一下",
      titleSecond: "这个 Session 吗？”",
      introduction: "从这句话开始，协作就该发生。",
      context: "沿着已经推进的工作，一起继续。",
      points: [
        {
          title: "工作区和习惯，都留在你手里。",
          text: "一次临时合作，无需先把团队搬进新的项目体系。沿用熟悉的终端、客户端和工作组织方式，从一个具体 Session 开始。",
        },
        {
          title: "各自做过的调查，一起用起来。",
          text: "你分享定位问题的过程，同事补充自己的复现记录。把来自不同 Session 的依据放在一起，引用具体版本，在原文旁讨论。",
        },
        {
          title: "参与多深，由这次工作决定。",
          text: "先选择一段内容分享，邀请几位同事讨论。需要一起动手时，再开启执行并交接输入，沿着新的原生协作会话继续。",
        },
      ],
      workflowLabel:
        "你已经在用的 Agent，和你已经习惯用来组织它们的 Agent 入口",
      workflowNote:
        "围绕可接入的原生 Session 协作，具体接入范围以对应版本文档为准。",
    },
    participation: {
      overline: "轻轻加入，也能真正参与",
      title: "选择适合当下的参与方式。",
      introduction: "给出建议、带来调查、让 Agent 帮忙，或亲自接过输入。",
      ariaLabel: "参与协作的方式",
      modes: [
        {
          id: "read",
          label: "看一眼，提意见",
          title: "带着上下文开始讨论。",
          text: "阅读同事选择公开的会话内容，把意见留在原文旁。几位同事可以一起讨论，只想帮忙审阅，也是一种完整的参与方式。",
          prompt: "这段回跳逻辑，还需要检查外部 URL。",
          tool: "原文旁批注 · 登录回跳调查 v1",
          result: "意见已保存，其他同事可以沿着这段原文继续回复。",
          detail: "浏览与批注无需取得输入权。",
          surface: "Mei 的协作视图",
          context: "材料与讨论",
        },
        {
          id: "publish",
          label: "带来我的调查",
          title: "把你这边的发现，也带进来。",
          text: "从自己的 Codex 或 Claude Code Session 中选择一段，预览后发布到同一个空间。每位同事都能贡献多份材料，让各自做过的调查成为共同的讨论依据。",
          prompt: "把我这次复现的第 2—3 轮分享进来。",
          tool: "已预览公开范围 · 发布会话材料",
          result:
            "外部地址复现记录 v1 已发布。大家可以引用这份材料，与 Lin 的调查一起讨论。",
          detail: "后续更新由作者主动发布，已有引用保留当时的版本。",
          surface: "Mei 的协作视图",
          context: "材料与讨论",
        },
        {
          id: "agent",
          label: "带上我的 Agent",
          title: "让你自己的 Agent 参与。",
          text: "个人 Codex 或 Claude Code 通过 Team Cross MCP 按需读取已发布材料、核对引用并回复讨论。自己的会话、模型与本地上下文继续保留。",
          prompt: "核对这条批注，结合我们的约定分析一下。",
          tool: "Team Cross MCP · 读取两份引用材料",
          result: "已核对原文，建议只接受同源路径。我已将分析回复到原批注。",
          detail: "按你的指令参与，保存批注不会自动向共享 Agent 发送任务。",
          surface: "Mei 的个人 Agent",
          context: "个人会话",
        },
        {
          id: "native",
          label: "接过输入继续",
          title: "在原生客户端里接着做。",
          text: "获得执行访问并明确交接输入后，使用本机 Codex 专用 Desktop 或原生 CLI/TUI 操作共享会话。处理好这一段，再把输入交还。",
          prompt: "补上同源校验，并运行对应测试。",
          tool: "原生协作 · 输入已交接给 Mei",
          result: "将在 Lin 的 Mac 上完成修改。会话与执行继续留在发起者主机。",
          detail: "使用与共享会话对应的原生客户端；Claude Code TUI 为实验性。",
          surface: "Mei 的原生客户端",
          context: "共享会话",
        },
      ],
      optionalWeb: {
        title: "需要共同视图时，也可以打开 WebGUI。",
        description: "按轮次阅读材料，展开工具过程，把讨论留在原文旁。",
        open: "看看 WebGUI",
        close: "收起视图",
        ariaLabel: "可选 WebGUI 交互示意",
        heading: "一起核对登录回跳",
        members: "Lin、Mei、Kai · 只读分享",
        materialPickerLabel: "选择示意材料",
        toolSummary: "查看工具过程",
        alternateToolOutput:
          "外部 URL → 可以跳转\n// 开头的地址 → 可以跳转\n站内路径 → 正常跳转",
        readerNote: "先读对话，需要时再展开具体过程。",
        discussionLabel: "围绕这段原文讨论",
        citationVerb: "引用",
        versionNote:
          "引用固定版本。作者发布新内容后，仍能找到当时的依据。",
        materials: [
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
        ],
      },
    },
    connection: {
      overline: "距离变了，工作方式不变",
      titleFirst: "同一局域网，直接协作。",
      titleSecond: "跨网络，选择 Tailcat。",
      introduction:
        "选择适合这次协作的连接方式。你的客户端、共享的 Session，以及熟悉的操作习惯，都留在原位。",
      facts: ["没有云端后端", "无需 Tailscale 账号"],
      tabsAriaLabel: "连接方式",
      lanLabel: "同一局域网",
      tailcatLabel: "Tailcat",
      experimental: "实验性",
      inviter: "邀请者",
      participant: "参与者",
      inviterMac: "Lin 的 Mac",
      participantMac: "Mei 的 Mac",
      lanWire: "LAN 直连",
      lanAriaLabel: "邀请者与参与者通过可互访的局域网直接连接",
      lanDescription: "双方位于可互访的局域网，连接直接在两端建立。",
      lanFootnote: "本次协作明确选择局域网连接。",
      networkA: "网络 A",
      networkB: "网络 B",
      tailcatAriaLabel:
        "邀请者与参与者通过 Tailcat 跨网络连接，条件允许时点对点直连，否则使用 DERP 中继",
      tailcatDescription:
        "通过 Tailcat 完成发现和连接；条件允许时使用点对点 UDP，否则可经 DERP 中继。",
      tailcatFootnote: "实验性连接，质量取决于双方网络与所用 DERP。",
    },
    future: {
      label: "正在探索的产品方向",
      titleFirst: "工作需要你的判断时，",
      titleSecond: "协作就可以开始。",
      description:
        "我们正在探索：让托管机器上的 Agent 在需要人参与时主动发出邀请，把工作现场带到你熟悉的工具里，再沿着原来的 Session 继续。",
      scope: "Agent 自主邀请",
      footnote: "Agent 自主判断并邀请人参与，仍是产品方向。",
      originTitle: "托管机器上的 Agent",
      originStatus: "正在推进一次具体工作",
      invitationLabel: "协作邀请 · 方向示意",
      invitationQuote: "“这里需要你的判断。”",
      invitationAction: "查看现场，给出意见，或接过这一段。",
      target: "进入你熟悉的客户端",
    },
    start: {
      faqOverline: "开始前，几件你可能想知道的事",
      faqTitle: "从你想做的事开始。",
      documentation: "阅读完整文档",
      faqs: [
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
      ],
      appIconAlt: "Team Cross 应用图标",
      titleFirst: "从下一次",
      titleSecond: "“帮我看一下”开始。",
      description: "选一段值得讨论的 Session，邀请同事带上各自的发现。",
      download: "下载 macOS 版",
      requirements: "macOS 14+ · Apple Silicon · v0.2.1 正式版",
      terminalLabel: "也可以从终端开始",
      installLabel: "安装稳定版 CLI",
      copyReady: "复制 Homebrew 安装命令",
      copyDoneLabel: "安装命令已复制",
      copyError: "复制未成功，请手动选择上方命令。",
      copyDone: "安装命令已复制。",
      copyIdle: "安装 App 和 CLI 时，选择一种分发方式即可。",
      installDocumentation: "安装说明与当前支持范围",
    },
  },
  en: {
    why: {
      overline: "A request for help can stay lightweight",
      titleFirst: "“Could you take a look at",
      titleSecond: "this Session?”",
      introduction: "Collaboration should be able to start with that sentence.",
      context: "Continue together from the work already in progress.",
      points: [
        {
          title: "Keep your workspace and your habits.",
          text: "A short collaboration should not require moving the team into a new project system. Keep the terminal, clients, and project organization you already use, and begin with one specific Session.",
        },
        {
          title: "Put everyone's investigation to work.",
          text: "Share how you tracked down the issue while a teammate adds their reproduction. Bring evidence from different Sessions together, cite exact versions, and discuss it beside the source.",
        },
        {
          title: "Choose the depth of participation for the work at hand.",
          text: "Start by sharing selected material and inviting teammates to discuss it. When you need to work together, enable execution, hand off input, and continue in a new native collaboration Session.",
        },
      ],
      workflowLabel:
        "The Agents you already use, through the Agent clients you already use to organize them",
      workflowNote:
        "Collaborate around native Sessions that Team Cross can connect to. See the documentation for each release for the exact integration scope.",
    },
    participation: {
      overline: "Join lightly and still make a real contribution",
      title: "Choose the way to participate that fits.",
      introduction:
        "Offer a review, bring your investigation, ask your Agent to help, or take over input yourself.",
      ariaLabel: "Ways to participate in a collaboration",
      modes: [
        {
          id: "read",
          label: "Review and comment",
          title: "Start the discussion with context.",
          text: "Read the Session material a teammate chose to publish and comment beside the source. Several teammates can discuss it together, and reviewing alone is a complete way to participate.",
          prompt: "This redirect path also needs to reject external URLs.",
          tool: "Inline comment · Sign-in redirect investigation v1",
          result:
            "Comment saved. Other teammates can continue the thread beside the same source.",
          detail: "Reading and commenting do not require control of input.",
          surface: "Mei's collaboration view",
          context: "Material and discussion",
        },
        {
          id: "publish",
          label: "Bring my findings",
          title: "Bring what you found into the room.",
          text: "Select a range from your own Codex or Claude Code Session, preview it, and publish it into the same space. Every teammate can contribute multiple pieces of material, turning prior investigation into shared evidence.",
          prompt: "Share turns 2–3 from my reproduction.",
          tool: "Published Session material · scope previewed",
          result:
            "External redirect reproduction v1 is published. The team can cite it alongside Lin's investigation.",
          detail:
            "Authors publish later updates deliberately; existing citations keep the version they referenced.",
          surface: "Mei's collaboration view",
          context: "Material and discussion",
        },
        {
          id: "agent",
          label: "Bring my Agent",
          title: "Let your own Agent participate.",
          text: "Your personal Codex or Claude Code can use Team Cross MCP to read published material on demand, check citations, and reply to discussions. Your own Session, model, and local context stay with you.",
          prompt: "Check this comment against our project conventions.",
          tool: "Team Cross MCP · Read two cited materials",
          result:
            "I checked the source and recommend accepting same-origin paths only. I replied to the original comment.",
          detail:
            "Your Agent participates when you ask; saving a comment does not automatically task the shared Agent.",
          surface: "Mei's personal Agent",
          context: "Personal Session",
        },
        {
          id: "native",
          label: "Take over input",
          title: "Continue in a native client.",
          text: "After receiving execution access and an explicit input handoff, use the matching native CLI, TUI, or dedicated Codex Desktop to operate the shared Session. Hand input back when your part is done.",
          prompt: "Add the same-origin check and run the relevant tests.",
          tool: "Native collaboration · Input handed to Mei",
          result:
            "The change will run on Lin's Mac. The Session and execution stay on the host's machine.",
          detail:
            "Use the native client that matches the shared Session; direct Claude Code TUI access is experimental.",
          surface: "Mei's native client",
          context: "Shared Session",
        },
      ],
      optionalWeb: {
        title: "Open the WebGUI when a shared view is useful.",
        description:
          "Read material turn by turn, expand tool activity, and discuss it beside the source.",
        open: "Preview the WebGUI",
        close: "Hide the preview",
        ariaLabel: "Interactive example of the optional WebGUI",
        heading: "Review the sign-in redirect together",
        members: "Lin, Mei, and Kai · Read-only sharing",
        materialPickerLabel: "Choose example material",
        toolSummary: "View tool activity",
        alternateToolOutput:
          "External URL → redirects\nProtocol-relative URL → redirects\nInternal path → redirects correctly",
        readerNote: "Read the conversation first, then expand details when needed.",
        discussionLabel: "Discuss this source passage",
        citationVerb: "cites",
        versionNote:
          "Citations keep a fixed version, so the original evidence remains available after an author publishes an update.",
        materials: [
          {
            title: "Sign-in redirect investigation",
            author: "Lin",
            turn: "Turn 3 · Check the implementation",
            quote:
              "The redirect parameter is passed straight to the navigation function without checking whether the target is same-origin.",
            comment:
              "Mei's reproduction shows that protocol-relative URLs need to be checked here too.",
            reference: "External redirect reproduction · v1",
          },
          {
            title: "External redirect reproduction",
            author: "Mei",
            turn: "Turn 2 · Reproduce the issue",
            quote:
              "Both external URLs and protocol-relative URLs trigger a redirect. Valid internal paths still need to work.",
            comment:
              "This matches the code Lin found. We can cover both external forms in the same check.",
            reference: "Sign-in redirect investigation · v1",
          },
        ],
      },
    },
    connection: {
      overline: "Change the distance, not the way you work",
      titleFirst: "Collaborate directly on the same LAN.",
      titleSecond: "Across networks, choose Tailcat.",
      introduction:
        "Choose the connection that fits this collaboration. Your clients, the shared Session, and the way you already work all stay in place.",
      facts: ["No cloud backend", "No Tailscale account required"],
      tabsAriaLabel: "Connection options",
      lanLabel: "Same LAN",
      tailcatLabel: "Tailcat",
      experimental: "Experimental",
      inviter: "Host",
      participant: "Participant",
      inviterMac: "Lin's Mac",
      participantMac: "Mei's Mac",
      lanWire: "Direct LAN",
      lanAriaLabel:
        "The host and participant connect directly over a mutually reachable local network",
      lanDescription:
        "Both people are on a mutually reachable LAN, so the connection is established directly between their machines.",
      lanFootnote: "This collaboration explicitly uses the local network.",
      networkA: "Network A",
      networkB: "Network B",
      tailcatAriaLabel:
        "The host and participant connect across networks with Tailcat, using peer-to-peer connectivity when possible and a DERP relay otherwise",
      tailcatDescription:
        "Tailcat handles discovery and connection. It uses peer-to-peer UDP when possible and can fall back to a DERP relay.",
      tailcatFootnote:
        "Experimental connection; quality depends on both networks and the DERP in use.",
    },
    future: {
      label: "Product direction under exploration",
      titleFirst: "When the work needs your judgment,",
      titleSecond: "collaboration can begin.",
      description:
        "We are exploring a future where an Agent on a hosted machine can invite a person when human judgment is needed, bring the work into the tools they know, and continue along the original Session.",
      scope: "Agent-initiated invitations",
      footnote:
        "An Agent deciding when to invite a person remains a product direction, not a current capability.",
      originTitle: "Agent on a hosted machine",
      originStatus: "Working through a specific task",
      invitationLabel: "Collaboration invite · Product direction",
      invitationQuote: "“I need your judgment here.”",
      invitationAction: "Review the context, offer an opinion, or take over this part.",
      target: "Open in the client you know",
    },
    start: {
      faqOverline: "A few things you may want to know first",
      faqTitle: "Start with what you need to do.",
      documentation: "Read the full documentation (Chinese)",
      faqs: [
        [
          "Can I use Team Cross just to share an investigation?",
          "Yes. Select the public range of a completed conversation, preview it, and create a read-only space. This does not create a native fork or expose the execution directory. Teammates can read, comment, and contribute material from their own Sessions.",
        ],
        [
          "Can several teammates participate together?",
          "Yes. One invitation link can admit several teammates, each with an independent identity. Everyone can read, publish material, and discuss at the same time. After collaborative execution is enabled, there is still only one current input holder, handed off explicitly by the host.",
        ],
        [
          "Will new conversation turns become public automatically?",
          "No. Read-only material is fixed to the range you selected and previewed. Later turns stay private until you deliberately publish a new version. Existing comments and citations keep pointing to the version they referenced. Withdrawal stops future reads, but it cannot retract content that has already been read.",
        ],
        [
          "Do we have to use the Team Cross WebGUI?",
          "No. The WebGUI is an optional reading and collaboration view. Your personal Codex or Claude Code can use MCP, on your instruction, to publish material, read context, and reply to discussions; corresponding CLI entry points are also available. For collaborative execution, use the matching native TUI or dedicated Codex Desktop.",
        ],
        [
          "What happens when we need to change code together?",
          "The host confirms the source, working directory, and permission mode, then creates a new native collaboration fork. The host explicitly opens the full native history and execution directory to a chosen teammate and hands off input. Existing material and discussion remain available; the teammate uses their own client while execution stays on the host's Mac. Execution collaboration can also be started directly from a Session.",
        ],
        [
          "Do I need to copy my teammate's repository onto my Mac?",
          "Not to read published material. The collaborative Session, model calls, and code operations stay on the host machine. A personal helper Agent's conversation and model calls remain on each participant's own machine. The host keeps Team Cross running so teammates can connect.",
        ],
        [
          "Which systems and native clients are currently supported?",
          "Team Cross targets Apple Silicon and macOS 14 or later. Codex supports its native TUI and a dedicated collaboration Desktop. Personal Codex TUI/Desktop and Claude Code TUI can assist through MCP. Direct Claude Code TUI access and Tailcat connections are experimental. See the corresponding Release for the exact download and installation scope.",
        ],
      ],
      appIconAlt: "Team Cross app icon",
      titleFirst: "Start with the next",
      titleSecond: "“Could you take a look?”",
      description:
        "Choose a Session worth discussing and invite teammates to bring what they found.",
      download: "Download for macOS",
      requirements: "macOS 14+ · Apple Silicon · v0.2.1 stable release",
      terminalLabel: "Or start from the terminal",
      installLabel: "Install the stable CLI",
      copyReady: "Copy the Homebrew install command",
      copyDoneLabel: "Install command copied",
      copyError: "Copy failed. Select the command above manually.",
      copyDone: "Install command copied.",
      copyIdle: "Choose either distribution method when installing the App and CLI.",
      installDocumentation: "Installation and current support (Chinese)",
    },
  },
} as const;
