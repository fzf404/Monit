<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-23 23:23:28
 * @Description: camera 相机监控
-->
<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen">
      <!-- TODO 设置模态框 -->
      <aside class="setting" v-show="store.setting">
        <!-- 中心框 -->
        <ul>
          <!-- 设置 -->
          <li>
            <label for="mirror-open">镜像</label>
            <input id="mirror-open" type="checkbox" v-model="setting.mirror" />
          </li>
          <li>
            <label for="contorl-open">控制器</label>
            <input id="contorl-open" type="checkbox" v-model="setting.control" />
          </li>
          <li>
            <label for="holistic-open">角色跟踪</label>
            <input id="holistic-open" type="checkbox" v-model="setting.holistic" />
          </li>
          <li>
            <label for="camera-select">设备</label>
            <select id="camera-select" v-model="setting.camera">
              <option v-for="device in setting.devices" :value="device.deviceId" @select="switchCamera">
                {{ device.label.slice(0, 22) }}
              </option>
            </select>
          </li>
          <!-- 保存 -->
          <ol>
            <button @click="store.setting = false">OK</button>
          </ol>
        </ul>
      </aside>
      <!-- 主屏幕 -->
      <section class="relative w-full h-full overflow-hidden rounded-lg">
        <section v-show="setting.loading" class="absolute w-full h-full z-50 modal flex-col-center space-y-2">
          <LoadSVG class="w-16 load-rotating" />
          <p class="text-intro">正在加载中...</p>
          <p class="text-intro">首次启动会从 CDN 加载模型文件</p>
          <p class="text-intro">可能需要 30s 以上</p>
        </section>
        <!-- 绘制 -->
        <canvas ref="canvas" class="absolute w-full h-full z-10" :class="{ mirror: setting.mirror }" />
        <!-- 预览 -->
        <video ref="video" class="absolute w-full h-full" :class="{ mirror: setting.mirror }" autoplay />
        <!-- 记录 -->
        <a ref="record" class="hidden" />
      </section>
      <!-- 相机控制器 -->
      <section v-show="setting.control" class="absolute z-20 left-0 right-0 bottom-4 space-x-4 text-center">
        <!-- 拍照 -->
        <button class="btn bg-indigo-500 hover:bg-indigo-600">
          <CameraSVG class="w-6" @click="takePhoto(canvas, video, record)" />
        </button>
        <!-- 录像 -->
        <transition name="fade" mode="out-in">
          <!-- 开始录像 -->
          <button v-if="!setting.recording" class="btn bg-pink-500 hover:bg-pink-600">
            <VideoSVG
              class="w-6"
              @click="
                () => {
                  recordVideo(record, setting.camera)
                  setting.recording = true
                }
              "
            />
          </button>
          <!-- 停止录像 -->
          <button v-else class="btn bg-rose-600 hover:bg-rose-500">
            <OffSVG
              class="w-6"
              @click="
                () => {
                  stopVideo()
                  setting.recording = false
                }
              "
            />
          </button>
        </transition>
      </section>
    </article>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'

import { useMainStore } from '#/store'
import { recordVideo, stopVideo, takePhoto } from '~/camera'
import { initHolistic } from '~/holistic'
import { storage } from '~/storage'

import Layout from '@/layouts/macto.vue'

import CameraSVG from '@/assets/camera/camera.svg'
import OffSVG from '@/assets/camera/off.svg'
import VideoSVG from '@/assets/camera/video.svg'
import LoadSVG from '@/assets/layout/load.svg'

// 初始化 store
const store = useMainStore()
// 初始化 storage
const { set, get } = storage()

// HTMLElement Refs
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 设置状态
const setting = reactive({
  devices: [], // 设备列表
  loading: true, // 加载状态
  recording: false, // 录像状态
  mirror: get('mirror', true), // 镜像
  camera: get('camera', null), // 设备ID
  control: get('control', true), // 控制器
  holistic: get('holistic', true), // 角色跟踪
})

// 初始化设备
onMounted(async () => {
  // 读取设备列表
  setting.devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => {
    return device.kind === 'videoinput'
  })

  // 判断相机是否存在
  if (!setting.devices) {
    return alert('相机不存在！')
  }

  // 设置默认相机
  setting.camera = setting.camera || setting.devices[0].deviceId

  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: setting.camera,
    },
  })
  // 是否开启角色追踪
  if (setting.holistic) {
    await initHolistic(canvas.value, video.value)
  }
  setting.loading = false
})

// 监听设置修改
watch(
  () => setting.mirror,
  (mirror) => {
    set('mirror', mirror)
  }
)

watch(
  () => setting.control,
  (val) => {
    set('control', val)
  }
)

watch(
  () => setting.holistic,
  (val) => {
    set('holistic', val)
    window.location.reload()
  }
)

watch(
  () => setting.camera,
  async (val) => {
    set('camera', val)
    // 是否开启角色追踪
    if (setting.holistic) {
      // 重新加载窗口初始化角色追踪
      window.location.reload()
    } else {
      // 切换摄像头
      video.value.srcObject = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: val,
        },
      })
    }
  }
)
</script>
<!-- TODO 移动至 layout  -->
<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>
