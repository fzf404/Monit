<!--
 * @Author: fzf404
 * @Date: 2022-06-10 09:12:28
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-15 23:25:00
 * @Description: 翻牌时钟
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen flex flex-col justify-center items-center space-y-6">
      <!-- 翻牌器 -->
      <section class="flex justify-center items-center mt-6 space-x-1.5">
        <!-- 时 -->
        <ul class="flip down">
          <li class="digital front n-0"></li>
          <li class="digital back n-0"></li>
        </ul>
        <div class="flip down">
          <div class="digital front n-0"></div>
          <div class="digital back n-0"></div>
        </div>
        <span class="text-4xl">:</span>
        <!-- 分 -->
        <div class="flip down">
          <div class="digital front n-0"></div>
          <div class="digital back n-0"></div>
        </div>
        <div class="flip down">
          <div class="digital front n-0"></div>
          <div class="digital back n-0"></div>
        </div>
        <span class="text-4xl">:</span>
        <!-- 秒 -->
        <div class="flip down">
          <div class="digital front n-0"></div>
          <div class="digital back n-0"></div>
        </div>
        <div class="flip down">
          <div class="digital front n-0"></div>
          <div class="digital back n-0"></div>
        </div>
      </section>
      <!-- 控制器 -->
      <section class="space-x-6">
        <button class="btn bg-blue-500 hover:bg-blue-600" @click="startClock">时钟</button>
        <transition name="fade" mode="out-in">
          <button v-if="!timing" class="btn bg-purple-500 hover:bg-purple-600" @click="startTiming">计时</button>
          <button v-else class="btn bg-red-500 hover:bg-red-600" @click="stop">停止</button>
        </transition>
      </section>
    </article>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Layout from '../layout/custom.vue'

// 翻牌状态
let fliping = [false, false, false, false, false, false]

// setInterval() 回调
let interval = null

// 上次翻牌数字
let old = '000000'

/**
 * @description: 对其中一位数字进行翻牌
 * @param {*} digit 第几位数字
 * @param {*} num 修改成的数字
 * @return {*}
 */
const changeNumber = (digit, num) => {
  // 翻转中则返回
  if (fliping[digit]) return

  // 设置翻牌状态
  fliping[digit] = true

  // 获取 DOM
  const flip = document.querySelectorAll('.flip')[digit]
  const front = document.querySelectorAll('.front')[digit]
  const back = document.querySelectorAll('.back')[digit]

  // 更改数字 & 启动动画
  back.setAttribute('class', `digital back n-${num}`)
  flip.classList.add('go')

  // 延时 600ms 停止动画 & 修改前面数字
  setTimeout(() => {
    flip.classList.remove('go')
    front.setAttribute('class', `digital front n-${num}`)
    // 翻转结束
    fliping[digit] = false
  }, 600)
}

// 开启时钟
const startClock = () => {
  // 停止 setInterval()
  interval && clearInterval(interval)

  // 每秒获取最新时间
  interval = setInterval(() => {
    const time = new Date().toLocaleTimeString('en-GB').replace(/\:/g, '')
    // 遍历时间字符串
    for (let i = 0, len = time.length; i < len; i++) {
      // 判断数字是否修改
      if (time[i] !== old[i]) {
        // 修改翻牌器数字
        changeNumber(i, time[i])
      }
    }
    old = time
  }, 1000)
}

// 数字转字符串
const numToStr = (num, length) => {
  if ((num + '').length >= length) {
    return num
  }
  return numToStr('0' + num, length)
}

// 是否正在计时
const timing = ref(false)

// 开启计时
const startTiming = () => {
  // 停止 setInterval()
  interval && clearInterval(interval)

  // 开启计时
  timing.value = true

  const start = new Date().getTime()

  // 每秒更新计时
  interval = setInterval(() => {
    const diff = new Date().getTime() - start

    const hour = diff % (24 * 3600 * 1000)
    const minute = hour % (3600 * 1000)
    const second = minute % (60 * 1000)

    const time = [Math.floor(hour / (3600 * 1000)), Math.floor(minute / (60 * 1000)), Math.floor(second / 1000)]

    // 转为字符串
    const timeStr = numToStr(time[0], 2) + numToStr(time[1], 2) + numToStr(time[2], 2)

    // 遍历时间字符串
    for (let i = 0, len = timeStr.length; i < len; i++) {
      // 判断数字是否修改
      if (timeStr[i] !== old[i]) {
        // 修改翻牌器数字
        changeNumber(i, timeStr[i])
      }
    }
    old = timeStr
  }, 1000)
}

// 停止计时
const stop = () => {
  timing.value = false
  interval && clearInterval(interval)
}

// 挂载后执行
onMounted(startClock)
</script>

<style scoped>
/* 底板 */
.flip {
  @apply inline-block relative w-12 h-20 rounded-lg border-2 border-gray-400 bg-gray-600 text-gray-500 font-mono text-6xl text-center;
  line-height: 5rem;
}
/* 上下页 */
.flip .digital:before,
.flip .digital:after {
  content: '';
  @apply absolute left-0 right-0 bg-gray-200 overflow-hidden;
}
/* 上页 */
.flip .digital:before {
  @apply top-0 bottom-1/2 rounded-t-lg border-b border-gray-400;
}
/* 下页 */
.flip .digital:after {
  line-height: 0;
  @apply top-1/2 bottom-0 rounded-b-lg border-t-2 border-gray-400;
}

/* 下翻 */
.flip.down .front:before {
  @apply z-30;
}

.flip.down .back:after {
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
  @apply z-20;
}

.flip.down .front:after,
.flip.down .back:before {
  @apply z-10;
}

.flip.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  backface-visibility: hidden;
  @apply shadow-xl;
}

.flip.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/* 上翻 */
.flip.up .front:after {
  @apply z-30;
}

.flip.up .back:before {
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
  @apply z-20;
}

.flip.up .front:before,
.flip.up .back:after {
  @apply z-10;
}

.flip.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  backface-visibility: hidden;
  @apply shadow-xl;
}

.flip.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

/* 动画 */
@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

/* 数字 */
.flip .n-0:before,
.flip .n-0:after {
  content: '0';
}

.flip .n-1:before,
.flip .n-1:after {
  content: '1';
}

.flip .n-2:before,
.flip .n-2:after {
  content: '2';
}

.flip .n-3:before,
.flip .n-3:after {
  content: '3';
}

.flip .n-4:before,
.flip .n-4:after {
  content: '4';
}

.flip .n-5:before,
.flip .n-5:after {
  content: '5';
}

.flip .n-6:before,
.flip .n-6:after {
  content: '6';
}

.flip .n-7:before,
.flip .n-7:after {
  content: '7';
}

.flip .n-8:before,
.flip .n-8:after {
  content: '8';
}

.flip .n-9:before,
.flip .n-9:after {
  content: '9';
}
</style>
