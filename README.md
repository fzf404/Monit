<!--
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-17 18:40:48
 * @Description: Monit 说明文档
-->

## 💡 展示

![show](show.jpeg)

## 🎁 安装

> 使用 Github Action 自动打包，无需担心安全问题

前往 [Release](https://github.com/fzf404/Monit/releases) 寻找操作系统对应的安装包

[国内镜像](https://hub.fastgit.xyz/fzf404/Monit/releases)

- Windows

  > 全功能支持：开机自启、自动更新、权限获取等

- Linux

  > 开机自启功能可能会失效

- Mac

  > 由于没有 Apple 开发者账号，打开时如出现 `Monit.app 已损坏`，请执行如下指令

  ```bash
  sudo xattr -rd com.apple.quarantine [应用位置](将应用程序中的 Monit 拖进来)
  ```

## ✨ 功能

> Vue 指 Composition API，Vue2 指 Options API

| 插件名   | 功能              | 技术                        | 状态 |
| -------- | ----------------- | --------------------------- | ---- |
| welcome  | 使用指引          | Vue Composition API         | ✅   |
| count    | 计数器            | Vue Options API             | ✅   |
| github   | github 信息监控   | Vue2 + Axios + Grid         | ✅   |
| clock    | 时钟翻牌器        | Vue + Scss + Keyframes      | ✅   |
| todo     | 待办事项管理      | Vue + Pug + Draggable       | ✅   |
| camera   | 摄像头监控        | Vue + Navigator + Canvas    | ✅   |
| live2d   | 虚拟角色跟踪      | Vue + MediaPipe + Kalidokit | ⛔️  |
| music    | 网易云音乐播放    |                             | ⛔️  |
| bilibili | bilibili 信息监控 |                             | ⛔️  |

## 📝 开发

Monit 是一个开源的桌面小组件，使用 MIT 协议开源，您可以自由使用项目中的代码。

基于 Electron + Vue 开发，渲染进程使用 JS + Vue，主进程使用 JS 调用 Electron API。

如果您了解 Vue，并不了解 Electron，使用本项目即可快速开发出自己的桌面小组件。

如果您初学 Vue，对其他技术一无所知，可以通过本项目继续了解 Vue 及 `package.json` 里包含的所有库的基本使用。

如果您对 Vue 和 NodeJS 一无所知，请先去了解相关技术后再来查看本项目，在失望的离开之前别忘了留下一个 star。

### 🍀 代码结构

> 项目结构基于个人喜好，可能随时发生**重大调整**
>
> 文件头部均有功能描述

```bash
├── app # 渲染进程
│   ├── assets # 静态资源
│   ├── layouts # 布局组件
│   ├── plugins # 插件
│   └── utils # 工具类
├── custom # 自定义工具
│   ├── ... # 公用工具类
│   └── plugin.js # 插件配置
├── core # 主进程
│   ├── event.js # 事件处理
│   ├── main.js # 应用入口
│   ├── tray.js # 托盘进程
│   └── window.js # 窗口管理
├── public # 静态文件
├── .prettier # 代码格式化配置
├── postcss.config.js # postcss 配置
├── tailwind.config.js # tailwindcss 配置
└── vue.config.js # vue-cli 配置 & electron 打包配置
```

### ✨ 技术

- Electron 18
  - 跨平台的桌面应用程序构建工具
  - [官方文档](https://www.electronjs.org/zh/docs/latest)
- Vue 3
  - JavaScript 前端框架
  - [官方文档](https://v3.cn.vuejs.org/guide/introduction.html)
  - 可使用 setup 语法开发
- Tailwindcss 3
  - 功能类 CSS 语法糖
  - [官方文档](https://www.tailwindcss.cn/docs)
  - 可选功能，可只使用 css 进行插件开发

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
 # 使用 pnpm 安装依赖
 pnpm i
```

3. 编写插件页面 `app/plugins/count.vue`

   ```vue
   <template>
     <main>
       <!-- 窗口控制器 -->
       <Layout v-model:setting="setting" />
       <!-- 页面内容 -->
       <article class="h-screen">
         <!-- 设置 -->
         <aside class="setting setting-sm" v-show="setting">
           <!-- 中心框 -->
           <ul>
             <!-- 数值 -->
             <li>
               <label for="count-number">数值</label>
               <input
                 id="count-number"
                 type="number"
                 oninput="if(value.length > 5) value = value.slice(0, 5)"
                 v-model.lazy="count"
                 @keyup.enter="this.setting = false"
               />
             </li>
             <!-- 步长 -->
             <li>
               <label for="step-number">步长</label>
               <input
                 id="step-number"
                 type="number"
                 oninput="if(value.length > 3) value = value.slice(0, 3)"
                 v-model.lazy="step"
                 @keyup.enter="this.setting = false"
               />
             </li>
             <!-- 保存 -->
             <ol>
               <button @click="this.setting = false">OK</button>
             </ol>
           </ul>
         </aside>
         <!-- 主体 -->
         <section class="flex-col-center space-y-3">
           <h1 class="text-gray-400">计数器</h1>
           <p class="text-5xl">{{ count }}</p>
           <!-- 增加 & 减少 -->
           <p class="space-x-4">
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
   import { storage } from '../../custom/storage'
   import Layout from '../layouts/custom.vue'
   import AddSVG from '../assets/count/add.svg'
   import SubSVG from '../assets/count/sub.svg'

   // 信息存储 & 读取
   const { set, get } = storage('count')

   export default {
     components: {
       Layout,
       AddSVG,
       SubSVG,
     },
     data() {
       return {
         setting: false, // 设置是否开启
         // 读取 count 值
         count: get('count', 0), // 数字
         // 读取 step 值
         step: get('step', 1), // 步长
       }
     },
     methods: {
       increase() {
         // 浮点数运算精度
         this.count = Number((this.count + this.step).toFixed(2))
       },
       reduce() {
         // 浮点数运算精度
         this.count = Number((this.count - this.step).toFixed(2))
       },
     },
     // 监听 count 变化
     watch: {
       count() {
         set('count', this.count)
       },
       setp() {
         set('step', this.step)
       },
     },
   }
   </script>

   <style scoped>
   /* flex 竖向居中 */
   .flex-col-center {
     @apply h-screen flex flex-col justify-center items-center;
   }
   /* flex 横向居中 */
   .flex-row-center {
     @apply flex flex-row flex-nowrap justify-center items-center;
   }
   </style>
   ```

4. 增加插件配置 `common/plugin.js`

   ```js
   export const pluginList = [
     // ...添加如下行
     { name: 'count', size: [1, 1], description: '计数器', debug: true },
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

### 🍻 API 说明

1. 通用布局：`./app/layouts/custom.vue`
2. Axios 封装：`./custom/request.js`
3. Store 封装：`./custom/storage.js`
4. Notice 封装：`./custom/ipc.js`

> 待续...

### 🔥 提交代码

1. 执行 commit 时会自动进行代码格式化
2. 提交代码到 beta 分支
