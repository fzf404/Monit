<template>
  <main>
    <!-- 窗口控制器 -->
    <Layout />
    <!-- 页面内容 -->
    <article class="h-screen w-screen relative">
      <!-- 预览窗口 -->
      <video ref="camera" class="w-full h-full p-4 pt-8" :class="control ? 'pb-16' : 'pb-4'" autoplay></video>
      <!-- 拍照 -->
      <canvas ref="canvas" class="hidden" />
      <!-- 控制器 -->
      <section class="absolute left-0 right-0 bottom-4 text-center">
        <button class="btn bg-indigo-500 hover:bg-indigo-600">
          <CameraSVG class="w-6" />
        </button>
      </section>
    </article>
  </main>
</template>

<script setup>
import Layout from '../layout/custom.vue'
import CameraSVG from '../assets/camera/camera.svg'
import { ref, onMounted } from 'vue'

const camera = ref(null)
const canvas = ref(null)

const control = ref(true)

onMounted(async () => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 获取摄像头
    camera.value.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
  } else {
    alert('摄像头不存在！')
  }
})
</script>
