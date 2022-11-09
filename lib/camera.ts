/*
 * @Author: fzf404
 * @Date: 2022-07-20 10:21:27
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-11-09 21:57:26
 * @Description: camera 工具
 */

/**
 * @description: 获取媒体列表
 * @return { Promise<MediaDeviceInfo[]> } 媒体列表
 */
export const getCameraList = (): Promise<MediaDeviceInfo[]> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const cameraList = devices.filter((device) => device.kind === 'videoinput')
        resolve(cameraList)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * @description: 初始化相机
 * @param { string } deviceId 设备ID
 * @param { HTMLVideoElement } video 元素
 * @return { Promise<MediaStream> } 流媒体
 */
export const initCamera = (deviceId: string, video: HTMLVideoElement): Promise<MediaStream> => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: deviceId,
        },
      })
      .then((stream) => {
        if (!stream) return reject(new Error('stream is null'))
        video.srcObject = stream
        resolve(stream)
      })
      .catch((err) => {
        reject(err)
      })
  })
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
  return new Promise((resolve, reject) => {
    // 设置画布信息
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // 获取画布上下文
    const ctx = canvas.getContext('2d')
    if (!ctx) return reject(new Error('ctx is null'))

    // 绘制画布
    ctx.drawImage(video, 0, 0)

    // 保存图像
    record.href = canvas.toDataURL('image/jpeg')
    // 设置下载文件名
    record.download = `photo-${new Date().toLocaleString().replace(/[/: ]/gi, '-')}.jpeg`
    record.click()

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  })
}

/**
 * @description: 录像
 * @param {string} deviceId 设备ID
 * @param {HTMLAnchorElement} record 元素
 */
export const recordVideo = (deviceId: string, record: HTMLAnchorElement): Promise<MediaRecorder> => {
  return new Promise((resolve, reject) => {
    // 获取相机
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: deviceId,
        },
        audio: true,
      })
      .then((stream) => {
        // 验证媒体liu
        if (!stream) return reject(new Error('stream is null'))

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
        resolve(recorder)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
