# Team Cross Website

Team Cross：**你的工具，就是协作的入口。**

## 本地开发

需要 Node.js 24 LTS 和 npm。依赖版本保存在 `package-lock.json`。

```sh
npm ci
npm run dev
```

默认端口为 5173，可使用 `npm run dev -- --hostname 127.0.0.1 --port 4178` 指定本地端口。

```sh
npm run check
npm run build
npm run preview
```

使用 React、TypeScript 和 Vinext / Vite，沿用 Next.js App Router 的目录与元数据接口。`next.config.ts` 设置静态导出，产物位于 `dist/client/`。运行时无需 API、数据库、账号或外部服务。

## 页面与内容

- `app/page.tsx`：导航、首屏与页面组织。
- `app/components/session-demo.tsx`：同一区域以两个 Tab 切换材料讨论（四步）与输入接力（五步）；共用标题区与步骤栏，保留深浅原生窗口，紧凑展示三位成员的材料来源、材料汇入和固定版本引用，以及输入交接和固定执行主机。Tab 切换保留各自进度并暂停播放，支持键盘切换；桌面场景交叠过渡，手机按当前场景自然排布。手动操作、离开可见区域、后台页面与减少动态效果均有暂停处理。
- `app/components/website-sections.tsx`：工作流痛点、参与方式、可选 WebGUI、LAN / Tailcat、产品方向、FAQ、下载与复制安装命令。
- `app/globals.css`：品牌样式、响应式布局、交互与减少动态效果支持。
- `app/layout.tsx`：中文页面、标题、描述、Open Graph / Twitter 文字元数据和图标。
- `public/sitemap.xml`、`public/robots.txt`：以正式站点地址提供搜索引擎发现入口。
- `public/brand-mark.svg`、`public/favicon.svg`：来自 Team Cross 产品仓库 WebGUI 图标。
- `public/app-icon.png`：来自 Team Cross 产品仓库 macOS App 图标。

演示只修改网页中的模拟状态，不连接或操作真实 Agent。当前预发布能力包括独立只读空间、多人加入、多份会话材料和固定版本引用；托管 Agent 自主判断并发起邀请仍标为产品方向。Claude Code 原生 TUI 和 Tailcat 标为实验性。

页面只讲述用户能力和使用边界，开发验收环境与测试覆盖保留在产品仓库文档中。只读材料与共同执行分别表述，不将分享材料等同于开放执行访问。

产品事实来源：<https://github.com/YTwsy/Team-Cross>。演示不虚构创建、分享或交接 CLI 命令。终端完整路径应以已验证的 CLI / 本机 API 为准。其他工具名称用于说明已有工作方式，不表示已经完成逐项兼容认证。

## 发布准备

源码仓库：[YTwsy/Team-Cross-Website](https://github.com/YTwsy/Team-Cross-Website)，默认分支为 `main`，与 Team Cross 产品仓库分别维护。

网站通过 Cloudflare Pages 发布：[teamcross.pages.dev](https://teamcross.pages.dev/)。`main` 分支推送后自动构建，构建命令为 `npm run build`，静态产物目录为 `dist/client/`。`.openai/hosting.json` 仅声明静态产物路径，不含站点 ID。

canonical、sitemap 和 robots 使用 `https://teamcross.pages.dev`。当前不生成未经请求的社交分享图。下载与文档直接链接产品的 GitHub Releases 和 README。

发布前运行类型检查、静态构建，并复核桌面与手机上的演示 Tab 切换与进度保留、两个场景的全部步骤与播放/暂停、四种参与方式标签、可选 WebGUI 材料切换与工具过程展开、LAN / Tailcat、FAQ、安装命令复制及键盘操作和减少动态效果。
