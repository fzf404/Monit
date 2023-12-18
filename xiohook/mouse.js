let stop = false
const wins = {}

const send = (name, data = null) => {
  process.send({ name: name, data: data })
}

const doHandlePoint = (mx, my) => {
  for (name in wins) {
    const data = wins[name]
    if (mx > data.x && mx < data.x + data.width && my > data.y && my < data.y + data.height) {
      if (wins[name].mousein !== 1) {
        send('msr:mouseenter', name)
      }
      wins[name].mousein = 1
    } else {
      if (wins[name].mousein !== 0) {
        send('msr:mouseleave', name)
      }
      wins[name].mousein = 0
    }
  }
}

const doWindowAdd = (name, x, y, width, height) => {
  wins[name] = { x, y, width, height, mousein: -1 }
}

const doWindowRemove = (name) => {
  delete wins[name]
}

const doWindowResize = (name, width, height) => {
  const win = wins[name]
  if (win) {
    win.width = width
    win.height = height
  }
}

const doWindowMove = (name, x, y) => {
  const win = wins[name]
  if (win) {
    win.x = x
    win.y = y
  }
}

const doStop = () => {
  stop = true
}

process.on('message', (event) => {
  const name = event.name
  const data = event.data
  switch (name) {
    case 'win:create':
      doWindowAdd(data.name, data.x, data.y, data.width, data.height)
      break
    case 'win:move':
      doWindowMove(data.name, data.x, data.y)
      break
    case 'win:resize':
      doWindowResize(data.name, data.width, data.height)
      break
    case 'win:close':
      doWindowRemove(data.name)
      break
    case 'ms:stop':
      doStop()
      break
    case 'ms:point':
      doHandlePoint(event.data.x, event.data.y)
      break
  }
})

setInterval(() => {
  if (stop) return
  send('msr:get-point')
}, 200)
