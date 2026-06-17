<p align="center">
  <img src="./public/assets/mei-lockup.svg" width="200" alt="Mei UI System Logo">
</p>

# ClipImg AI 证件照大师 (Mei ID Photo Tool)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ClipImg AI 证件照大师** 是一款基于 Next.js 开发的现代化证件照制作工具。通过集成 [ClipImg API](https://www.clipimg.com/)，它实现了智能抠图、背景切换以及专业的正装换装功能，让你的普通生活照秒变专业证件照。

🚀 **[立即在线体验 →](https://mei-id-photo-tool.vercel.app/)**

---

## 🖼️ 预览与演示

### ✨ 最终效果
<p align="center">
  <img src="./screenshots/demo-3.jpg" width="600" alt="最终换装效果">
</p>

### 🛠️ 制作流程
只需三步，即可拥有专业级证件照：

| **1. 智能抠图与背景切换** | **2. 选择专业正装素材** |
| :---: | :---: |
| <img src="./screenshots/demo-1.jpg" width="380"> | <img src="./screenshots/demo-2.jpg" width="380"> |
| *高精度 AI 边缘识别* | *内置数十款男女正装* |

---

## 🚀 功能特点
- **AI 赋能**：采用先进的算法，边缘切割极其平滑，发丝清晰可见。
- **即时预览**：所有操作实时反馈，所见即所得。
- **隐私安全**：API Key 仅保存在浏览器本地，确保您的隐私数据安全。

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
