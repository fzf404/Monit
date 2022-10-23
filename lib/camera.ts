/*
 * @Author: fzf404
 * @Date: 2022-07-20 10:21:27
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-10-23 22:55:48
 * @Description: camera 工具
 */

/**
 * @description: 获取摄像头列表
 * @return {Promise<MediaStream>}
 */
export const getCameraList = (): Promise<MediaDeviceInfo[]> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameraList = devices.filter((device) => device.kind === 'videoinput')
      resolve(cameraList)
    })
  })
}

/**
 * @description: 初始化相机
 * @param {string} deviceId
 * @param {HTMLVideoElement} video
 */
export const initCamera = async (deviceId: string, video: HTMLVideoElement): Promise<MediaStream> => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId,
    },
  })

  video.srcObject = stream
  return stream
}

/**
 * @description: 拍照
 * @param {HTMLVideoElement} video
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLAnchorElement} record
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

/**
 * @description: 录像
 * @param {string} deviceId
 * @param {HTMLAnchorElement} record
 */
export const recordVideo = async (deviceId: string, record: HTMLAnchorElement): Promise<MediaRecorder> => {
  // 获取相机
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: deviceId,
    },
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
