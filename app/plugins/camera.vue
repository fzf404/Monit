<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout v-model:setting="setting.show" />
    <!-- 页面内容 -->
    <article class="h-screen relative">
      <!-- 设置模态框 -->
      <aside class="setting-container" v-show="setting.show">
        <!-- 中心框 -->
        <ul class="setting-box">
          <!-- 消息通知 设置 -->
          <li class="setting-item">
            <label for="contorl-open">控制器</label>
            <input id="contorl-open" type="checkbox" v-model.lazy="setting.control" />
          </li>
          <!-- 保存 -->
          <li class="setting-save">
            <button @click="setting.show = false">OK</button>
          </li>
        </ul>
      </aside>
      <!-- 主屏幕 -->
      <section class="rounded-lg overflow-hidden">
        <!-- 预览窗口 -->
        <video ref="video" class="w-screen" autoplay />
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
import { onMounted, ref, reactive } from 'vue'
import CameraSVG from '../assets/camera/camera.svg'
import VideoSVG from '../assets/camera/video.svg'
import OffSVG from '../assets/camera/off.svg'
import Layout from '../layout/custom.vue'

// VNodeRef
const video = ref(null)
const canvas = ref(null)
const record = ref(null)

// 设置状态
const setting = reactive({
  show: false, // 菜单栏
  control: true, // 控制器
})

onMounted(async () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 获取摄像头
    video.value.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
  } else {
    alert('摄像头不存在！')
  }
})

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
        recorder.ondataavailable = (e) => {
          record.value.href = URL.createObjectURL(e.data)
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
