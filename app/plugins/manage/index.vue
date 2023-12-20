<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { usePluginConfig } from '@/hooks/plugin'

const router = useRouter()

const { t, locale } = useI18n()

const pluginConfigs = usePluginConfig()

const isBooted = reactive<Record<string, boolean>>({})

for (const name in pluginConfigs) {
  isBooted[name] = await window.api?.invoke('get-plugin-boot', name)
}

window.api?.on('set-plugin-boot', (_, name, value) => {
  isBooted[name] = value
})

const openPlugin = (name: string) => {
  window.api?.invoke('open-plugin', name) ?? router.push({ name })
}

const setPluginBoot = (name: string) => {
  isBooted[name] = !isBooted[name]
  isBooted[name] && openPlugin(name)
  console.log(typeof isBooted[name])
  window.api?.invoke('set-plugin-boot', name, isBooted[name])
}
</script>

<template>
  <section class="screen flex flex-col gap-y-2 p-3 pt-9 text-sm text-secondary">
    <p class="flex-row-between gap-x-2">
      <button class="basis-3/4 box-md bg-reverse">
        {{ t('plugin') }}
      </button>
      <button class="basis-1/4 box-md bg-warning">
        {{ t('boot') }}
      </button>
    </p>
    <p
      v-for="(item, index) in pluginConfigs"
      :key="index"
      class="flex-row-between gap-x-2"
    >
      <button class="basis-3/4 box-md bg-theme" @click="openPlugin(item.name)">
        {{ `${item.emoji} ${item.description[locale]}` }}
      </button>
      <button
        class="basis-1/4 box-md"
        :class="isBooted[item.name] ? 'bg-success' : 'bg-danger'"
        @click="setPluginBoot(item.name)"
      >
        {{ isBooted[item.name] ? t('open') : t('close') }}
      </button>
    </p>
  </section>
</template>

<i18n lang="json">
{
  "cn": {
    "plugin": "📝 插件列表",
    "boot": "🚀",
    "open": "🟢",
    "close": "🔴"
  },
  "en": {
    "plugin": "📝 Plugin List",
    "boot": "Boot",
    "open": "On",
    "close": "Off"
  }
}
</i18n>
