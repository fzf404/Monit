<!--
 * @Author: fzf404
 * @Date: 2022-07-15 22:55:49
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-12-27 16:21:50
 * @Description: camera 相机监控
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
    <section v-show="store.control" class="absolute left-0 right-0 bottom-4 z-20 space-x-4 text-center">
      <!-- 拍照 -->
      <button class="btn btn-lg btn-purple">
        <CameraSVG
          class="w-6"
          @click="
            takePhoto(video, canvas, record).catch((err) => {
              sendAlert('拍摄失败：' + err.message)
            })
          "
        />
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
            "
          />
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
            "
          />
        </button>
      </transition>
    </section>
  </article>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { sendAlert, getMediaPermission, requestMediaPermission } from '#/ipc'
import { getCameraList, initCamera, recordVideo, takePhoto } from '~/camera'
import { initHolistic } from '~/holistic'
import { storage } from '~/storage'

import Loading from '@/components/loading.vue'
import Setting from '@/components/setting.vue'

import CameraSVG from '@/assets/camera/camera.svg'
import OffSVG from '@/assets/camera/off.svg'
import VideoSVG from '@/assets/camera/video.svg'

// 标签引用
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 状态
const state = reactive({
  stream: null, // 媒体流
  loading: true, // 加载状态
  recorder: null, // 录像状态
})

// 存储数据
const store = storage(
  {
    camera: null, // 设备ID
    mirror: true, // 镜像
    control: true, // 控制器
    holistic: true, // 角色跟踪
  },
  {
    // 角色跟踪修改
    holistic: () => {
      window.location.reload()
    },
    // 相机修改
    camera: (val) => {
      store.holistic ? window.location.reload() : initCamera(val, video.value)
    },
  }
)

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
  // 系统平台
  if (process.platform === 'darwin') {
    // 设备权限状态
    const mediaAccessStatus = await getMediaPermission('camera')
    // 判断权限
    if (!mediaAccessStatus) {
      // 申请权限
      const isAllowed = await requestMediaPermission('camera')
      // 申请状态
      if (!isAllowed) {
        sendAlert('需要授予相机使用权限！')
        return
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

  // 初始化设备ID
  store.camera = store.camera || devices[0].deviceId

  // 初始化相机
  await initCamera(store.camera, video.value).catch((err) => {
    sendAlert('相机初始化失败：' + err.message)
  })

  // 是否开启角色追踪
  if (store.holistic) {
    // 延迟加载 3s
    setTimeout(() => {
      // 初始化角色追踪
      initHolistic(canvas.value, video.value)
        .then(() => {
          // 隐藏加载框
          state.loading = false
        }) // 捕获错误
        .catch((err) => sendAlert('角色跟踪初始化失败：' + err.message))
    }, 3000)
  } else {
    // 隐藏加载框
    state.loading = false
  }
})
</script>
