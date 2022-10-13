/*
 * @Author: fzf404
 * @Date: 2022-07-20 10:21:27
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-11 21:00:17
 * @Description: camera 工具
 */

/**
 * @description: 拍照
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @param {HTMLAnchorElement} record
 * @return {*}
 */
export const takePhoto = (video: HTMLVideoElement, canvas: HTMLCanvasElement, record: HTMLAnchorElement): void => {
  // 设置画布信息
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  // 获取画布上下文
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 绘制画布
  ctx.drawImage(video, 0, 0)

  // 保存图像
  record.href = canvas.toDataURL('image/jpeg')
  // 设置下载文件名
  record.download = `photo-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.jpeg`
  record.click()

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 记录器
let recorder: MediaRecorder

/**
 * @description: 录像
 * @param {HTMLAnchorElement} record
 * @return {*}
 */
export const recordVideo = async (device: string, record: HTMLAnchorElement): Promise<MediaRecorder> => {
  // 获取相机
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: device,
    },
    // TODO 检测麦克风存在
    audio: true,
  })

  // 创建记录器
  const recorder = new MediaRecorder(stream)

  // 录制数据
  recorder.ondataavailable = (event) => {
    record.href = URL.createObjectURL(event.data)
    record.download = `video-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.webm`
    record.click()
  }

  // 销毁记录器
  recorder.onstop = () => {
    stream.getTracks().forEach((track) => track.stop())
  }
  // 开始
  recorder.start()

  return recorder
}
