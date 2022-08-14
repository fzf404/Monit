<!--
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-08-14 09:55:42
 * @Description: Monit 说明文档
-->

## 💡 展示

<img src="https://cdn.jsdelivr.net/gh/fzf404/image/2022/2022-08-13_21-58-23.webp" alt="bashow" style="zoom:50%;" />

## ✨ 功能

> VueC 指 Composition API，VueO 指 Options API

| 插件名   | 功能              | 技术                         | 状态 |
| -------- | ----------------- | ---------------------------- | ---- |
| welcome  | 使用指引          | Vue Composition API          | ✅   |
| count    | 计数器            | Vue Options API              | ✅   |
| github   | github 信息监控   | VueO + Axios + Grid          | ✅   |
| clock    | 时钟翻牌器        | VueC + Scss + Keyframes      | ✅   |
| todo     | 待办事项管理      | VueC + Pug + Draggable       | ✅   |
| camera   | 相机监控          | VueC + Canvas + MediaPipe    | ✅   |
| live2d   | 虚拟角色跟踪      | VueC + Kalidokit + MediaPipe | ⛔️  |
| music    | 网易云音乐播放    |                              | ⛔️  |
| bilibili | bilibili 信息监控 |                              | ⛔️  |
| weather  | 天气信息监控      |                              | ⛔️  |

## 🎁 安装

> 使用 Github Action 自动打包，无需担心安全问题

前往 [Release](https://github.com/fzf404/Monit/releases) / [国内镜像](https://hub.fastgit.xyz/fzf404/Monit/releases) 寻找操作系统对应的安装包

- Windows

  > 全功能支持

- Linux

  > 开机自启功能可能会失效

- Mac

  > 由于没有 Apple 开发者账号，打开时如出现 `Monit.app 已损坏`，请执行如下指令

  ```bash
  sudo xattr -rd com.apple.quarantine /Applications/Monit.app
  ```

## 📝 开发

Monit 是一个开源的桌面小组件，使用 MIT 协议开源，您可以自由使用项目中的代码。

基于 Electron + Vue 开发，渲染进程使用 JS + Vue，主进程使用 JS 调用 Electron API。

- 如果您了解 Vue，并不了解 Electron，使用本项目即可快速开发出自己的桌面小组件。

- 如果您初学 Vue，对其他技术一无所知，可以通过本项目继续了解 Vue 及 `package.json` 里包含的所有库的基本使用。

- 如果您对 Vue 和 NodeJS 一无所知，请先去了解相关技术后再来查看本项目，在失望的离开之前别忘了留下一个 star。

### 🍀 代码结构

> 项目结构基于个人喜好，可能随时发生**重大调整**
>
> 文件头部均有功能描述

```bash
Monit
├── app # 渲染进程
│   ├── assets # 静态资源
│   ├── layouts # 布局组件
│   ├── themes # 主题
│   └── plugins # 插件
├── core # 主进程
│   ├── main.js # 应用入口
│   ├── tray.js # 托盘进程
│   └── window.js # 窗口管理
├── custom # 自定义工具
│   ├── access.ts # 权限获取
│   ├── event.ts # 事件处理
│   ├── ipc.ts # IPC通信
│   ├── plugin.ts # 插件配置
│   └── store.ts # Pinia 配置
├── lib # 库文件
│   ├── camera.ts # 摄像头控制
│   ├── hoslistic.ts # MediaPipe 控制
│   ├── request.ts # 请求封装
│   ├── statistic.ts # 统计封装
│   └── storage.ts # 本地存储封装
├── public # 静态文件
├── .prettier # 代码格式化配置
├── tailwind.config.js # tailwindcss 配置
├── postcss.config.js # postcss 配置
├── tsconfig.json # typescript 配置
└── vue.config.js # vue-cli 配置 & electron 打包配置
```

### ✨ 技术

- Electron 18
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
- TypeScript 4
  - JavaScript 类型系统
  - [官方文档](https://www.tslang.cn/docs/home.html)
  - 支持类型定义

### 🚀 快速开始

> 来写一个计数器吧
>
> 推荐使用 vscode 作为代码编辑器
>
> 安装 tailwindcss 插件后，将鼠标移至 class 上可查看样式 css

1. clone 本项目
   ```bash
   git clone https://github.com/fzf404/Monit.git --depth-1
   ```
2. 安装项目依赖

   ```bash
   # 假如您使用 npm，请安装 pnpm
   npm i -g pnpm

   # 更换国内源
   pnpm config set registry https://registry.npmmirror.com
   pnpm config set electron_mirror https://registry.npmmirror.com/-/binary/electron/

   # 使用 pnpm 安装依赖
   pnpm i
   ```

3. 编写插件页面 `app/plugins/count-new.vue`

   ```vue
   <template>
     <main>
       <!-- 窗口控制器 -->
       <Layout />
       <!-- 设置 -->
       <Setting size="small" :setting="setting" :config="config" />
       <!-- 页面内容 -->
       <article class="h-screen">
         <!-- 主体 -->
         <section class="h-full flex-col-center space-y-2">
           <h1 class="text-intro">计数器</h1>
           <p class="text-5xl">{{ config.count }}</p>
           <!-- 增加 & 减少 -->
           <p class="space-x-4 pt-2">
             <button class="btn btn-sq bg-red-500 hover:bg-red-600" @click="reduce"><SubSVG class="w-5" /></button>
             <button class="btn btn-sq bg-green-500 hover:bg-green-600" @click="increase">
               <AddSVG class="w-5" />
             </button>
           </p>
         </section>
       </article>
     </main>
   </template>

   <script>
   import AddSVG from '@/assets/count/add.svg'
   import SubSVG from '@/assets/count/sub.svg'
   import Setting from '@/components/setting.vue'
   import Layout from '@/layouts/layout.vue'
   import { reactive } from 'vue'
   import { storage } from '~/storage'

   export default {
     setup() {
       // 初始化 storage
       const { get } = storage()

       // 配置项
       const config = reactive({
         // 读取 count 值
         count: get('count', 0), // 数值
         // 读取 setp 值
         step: get('step', 1), // 步长
       })

       // 设置信息
       const setting = [
         {
           id: 'count',
           label: '数值',
           type: 'number',
           options: {
             len: 5,
           },
         },
         {
           id: 'step',
           label: '步长',
           type: 'number',
           options: {
             len: 3,
           },
         },
       ]

       return { setting, config }
     },
     components: {
       Layout,
       AddSVG,
       SubSVG,
       Setting,
     },
     methods: {
       increase() {
         // 浮点数运算精度
         this.config.count = Number((this.config.count + this.config.step).toFixed(2))
       },
       reduce() {
         // 浮点数运算精度
         this.config.count = Number((this.config.count - this.config.step).toFixed(2))
       },
     },
   }
   </script>
   ```

4. 增加插件配置 `coustom/plugin.ts`

   ```typescript
   export const pluginList: pluginList[] = [
     // ...添加如下行
     { name: 'count-new', size: [1, 1], description: '计数器', debug: true },
   ]
   ```

5. 启动 & 打包

   ```bash
   # 调试应用
   pnpm serve
   # 在托盘中启动 count 插件

   # 构建应用
   pnpm build
   # 构建成功后即可在 dist_electron 找到安装包
   ```

### 🌲 主题开发

参考：`app/layouts/maco.vue`

> 待续...

### 🍻 API 说明

1. Layout 布局：`app/layouts/maco.vue`
2. Pinia 封装：`custom/store.ts`
3. Notice 封装：`custom/ipc.ts`
4. Axios 封装：`lib/request.ts`
5. Storage 封装：`lib/storage.ts`
   - 配置文件
     - Mac：`/Users/[user]/Library/Application Support/monit/config.json`
     - Windows：`C:\Users\[user]\AppData\Roaming\monit\config.json`
     - Linux：`/home/[user]/.config/monit/config.json`

> 待续...

### 🔥 提交代码

1. 提交代码请到 beta 分支
2. 执行 commit 操作时会自动进行代码格式化

## ⭐ 标星

![Star History Chart](https://api.star-history.com/svg?repos=fzf404/Monit&type=Date)
