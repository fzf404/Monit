<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-09-18 21:00:23
 * @Description: camera 相机监控
-->
<template>
  <!-- 设置-->
  <Setting :setting="setting" :config="config" />
  <!-- 页面内容 -->
  <article>
    <!-- 加载 -->
    <section v-show="state.loading" class="absolute w-full h-full z-30 modal flex-col-center space-y-2">
      <LoadSVG class="w-16 load-rotating" />
      <p class="text-intro">正在加载中...</p>
      <p class="text-intro">首次启动会从 CDN 加载模型文件</p>
      <p class="text-intro">可能需要 30s 以上</p>
    </section>
    <!-- 主屏幕 -->
    <section class="relative w-full h-full overflow-hidden rounded-lg">
      <!-- 绘制 -->
      <canvas ref="canvas" class="absolute w-full h-full z-10" :class="{ mirror: config.mirror }" />
      <!-- 预览 -->
      <video ref="video" class="absolute w-full h-full" :class="{ mirror: config.mirror }" autoplay />
      <!-- 记录器 -->
      <a ref="record" class="hidden" />
    </section>
    <!-- 相机控制器 -->
    <section v-show="config.control" class="absolute z-20 left-0 right-0 bottom-4 space-x-4 text-center">
      <!-- 拍照 -->
      <button class="btn btn-md btn-purple">
        <CameraSVG class="w-6" @click="takePhoto(canvas, video, record)" />
      </button>
      <!-- 录像 -->
      <transition name="fade" mode="out-in">
        <!-- 开始录像 -->
        <button v-if="!state.recording" class="btn btn-md btn-blue">
          <VideoSVG
            class="w-6"
            @click="
              () => {
                recordVideo(record, config.camera)
                state.recording = true
              }
            "
          />
        </button>
        <!-- 停止录像 -->
        <button v-else class="btn btn-md btn-red">
          <OffSVG
            class="w-6"
            @click="
              () => {
                stopVideo()
                state.recording = false
              }
            "
          />
        </button>
      </transition>
    </section>
  </article>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

import { recordVideo, stopVideo, takePhoto } from '~/camera'
import { initHolistic } from '~/holistic'
import { storage } from '~/storage'

import Setting from '@/components/setting.vue'

import CameraSVG from '@/assets/camera/camera.svg'
import OffSVG from '@/assets/camera/off.svg'
import VideoSVG from '@/assets/camera/video.svg'
import LoadSVG from '@/assets/layout/load.svg'

// 初始化 storage
const { get } = storage()

// HTMLElement Refs
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 状态
const state = reactive({
  loading: true, // 加载状态
  recording: false, // 录像状态
})

// 配置
const config = reactive({
  mirror: get('mirror', true), // 镜像
  control: get('control', true), // 控制器
  holistic: get('holistic', true), // 角色跟踪
  camera: get('camera', null), // 设备ID
})

// 设置
const setting = [
  {
    id: 'mirror',
    label: '镜像',
    type: 'checkbox',
  },
  {
    id: 'control',
    label: '控制器',
    type: 'checkbox',
  },
  {
    id: 'holistic',
    label: '角色跟踪',
    type: 'checkbox',
  },
]

onMounted(async () => {
  // 获取设备列表
  const devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput')
  // 判断设备存在
  if (devices.length === 0) {
    alert('相机不存在！')
  }

  // 增加设置
  setting.push({
    id: 'camera',
    label: '设备',
    type: 'select',
    options: devices.map((device) => ({
      label: device.label.slice(0, 22),
      value: device.deviceId,
    })),
  })

  // 初始化相机
  config.camera = config.camera || devices[0].deviceId
  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: config.camera,
    },
  })

  // 是否开启角色追踪
  if (config.holistic) {
    await initHolistic(canvas.value, video.value)
  }

  // 隐藏加载框
  state.loading = false
})

watch(
  () => config.holistic,
  () => {
    window.location.reload()
  }
)

watch(
  () => config.camera,
  async (val) => {
    // 已开启角色追踪
    if (config.holistic) {
      // 重新加载窗口
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
