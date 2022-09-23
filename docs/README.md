<!--
 * @Author: fzf404
 * @Date: 2022-06-18 17:15:15
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-22 10:27:21
 * @Description: Monit 说明文档
-->

<p align="center">
  <a href="https://monit.fzf404.art" target="_blank">
    <img src="icon.png" alt="Monit" style="zoom:50%;"/>
  </a>
</p>

<p align="center">
 用于展示各种信息的桌面小组件
</p>

<p align="center">
  <a href="https://github.com/fzf404/Monit"> Github </a> ｜
  <a href="https://monit.fzf404.art"> 开发文档 </a> ｜
  <a href="https://github.com/fzf404/Monit/releases"> 软件下载 </a> ｜
  <a href="https://hub.fastgit.xyz/fzf404/Monit/releases"> 国内镜像 </a>
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/fzf404/image/2022/2022-08-15_22-51-29.webp" alt="bashow" style="zoom:50%;" />
</p>

## ✨ 功能

> VueC 指 Composition API，VueO 指 Options API
>
> 更多请查看：[开发文档](https://monit.fzf404.art)

| 插件名   | 功能              | 技术                         | 贡献                                  | 状态 |
| -------- | ----------------- | ---------------------------- | ------------------------------------- | ---- |
| welcome  | 使用指引          | Vue Composition API          | [fzf404](https://github.com/fzf404)   | ✅   |
| count    | 计数器            | Vue Options API              | [fzf404](https://github.com/fzf404)   | ✅   |
| github   | github 信息监控   | VueO + Axios + Grid          | [fzf404](https://github.com/fzf404)   | ✅   |
| clock    | 时钟翻牌器        | VueC + Scss + Keyframes      | [fzf404](https://github.com/fzf404)   | ✅   |
| todo     | 待办事项管理      | VueC + Pug + Draggable       | [fzf404](https://github.com/fzf404)   | ✅   |
| camera   | 相机监控          | VueC + Canvas + MediaPipe    | [fzf404](https://github.com/fzf404)   | ✅   |
| juejin   | 掘金信息监控      | VueO + Axios + Grid          | [Ned](https://github.com/wangenze267) | ✅   |
| image    | 图像展示          | VueC + IPC + Dialog          | [fzf404](https://github.com/fzf404)   | ✅   |
| music    | 网易云音乐播放    | VueC + Audio                 | [fzf404](https://github.com/fzf404)   | ✅   |
| live2d   | 虚拟角色跟踪      | VueC + Kalidokit + MediaPipe |                                       | ⛔️  |
| bilibili | bilibili 信息监控 |                              |                                       | ⛔️  |
| weather  | 天气信息监控      |                              |                                       | ⛔️  |

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

## ⭐ 标星

![Star History Chart](https://api.star-history.com/svg?repos=fzf404/Monit&type=Date)
