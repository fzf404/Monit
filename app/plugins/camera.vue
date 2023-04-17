<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2023-04-17 23:17:38
 * @Description: camera 相机助手
-->

<template>
  <!-- 设置-->
  <Setting :store="store" :setting="setting" />
  <!-- 加载 -->
  <Loading :show="state.loading" :remark="['正在加载中...', '首次启动会从 CDN 加载模型文件', '可能需要 30s 以上']" />
  <!-- 页面内容 -->
  <article>
    <!-- 主屏幕 -->
    <section class="relative h-full w-full overflow-hidden rounded-lg">
      <!-- 绘制 -->
      <canvas ref="canvas" class="absolute z-10 h-full w-full" :class="{ mirror: store.mirror }"></canvas>
      <!-- 视频 -->
      <video ref="video" class="absolute h-full w-full" :class="{ mirror: store.mirror }" autoplay></video>
      <!-- 记录 -->
      <a ref="record" class="hidden"></a>
    </section>
    <!-- 相机控制器 -->
    <section v-show="store.control" class="absolute bottom-4 left-0 right-0 z-20 space-x-4 text-center">
      <!-- 拍照 -->
      <button class="btn btn-lg btn-purple">
        <CameraSVG class="w-6" @click="takePhoto(video, canvas, record)" />
      </button>
      <!-- 录像 -->
      <transition name="fade" mode="out-in">
        <!-- 开始录像 -->
        <button v-if="!state.recorder" class="btn btn-lg btn-blue">
          <VideoSVG
            class="w-6"
            @click="
              recordVideo(store.camera, record)
                .then((recorder) => {
                  state.recorder = recorder
                })
                .catch((err) => {
                  sendAlert('录制失败：' + err.message)
                })
            " />
        </button>
        <!-- 停止录像 -->
        <button v-else class="btn btn-lg btn-red">
          <OffSVG
            class="w-6"
            @click="
              () => {
                state.recorder.stop()
                state.recorder = null
              }
            " />
        </button>
      </transition>
    </section>
  </article>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { getMediaPermission, requestMediaPermission, sendAlert } from '~/event/send'
import { getCameraList, initCamera, recordVideo, takePhoto } from '~/lib/camera'
import { initHolistic } from '~/lib/holistic'
import { storage } from '~/lib/storage'

import CameraSVG from '@/assets/plugin/camera/camera.svg'
import OffSVG from '@/assets/plugin/camera/off.svg'
import VideoSVG from '@/assets/plugin/camera/video.svg'
import Loading from '@/components/loading.vue'
import Setting from '@/components/setting.vue'

// 标签节点
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 插件状态
const state = reactive({
  stream: null, // 媒体流
  recorder: null, // 录像状态
  loading: true // 加载状态
})

// 数据存储
const store = storage(
  {
    camera: '', // 设备编号
    mirror: true, // 镜像状态
    control: true, // 控制器状态
    holistic: true // 角色跟踪状态
  },
  {
    // 角色跟踪修改
    holistic: () => {
      window.location.reload()
    },
    // 相机修改
    camera: (val) => {
      store.holistic ? window.location.reload() : initCamera(val, video.value)
    }
  }
)

// 设置项
const setting = [
  {
    id: 'mirror',
    label: '镜像',
    type: 'checkbox'
  },
  {
    id: 'control',
    label: '控制器',
    type: 'checkbox'
  },
  {
    id: 'holistic',
    label: '角色跟踪',
    type: 'checkbox'
  }
]

onMounted(async () => {
  // 判断系统平台
  if (process.platform === 'darwin') {
    // 获取媒体权限状态
    const mediaAccessStatus = getMediaPermission('camera')
    // 判断权限状态
    if (!mediaAccessStatus) {
      // 申请媒体权限
      const isAllowed = requestMediaPermission('camera')
      // 判断申请状态
      if (!isAllowed) {
        return sendAlert('需要授予相机使用权限！')
      }
    }
  }

  // 获取设备列表
  const devices = await getCameraList().catch((err) => {
    return sendAlert('媒体列表获取失败：' + err.message)
  })

  // 判断设备存在
  if (devices.length === 0) {
    return sendAlert('媒体设备不存在！')
  }

  // 增加设备选择
  setting.push({
    id: 'camera',
    label: '设备编号',
    type: 'select',
    options: devices.map((device) => ({
      label: device.label.slice(0, 22),
      value: device.deviceId
    }))
  })

  // 初始化设备
  store.camera = store.camera || devices[0].deviceId

  // 初始化相机
  await initCamera(store.camera, video.value).catch((err) => {
    sendAlert('相机初始化失败：' + err.message)
  })

  // 判断角色追踪开启
  if (store.holistic) {
    // 延迟加载
    setTimeout(() => {
      // 初始化角色追踪
      initHolistic(canvas.value, video.value)
        .then(() => {
          state.loading = false
        })
        .catch((err) => sendAlert('角色跟踪初始化失败：' + err.message))
    }, 3000)
  } else {
    // 隐藏加载框
    state.loading = false
  }
})
</script>
