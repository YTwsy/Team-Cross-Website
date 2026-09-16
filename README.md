# Team Cross Website

Team Cross 独立宣传网站。主张：**你的工具，就是协作的入口。**

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

- `app/page.tsx`：导航、首屏、五阶段双端原生协作演示。
- `app/components/website-sections.tsx`：工作流痛点、参与方式、可选 WebGUI、LAN / Tailcat、产品方向、FAQ、下载与复制安装命令。
- `app/globals.css`：品牌样式、响应式布局、交互与减少动态效果支持。
- `app/layout.tsx`：中文页面、标题、描述、Open Graph / Twitter 文字元数据和图标。
- `public/brand-mark.svg`、`public/favicon.svg`：来自 Team Cross 产品仓库 WebGUI 图标。
- `public/app-icon.png`：来自 Team Cross 产品仓库 macOS App 图标。

演示只修改网页中的模拟状态，不连接或操作真实 Agent。当前产品以双人协作为基础，多人共读与 Agent 自主发起邀请标为产品方向。Claude Code 原生 TUI 和 Tailcat 标为实验性。

产品事实来源：<https://github.com/YTwsy/Team-Cross>。演示不虚构创建、分享或交接 CLI 命令。终端完整路径应以已验证的 CLI / 本机 API 为准。其他工具名称用于说明已有工作方式，不表示已经完成逐项兼容认证。

## 发布准备

当前项目仅建立本地网站，未注册或部署远端站点，未设置 Git 远端。`.openai/hosting.json` 仅声明静态产物路径，不含站点 ID。

正式域名确定后，再补充 canonical、sitemap 和 robots 的公开 URL。当前不使用虚构域名，也不生成未经请求的社交分享图。下载与文档直接链接产品的 GitHub Releases 和 README。

发布前运行类型检查、静态构建，并复核桌面与手机上的五步演示、参与方式标签、可选 WebGUI、LAN / Tailcat、FAQ、安装命令复制及键盘操作。
