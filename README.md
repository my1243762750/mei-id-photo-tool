# 📸 ClipImg AI 证件照大师 (Mei ID Photo Tool)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)

**ClipImg AI 证件照大师** 是一款基于 Next.js 开发的现代化证件照制作工具。通过集成 [ClipImg API](https://www.clipimg.com/)，它实现了智能抠图、背景切换以及专业的正装换装功能，让你的普通生活照秒变专业证件照。

---

## ✨ 核心特性

- 🤖 **智能抠图**：高精度 AI 识别，完美处理发丝级细节。
- 🎨 **一键换底**：支持纯白、天蓝、正红等多种标准证件照底色，以及渐变色。
- 👔 **专业换装**：内置数十款男装、女装及童装正装素材，智能匹配体态。
- 🖼️ **高清输出**：支持 JPG 和 PNG 格式的高质量图片下载。
- 🛡️ **隐私安全**：API Key 仅保存在浏览器本地，确保您的隐私数据安全。
- 📱 **响应式设计**：完美适配桌面端，操作流程直观简单。

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/mei-id-photo-tool.git
cd mei-id-photo-tool
```

### 2. 安装依赖
```bash
npm install
```

### 3. 运行开发服务器
```bash
npm run dev
```
打开 [http://localhost:3000](http://localhost:3000) 即可预览。

### 4. 配置 API Key
在使用前，您需要在 [ClipImg 官网](https://www.clipimg.com/) 免费获取一个 32 位的 API Key，并填入设置面板。

---

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI 组件**: 自定义 `mei-ui-system` (基于设计系统标准)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: CSS-in-JS / Vanilla CSS
- **API 集成**: ClipImg Service

---

## 📂 项目结构

```text
├── src/
│   ├── app/                # 路由与页面组件
│   │   ├── api/            # 后端 API 接口 (换装、抠图、下载)
│   │   └── page.tsx        # 主界面
│   └── lib/                # 工具函数
├── public/
│   └── clothes/            # 正装素材库
└── next.config.ts          # Next.js 配置
```

---

## 📝 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request 来完善这个项目！

- 如果你喜欢这个项目，请给它一个 **Star** ⭐️
- 反馈问题请前往 [Issues](https://github.com/your-username/mei-id-photo-tool/issues)
