/*
 * @Author: fzf404
 * @Date: 2022-07-20 10:21:27
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-20 19:35:46
 * @Description: 相机工具
 */

/**
 * @description: 拍照
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @param {HTMLAnchorElement} record
 * @return {*}
 */
export const takePhoto = (canvas: HTMLCanvasElement, video: HTMLVideoElement, record: HTMLAnchorElement) => {
  // 判断摄像头是否存在
  if (navigator.mediaDevices) {
    // 设置画布信息
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // 获取画布上下文
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 绘制画布
    ctx.drawImage(video, 0, 0)

    // 保存图片
    record.href = canvas.toDataURL('image/jpeg')
    // 设置下载文件名
    record.download = `monit-photo-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.jpeg`
    record.click()

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  } else {
    alert('摄像头不存在！')
  }
}

// 记录器
let recorder: MediaRecorder

/**
 * @description: 录像
 * @param {HTMLAnchorElement} record
 * @return {*}
 */
export const recordVideo = (record: HTMLAnchorElement) => {
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
          record.href = URL.createObjectURL(event.data)
          record.download = `monit-video-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.webm`
          record.click()
        }
        // 开始
        recorder.start()
      })
  } else {
    alert('摄像头/麦克风不存在！')
  }
}

// 停止录像
export const stopVideo = () => {
  if (recorder) {
    recorder.stop()
  }
}
