/*
 * @Author: fzf404
 * @Date: 2022-07-20 10:21:27
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-12-10 18:57:48
 * @Description: camera 工具
 */

/**
 * @description: 获取媒体列表
 * @return { Promise<MediaDeviceInfo[]> } 媒体列表
 */
export const getCameraList = async (): Promise<MediaDeviceInfo[]> => {
  // 获取媒体列表
  const devices = await navigator.mediaDevices.enumerateDevices()
  // 过滤视频设备
  return devices.filter((device) => device.kind === 'videoinput')
}

/**
 * @description: 初始化相机
 * @param { string } deviceId 设备ID
 * @param { HTMLVideoElement } video 元素
 ≈
 */
export const initCamera = async (deviceId: string, video: HTMLVideoElement): Promise<MediaStream> => {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId,
    },
  })
  // 验证媒体流
  if (!stream) throw new Error('stream is null')
  // 设置视频源
  video.srcObject = stream

  return stream
}

/**
 * @description: 拍照
 * @param { HTMLVideoElement } video 元素
 * @param { HTMLCanvasElement } canvas 元素
 * @param { HTMLAnchorElement } record 元素
 */
export const takePhoto = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  record: HTMLAnchorElement
): Promise<void> => {
  // 设置画布信息
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  // 获取画布上下文
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('ctx is null')

  // 绘制画布
  ctx.drawImage(video, 0, 0)

  // 保存图像
  record.href = canvas.toDataURL('image/jpeg')
  // 设置下载文件名
  record.download = `photo-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.jpeg`
  record.click()

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  return Promise.resolve()
}

/**
 * @description: 录制
 * @param {string} deviceId 设备ID
 * @param {HTMLAnchorElement} record 元素
 * @return { Promise<MediaRecorder> } 录制对象
 */
export const recordVideo = async (deviceId: string, record: HTMLAnchorElement): Promise<MediaRecorder> => {
  // 获取相机
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId,
    },
    audio: true,
  })

  // 验证媒体流
  if (!stream) throw new Error('stream is null')

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
