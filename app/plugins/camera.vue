<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen relative">
      <!-- 设置模态框 -->
      <aside class="setting" v-show="store.setting">
        <!-- 中心框 -->
        <ul>
          <!-- 设置 -->
          <li>
            <label for="contorl-open">控制器</label>
            <input id="contorl-open" type="checkbox" v-model="setting.control" />
          </li>
          <li>
            <label for="mirror-open">镜像</label>
            <input id="mirror-open" type="checkbox" v-model="setting.mirror" />
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
      <section class="rounded-lg overflow-hidden relative w-screen h-screen">
        <!-- 预览窗口 -->
        <video ref="video" class="absolute w-screen h-screen" :class="{ mirror: setting.mirror }" autoplay />
        <!-- 拍照 -->
        <canvas ref="canvas" class="absolute w-screen h-screen" />
        <!-- 记录 -->
        <a ref="record" class="hidden" />
      </section>
      <!-- 控制器 -->
      <section v-show="setting.control" class="absolute left-0 right-0 bottom-4 space-x-4 text-center">
        <!-- 拍照 -->
        <button class="btn bg-indigo-500 hover:bg-indigo-600">
          <CameraSVG class="w-6" @click="takePhoto(canvas, video, record)" />
        </button>
        <!-- 录像 -->
        <transition name="fade" mode="out-in">
          <button v-if="!setting.recording" class="btn bg-pink-500 hover:bg-pink-600">
            <VideoSVG
              class="w-6"
              @click="
                () => {
                  recordVideo(record)
                  setting.recording = true
                }
              "
            />
          </button>
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
import { recordVideo, stopVideo, takePhoto } from '~/camera'
import { startHolistic } from '~/holistic'
import { useMainStore } from '#/store'
import CameraSVG from '@/assets/camera/camera.svg'
import OffSVG from '@/assets/camera/off.svg'
import VideoSVG from '@/assets/camera/video.svg'
import Layout from '@/layouts/mato.vue'
import { storage } from '~/storage'

// 初始化 store
const store = useMainStore()
// 初始化存储类
const { set, get } = storage()

// VNodeRef
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 设置状态
const setting = reactive({
  devices: [], // 设备列表
  recording: false, // 录像状态
  control: get('control', true), // 控制器
  mirror: get('mirror', false), // 镜像
  camera: get('camera', null), // 设备ID
})

// 初始化设备
onMounted(async () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 读取列表
    setting.devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => {
      return device.kind === 'videoinput'
    })

    // 设置默认摄像头
    setting.camera = setting.camera || setting.devices[0].deviceId

    // 开启目标跟踪
    startHolistic(canvas, video)
  } else {
    alert('摄像头不存在！')
  }

  // 切换摄像头
  watchEffect(async () => {
    if (setting.camera) {
      video.value.srcObject = await navigator.mediaDevices.getUserMedia({
        video: {
          optional: [{ sourceId: setting.camera }],
        },
      })
    }
  })
})

// 监听设置修改
watch(
  () => setting.camera,
  (camera) => {
    set('camera', camera)
  }
)

watch(
  () => setting.mirror,
  (mirror) => {
    set('mirror', mirror)
  }
)

watch(
  () => setting.control,
  (control) => {
    set('control', control)
  }
)
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>
