// Remember to set type: module in package.json or use .mjs extension
import { existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

import { PluginConfig } from '~/context/interface'

let storage: LowSync<Record<string, PluginConfig>>

const initStorage = () => {
  const path = `${homedir()}/.config/monit`
  const file = `${path}/data.json`
  if (!existsSync(path)) mkdirSync(path, { recursive: true })
  const adapter = new JSONFileSync<Record<string, PluginConfig>>(file)
  storage = new LowSync<Record<string, PluginConfig>>(adapter, {})
  storage.read()
}

export { storage, initStorage }

// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
// await storage.read()

// // Create and query items using plain JavaScript
// db.data.posts.push('hello world')
// const firstPost = db.data.posts[0]

// // If you don't want to type db.data everytime, you can use destructuring assignment
// const { posts } = db.data
// posts.push('hello world')

// // Finally write db.data content to file
// await db.write()
