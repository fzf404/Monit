<!--
 * @Author: fzf404
 * @Date: 2022-08-15 23:02:16
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-16 21:56:50
 * @Description: 技术概览
-->

Monit 是一个开源的桌面小组件，使用 MIT 协议开源，您可以自由使用项目中的代码。

基于 Electron + Vue 开发，渲染进程使用 JS / TS + Vue，主进程使用 JS / TS 调用 Electron API。

- 如果您了解 Vue，并不了解 Electron，使用本项目即可快速开发出自己的桌面小组件

- 如果您初学 Vue，对其他技术一无所知，可以通过本项目继续了解 Vue 及 `package.json` 里包含的所有库的基本使用

- 如果您对 Vue 和 NodeJS 一无所知，请先去了解相关技术后再来查看本项目，在失望的离开之前别忘了留下一个 star

## ✨ 使用技术

### 🔥 核心

- Electron 20
  - 跨平台的桌面应用程序构建工具
  - [官方文档](https://www.electronjs.org/zh/docs/latest)
  - 可跨平台使用多种操作系统 API
- Vue 3
  - JavaScript 前端框架
  - [官方文档](https://staging-cn.vuejs.org/)
  - 可使用 setup 语法开发
- Tailwindcss 3
  - 功能类 CSS 语法糖
  - [官方文档](https://www.tailwindcss.cn/docs)
  - 可选功能，可只使用 css 进行插件开发
- TypeScript
  - JavaScript 类型系统
  - [官方文档](https://www.tslang.cn/docs/home.html)
  - 支持类型定义

### 🔧 工具

- Electron Builder
  - 主进程打包工具
- Webpack
  - 渲染进程打包工具
- Axios
  - 网络请求工具
- Vue-Router
  - 插件核心实现方式
- Pinia
  - 全局状态管理工具
- Husky
  - Git Commit Hooks
- Pug
  - 干净的 HTML 模板语法
- Sass
  - Css 预处理器
- Prettier
  - 代码风格及格式化工具
- MediaPipe
  - 使用 Wasm 神经网络人体跟踪工具包

## 🍀 代码结构

> 项目结构基于个人喜好，可能随时发生**重大调整**
>
> 文件头部均有功能描述

```bash
Monit
├── app # 渲染进程
│   ├── assets # 静态资源
│   ├── components # 可复用组件
│   │   ├── iamge.vue # 图像组件
│   │   ├── loading.vue # 加载组件
│   │   └── setting.vue # 设置组件
│   ├── layouts # 布局
│   │   ├── layout.vue # 布局切换组件
│   │   ├── maco.vue # mac 风格布局
│   │   └── wine.vue # win 风格布局
│   ├── plugins # 插件
│   │   └── ... # 全部插件
│   └── themes # 主题
│   │   ├── basic.scss # 全局基础样式
│   │   ├── dark.scss # 黑夜风格主题
│   │   ├── punk.scss # 赛博风格主题
│   │   └── light.scss # 白日风格主题
│   ├── store.js # Pinia 进程
│   └── router.js # Router 配置
├── core # 主进程
│   ├── main.js # 应用入口
│   ├── tray.js # 托盘进程
│   ├── utils.js # 工具包
│   └── window.js # 窗口管理
├── custom # 自定义工具
│   ├── event.ts # 事件处理
│   ├── ipc.ts # IPC通信
│   └── plugin.ts # 插件配置
├── docs # 官网
│   └── ... # 插件文档
├── lib # 库文件
│   ├── camera.ts # 摄像头控制
│   ├── hoslistic.ts # MediaPipe 控制
│   ├── request.ts # 请求封装
│   ├── statistic.ts # 统计封装
│   └── storage.ts # 本地存储封装
├── public # 静态文件
│   └── icons # 托盘图标
├── .prettier # 代码格式化配置
├── tailwind.config.js # tailwindcss 配置
├── tsconfig.json # typescript 配置
└── vue.config.js # vue-cli 配置 & electron 打包配置
```

## 🍻 API 说明

1. Component 组件：`app/layouts/layout.vue`
2. Layout 组件：`app/layouts/layout.vue`
3. Theme 样式：`app/themes/basic.scss`
4. Router 封装：`app/router.ts`
5. Pinia 封装：`app/store.ts`
6. Plugin 配置：`custom/plugin.ts`
7. Event 监听/发送：`custom/{event.ts, ipc.ts}`
   - 窗口操作
   - 发送通知
   - 打开网址
8. Axios 封装：`lib/request.ts`
9. Storage 封装：`lib/storage.ts`
   - 文件位置
     - Mac：`/Users/[user]/Library/Application Support/monit/config.json`
     - Windows：`C:\Users\[user]\AppData\Roaming\monit\config.json`
     - Linux：`/home/[user]/.config/monit/config.json`
