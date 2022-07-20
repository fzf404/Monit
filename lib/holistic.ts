/*
 * @Author: fzf404
 * @Date: 2022-07-19 17:36:05
 * @LastEditors: fzf404 nmdfzf404@163.com
 * @LastEditTime: 2022-07-21 00:44:11
 * @Description:
 */

import Holistic from '@mediapipe/holistic'
import DrawingUtils from '@mediapipe/drawing_utils'

/**
 * @description: 初始化 Holistic 实例
 * @return {*}
 */
export const initHolistic = (): Holistic.Holistic => {
  // Holistic 配置
  const config: Holistic.HolisticConfig = {
    locateFile: (file) => {
      // return `/static/holistic/${file}`
      // return `node_modules/@mediapipe/holistic/${file}`
      return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@${Holistic.VERSION}/${file}`
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

  return holistic
}

/**
 * @description: 绘制跟踪结果
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @param {Holistic} results
 * @return {*}
 */
export const drawResults = (canvas: HTMLCanvasElement, video: HTMLVideoElement, results: Holistic.Results) => {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制面部标记
  function drawFaceLandmarks() {
    if (!ctx) return

    // 网格
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
      lineWidth: 5,
    })
  }

  // 绘制手部标记
  function drawHandLandmarks() {
    if (!ctx) return
    DrawingUtils.drawConnectors(ctx, results.leftHandLandmarks, Holistic.HAND_CONNECTIONS, {
      color: '#ff000099',
      lineWidth: 4,
    })
    // 近大远小
    DrawingUtils.drawLandmarks(ctx, results.leftHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(0,217,231)',
      lineWidth: 2,
      radius: (data: DrawingUtils.Data) => {
        return DrawingUtils.lerp(data.from!.z!, -0.15, 0.1, 10, 1)
      },
    })
    DrawingUtils.drawConnectors(ctx, results.rightHandLandmarks, Holistic.HAND_CONNECTIONS, {
      color: '#0000ff99',
      lineWidth: 4,
    })
    DrawingUtils.drawLandmarks(ctx, results.rightHandLandmarks, {
      color: 'white',
      fillColor: 'rgb(255,138,0)',
      lineWidth: 2,
      radius: (data: DrawingUtils.Data) => {
        return DrawingUtils.lerp(data.from!.z!, -0.15, 0.1, 10, 1)
      },
    })
  }

  drawFaceLandmarks()
  drawHandLandmarks()

  ctx.restore()
}

/**
 * @description: 启动 Holistic 实例
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLVideoElement} video
 * @return {*}
 */
export const startHolistic = (canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
  const holistic = initHolistic()
  holistic.onResults((result: Holistic.Results) => {
    drawResults(canvas, video, result)
  })
  holistic.send({ image: video })
}
