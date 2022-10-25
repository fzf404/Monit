/*
 * @Author: fzf404
 * @Date: 2022-07-19 17:36:05
 * @LastEditors: fzf404 hi@fzf404.art
 * @LastEditTime: 2022-08-09 11:16:03
 * @Description: 角色跟踪
 */

import DrawingUtils from '@mediapipe/drawing_utils'
import Holistic from '@mediapipe/holistic'

/**
 * @description: 绘制跟踪结果
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @param {Holistic} results
 * @return {*}
 */
export const drawResults = (canvas: HTMLCanvasElement, video: HTMLVideoElement, results: Holistic.Results): void => {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.save() // 保存状态
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制人物姿势
  function drawPoseLandmarks() {
    if (!ctx) return

    // 绘制连接线
    DrawingUtils.drawConnectors(ctx, results.poseLandmarks, Holistic.POSE_CONNECTIONS, { color: 'white' })

    // 绘制关键点
    DrawingUtils.drawLandmarks(ctx, results.poseLandmarks, { color: '#aaa', lineWidth: 1 })
  }

  // 绘制手部标记
  function drawHandLandmarks() {
    if (!ctx) return

    // 左手连接线
    DrawingUtils.drawConnectors(ctx, results.leftHandLandmarks, Holistic.HAND_CONNECTIONS, { color: 'white' })
    // 左手关键点
    DrawingUtils.drawLandmarks(ctx, results.leftHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(0,217,231)',

      lineWidth: 2,
      radius: (data: DrawingUtils.Data) => {
        return DrawingUtils.lerp(data.from!.z!, -0.15, 0.1, 10, 1)
      },
    })

    // 右手连接线
    DrawingUtils.drawConnectors(ctx, results.rightHandLandmarks, Holistic.HAND_CONNECTIONS, { color: 'white' })
    // 右手关键点
    DrawingUtils.drawLandmarks(ctx, results.rightHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(255,138,0)',
      lineWidth: 2,
      radius: (data: DrawingUtils.Data) => {
        return DrawingUtils.lerp(data.from!.z!, -0.15, 0.1, 10, 1)
      },
    })
  }

  // 绘制面部标记
  function drawFaceLandmarks() {
    if (!ctx) return

    // 面部网格
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_TESSELATION, {
      color: '#C0C0C070',
      lineWidth: 1,
    })

    // 眼睛眉毛
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_RIGHT_EYE, {
      color: 'rgb(0,217,231)',
    })
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_RIGHT_EYEBROW, {
      color: 'rgb(0,217,231)',
    })
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_LEFT_EYE, {
      color: 'rgb(255,138,0)',
    })
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_LEFT_EYEBROW, {
      color: 'rgb(255,138,0)',
    })

    // 轮廓
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_FACE_OVAL, {
      color: '#E0E0E0',
      lineWidth: 4,
    })
    DrawingUtils.drawConnectors(ctx, results.faceLandmarks, Holistic.FACEMESH_LIPS, {
      color: '#E0E0E0',
      lineWidth: 4,
    })
  }

  // 绘制姿势
  drawPoseLandmarks()
  // 绘制人脸
  drawFaceLandmarks()
  // 绘制手部
  drawHandLandmarks()

  ctx.restore() // 恢复状态
}

/**
 * @description: 初始化 Holistic 实例
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @return {*}
 */
export const initHolistic = async (canvas: HTMLCanvasElement, video: HTMLVideoElement): Promise<number> => {
  // Holistic 配置
  const config: Holistic.HolisticConfig = {
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/electron-mediapipe-holistic@1.0.2/${file}`
    },
  }

  // Holistic 实例
  const holistic = new Holistic.Holistic(config)

  // Holistic 选项
  holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
    refineFaceLandmarks: true,
  })

  // Holistic 回调
  holistic.onResults((result: Holistic.Results) => {
    drawResults(canvas, video, result)
  })

  // 发送视频流
  const sendVideo = async () => {
    await holistic.send({ image: video })
    return requestAnimationFrame(sendVideo)
  }

  return sendVideo()
}
