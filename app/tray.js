const { Tray, Menu } = require('electron')

let tray

export default function () {
  tray = new Tray(__static + '/icon.png')

  const contextMenu = Menu.buildFromTemplate([{ label: '开机自启', type: 'radio', checked: true }])

  tray.setContextMenu(contextMenu)
}
