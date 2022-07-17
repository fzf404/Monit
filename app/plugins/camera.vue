<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout v-model:setting="setting.show" />
    <!-- 页面内容 -->
    <article class="h-screen relative">
      <!-- 设置模态框 -->
      <aside class="setting" v-show="setting.show">
        <!-- 中心框 -->
        <ul>
          <!-- 消息通知 设置 -->
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
              <option v-for="device in devices" :value="device.deviceId" @select="switchCamera">
                {{ device.label.slice(0, 22) }}
              </option>
            </select>
          </li>
          <!-- 保存 -->
          <ol>
            <button @click="setting.show = false">OK</button>
          </ol>
        </ul>
      </aside>
      <!-- 主屏幕 -->
      <section class="rounded-lg overflow-hidden">
        <!-- 预览窗口 -->
        <video ref="video" class="w-screen" :class="{ mirror: setting.mirror }" autoplay />
        <!-- 拍照 -->
        <canvas ref="canvas" class="hidden" />
        <!-- 记录 -->
        <a ref="record" class="hidden" />
      </section>
      <!-- 控制器 -->
      <section v-show="setting.control" class="absolute left-0 right-0 bottom-4 space-x-4 text-center">
        <!-- 拍照 -->
        <button class="btn bg-indigo-500 hover:bg-indigo-600">
          <CameraSVG class="w-6" @click="takePhoto" />
        </button>
        <!-- 录像 -->
        <transition name="fade" mode="out-in">
          <button v-if="!recording" class="btn bg-pink-500 hover:bg-pink-600">
            <VideoSVG class="w-6" @click="startRecord" />
          </button>
          <button v-else class="btn bg-rose-600 hover:bg-rose-500">
            <OffSVG class="w-6" @click="stopRecord" />
          </button>
        </transition>
      </section>
    </article>
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, watchEffect, watch } from 'vue'
import CameraSVG from '../assets/camera/camera.svg'
import VideoSVG from '../assets/camera/video.svg'
import OffSVG from '../assets/camera/off.svg'
import Layout from '../layouts/custom.vue'
import { storage } from '../../custom/storage'

const { set, get } = storage('camera')

// VNodeRef
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 设备
const devices = ref(null)

// 设置状态
const setting = reactive({
  show: false, // 菜单栏
  control: true, // 控制器
  mirror: false, // 镜像
  camera: null, // 设备ID
})

onMounted(async () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 读取列表
    devices.value = (await navigator.mediaDevices.enumerateDevices()).filter((device) => {
      return device.kind === 'videoinput'
    })

    // 设置默认摄像头
    setting.camera = get('camera', devices.value[0].deviceId)
  } else {
    alert('摄像头不存在！')
  }
})

// 切换摄像头
watchEffect(async () => {
  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    video: {
      optional: [{ sourceId: setting.camera }],
    },
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

// 拍照
const takePhoto = () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 设置画布信息
    canvas.value.width = video.value.videoWidth
    canvas.value.height = video.value.videoHeight
    // 绘制画布
    canvas.value.getContext('2d').drawImage(video.value, 0, 0)
    // 保存图片
    record.value.href = canvas.value.toDataURL('image/jpeg')
    record.value.download = `monit-photo-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.jpeg`
    record.value.click()
  }
}

// 是否录像中
const recording = ref(false)

// 录像器
let recorder = null

// 开始录像
const startRecord = () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 获取摄像头
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // 创建记录器
        recorder = new MediaRecorder(stream)
        // 停止后回调
        recorder.ondataavailable = (event) => {
          record.value.href = URL.createObjectURL(event.data)
          record.value.download = `monit-video-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.webm`
          record.value.click()
        }
        // 开始
        recorder.start()
        // 更新状态
        recording.value = true
      })
  }
}

// 停止录像
const stopRecord = () => {
  // 停止
  recorder.stop()
  // 更新状态
  recording.value = false
}
</script>

<style scoped>
.mirror {
  transform: scaleX(-1);
}
</style>
